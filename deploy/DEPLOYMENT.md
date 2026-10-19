# Alex's deployment handoff

Target: `auralunis.com` and `www.auralunis.com` → Cloudflare Tunnel → Podman container on Alex's VPS.

## 1. Get and build the site

Run as the dedicated, non-root deployment user:

```bash
git clone https://github.com/ocoee-studios/auralunis-site.git
cd auralunis-site
podman build -t localhost/auralunis-site:latest -f Containerfile .
podman run -d --name auralunis-site --restart=unless-stopped --read-only --tmpfs /tmp:rw,noexec,nosuid,size=32m --cap-drop=all --security-opt=no-new-privileges -p 127.0.0.1:8081:8080 localhost/auralunis-site:latest
curl -fsS http://127.0.0.1:8081/healthz
curl -I http://127.0.0.1:8081/
```

The origin is intentionally bound to loopback, not the public internet. Use a different free host port if 8081 is already occupied. The container needs no secrets and no persistent volume. TLS is handled by Cloudflare.

For persistence across a VPS reboot, enable the user-level Podman restart service where available and configure user lingering as appropriate for the VPS, or manage this same container using a user systemd/Quadlet unit. A restart policy alone does not configure the VPS's boot services. Do not stop unrelated containers.

## 2. DNS and tunnel

Namecheap can remain the registrar. Add the domain to Cloudflare and set the Cloudflare-assigned authoritative nameservers at Namecheap if the zone is not already active. Preserve existing MX, TXT, and other service records.

For a **host-installed cloudflared connector**, create public hostname routes in the existing tunnel:

| Hostname | Service |
| --- | --- |
| `auralunis.com` | `http://127.0.0.1:8081` |
| `www.auralunis.com` | `http://127.0.0.1:8081` |

Use Cloudflare's generated tunnel DNS route. Check existing website DNS before replacing a conflicting record. Do not add a direct public VPS A record for the website. Leave other services' DNS intact. Optionally redirect www to the apex at Cloudflare; the site's canonical URL is the apex.

If **cloudflared runs in a separate container**, its 127.0.0.1 is its own container. Instead attach both containers to the same Podman network and route to `http://auralunis-site:8080`, or deliberately arrange shared host networking. Do not use the host-loopback example unchanged inside an isolated connector container. Keep tunnel tokens outside this repository.

## 3. Verify after routing

- `https://auralunis.com/` and `https://www.auralunis.com/` load successfully over HTTPS.
- CSS, JavaScript, and both WebP images load; no CSP errors appear.
- Check layout at 375px, 768px, and 1440px; no horizontal scroll.
- Feature tour works by click and keyboard arrows; FAQs open and close.
- App Store, privacy, EULA, support, and studio links reach the intended destinations.
- `https://auralunis.com/healthz` returns `ok`; an unknown path returns 404.
- Confirm no public firewall port was opened for the origin.

## 4. Updates and rollback

Keep the last working image before replacing the container:

```bash
podman tag localhost/auralunis-site:latest localhost/auralunis-site:previous
git pull --ff-only
podman build -t localhost/auralunis-site:latest -f Containerfile .
```

After the build succeeds, stop/remove only `auralunis-site` and recreate it with the run command above. For rollback, recreate from `localhost/auralunis-site:previous`. Check `/healthz` and the homepage after either operation. A systemd-managed container should be updated through its unit instead.

Reference docs:
- https://docs.podman.io/en/latest/markdown/podman-run.1.html
- https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/routing-to-tunnel/
