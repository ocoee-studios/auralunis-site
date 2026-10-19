FROM docker.io/library/nginx:stable-alpine
COPY deploy/nginx.conf /etc/nginx/nginx.conf
COPY site/ /usr/share/nginx/html/
USER nginx
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s CMD wget -q -O /dev/null http://127.0.0.1:8080/healthz || exit 1
ENTRYPOINT ["nginx", "-g", "daemon off;"]
