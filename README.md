# Caffinity Site

Public single-page React website for the Caffinity Android app. It includes a home page, Privacy Policy, and FAQ for Google Play listing use.

## Routing

This site uses React Router with `HashRouter` so GitHub Pages can serve every page from the static `index.html` file without direct-route 404 errors. A `public/404.html` fallback also redirects clean paths such as `/privacy` to the hash route.

Supported routes:

- `/`
- `/#/privacy`
- `/#/faq`

Privacy Policy URL format for Google Play:

```text
https://<username>.github.io/<repo>/#/privacy
```

Replace `<username>` and `<repo>` with your GitHub Pages owner and repository name.

## Local Development

Install dependencies:

```sh
npm install
```

Start the local dev server:

```sh
npm run dev
```

Build the static site:

```sh
npm run build
```

Preview the production build locally:

```sh
npm run preview
```

## Deploy to GitHub Pages

### Option 1: Deploy with gh-pages

The project includes a deploy script:

```sh
npm run deploy
```

This builds the site and publishes the `dist` folder to the `gh-pages` branch. In GitHub, set Pages to deploy from the `gh-pages` branch.

### Option 2: Deploy with GitHub Actions

You can also configure GitHub Pages to deploy the built `dist` folder from an Actions workflow. Keep the Vite `base` setting as `./` for portable GitHub Pages hosting.

## Privacy Notes

The site is static and does not include analytics, cookies, login, forms, backend code, or user-data collection.

The Privacy Policy describes Caffinity Android v1.0 as a local-first app with on-device storage, no account, no ads, no analytics, no backend/server, and no intended internet/network functionality.
