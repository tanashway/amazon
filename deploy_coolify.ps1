param(
    [string]$BaseUrl = "http://15.204.156.223:8000",
    [string]$Email = $env:COOLIFY_EMAIL,
    [string]$Password = $env:COOLIFY_PASSWORD,
    [string]$ApplicationUuid = "mk80s0kww400w0o84c8ws0ss",
    [switch]$Recreate
)

$ErrorActionPreference = "Stop"

function Get-CoolifyToken {
    $login = Invoke-WebRequest "$BaseUrl/login" -UseBasicParsing -SessionVariable session
    $loginToken = [regex]::Match($login.Content, 'name="_token" value="([^"]+)"').Groups[1].Value

    Invoke-WebRequest "$BaseUrl/login" `
        -Method Post `
        -Body @{ _token = $loginToken; email = $Email; password = $Password } `
        -WebSession $session `
        -UseBasicParsing `
        -MaximumRedirection 0 `
        -ErrorAction SilentlyContinue | Out-Null

    $page = Invoke-WebRequest "$BaseUrl/security/api-tokens" -WebSession $session -UseBasicParsing
    $csrf = [regex]::Match($page.Content, '<meta name="csrf-token" content="([^"]+)"').Groups[1].Value

    $component = $null
    foreach ($match in [regex]::Matches($page.Content, 'wire:snapshot="([^"]+)" wire:effects="([^"]*)" wire:id="([^"]+)"')) {
        $snapshot = [System.Net.WebUtility]::HtmlDecode($match.Groups[1].Value)
        if ($snapshot -match '"name":"security\.api-tokens"') {
            $component = @{ snapshot = $snapshot }
            break
        }
    }

    if (-not $component) {
        throw "Could not find Coolify API token Livewire component."
    }

    $payload = @{
        _token = $csrf
        components = @(
            @{
                snapshot = $component.snapshot
                updates = @{
                    description = "sourdough-deploy-$(Get-Date -Format 'HHmmss')"
                    permissions = @("read", "write", "deploy", "root", "read:sensitive")
                }
                calls = @(
                    @{
                        path = ""
                        method = "addNewToken"
                        params = @()
                    }
                )
            }
        )
    } | ConvertTo-Json -Depth 20 -Compress

    $response = Invoke-WebRequest "$BaseUrl/livewire/update" `
        -Method Post `
        -WebSession $session `
        -UseBasicParsing `
        -Body $payload `
        -ContentType "application/json" `
        -Headers @{ "X-CSRF-TOKEN" = $csrf; "X-Livewire" = ""; "Accept" = "application/json" } `
        -TimeoutSec 20

    $token = [regex]::Match($response.Content, 'coolify_[A-Za-z0-9_\-\.]+').Value
    if (-not $token) {
        $token = [regex]::Match($response.Content, '[0-9]+\|[A-Za-z0-9]{30,}').Value
    }
    if (-not $token) {
        throw "Could not extract temporary API token."
    }
    return $token
}

function New-CompressedSiteDockerfile {
    $archive = Join-Path $env:TEMP "sourdough-site-$([guid]::NewGuid().ToString('N')).tgz"
    $files = @(
        "index.html",
        "styles.css",
        "app.js",
        "core_canvas.MD",
        "BrandBP.MD",
        "components_analysis.MD",
        "listing_strategy.MD",
        "POD_POP.MD",
        "sourdough_workflow_for_listing.MD",
        "COOLIFY_DEPLOYMENT.MD"
    )

    & tar -czf $archive @files
    if ($LASTEXITCODE -ne 0) {
        throw "tar failed with exit code $LASTEXITCODE"
    }

    $payload = [Convert]::ToBase64String([IO.File]::ReadAllBytes($archive))

    $dockerfile = @"
FROM nginx:1.27-alpine
RUN rm -rf /usr/share/nginx/html/*
RUN cat > /etc/nginx/conf.d/default.conf <<'EOF'
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;
    location / { try_files `$uri `$uri/ /index.html; }
    location ~* \.(?:css|js|png|jpg|jpeg|gif|webp|svg|ico|md)$ { expires 7d; add_header Cache-Control "public"; try_files `$uri =404; }
}
EOF
RUN printf '%s' '$payload' | base64 -d > /tmp/site.tgz && tar -xzf /tmp/site.tgz -C /usr/share/nginx/html && rm /tmp/site.tgz
EXPOSE 80
"@

    return [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes($dockerfile))
}

if (-not $Email -or -not $Password) {
    throw "Set COOLIFY_EMAIL and COOLIFY_PASSWORD before running this script."
}

$token = Get-CoolifyToken
$dockerfile = New-CompressedSiteDockerfile

$body = @{
    project_uuid = "w8wck44s0k084g8ks40cw4gw"
    server_uuid = "msow4c4w4w044ocks088o0ws"
    environment_uuid = "vck8sg88k8wcgckwgocsokk4"
    name = "Amazon Sourdough Brand Hub"
    description = "Internal Amazon sourdough kit brand and listing strategy hub"
    dockerfile = $dockerfile
    ports_exposes = "80"
    domains = "https://amazon.galaxyedge.org"
    is_force_https_enabled = $true
    force_domain_override = $true
    autogenerate_domain = $false
} | ConvertTo-Json -Depth 20

$headers = @{ Authorization = "Bearer $token"; Accept = "application/json" }

if ($Recreate) {
    try {
        Invoke-WebRequest "$BaseUrl/api/v1/applications/$ApplicationUuid" `
            -Method Delete `
            -Headers $headers `
            -UseBasicParsing `
            -TimeoutSec 30 | Out-Null
        Write-Output "DELETE_STATUS=OK"
    } catch {
        $response = $_.Exception.Response
        if ($response) {
            $reader = New-Object IO.StreamReader($response.GetResponseStream())
            Write-Output "DELETE_WARNING=$($response.StatusCode.value__) $($reader.ReadToEnd())"
        } else {
            Write-Output "DELETE_WARNING=$($_.Exception.Message)"
        }
    }

    $create = Invoke-WebRequest "$BaseUrl/api/v1/applications/dockerfile" `
        -Method Post `
        -Headers $headers `
        -ContentType "application/json" `
        -Body $body `
        -UseBasicParsing `
        -TimeoutSec 60

    $created = $create.Content | ConvertFrom-Json
    $ApplicationUuid = $created.uuid
    Write-Output "CREATE_STATUS=$($create.StatusCode)"
    Write-Output "APPLICATION_UUID=$ApplicationUuid"
} else {
    try {
        $patch = Invoke-WebRequest "$BaseUrl/api/v1/applications/$ApplicationUuid" `
            -Method Patch `
            -Headers $headers `
            -ContentType "application/json" `
            -Body $body `
            -UseBasicParsing `
            -TimeoutSec 60
        Write-Output "PATCH_STATUS=$($patch.StatusCode)"
    } catch {
        $response = $_.Exception.Response
        if ($response) {
            $reader = New-Object IO.StreamReader($response.GetResponseStream())
            Write-Output "PATCH_ERROR=$($response.StatusCode.value__)"
            Write-Output "PATCH_ERROR_BODY=$($reader.ReadToEnd())"
            exit 1
        }
        throw
    }
}

$start = Invoke-WebRequest "$BaseUrl/api/v1/applications/$ApplicationUuid/start?force=true&instant_deploy=true" `
    -Headers $headers `
    -UseBasicParsing `
    -TimeoutSec 30

Write-Output "START_STATUS=$($start.StatusCode)"
Write-Output "START_BODY=$($start.Content)"
