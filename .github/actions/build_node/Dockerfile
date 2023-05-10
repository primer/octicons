FROM node:18-slim

RUN apt-get update && \
    apt-get install --no-install-recommends -y \
        jq && \
        apt-get clean -y && \
    rm -rf /var/lib/apt/lists/*

ADD entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
