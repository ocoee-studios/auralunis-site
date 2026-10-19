# AuraLunis website

Official marketing website for **auralunis.com**, by Ocoee Studios LLC. Static HTML, CSS, and JavaScript; no build dependencies, database, account system, analytics scripts, or API keys.

## Contents

- `site/` — public website and optimized assets from the existing AuraLunis app
- `Containerfile` — non-root Nginx image, listening on container port 8080
- `deploy/nginx.conf` — static serving, security headers, health endpoint
- `deploy/DEPLOYMENT.md` — Alex's Podman and Cloudflare Tunnel handoff

## Preview locally

```bash
python3 -m http.server 8080 --directory site
```

Open http://localhost:8080. This development server does not apply Nginx security headers.

## Container

```bash
podman build -t localhost/auralunis-site:latest -f Containerfile .
podman run -d --name auralunis-site --restart=unless-stopped --read-only --tmpfs /tmp:rw,noexec,nosuid,size=32m --cap-drop=all --security-opt=no-new-privileges -p 127.0.0.1:8081:8080 localhost/auralunis-site:latest
curl -fsS http://127.0.0.1:8081/healthz
```

See the deployment handoff for tunnel routing, restart persistence, updates, and rollback. No VPS or DNS changes have been made by creating this repository.

## Content sources and boundaries

Features and free/Lifetime messaging were checked against the public App Store listing and app source on October 19, 2026:

- https://apps.apple.com/us/app/auralunis/id6784049770
- https://github.com/ocoee-studios/Auralunis/blob/main/README.md
- https://github.com/ocoee-studios/Auralunis/blob/main/src/theme/tokens.ts

The hero uses the original high-resolution AuraLunis gold Moon-and-compass logo, framed by decorative orbits. It is brand artwork, not a screenshot or live sky chart. The feature switcher is a website tour, not an astronomy calculator. No location is requested. Pricing is deferred to the App Store so regional prices remain correct.

The footer uses the app's existing privacy policy and Apple's standard EULA, matching the App Store's destinations. **Content follow-up:** the separate `auralunis-legal` privacy page still mentions camera AR, while the current app and App Store describe a rendered planetarium with no camera use. That existing policy should be reconciled separately; this website does not modify it.

## Validation

JavaScript syntax, keyboard feature-tour behavior using a minimal DOM harness, local asset/anchor integrity, and responsive CSS breakpoints are checked. Browser visual QA and a container build must still be completed in an environment with a browser and Podman/Docker. This workspace did not provide those tools.

## Ownership

Website copy, app artwork, and branding belong to Ocoee Studios LLC. Asset originals are retained in the app repository. No generated or third-party stock images were added.
