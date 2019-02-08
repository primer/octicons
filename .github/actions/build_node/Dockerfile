FROM node:10-slim

RUN apt-get update && \
    apt-get install --no-install-recommends -y \
        jq && \
        apt-get clean -y && \
    rm -rf /var/lib/apt/lists/*

ENV PATH="/usr/local/bin:${PATH}"

COPY bin /usr/local/bin/

ADD entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
