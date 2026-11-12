/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    emotion: true,
  },
  /**
   * Traced output for the container image.
   *
   * `next build` writes .next/standalone: the server plus only the files
   * the pages actually require, worked out by tracing the imports. That is
   * what the Docker runtime stage copies, instead of the 377MB node_modules
   * tree, and it is why the image does not carry MUI's whole package or any
   * of the build toolchain.
   *
   * It is additive. The normal .next output is still written, so `npm run
   * build && npm start` outside Docker behaves exactly as before.
   *
   * 12.2 is the release where this moved out of `experimental`. The
   * experimental spelling is still accepted but warns on every build and
   * every dev start, so the supported key is the one used here.
   */
  output: 'standalone',
};

module.exports = nextConfig;
