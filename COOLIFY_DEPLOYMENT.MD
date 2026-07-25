# Coolify Deployment Notes

## Site

Domain:

- amazon.galaxyedge.org

Coolify dashboard:

- http://15.204.156.223:8000

Active Coolify app:

- Amazon Sourdough Brand Hub
- UUID: f08sw4c80cwck8g0g4kk00gc
- GitHub source: https://github.com/tanashway/amazon
- Branch: main
- Build pack: Dockerfile
- Internal port: 80

## Current Status

The static website has been created, pushed to GitHub, and deployed in Coolify.

Relevant files:

- index.html
- styles.css
- app.js
- Dockerfile
- nginx.conf
- .dockerignore
- all project Markdown strategy files

## Deployment Recommendation

Deploy this as one static Docker application in Coolify.

Recommended Coolify setup:

- Application type: Dockerfile
- Build context: repository/project root
- Dockerfile path: Dockerfile
- Internal port: 80
- Public domain: amazon.galaxyedge.org
- HTTPS: enabled through Coolify/Traefik
- Redirect HTTP to HTTPS: enabled

## Parent Directory

Use the full project folder as the source root:

```text
C:\Project\Amazon\SourDough
```

## Important Domain Note

The domain currently resolves through Cloudflare. That is fine, but Cloudflare must point `amazon.galaxyedge.org` to the Coolify server/origin correctly.

Current verification:

- The app responds correctly when the hostname is forced to origin `15.204.156.223`.
- Public `https://amazon.galaxyedge.org` is returning Cloudflare 520.
- The origin HTTPS certificate is currently Traefik's default self-signed certificate, not a trusted Let's Encrypt certificate.
- `15.204.156.235` appears to serve a different nginx/Express site and is not the active Coolify dashboard used for this deployment.

Likely DNS/Cloudflare action required:

- Confirm the Cloudflare DNS origin for `amazon.galaxyedge.org` points to `15.204.156.223`, not `15.204.156.235`.
- If Cloudflare proxy remains enabled, set SSL/TLS mode to a mode compatible with the origin certificate, or allow Coolify/Traefik to obtain a trusted Let's Encrypt certificate.
- Temporarily switching the DNS record to DNS-only can help Coolify issue the certificate, then the Cloudflare proxy can be re-enabled.

Checklist:

- DNS record exists for `amazon.galaxyedge.org`.
- DNS record points to `15.204.156.223` as the origin.
- Coolify has the domain assigned to this app.
- The app is deployed and healthy.
- SSL mode in Cloudflare is compatible with Coolify HTTPS.

## Deployment Status

Deployment succeeded from GitHub through Coolify after forcing a rebuild.

Latest deployed commit:

```text
a405ab2 Trigger Coolify rebuild
```

Origin verification:

```text
https://amazon.galaxyedge.org via 15.204.156.223 returns 200 OK.
```

Public-domain blocker:

```text
Cloudflare currently returns 520 until DNS/SSL is corrected.
```

## Recommended Coolify Flow

1. Create a new application in Coolify.
2. Connect the Git repository or upload/source this project folder.
3. Select Dockerfile deployment.
4. Set exposed/internal port to 80.
5. Add domain `amazon.galaxyedge.org`.
6. Deploy.
7. Open the domain and verify the hub loads.

## Verification After Deployment

Open:

```text
https://amazon.galaxyedge.org
```

Confirm:

- Sidebar navigation works.
- Each document loads.
- Search within document works.
- "Open Markdown" links work.
- Mobile layout is readable.
