FROM oven/bun:1.2.7 AS build
 
WORKDIR /app
 
COPY bun.lock .
COPY package.json .

RUN bun install --frozen-lockfile
 
COPY src ./src
COPY tsconfig.json .
 
RUN bun build ./src/index.ts --compile --target=bun-linux-x64 --outfile api
 
FROM gcr.io/distroless/cc-debian12

USER nonroot:nonroot

WORKDIR /app

COPY --from=build --chown=nonroot:nonroot /app/api /app/api
COPY --chown=nonroot:nonroot prompts.json .
 
EXPOSE 3000
 
CMD ["./api"]