# Portfolio audit and implementation record

## Audit scope

Inspected the Next.js application structure, routing, shared data, experience and project components, metadata, public assets, and configured checks on 17 November 2026.

## Existing architecture

- **Framework:** Next.js 16.2.11 with React 19.2.4, TypeScript strict mode, Tailwind CSS 4, and Framer Motion.
- **Routing:** App Router. Existing routes are `/`, `/experience`, `/projects`, and `/projects/[slug]`.
- **Data:** `components/experience/experience.data.ts` is the authoritative source for `experienceGroups` and `allProjects`. General bio, SEO, skills, and homepage achievements live in `lib/data/portfolio.ts`.
- **Presentation:** reusable experience cards/notebooks, project cards, a device stage, certificate modal, and shared application shell/navigation.
- **Styling:** CSS custom properties define the dark/light palette; component styling is Tailwind-first. The visual language is high-contrast, editorial, bordered, and uses lime/coral accents.

## Functionality preserved

- Theme switching, splash/application shell, navigation, home sections, project details, project search, existing project filters, achievement modal, Framer Motion transitions, and reduced-motion global handling.
- Existing project and experience identifiers, `/projects/[slug]` routes, and the public project data structure remain compatible.

## Findings

1. **Experience is data-rich but route-poor.** Organization information exists only inside expandable cards; there are no organization pages or achievement case-file URLs.
2. **Achievements are disconnected from experience.** Homepage achievements are independent from organizations and only certificates with assets can be viewed in a modal.
3. **Project archive is a conventional card grid.** It does not provide the requested vertical/full-screen or horizontal presentation modes, platform/category filtering, or keyboard project traversal.
4. **Screenshot references are missing.** Every path under `/images/work/*` referenced by `experience.data.ts` is absent from `public`. The current device stage therefore renders placeholders. This is the principal content/asset blocker.
5. **Device imagery is not available.** No licensed MacBook/iPhone frame assets are in the repository. The existing CSS device stage is preserved as a responsive fallback; it must not be represented as a genuine photographed device asset.
6. **SEO route coverage is incomplete.** The sitemap currently lists only the homepage; dedicated project metadata has no Open Graph image/canonical overrides.
7. **Data modeling needs relationships.** Projects do not expose category tags beyond personal/team and platform. Organizations do not own achievements in the type model.

## Implementation approach

1. Extend the existing experience data model rather than duplicate project content.
2. Add stable organization/achievement slugs, documented case-file content, and relationships to associated project ids.
3. Add `/experience/[organization]` and `/experience/[organization]/achievements/[achievement]` routes. Certificate files display inline on their related case files; the existing homepage modal remains available.
4. Replace the archive grid with a data-driven presentation controller supporting vertical and horizontal modes, filters, natural scrolling, buttons, keyboard arrows, and reduced motion. Keep the existing project detail routes.
5. Upgrade sitemap coverage and project route metadata.
6. Keep screenshot placeholders truthful until the original project captures and licensed device frame assets are supplied.

## Verified baseline

- `npm run lint` passes before implementation.
- The worktree already contained user changes in global styles, home/app shell, achievements, portfolio data, and removed legacy components. These are preserved.

## Required content/assets

- Original desktop and/or mobile screenshots for the project image paths in `experience.data.ts`.
- Licensed device-frame imagery, if photographic device presentations are required rather than the existing CSS fallback.
- ICT Resource Centre achievement/certificate details or evidence, if individual case files beyond the documented organization overview are desired.
- Any additional verified outcomes, timelines, or documents for project/achievement narratives.
