# Builds a Docker to deliver dist/
FROM 172.21.3.76:5001/common/nginx:1.12

MAINTAINER zzzhao <zzzhao@thoughtworks.com>

COPY dist/ /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80 443
