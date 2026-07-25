# Coolify Deployment Notes

## Site

Domain:

- amazon.galaxyedge.org

Server IP provided:

- 15.204.156.235

## Current Status

The static website has been created and is Docker-ready.

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

If Cloudflare proxy is enabled and the origin app is not yet running, the domain may show a 520 error.

Checklist:

- DNS record exists for `amazon.galaxyedge.org`.
- DNS record points to `15.204.156.235` as the origin.
- Coolify has the domain assigned to this app.
- The app is deployed and healthy.
- SSL mode in Cloudflare is compatible with Coolify HTTPS.

## Access Blocker

Deployment from this machine is currently blocked because the available SSH keys do not authenticate to the server.

Tested users:

- root
- ubuntu
- debian
- coolify
- q_n

Result:

- Permission denied.

To deploy directly, provide one of the following:

- Coolify UI access.
- Coolify API token and endpoint.
- SSH user/key that can access the server.
- A connected Git repository that Coolify can pull from.

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

