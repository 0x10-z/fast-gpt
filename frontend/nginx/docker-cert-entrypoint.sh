apk upgrade --update-cache --available && \
    apk add openssl && \
    rm -rf /var/cache/apk/*
openssl req -x509 -newkey rsa:4096 -nodes -out server.crt -keyout server.key -days 365 -subj "/C=FR/O=krkr/OU=Domain Control Validated/CN=*.selfsigned.com"
mkdir /etc/nginx/certs
mv server.crt /etc/nginx/certs/
mv server.key /etc/nginx/certs/