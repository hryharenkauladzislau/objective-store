FROM node:22-bookworm-slim AS build
WORKDIR /app
COPY evgeniy-release.tar.gz /tmp/release.tar.gz
RUN tar -xzf /tmp/release.tar.gz -C /app && rm /tmp/release.tar.gz
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm ci && npm run build && npm cache clean --force

FROM node:22-bookworm-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1
COPY --from=build --chown=node:node /app /app
USER node
EXPOSE 3000
CMD ["npm", "start"]
