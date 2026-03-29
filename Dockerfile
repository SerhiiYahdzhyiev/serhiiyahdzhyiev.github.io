FROM node:24.12.0-slim

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        git \
    && rm -rf /var/lib/apt/lists/*

# Pre-create writable dirs as node-owned so named volumes inherit the right
# ownership when Docker initializes them on first mount.
RUN mkdir -p /workspace/node_modules /workspace/.astro /workspace/dist \
    && chown -R node:node /workspace

WORKDIR /workspace

USER node
