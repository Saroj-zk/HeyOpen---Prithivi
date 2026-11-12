# Running HeyOpen in Docker

Two images are built from one `Dockerfile`, and `docker-compose.yml` wires
them up with the GitBook previewer.

## The short version

```bash
docker compose up -d          # site on :3000, docs preview on :4000
docker compose logs -f web
docker compose down
```

First build takes a few minutes (it runs `npm ci` and `next build` inside
the image). After that, a rebuild that only touches source is fast: the
dependency install is cached on the lockfile, and `public/` sits in a
layer below the build output.

## Development, with hot reload

```bash
docker compose --profile dev up
```

`web` and `dev` both want port 3000, so `dev` is behind a profile and the
plain `up` never starts it. The dev container bind mounts the working
tree, so an edit on the host recompiles inside the container. Two paths
are deliberately *not* shared:

- `node_modules` — the host's is a macOS arm64 install and its SWC binary
  will not load on Linux, so the container keeps the one from its image.
- `.next` — the host's is a production build; dev would otherwise read it
  as its own cache.

Both are named volumes. If dependencies change, rebuild and reset them:

```bash
docker compose --profile dev down -v
docker compose --profile dev up --build
```

## Different ports

```bash
WEB_PORT=8080 DOCS_PORT=8081 docker compose up -d
```

## Without compose

```bash
docker build -t heyopen-site .
docker run -d -p 3000:3000 --name heyopen heyopen-site
```

## What is in the production image

About 300MB, and roughly half of that is `public/`:

| layer | size | what |
| --- | --- | --- |
| `node:20-alpine` | ~135MB | the runtime |
| `public/` | 157MB | video, imagery, brand files |
| `.next/standalone` | 10MB | the server and its traced dependencies |
| `.next/static` | 1.4MB | the hashed client chunks |

The 10MB figure is the point of `output: 'standalone'` in
`next.config.js`. `next build` traces what the pages actually import and
writes a self-contained server, so the image carries that instead of the
377MB `node_modules` tree, and no npm or build toolchain at all. The
setting is additive: `npm run build && npm start` on the host is
unchanged.

The server runs as the image's `node` user (uid 1000) and writes nothing
at runtime. Every page is prerendered at build time, so there is no
database, no environment variable to set, and nothing to configure.

`HEALTHCHECK` fetches `/` rather than probing the port, because the
process can be listening while the server itself fails to render.

## Why `product-docs` is not in the image

The site does not serve it. The `docs` service mounts the folder read
only from the host and runs `product-docs/preview/server.js`, which is
node's own `http` and `fs` with no dependencies. So the previewer always
shows what is on disk, and rebuilding the book with the generators in
that folder needs no container restart.

## Troubleshooting

**`npm ci` fails to reach the registry during build.** The build
container needs working DNS. If the daemon can pull images but builds
cannot resolve hostnames, DNS is being filtered somewhere between the
two; pinning it for one build will get you through:

```bash
docker build --add-host registry.npmjs.org:$(dig +short registry.npmjs.org | head -1) -t heyopen-site .
```

**Port 3000 is already taken.** Something else is on it, often a host
`npm run dev` from an earlier session. Either stop it or set `WEB_PORT`.

**An edit does not trigger a recompile in the dev container.** File
change events do not always cross the bind mount on macOS and Windows,
which is why `WATCHPACK_POLLING` is set in the compose file. If it is
still missed, the file is likely outside the mounted tree.
