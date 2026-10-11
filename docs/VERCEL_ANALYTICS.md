# Vercel Web Analytics: integration and learning guide

This project uses Next.js 16 App Router. Web Analytics is now mounted in `src/app/layout.tsx`, so every page sharing that layout can report page views. The code is ready; dashboard activation and a new Vercel deployment are still required.

## 1. What changed in this project

| File | Change | Purpose |
| --- | --- | --- |
| `package.json` | Adds `@vercel/analytics` as a runtime dependency | Makes the Analytics component available |
| `package-lock.json` | Records the installed package | Keeps installs reproducible with `npm ci` |
| `src/app/layout.tsx` | Imports and renders `<Analytics />` once | Covers `/`, `/news`, `/blog`, `/videos`, and other pages using the root layout |
| `README.md` | Links to this guide | Makes setup instructions easy to find |

Install command for learning or another project:

```bash
npm install @vercel/analytics
```

The integration in this app is:

```tsx
import { Analytics } from "@vercel/analytics/next";

// Inside RootLayout's existing JSX:
<body className={inter.variable}>
  <AppRouterCacheProvider>
    <Providers initialThemeId={themeId}>
      <TopUtilityBar />
      {children}
    </Providers>
  </AppRouterCacheProvider>
  <Analytics />
</body>
```

This is an excerpt of the existing layout, not a replacement file. Its metadata, font, theme cookie, and providers remain in place. Keep the layout as a Server Component: the SDK provides its own client boundary. Analytics does not need the MUI/theme context, so it sits after those providers.

Importing alone is insufficient: rendering `<Analytics />` loads the tracking script. Use the `/next` entry point for Next.js route support and keep a single instance in the shared layout. [Official Next.js integration](https://vercel.com/docs/analytics/quickstart)

## 2. Activate and deploy

1. Open the existing project in the Vercel dashboard.
2. Open **Analytics** and click **Enable** for Web Analytics.
3. Commit the code and lockfile, then push to the connected production branch. If Analytics was enabled after an earlier deployment, redeploy.
4. Visit the deployed site and navigate between pages.
5. Return to **Analytics** to check incoming data.

No analytics API key or extra environment variable is required for this integration. Git-based deployment does not require installing the Vercel CLI. Installing the npm package does not itself enable the dashboard feature. [Vercel quickstart](https://vercel.com/docs/analytics/quickstart)

This setup targets Vercel hosting. A standalone Docker deployment does not automatically provide Vercel's analytics collection endpoints. Existing MongoDB, email, and crawler environment variables are unrelated to Analytics.

## 3. Understand the data flow

```text
Visitor opens a page or changes routes
  -> root layout includes the Analytics component
  -> browser loads Vercel's tracking script
  -> script sends a page-view event to Vercel
  -> aggregated results appear in the project dashboard
```

Development mode does not send events to the dashboard by default. Use `npm run dev` to check rendering and console diagnostics, then verify collection on a Vercel deployment. The SDK detects mode automatically; this app does not force production mode. [SDK overview](https://github.com/vercel/analytics/blob/main/packages/web/README.md), [mode configuration](https://vercel.com/docs/analytics/package)

## 4. Verify after deployment

- Open browser developer tools, select **Network**, and reload the deployed page.
- Check that the analytics script loads and the page-view request succeeds. Paths may use `/_vercel/insights/*` or a generated `/<unique-path>/*`; do not hard-code the generated path.
- Navigate from the portfolio to `/news` using the app's links and look for another page-view request.
- In the dashboard, choose the matching **Production** or **Preview** environment and a timeframe that includes your visit. Allow time for processing before checking again.

The Vercel quickstart describes the generated `/view` request. [Request verification](https://vercel.com/docs/analytics/quickstart), [environment filters](https://vercel.com/docs/analytics/using-web-analytics)

Local lint/build checks establish code compatibility; they cannot prove that the dashboard is enabled or that deployed events arrive.

For code checks, run `npm run lint`, `npx tsc --noEmit --incremental false`, and `npm run build`. During this install, the local Node version was 20.11.0 and npm reported that existing MongoDB/Mongoose dependencies require at least 20.19.0. Use a supported Node version meeting the project's dependency requirements for local work and Vercel builds; this warning comes from the existing dependencies rather than Analytics.

## 5. Use analytics to improve this portfolio

Choose a timeframe and environment in **Analytics**, then use page, referrer, country, device, browser, and operating-system panels to filter results. [Dashboard guide](https://vercel.com/docs/analytics/using-web-analytics)

| Question | What to inspect | Possible action for this project |
| --- | --- | --- |
| Which content attracts attention? | Page views for `/news`, `/blog`, and `/videos` | Publish more of the content visitors actually open |
| Where does traffic come from? | Referrers | Compare traffic after sharing a post on LinkedIn or another site |
| Which screens matter most? | Device breakdown | Prioritize mobile navigation and contact-form usability if mobile traffic is high |
| Did a content change help? | Similar periods before and after the change | Compare traffic while accounting for when and where you shared the site |
| Are visitors taking useful actions? | Optional custom events | Measure successful contact submissions or outbound profile clicks |

Page views count page visits, while visitors estimate distinct visitors within Vercel's identification window. Reloading a page can add page views without representing a new person. Visitor identification is anonymous and resets after 24 hours, so visitor counts are not permanent user identities. [Visitor identification](https://vercel.com/docs/analytics/privacy-policy)

In this portfolio, `#about`, `#experience`, and `#contact` are sections of `/`, not separate Next.js pages. Page-view totals alone cannot tell you which section someone read, whether they downloaded a resume, or whether a message was successfully sent. Likewise, an API/cron execution is not a browser page view.

## 6. Optional custom events

Custom events currently require **Pro or Enterprise**. They are not added by this change; automatic page views are the starting point. [Custom-event documentation](https://vercel.com/docs/analytics/custom-events)

For learning, a client component can track an outbound click like this:

```tsx
"use client";

import { track } from "@vercel/analytics";

export function GitHubLink() {
  return (
    <a
      href="https://github.com/bhativivek"
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("profile_link_clicked", { platform: "github" })}
    >
      GitHub
    </a>
  );
}
```

For `src/components/ContactSection/index.tsx`, a useful future event is `contact_form_submitted`, emitted only after `/api/contact` responds successfully. A click on **Send Message** can fail validation or the network request, so it is a different measurement.

Use a small, consistent event vocabulary. Properties can contain strings, numbers, booleans, or null; nested objects are unsupported. Plan limits apply to property counts. Never include contact names, email addresses, messages, tokens, or other private values. [Event data restrictions](https://vercel.com/docs/analytics/custom-events)

## 7. Privacy, limits, and scope

Vercel Web Analytics uses anonymous, aggregated data without tracking cookies. URLs and referrers can still contain sensitive values; avoid putting private information in URLs or future event payloads. If sensitive routes are introduced, consider a client-side Analytics wrapper using `beforeSend` to redact data or return `null` to drop an event. A callback belongs in a Client Component rather than being passed from this server layout. [Privacy details](https://vercel.com/docs/analytics/privacy-policy), [beforeSend configuration](https://vercel.com/docs/analytics/package)

Basic Web Analytics is available on all plans, but allowances, reporting windows, and paid features vary. Review the current plan before enabling optional features. Page views and custom events both count toward usage; usage is shared across projects in the account/team. Hobby collection can pause when its allowance is exhausted, while paid plans can incur usage charges. [Current limits and pricing](https://vercel.com/docs/analytics/limits-and-pricing)

Web Analytics helps explain traffic and usage. For loading speed and Core Web Vitals, Vercel offers the separate **Speed Insights** product; it has not been added here. [Web Analytics overview](https://vercel.com/docs/analytics)

## 8. Troubleshoot missing data

| Symptom | Check |
| --- | --- |
| Nothing from localhost | Expected in development mode; verify a deployed visit |
| Script returns 404 | Enable Analytics, then redeploy the project |
| Requests are blocked | Check browser extensions, network filtering, and any Content Security Policy; retry with extensions disabled |
| Preview visit is absent from Production | Select Preview or All Environments in Analytics |
| Routes are missing | Keep the `@vercel/analytics/next` import and verify the deployment includes this change |
| Proxy/custom domain fails | Forward analytics endpoint paths to the Vercel deployment |
| Collection stops after working | Check usage limits and project status |
| Counts seem inflated | Check environment/hostname filters and repeated test visits |

[Vercel troubleshooting](https://vercel.com/docs/analytics/troubleshooting), [SDK development behavior](https://github.com/vercel/analytics/blob/main/packages/web/README.md), [dashboard filters](https://vercel.com/docs/analytics/using-web-analytics), [usage limits](https://vercel.com/docs/analytics/limits-and-pricing)

## 9. Launch checklist

- [x] Install the runtime dependency and update the lockfile.
- [x] Mount Analytics once in the root layout.
- [ ] Enable Web Analytics for the existing Vercel project.
- [ ] Deploy these changes after enabling it.
- [ ] Visit the deployment and check successful analytics requests.
- [ ] Confirm data in the dashboard using the matching environment.

Documentation checked against Vercel's official guidance on October 11, 2026. Consult the linked pages for future pricing and feature changes.
