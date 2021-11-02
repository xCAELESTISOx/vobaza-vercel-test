FROM node:12-alpine3.12
WORKDIR /app
COPY . /app/

# hadolint ignore=DL3018
RUN yarn \
	&& yarn build \
	&& chown nobody:nobody -R /app/.next \
	&& apk add --no-cache curl

ENV NUXT_HOST=0.0.0.0 \
	NUXT_PORT=3000

USER nobody
HEALTHCHECK --interval=15s --timeout=5s --start-period=3s CMD nc -z 127.0.0.1 $NUXT_PORT
CMD ["yarn", "start"]
