FROM node:12-alpine3.12

ARG MAIN_HOST="vobaza.dev.immelman.ru"
ARG SUBS_DELIMITER="."
ARG SCHEME="https"

ENV NEXT_PUBLIC_BASE_URL=${SCHEME}://api${SUBS_DELIMITER}${MAIN_HOST}

WORKDIR /app
COPY . /app/

# hadolint ignore=DL3018
RUN yarn install \
	&& yarn build \
	&& chown nobody:nobody -R /app/.next \
	&& apk add --no-cache curl \
	&& yarn cache clean

USER nobody
HEALTHCHECK --interval=15s --timeout=5s --start-period=3s CMD nc -z 127.0.0.1 3000
CMD ["yarn", "start"]
