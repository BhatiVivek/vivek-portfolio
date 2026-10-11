# SEO and AEO: learning guide and implementation plan

Prepared: October 11, 2026. Status: planning only; implementation has not started.

This guide is tailored to this repository. The only change made for this request is this document. No application code, dependencies, database records, hosting settings, search accounts, or deployments were changed.

## 1. Recommended direction

Keep Next.js and Vercel. Use Next.js's native metadata, robots, sitemap, and server-rendering capabilities. Build a small collection of original engineering articles and project case studies on your own domain, make your professional identity consistent, and measure discovery with Google Search Console and Bing Webmaster Tools. Keep the existing Vercel Analytics integration for visitor behavior.

For this portfolio, that is my recommended starting solution: a maintainable technical foundation plus useful content that demonstrates your experience. An additional SEO library, a paid AEO platform, a chatbot, or a framework migration is not necessary to begin.

SEO means helping search engines discover, understand, and surface your pages. AEO means improving the chance that answer systems can find and accurately reference your information. GEO is another term used for visibility in generative answers. These are ongoing practices, not a single feature to switch on. Google describes optimization for its generative search features as part of SEO. [Google's current AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)

Recommended initial goal: help recruiters, engineering leaders, and relevant technical readers find Vivek Bhati and understand his expertise. Treat consulting leads as a secondary goal only if you actually offer consulting. Confirm this positioning before implementation.

### What established industry workflows use

Across professional SEO workflows, the practical pattern is technical discoverability, useful content, credible authorship, measurement, and continuous improvement. The table below maps that pattern to this project. It is a recommendation grounded in official documentation, not a claim that a measured majority of companies uses a particular product.

| Need | Recommended starting solution | When to expand |
| --- | --- | --- |
| Page metadata and social previews | Next.js Metadata API and image conventions | A shared helper once multiple content templates exist |
| Crawl discovery | Native `robots.ts` and `sitemap.ts` | Larger sitemap partitions only if the site grows substantially |
| Search measurement | Google Search Console and Bing Webmaster Tools | Additional reporting when you have meaningful traffic |
| Content management | Keep MongoDB for existing dynamic content; consider repository Markdown/MDX for a small original article collection | A CMS when editorial volume or multiple authors justify it |
| Visitor behavior | Existing Vercel Analytics | Conversion events or another analytics product if reporting needs exceed it |
| Speed | PageSpeed Insights and field Core Web Vitals | Optional continuous performance monitoring |
| AI visibility | Google generative AI reporting, Bing AI Performance, referral data, and a repeatable manual sample | Paid monitoring only after defining questions it must answer |

The native Next.js metadata features are documented in [Metadata and OG images](https://nextjs.org/docs/app/getting-started/metadata-and-og-images). Google's [SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) explains the underlying search practices. Microsoft's [AI Performance announcement](https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/) explains its citation reporting.

## 2. What the repository currently shows

These are source-code observations, not a confirmed audit of the production deployment. The README lists `https://vivekbhati.vercel.app/` as the live site. Attempts to retrieve that site and its robots/sitemap endpoints through the research browser failed, so deployed responses, indexing, account settings, and performance remain unverified. Local and deployed code may differ.

| Observation | Evidence | Implication for the plan |
| --- | --- | --- |
| Next.js 16.1.6 App Router on React 19 | `package.json`, `src/app/` | Use existing framework capabilities |
| Root title and description already exist | `src/app/layout.tsx` | Build on the current foundation |
| No route-specific metadata exports found | `src/app/` | Blog, news, and videos inherit generic root metadata |
| No explicit canonical, Open Graph, Twitter card, or JSON-LD setup found | Metadata and source search | Define these deliberately for public page types |
| No robots or sitemap implementation found | `src/app/`, `public/` | Plan native routes for both |
| Homepage is a Client Component with inline professional content | `src/components/HomePage/index.tsx` | Check its initial rendered HTML; do not assume it is empty just because it uses `use client` |
| Blog records load in `useEffect`; cards can link to external articles | `src/app/blog/page.tsx` | Initial article list lacks its fetched records; original local articles need dedicated URLs |
| Blog database model has content but no slug or editorial status | `src/models/Blog.ts` | Introduce a publication model if MongoDB hosts local articles |
| News records load after mount | `src/components/NewsPage/index.tsx` | Plan public initial content separately from interactive filtering |
| News records have a seven-day TTL | `src/models/NewsArticle.ts` | The current feed is temporary; durable editorial archives need separate storage |
| News source URL is stored but not exposed as a source link in the current card | News model and `ArticleCard` | Readers need access to the original reporting |
| Crawler sets `published_at` when collecting the article | `src/lib/crawl-job.ts` | Distinguish source publication time, collection time, and your editorial publication time |
| Videos contain placeholder URLs and coming-soon messaging | `src/app/videos/page.tsx` | Do not prioritize indexing or video markup until real content is available |
| Root description says 11+ years; hero/about say 12+ | Layout, HeroSection, SummarySection | Reconcile facts before repeating them in metadata or schema |
| About summary says three cloud certifications; certification list contains two entries | SummarySection and HomePage data | Confirm the count and list rather than inventing a missing credential |
| Content uses animations initially hidden with `opacity: 0` | `src/app/globals.css`, component observers | Verify essential content remains usable when JavaScript or observers fail |
| Root layout reads a theme cookie | `src/app/layout.tsx` | Assess caching with that constraint; do not assume the whole site can be statically generated unchanged |
| Admin routes currently return `null` | `src/app/admin/page.tsx`, `src/app/admin/news/page.tsx` | Keep these out of the public index; a blank page is not a useful search landing page |
| Vercel Analytics component exists | Root layout and `docs/VERCEL_ANALYTICS.md` | Dashboard activation and collection need separate verification |
| Standalone preparation guide is in public assets | `public/ai-staff-engineer-prep.html` | Decide whether it is intentionally public and worth indexing; it bypasses the shared Next.js layout |

## 3. Step-by-step implementation process

The steps below describe future work. The checkboxes are intentionally unfinished.

### Step 1: Define the audience, identity, and success measures

Priority: P0. Owner: site owner. Dependency: none.

1. Choose the primary outcome: recruiter discovery, consulting inquiries, or technical readership. Start with recruiter discovery unless you decide otherwise.
2. Confirm the public name, accurate role description, location, experience, certifications, and profile URLs.
3. Choose three topics supported by your real experience: for example React/TypeScript engineering, Next.js/Node.js architecture, and AEM/cloud integration.
4. Draft 10-15 useful audience questions. Examples: "Who is Vivek Bhati?", "What has Vivek built?", "How do I combine AEM with a React frontend?", and "How should a Next.js app render dynamic content?"
5. Map each question group to one substantial page. Avoid separate near-identical pages for every keyword variation.
6. Record a baseline: indexed URLs, branded/non-branded impressions, organic clicks, contact inquiries, and relevant profile visits where measurable. Write "unknown" when data is unavailable.

Completion check: [ ] a one-page audience brief and a question-to-page map exist; public facts are verified.

### Step 2: Choose the permanent public domain and URL policy

Priority: P0. Owner: site owner and developer. Dependency: Step 1.

1. Confirm whether to retain the Vercel subdomain or obtain a personal domain. A custom domain is useful for brand ownership and portability; buying one does not automatically improve rankings.
2. Pick one HTTPS origin and, if relevant, one www/non-www version.
3. Document the trailing-slash convention, article slug format, and treatment of tracking/filter parameters.
4. Use the chosen origin consistently in metadata, schema IDs, internal links, and sitemap URLs.
5. If changing domains, map old paths to equivalent new paths with permanent redirects. Verify both properties in search tools and update external profiles. Do not redirect every old page to the homepage.

Proposed URL structure:

```text
/                         Professional portfolio
/about                    Optional fuller profile, if it adds meaningful detail
/projects                 Original project/case-study index
/projects/<slug>          One substantial case study
/blog                     Original writing index
/blog/<slug>              One complete original article
/news                     Curated current feed, subject to quality review
/videos                   Real published videos only
```

Keep the current homepage sections; hash anchors such as `/#experience` are sections of one document, not separate content pages. Add a route only when it serves a distinct purpose.

Redirects, canonical annotations, and sitemap consistency help communicate the preferred URL, but the search engine makes the final canonical selection. [Google canonical guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)

Completion check: [ ] preferred origin and route rules are recorded; any migration has a reviewed redirect map.

### Step 3: Establish search accounts and confirm AI inclusion

Priority: P0. Owner: site owner. Dependency: Step 2.

1. Add Google Search Console. Use a Domain property and DNS verification for a domain you control. For the existing Vercel subdomain, use an HTTPS URL-prefix property and an available verification method, such as an HTML verification file or meta tag.
2. Add and verify the same site in Bing Webmaster Tools; use its import workflow if appropriate.
3. Review Google Search Console's **Settings > Search generative AI** control. For the requested visibility goal, choose inclusion when implementing this plan. Record the actual state.
4. Inspect `/`, `/blog`, and `/news` using the live URL inspection tools. Record crawl permission, HTTP status, rendered content, indexing status, and selected canonical.
5. Check that Vercel Analytics is enabled and collecting on production, using the existing analytics guide.
6. Save initial exports or screenshots privately for future comparison. Account access and verification steps must be performed by someone with ownership rights.

Current Google guidance includes a separate Search generative AI inclusion control. It manages participation in AI Overviews, AI Mode, and generative Discover features; it is separate from training controls. Do not assume that allowing Googlebot alone establishes this setting. [Search generative AI control](https://support.google.com/webmasters/answer/16908024)

Completion check: [ ] ownership verified in both tools; AI inclusion state recorded; baseline inspections saved.

### Step 4: Make each public page describe itself accurately

Priority: P0. Owner: developer and site owner. Dependencies: Steps 1-2.

1. Configure the production `metadataBase` and a default title/title template in the root layout.
2. Give each public route its own title, description, and canonical URL. Set the homepage canonical in its own page; avoid a root-layout canonical that accidentally points every child page to `/`.
3. Use static `metadata` for stable pages and `generateMetadata` for article pages. These exports belong in Server Components. A Client Component page should get a server page wrapper while retaining its interactive UI below it.
4. Add accurate Open Graph and Twitter card metadata, a real share image, and an appropriate icon.
5. Reconcile experience/certification statements across visible text, metadata, profiles, and future schema.
6. Inspect output on production, including how metadata is delivered for relevant bots. Next.js can stream dynamic metadata; verify actual responses rather than changing bot configuration preemptively.

Example future title map:

| Page | Draft title | Purpose |
| --- | --- | --- |
| `/` | Vivek Bhati - Senior Full-Stack Engineer | Branded professional discovery |
| `/blog` | Engineering Articles by Vivek Bhati | Original writing |
| `/projects` | Engineering Projects and Case Studies - Vivek Bhati | Evidence of practical work |
| `/news` | Curated AI News Brief - Vivek Bhati | Describes the feed honestly |

Drafts require review for factual accuracy. Do not add "best", certifications, or measured results without evidence. Descriptions should summarize the page naturally; character counts are editorial guidance, not ranking requirements. Social preview markup serves sharing and identification; it is not an AEO switch.

Implementation references: [Next.js generateMetadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata), [Google title and snippet basics](https://developers.google.com/search/docs/fundamentals/seo-starter-guide).

Completion check: [ ] public route metadata is distinct and correct; canonical tags and share previews match the intended URLs.

### Step 5: Publish crawl and indexing instructions

Priority: P0. Owner: developer. Dependencies: Steps 2 and 4.

1. Add `src/app/robots.ts` to serve `/robots.txt` and link to the sitemap.
2. Add `src/app/sitemap.ts` to serve `/sitemap.xml` using absolute canonical URLs.
3. Include only intentionally indexable public pages and published local articles. Exclude APIs, admin pages, drafts, placeholders, redirect targets' old aliases, and filter/tracking variants.
4. Base article `lastModified` on meaningful content changes. Do not assign the current time on every request.
5. Add `noindex` to admin/placeholder pages that remain reachable. Protect private functionality with authentication; robots rules do not provide access control.
6. If a URL must be removed from the index using `noindex`, allow the relevant crawler to fetch and see that directive. Blocking that URL in robots can prevent processing the directive.
7. Inspect preview/staging deployments separately to prevent accidental indexing without applying preview rules to production.
8. Decide the public status of `ai-staff-engineer-prep.html`. If public and substantial, give it its own metadata and links; if private, use actual access control or remove it from public hosting during future work. Simply omitting it from a sitemap does not make it private.

Official implementation references: [Next.js robots](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots), [Next.js sitemap](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap), [Google crawl/index controls](https://developers.google.com/search/docs/fundamentals/get-started-developers).

Completion check: [ ] both endpoints return the expected content; indexable URLs pass checks; exclusions work as intended.

### Step 6: Deliver important content in the initial HTML

Priority: P0. Owner: developer. Dependencies: Steps 4-5.

1. Fetch public blog records in a Server Component, preferably through a shared server-only data function rather than calling your own public API from the server.
2. Render the article index with meaningful titles, excerpts, dates, and normal links in the initial response.
3. If `/news` remains indexable, render its public default feed similarly. Keep date filters, expansion, refresh, and read state interactive.
4. Separate cacheable public news data from the current API's visitor-specific `is_read` information. Overlay private read state on the client; do not share a personalized cached response between visitors.
5. Select caching/revalidation deliberately for your installed Next.js version, theme-cookie behavior, and publication frequency. Keep drafts out of public cached data.
6. Check the homepage before refactoring it. Next.js can pre-render Client Components; `use client` alone does not prove missing SEO content.
7. Make essential content visible if animation JavaScript fails, and support reduced motion. Verify what users and crawlers actually receive.
8. Handle missing content with real 404 responses; transient database failures should not masquerade as successful empty articles.

This reduces reliance on delayed client fetching and helps systems that do not render the page's JavaScript. Google can render JavaScript, but processing and discovering client-generated content requires additional care. [Google JavaScript SEO guidance](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)

Completion check: [ ] essential text and links exist in received HTML; no-JavaScript reading works; filters and private read state still behave correctly.

### Step 7: Publish original, permanent content on your domain

Priority: P1. Owner: site owner and developer. Dependency: Step 6.

1. Start with one real project case study and two useful engineering articles. Prefer depth and evidence over volume.
2. Give every article one permanent slug and a complete local page. Current blog cards with external URLs are not substitutes for local full articles.
3. Choose the storage approach before implementation. Keep MongoDB if the existing publication pipeline will be extended; use repository Markdown/MDX if a small developer-maintained collection is easier. Do not create two competing editorial systems without a reason.
4. If using MongoDB, plan fields such as `slug`, `status`, `author`, `publishedAt`, `updatedAt`, `excerpt`, `content`, `coverImage`, and optional `canonicalUrl`. Enforce slug uniqueness and migrate existing records carefully.
5. Add `/blog/[slug]` and project detail routes. Query only published records, generate matching metadata, and return 404 for unpublished or missing entries.
6. Make publishing intentional. The current `/api/blogs` POST handler has no authentication check in the handler; review publication authorization before using an expanded admin workflow.
7. For existing Medium articles, choose where the authoritative full version lives. If publishing duplicates, align canonical signals where the external platform permits; otherwise publish distinct excerpts linking to the original. Do not assume authority automatically transfers between domains.
8. Add ordinary internal links from the homepage and topic-relevant articles. Avoid orphan pages and button-only navigation for content discovery.

Suggested first topics, conditional on what you can support with real examples:

- How this portfolio separates server-rendered content from interactive React components.
- AEM and React integration: one real architecture decision and its tradeoffs.
- Testing a production frontend with TypeScript, TDD, and BDD.
- A project case study explaining a constraint, your contribution, the decision, and an evidenced result.

Completion check: [ ] at least three substantial original pages are published, linked, factual, and available on stable URLs.

### Step 8: Make pages useful as answers

Priority: P1. Owner: site owner/editor. Dependency: Step 7.

Use this as an editorial template, not a claim about a required AI ranking format:

```text
Title: one clear subject or audience question
Short opening: answer the question directly
Context: who this applies to and the problem being solved
Explanation: approach, alternatives, and tradeoffs
Evidence: actual code, example, diagram, or measured result
Procedure: actionable steps where appropriate
Limitations: when the approach should change
Sources: primary references and relevant project links
Author and dates: truthful attribution and meaningful updates
Related reading: two or three useful internal links
```

Write clear headings, define ambiguous acronyms, and use tables or lists when they help people compare or follow steps. Give examples from your work. Do not invent performance numbers or disclose private client material.

Useful profile questions include who you are, your technical specialties, industries you have worked in, examples of your contribution, and how someone can contact you. Keep employment titles distinct from professional descriptions and future career goals.

Keep LinkedIn, GitHub, Medium, and the portfolio consistent about your identity and expertise, and link back to the relevant original work. Build recognition through useful public repositories, technical writing, and relevant community participation. Earn references because the work is useful; do not purchase links or manufacture endorsements. Validate topic demand with your actual Search Console queries as data becomes available, rather than chasing broad terms such as "React developer" without a clear audience need.

There is no mandatory answer length, keyword density, or page length. Google does not require AI-specific rewriting or content chunking. [Google AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)

A visible FAQ can help readers, but do not plan FAQ rich results as a Google traffic tactic: Google discontinued that feature beginning May 7, 2026. [Official search documentation updates](https://developers.google.com/search/updates)

Completion check: [ ] each priority page answers a real question, shows supporting evidence, and has verified authorship and dates.

### Step 9: Add accurate structured data

Priority: P1. Owner: developer. Dependencies: Steps 1, 4, and 7.

| Page type | Proposed markup | Conditions |
| --- | --- | --- |
| Homepage | `WebSite` and a `Person` entity | Accurate public name, URL, and verified profile links |
| Fuller profile/about page | `ProfilePage` with `Person` as `mainEntity` | Page primarily concerns the single person affiliated with this site |
| Original article | `BlogPosting` or `Article` | Real headline, author, dates, article URL, and relevant image if available |
| Hierarchical content pages | `BreadcrumbList` | Breadcrumbs represent the actual navigation hierarchy |
| Actual video detail page | `VideoObject` | Playable published video and accurate required properties; no placeholder markup |

1. Use a stable person ID such as `<canonical-origin>/#person` and reuse it as the author reference.
2. Include only verified public identity links in `sameAs`.
3. Keep markup consistent with visible content. Do not expose hidden private contact details or invent reviews, credentials, or achievements.
4. Render JSON-LD with the page and escape potentially unsafe content as described in the Next.js guidance.
5. Validate schema syntax with Schema.org's validator and supported Google features with the Rich Results Test. Not every valid schema type has a Google rich-result feature.

References: [Google ProfilePage requirements](https://developers.google.com/search/docs/appearance/structured-data/profile-page), [Next.js JSON-LD guidance](https://nextjs.org/docs/app/guides/json-ld).

Structured data helps describe entities and eligible features; it does not guarantee ranking or answer-engine citation. No special AEO schema is required by Google. [Google AI features guidance](https://developers.google.com/search/docs/appearance/ai-features)

Completion check: [ ] markup parses, eligible types validate, and every claim matches the page.

### Step 10: Set crawler policy and improve the news feed

Priority: P1. Owners: site owner and developer. Dependencies: Steps 3, 5-6, and 8.

For search access:

1. Allow Googlebot and Bingbot to reach intentionally public content, including necessary rendering assets.
2. Allow `OAI-SearchBot` on public content for ChatGPT search discovery. Check hosting/CDN firewall behavior as well as robots rules.
3. Choose training policy independently. `GPTBot` handles OpenAI training-related crawling; blocking it can coexist with allowing `OAI-SearchBot`.
4. Do not treat `ChatGPT-User` as the search inclusion setting. It represents user-triggered access and has different behavior.
5. Recheck other answer providers' official crawler guidance if they become a target. A user-agent name alone is not proof that a request is authentic.

These bot roles and independent controls are documented in [official OpenAI crawler documentation](https://developers.openai.com/api/docs/bots). Google generative search participation also requires the Search Console control checked in Step 3.

For the existing automated news system:

1. Add visible links to original sources and label summaries honestly.
2. Separate source publication time from collection time and your publication time.
3. Add human-reviewed context explaining why an item matters to your readers; prioritize relevant engineering implications rather than generic summaries.
4. Keep the rolling feed separate from durable editorial articles. A seven-day TTL collection is unsuitable as the sole storage for permanent article URLs.
5. Index `/news` only when it offers a useful, maintained landing page. Keep unreviewed or low-value generated detail pages out of the index until improved.
6. For future permanent news commentary, define archival retention and expired-page behavior before exposing URLs. Remove deleted URLs from the sitemap; use a relevant replacement redirect only when one exists.

AI assistance itself is not the issue. Generating many pages without value can violate scaled-content policies; verify accuracy and add original editorial value. [Google guidance on generative AI content](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content)

Completion check: [ ] crawler decisions are recorded and verified; public news has attribution, correct dates, and a clear retention policy.

### Step 11: Improve speed and validate the release

Priority: P1. Owner: developer. Dependencies: implemented technical steps.

1. Measure the homepage, an article, and any indexable content hub on mobile using PageSpeed Insights.
2. Prioritize observed problems: large images, excessive JavaScript, layout shifts, slow database access, or expensive animation. Do not rewrite the stack based on a single score.
3. Resize/compress images, reserve their dimensions, use appropriate loading priorities, and keep interactive code scoped to where it is needed.
4. Target field Core Web Vitals at the 75th percentile: LCP <= 2.5 seconds, INP <= 200 ms, CLS <= 0.1. A small site may lack sufficient field data; lab results are diagnostic, not proof of field compliance. [Web Vitals definitions](https://web.dev/articles/vitals)
5. Run the project's lint, TypeScript check, and production build when code is implemented. Inspect a production-like preview, then the actual production responses after deployment.
6. Validate normal and no-JavaScript navigation, metadata, canonical URLs, JSON-LD, sitemap, robots, HTTP status codes, share previews, contact behavior, and existing theme controls.
7. Check crawler access with the search tools. Do not give bots materially different content or promises than visitors receive.

Completion check: [ ] the implementation passes appropriate code checks and page-level verification; deployment observations are recorded.

### Step 12: Submit, measure, and iterate

Priority: P1, then ongoing. Owner: site owner. Dependency: verified production release.

1. Submit `/sitemap.xml` in Google Search Console and Bing Webmaster Tools.
2. Request indexing for the homepage and a few important new pages through the supported tools. Submission is discovery assistance, not an indexing guarantee.
3. Optionally add IndexNow after the article publication workflow exists. Host its verification key file, notify participating engines when public URLs are added/meaningfully updated/deleted, and record submission failures. Do not send unchanged URLs daily.
4. Review regular search impressions/clicks and page indexing weekly for the first month, then monthly.
5. Use Google's Generative AI performance report for supported AI search impressions. It may be absent if the site lacks sufficient impressions. It should not be treated as a complete conversion or citation report. [Google report documentation](https://support.google.com/webmasters/answer/16984139)
6. Use Bing AI Performance for supported citation activity and referenced URLs. These counts are not rankings or conversions. [Bing AI Performance](https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/)
7. Use analytics to inspect incoming referrals and useful visitor actions. Missing referrers and zero-click answers mean AI referral totals cannot measure all AI visibility.
8. Manually sample 5-10 fixed questions monthly across the answer engines you care about. Record date, engine/mode, exact prompt, mentioned facts, cited URL, and errors. Repeated checks are directional observations, not an exhaustive visibility score.
9. Improve pages that attract relevant impressions but do not satisfy visitors. Add real examples, resolve ambiguity, update stale facts, and strengthen relevant internal links.

IndexNow is a notification protocol for participating engines; an accepted request does not prove indexing. [IndexNow documentation](https://www.indexnow.org/documentation)

Completion check: [ ] submissions are recorded and the first monthly report compares discovery, useful visits, and outcomes.

## 4. Proposed implementation file map

These are future targets, not files changed by this planning task.

| File or area | Planned responsibility |
| --- | --- |
| `src/app/layout.tsx` | Metadata base/defaults, verified identity information, shared defaults |
| `src/app/page.tsx` | Homepage metadata and appropriate structured data |
| `src/app/robots.ts` (new) | Public crawling policy and sitemap discovery |
| `src/app/sitemap.ts` (new) | Canonical public URL list including published local content |
| `src/app/blog/page.tsx` | Server-rendered article index and route metadata |
| `src/app/blog/[slug]/page.tsx` (new) | Original article page, metadata, JSON-LD, and missing-page behavior |
| `src/app/news/page.tsx` | Public initial feed and route metadata |
| `src/components/NewsPage/index.tsx` | Interactive filters, refresh, source links, private read state |
| `src/models/Blog.ts`, blog data/API layer | Slugs, publication state, author/date fields, publication authorization if MongoDB remains the editor source |
| `src/models/NewsArticle.ts`, crawler/data layer | Source/collection date distinctions; durable archive design if pursued |
| `src/app/projects/` (new, if content exists) | Case-study index and detail pages |
| `src/app/about/page.tsx` (optional new) | Fuller profile only if it adds value beyond the homepage |
| `src/app/videos/page.tsx` | Placeholder indexing policy initially; real video metadata later |
| Admin routes | Noindex and intended access behavior |
| `src/app/globals.css`, animation components | Essential content visibility and reduced-motion behavior |
| `public/`, metadata image conventions | Real icons/share images; standalone-guide indexing decision |
| Shared SEO/profile/content utilities (optional new) | One consistent source for canonical origin and identity; avoid duplicated facts |

Do not add a separate SEO package by default. Use native APIs first, then introduce small helpers only when repeated templates justify them.

## 5. Suggested schedule and order

This is a suggested four-week sequence, not a promise of search results. Content preparation and account access may dominate the elapsed time.

| Window | Work | Deliverable |
| --- | --- | --- |
| Week 1 | Steps 1-5 | Confirmed positioning/domain, verified accounts, metadata, crawl/index policy |
| Week 2 | Step 6 and content-route groundwork | Important public content in HTML; stable local article URLs |
| Week 3 | Steps 7-10 | First original articles/case study, schema, accurate profile, crawler policy, reviewed news approach |
| Week 4 | Steps 11-12 | Verified release, submitted sitemap, baseline report, first improvement backlog |
| Monthly | Refresh content and review metrics | Evidence-based improvements and updated records |

If implementation time is limited, complete metadata/canonical/indexing foundations and one excellent original case study first. Defer paid tools, video work, and news archives. Search discovery and AI citations can take time and are not guaranteed by implementation. [Google eligibility guidance](https://developers.google.com/search/docs/appearance/ai-features)

## 6. Future preferences and decision record

The user explicitly requested planning and documentation only for this task. Future implementation should be requested separately. The remaining entries below are recommendations awaiting confirmation, not preferences already approved by the user.

| Decision | Recommended default | Current status |
| --- | --- | --- |
| Primary audience | Recruiters, engineering leaders, technical readers | To confirm |
| Stack | Keep Next.js/Vercel | Recommendation |
| Public domain | One stable preferred origin; personal domain if desired | To confirm |
| Main content investment | Original projects and engineering writing | Recommendation |
| Article storage | Extend MongoDB if retaining its publication workflow; repository content if simpler | To decide |
| Search/AI access | Public Google/Bing/OpenAI search crawler access plus Google AI inclusion | To confirm during implementation |
| Model-training crawling | Separate decision from search inclusion | No preference recorded |
| Automated news | Reviewed summaries with attribution; durable commentary stored separately | Recommendation |
| Tool spending | Start with native/free capabilities and existing analytics | Recommendation |

Do not prioritize `llms.txt` as a Google visibility feature: Google says it does not use the file for that purpose. It may be maintained for another service with a demonstrated use case. Also avoid mass-produced keyword variants, fabricated mentions, and unsupported guaranteed-ranking claims. [Google's AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)

## 7. Reusable publication checklist

- [ ] The page serves a real audience need and adds original value.
- [ ] Claims, author, credentials, and dates are accurate.
- [ ] The permanent URL is public, linked, and returns the intended status.
- [ ] Core content is present in the initial rendered response and remains readable.
- [ ] Title, description, canonical URL, and share metadata match the page.
- [ ] Any JSON-LD reflects visible facts and passes relevant validation.
- [ ] Sitemap/indexing policy matches the page's publication state.
- [ ] Sources are linked and examples can be publicly shared.
- [ ] Mobile usability, images, and performance have been checked.
- [ ] Search submissions and any IndexNow notification reflect a real change.
- [ ] Results are reviewed after sufficient data accumulates.

## 8. Monthly review template

```text
Review period:
Preferred domain:
Changes published this period:
Published public URL count / indexed URL count:
Branded impressions and clicks:
Non-branded impressions and clicks:
Google generative AI impressions, if available:
Bing cited URLs and citations, if available:
AI/search referrals and qualified contact inquiries:
Top three useful landing pages:
Broken, excluded, or incorrectly canonicalized pages:
Profile/content inaccuracies to correct:
Core Web Vitals evidence and data limitations:
Manual answer-engine sample observations:
Next three improvements, owners, and target dates:
```

Keep the definition of a qualified inquiry consistent. Compare similar periods, note publishing and promotional activity, and distinguish impressions/citations from actual visitor outcomes. Update this guide when official documentation or the site's architecture changes; recheck crawler controls and search-report availability before future implementation.
