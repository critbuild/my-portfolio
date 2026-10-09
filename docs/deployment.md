# Hosting and custom domain

## Automatic deployment

The public [`critbuild/my-portfolio`](https://github.com/critbuild/my-portfolio) repository publishes to **GitHub Pages**. Hosting and the GitHub-provided HTTPS certificate are free for this public repository; registration and renewal of `critbuild.io` are separate paid services.

[`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml) deploys on pushes to `main` and manual workflow dispatch. It installs from the lockfile, checks Astro/TypeScript, builds static output, and uploads only `dist/`. Actions are pinned to commit SHAs; deployment uses GitHub's short-lived token and OIDC, not a personal access token or additional repository secret.

The workflow reads the site's origin and base path from GitHub Pages settings and passes them to Astro. Before the custom domain is connected, the address is `https://critbuild.github.io/my-portfolio/`. With `critbuild.io` configured, the next build uses `https://critbuild.io/` and the root base path. Templates prefix internal routes and public assets with `import.meta.env.BASE_URL`; imported CSS/font assets are handled by Astro. Do not hard-code `/my-portfolio/` into source or use root-only links for public assets.

The custom-domain default lives in `astro.config.mjs`; the workflow's flags override it with the actual Pages configuration. Changing a domain requires re-running the workflow. A `public/CNAME` file is neither required nor used for this custom Actions deployment.

## Connect `critbuild.io`

**Prerequisite:** register the domain in an account you control. Repository access alone cannot purchase a domain or change its registrar's DNS. Do not set the custom domain while it is unowned, because GitHub will redirect the working default address to it.

1. In [account Settings → Pages](https://github.com/settings/pages), add and verify `critbuild.io`. Publish the exact TXT record GitHub provides, then verify it and retain that record. See [GitHub's ownership verification instructions](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages).
2. In [repository Settings → Pages](https://github.com/critbuild/my-portfolio/settings/pages), set **Custom domain** to `critbuild.io`. Keep the publishing source as **GitHub Actions**. Do this before adding the traffic records below, to avoid leaving an unclaimed Pages domain.
3. At the domain's DNS provider, add these records. `@` means the apex `critbuild.io`; TTL can remain the provider's default. If using Cloudflare DNS, use **DNS only** while GitHub validates DNS and issues its certificate.

| Type | Name | Value |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |
| CNAME | `www` | `critbuild.github.io` |

Remove conflicting parking/website records only; preserve unrelated mail and verification records. Do not create wildcard DNS records. The `www` CNAME contains no protocol or repository path. These values come from [GitHub's custom-domain documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

4. Re-run **Deploy portfolio** from the [Actions page](https://github.com/critbuild/my-portfolio/actions/workflows/deploy.yml), or run:

   ```sh
   gh workflow run deploy.yml --repo critbuild/my-portfolio --ref main
   ```

5. Wait for DNS validation and the GitHub certificate, then enable **Enforce HTTPS** in repository Pages settings. GitHub notes that DNS/certificate availability can take up to 24 hours. With both apex and `www` records configured, GitHub redirects `www.critbuild.io` to the chosen apex domain.
6. Open `https://critbuild.io/` and `https://www.critbuild.io/`. Check the homepage, all project routes, fonts/artwork, a missing URL returning the custom 404, and project-to-home navigation. Follow the broader [browser smoke checks](development.md#browser-smoke-checks) when changing the application.

## Local hosting checks

The ordinary `npm run build` uses the custom-domain root layout. To exercise the temporary GitHub project path locally, use:

```sh
npm run build -- --site https://critbuild.github.io --base /my-portfolio/
npm run start -- --base /my-portfolio/ --port 4321
```

Stop any existing preview on that port first. Open the printed URL under `/my-portfolio/`. Rebuild normally afterward to restore the root-path local preview. Do not commit `dist/`, `.astro/`, `.next/`, credentials, or registrar verification secrets.
