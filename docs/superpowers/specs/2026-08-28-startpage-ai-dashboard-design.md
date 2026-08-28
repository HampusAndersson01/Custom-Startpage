# Startpage AI Dashboard — Design Specification

**Date:** 2026-08-28  
**Repository:** `HampusAndersson01/Custom-Startpage`  
**Status:** Design complete; implementation not started  
**Visual source of truth:** Google Stitch project `15266024480108956777` and the exported `stitch_startpage_ai_dashboard.zip`

## 1. Purpose

Startpage is a private, self-hosted browser start page that combines a daily link launcher with a read-only homelab monitoring dashboard. It should learn how Hampus actually uses links and services, adapt ranking gradually, surface temporary workflows, and help clean up stale links without becoming unpredictable or destructive.

The project is a near-greenfield rewrite inside the existing `Custom-Startpage` repository. Git history is preserved, but the existing Create React App architecture is not a compatibility constraint. Existing code, hard-coded links, and assets are migration/reference material only.

The product is single-user. Cloudflare Access is the outer end-user access boundary; the application does not need a separate login flow for the initial release.

## 2. Product principles

1. **AI interprets; deterministic code enforces policy.** The local model may infer workflows, relevance, relationships, and stale-link risk, but it does not receive unrestricted database or infrastructure control.
2. **Fast rise, slow fall.** Newly important links can climb quickly; historically important links lose rank gradually.
3. **Observation and interpretation are separate.** Exact click timestamps and service states remain canonical facts. Sessions, workflows, habits, relevance, and staleness are derived interpretations.
4. **Ranking and archive protection are separate.** A link may rank low but remain permanently visible.
5. **Archive is reversible.** Automatic deletion is never part of the adaptive system.
6. **Home remains a launcher.** It should not become a generic analytics dashboard.
7. **Homelab is monitoring/navigation only.** No restart, stop, deploy, shell, or host-management controls appear in the web UI.
8. **The local AI must fit the available homelab hardware.** All AI design assumes Ollama on a GTX 1060 6 GB and should favor compact, queued, high-value inference.

## 3. Visual source of truth

The Stitch export contains multiple iterations. For implementation, use the following as the canonical visual references:

- `home_standardized_visuals`
- `home_standardized_mobile`
- `home_standardized_link_drawer`
- `homelab_standardized_visuals`
- `homelab_standardized_service_drawer`
- `homelab_command_palette_open`
- `recommendations_startpage`
- `settings_standardized_visuals`
- `ai_activity_standardized_visuals`
- `archive_startpage`
- `home_workflow_detail_drawer` and `home_adjust_workflow_drawer` for workflow interactions

Earlier non-standardized variants are secondary references only.

The exported Stitch HTML is **not** production implementation code. Rebuild the UI with reusable React components and the project design system.

### 3.1 Visual normalization

The generated Stitch `DESIGN.md` contains conflicting palette definitions. The implementation should use one normalized palette derived from the approved screenshots and the prose design direction:

- app background: `#0B1120`
- primary surface/card: `#1E293B`
- secondary/hover surface: `#334155`
- structural border: `#334155`
- primary text: `#F8FAFC`
- muted text: `#94A3B8`
- interaction accent: `#3B82F6`
- healthy: `#10B981`
- warning: `#F59E0B`
- error/down: `#EF4444`
- unknown/stale: `#64748B`

Use Geist for headings/UI labels and Inter for body text if licensing/package availability is straightforward; otherwise use a close system-safe fallback without changing layout metrics significantly.

Use a 4 px spacing baseline, moderate radii, thin borders, tonal layering, and little/no shadow. Desktop content should be dense and efficient; Home slightly less dense than Homelab.

Stitch placeholder content is not authoritative. Examples such as Proxmox, TrueNAS, Pi-hole, OPNsense, Canvas, and Project A are layout examples, not requirements. Render actual imported links and discovered homelab data.

Correct obvious generated-demo inconsistencies during implementation, including invalid `14:28 PM` formatting and any screen where the wrong primary nav item appears active. Use 24-hour time by default.

## 4. Primary information architecture

The product has exactly two primary destinations initially:

- **Home**
- **Homelab**

Settings, Recommendations, Archive, AI Activity, and detail views are secondary routes, drawers, or utility destinations rather than peer primary tabs.

The shared shell includes:

- Startpage mark/name
- left-side primary navigation on desktop
- prominent global search / command bar
- `Ctrl+K` command palette affordance
- settings access
- understated local-AI status
- current local time

Weather is optional and should not be implemented ahead of core functionality.

## 5. Home

Home replaces browser favorites. It combines adaptive views with stable permanent categories.

### 5.1 Quick Launch / Frequently Used

A high-priority row/grid shows the links most useful right now. This is a projection of existing links, not a second copy of the data.

Ranking is adaptive. A link can appear here while retaining one canonical primary category.

### 5.2 Current Workflow / Relevant Now

The local AI may automatically create temporary workflow groups based on exact timestamp patterns, historical usage, semantic relationships, and user feedback.

Example: a temporary game-development workflow might contain Blender MCP, Unity, GitHub, and Figma.

Temporary workflows:

- are non-destructive
- may appear/disappear automatically
- do not create permanent categories by themselves
- expose `Useful`, `Not useful`, and `Adjust`
- can be recalculated on demand
- can optionally be converted into a permanent category with user approval

A negative vote removes the current suggestion immediately and persists structured negative feedback. It does not automatically trigger another inference run; the UI offers a scoped `Recalculate now` action.

### 5.3 Permanent categories

Each link has exactly one primary category and zero or more tags.

Categories provide stable spatial organization; the order of links inside a category may adapt gradually.

Initial category examples may include HA Webbyrå, Development, School, Personal, Utilities, and Homelab, but the migration/import process should derive the actual starting set from existing data.

### 5.4 Optional contextual widgets

The Stitch Home design contains examples such as Active Pull Requests and System Load. Treat these as optional contextual widgets, not mandatory MVP content. Home must remain primarily a launcher. Contextual widgets may be added only when they are backed by a real integration and remain useful without pushing categories below the fold unnecessarily.

## 6. Link behavior

A link includes independent behavioral flags:

- `pinned`: position is fixed by the user and adaptive ranking may not move it.
- `protected`: the link remains visible in its normal category and may never be auto-archived.

`protected` does not imply high ranking. A protected link may move toward the bottom if unused for years, but it remains visible.

No separate `preferred` state is needed initially.

## 7. Click telemetry and usage model

All dashboard navigation to managed links should go through a redirect endpoint such as:

`GET /go/:linkId`

The API records the event and returns an HTTP redirect to the target URL.

Record only data required for adaptation:

- event ID
- link ID
- exact timestamp
- source view (Home, category, command palette, workflow, Homelab, etc.)
- interaction type where useful

Do not collect IP addresses, browser fingerprints, or full user-agent strings for ranking.

### 7.1 Exact timestamps are canonical

Do not hard-code 30-minute or 60-minute sessions as facts. The AI receives exact recent event timestamps and may infer temporal relationships itself.

Cheap deterministic aggregates are still allowed and encouraged for context preparation, including:

- clicks over fixed windows
- active days/weeks/months
- last clicked time
- first clicked time
- historical frequency
- candidate co-occurrence statistics

These are features, not authoritative interpretations.

## 8. Adaptive ranking

Ranking should primarily be deterministic and explainable, with AI interpretation influencing contextual features rather than replacing the ranking engine.

Maintain multiple timescales, for example recent, medium-term, long-term, and habit/consistency strength. The exact weights are tunable and should be covered by tests.

The required behavior is asymmetric smoothing:

- positive relevance changes can move a link upward quickly
- negative changes decay gradually

Historical frequency and repeated use across distinct days/weeks should create inertia. Two links last used on the same date must not receive the same staleness treatment if one was a recurring habit and the other was used once.

The system should expose human-readable explanations such as “used frequently this week” or “long-term recurring tool” rather than internal numeric scores on the main Home UI.

## 9. Archive model

There is no fixed rule such as “180 days unused = archive.” Archive eligibility combines inactivity with historical strength, recurring patterns, user feedback, pin/protection state, and AI confidence.

Hard policy gates:

- protected links are never auto-archived
- pinned links are never auto-archived
- a minimum safety window must pass before auto-archive can ever become possible
- low-confidence AI conclusions become recommendations only
- archive remains reversible
- permanent deletion is manual and clearly separate

Initial staged autonomy requires user approval before any archive action. Auto-archive may be enabled later only after deliberate promotion of that capability.

## 10. AI feedback and memory

Feedback is structured data, not fine-tuning.

Persist signals such as:

- useful / not useful
- keep together
- keep separate
- wrong priority
- do not suggest again
- protect
- workflow rename
- workflow member inclusion/exclusion
- keep/retain decisions

The next relevant AI run receives this preference state. User feedback may also trigger a scoped manual rerun.

The UI must offer an explanation for AI-generated workflows/recommendations and maintain an AI Activity audit view that records:

- conclusion/action
- confidence/reason summary
- whether it was automatic or approval-gated
- whether the user corrected/rejected it
- timestamp

## 11. Local AI runtime

The local AI runs through the existing Ollama service on the homelab and is optimized for a GTX 1060 6 GB.

### 11.1 Two-tier model strategy

Use two inference tiers:

1. **Routine model:** approximately 3B–4B, quantized, for classification, simple grouping, tagging, routine maintenance, service-change summaries, and triage.
2. **Escalation model:** approximately 7B, quantized, for ambiguous workflow inference, conflicting evidence, low-confidence cases, and user-requested deeper recalculation. The existing `qwen2.5:7b` is a suitable initial escalation candidate.

The precise routine model may be chosen during implementation based on benchmarked quality/speed on the actual GPU.

### 11.2 Context strategy

Use hierarchical context:

- exact recent click events
- compact older aggregates
- candidate relationships prepared deterministically/with embeddings
- relevant prior AI conclusions
- user corrections/preferences
- current categories/tags
- relevant current homelab inventory
- deterministic ranking features

Do not send the entire click history to the model.

### 11.3 Efficient inference

- Do not run AI inference per click.
- Queue inference jobs in PostgreSQL.
- Process generative requests sequentially initially.
- Give manual `Recalculate now` jobs higher priority than background work.
- Cache conclusions using input fingerprints.
- Skip inference when relevant input has not materially changed.
- Prefer embeddings/deterministic candidate generation before asking a generative model to compare entities.
- Keep outputs compact and schema-validated JSON.
- Keep normal prompts modest in context size; split unrelated reasoning tasks rather than using one giant prompt.
- Delay low-priority maintenance if the shared GPU is busy.

The browser must never wait for an LLM response before rendering the core page.

## 12. Staged AI autonomy

The AI may initially perform these reversible/low-risk actions automatically:

- adjust adaptive ranking
- create/remove temporary workflows
- suggest/apply non-destructive tags where confidence is high
- classify usage patterns
- generate recommendations and observations

The AI initially requires user approval to:

- archive a link
- create a permanent category
- change pinned/protected state
- permanently add a newly discovered service as a dashboard link

## 13. Homelab

Homelab is a dedicated top-level monitoring/navigation view inspired by the provided dark homelab dashboard reference and the standardized Stitch screen.

It is read-only from the browser.

### 13.1 Overview

Show a compact summary of:

- total services
- healthy/warning/down/unknown counts
- CPU
- RAM
- storage
- uptime or last successful sync

`unknown/stale` must be visually and semantically distinct from `down`.

### 13.2 Groups

Render services in logical groups derived from actual inventory, such as:

- Core
- Infrastructure
- AI / MCP
- Automation
- Media
- Storage

Cards should be highly scannable and contain only a small number of useful metrics.

### 13.3 Service entities and link entities are separate

A discovered service is not automatically a permanent Startpage link.

Maintain explicit service-to-link mappings. The local AI/reconciliation engine may recommend a mapping or recommend adding a link, but permanent creation is approval-gated initially.

### 13.4 Data sources and reconciliation

Normalize data from read-only sources such as:

- homelab/container/Compose inventory
- existing Homelab MCP read interfaces where available
- Cloudflare published application routes
- current Startpage links
- health/host/storage snapshots

Adapters should isolate source-specific details from the normalized inventory model.

### 13.5 AI observations

Show a compact observation panel for useful interpreted changes, for example:

- new service detected
- known service no longer mapped to a link
- source status became stale
- repeated intermittent health condition
- route/container mapping changed

Observations may be dismissed/reviewed. Do not turn the panel into a continuous alert stream.

### 13.6 No operational controls

The Homelab web UI must not expose container restart/stop/start, deployment, shell execution, Compose editing, Cloudflare route mutation, or host-management actions.

Infrastructure management remains intentionally outside the Startpage browser UI and can be performed through dedicated tooling/MCP when explicitly requested.

## 14. Homelab freshness and failure semantics

Different data may have different freshness:

- health/resource snapshot: roughly 30–60 seconds while the Homelab page is open
- inventory/routes/storage metadata: roughly 5–15 minutes or event-driven
- AI interpretation: maintenance cycle or relevant event/manual trigger

If a monitoring source fails, retain the last successful snapshot and mark it stale. Do not convert an unknown source failure into service-down state.

If Ollama is unavailable, Home, search, link navigation, deterministic ranking, existing cached workflows, and Homelab monitoring continue to function. Show AI maintenance as delayed/unavailable.

If the MCP endpoint fails, Home/Homelab remain unaffected.

PostgreSQL is the authoritative state store; database failure should surface clearly rather than falling back to divergent client-side state.

## 15. Command palette

`Ctrl+K` opens a keyboard-first global command palette.

It searches across multiple entity types:

- links
- categories
- Homelab services
- temporary workflows
- insights/details
- settings destinations

Results must identify entity type and action clearly. For example, “Blender MCP — Open link” and “Blender MCP — View service status” may both appear when the same product has a link and a service entity.

Archived links remain searchable and can be restored.

## 16. Detail and utility views

### 16.1 Link detail drawer

Show:

- title/URL
- primary category and tags
- pin/protection state
- recent and historical usage summary
- trend/usage visualization kept intentionally small
- AI interpretation/explanation
- archive state where relevant
- actions to pin/protect/archive/restore as policy permits

### 16.2 Homelab service drawer

Show:

- service name/status
- public hostname when present
- Compose/container metadata where available
- last successful health check
- lightweight resource metrics
- mapped Startpage link
- Startpage usage summary
- short AI observation
- one primary navigation action: open service

No infrastructure-management actions.

### 16.3 Recommendations

A secondary Recommendations route acts as the approval inbox for staged-autonomy actions such as:

- newly discovered service link
- archive candidate
- permanent-category suggestion

### 16.4 Archive

Archive is searchable and reversible. Each row records archive date/reason and offers Restore. Permanent deletion must be visually separated and require deliberate confirmation.

### 16.5 Settings

Settings cover:

- appearance/density
- categories
- pinned links
- protected links
- AI autonomy settings
- Homelab sync status/preferences

Do not expose low-level model sampling parameters in the normal settings UI.

### 16.6 AI Activity

Chronological transparency view of AI decisions, automatic changes, recommendations, and user corrections.

## 17. Initial data migration

Seed the new system from three sources:

1. hard-coded links in the existing `Custom-Startpage`
2. the browser bookmark export
3. current homelab services and Cloudflare published routes

The import process should:

- normalize URLs
- deduplicate obvious duplicates
- preserve useful titles
- propose one primary category per link
- propose tags
- detect likely service/link mappings
- flag ambiguous matches for review
- never silently delete imported content

No historical usage should be invented. Adaptive ranking starts from imported structure and learns from new telemetry.

## 18. Repository and runtime architecture

Keep the existing repository and rewrite into a TypeScript monorepo, approximately:

```text
apps/
  web/
  api/
  worker/
  mcp/
packages/
  db/
  shared/
  ranking/
  ai/
  homelab/
docs/
docker-compose.yml
```

Recommended initial implementation stack:

- pnpm workspaces
- React + TypeScript + Vite for `web`
- Fastify + TypeScript for `api`
- PostgreSQL as authoritative datastore
- Drizzle ORM/migrations for typed schema and explicit SQL control
- official MCP SDK for the Streamable HTTP MCP surface
- Vitest for unit/integration tests
- Playwright for critical UI flows
- Docker Compose for deployment

No Redis initially. Use a PostgreSQL-backed queue for AI/background jobs.

Ollama remains a separate existing homelab service and is consumed over the internal network rather than duplicated inside this stack.

## 19. Database domain model

Exact migration syntax belongs in the implementation plan, but the schema must represent at least:

### Core organization

- `categories`
- `links`
- `tags`
- `link_tags`

### Usage

- `click_events`
- optional materialized/daily aggregates
- `ranking_state`

### AI

- `ai_jobs`
- `ai_patterns` / temporary workflows
- workflow-to-link relationships
- `ai_feedback`
- `ai_decisions`

### Homelab

- `services`
- service-source snapshots/metadata
- `service_mappings`
- health/state-change history with retention/aggregation

### Archive/audit

- archive history/state
- user/manual changes and AI applied changes sufficient for explanation/reversal

## 20. MCP boundary

Expose a Startpage MCP over Streamable HTTP for ChatGPT/manual high-level management.

The MCP talks to the Startpage API, not directly to PostgreSQL.

Expected tool families include:

- dashboard/link/category reads
- create/update/archive/restore/pin/protect link operations
- usage/insight reads
- archive/recommendation reads
- service inventory and reconciliation reads
- sync trigger
- maintenance history
- scoped manual maintenance/recalculation

The MCP must not receive unrestricted Docker socket, host shell, or raw database access through Startpage.

## 21. External security boundary

### Browser

`startpage.nmless.xyz` is protected by Cloudflare Access and routes to the web/API application. No separate end-user login flow is required for the single-user initial release.

### MCP

Use a separate machine-compatible ingress such as `startpage-mcp.nmless.xyz` with MCP-compatible OAuth rather than depending on an interactive browser Cloudflare Access login challenge.

Secrets remain environment/runtime configuration and are never written into the repository, AI feedback, or telemetry.

## 22. Testing requirements

Implementation must include tests for the behaviors most likely to become surprising:

### Ranking

- frequent historical use decays slower than one-off use with the same last-click time
- fast-rise / slow-fall smoothing
- pinned links do not move
- protected links may move but cannot become archive-eligible

### Archive policy

- pinned/protected hard gates
- recommendation vs applied action based on autonomy level
- restore behavior

### Telemetry

- `/go/:id` records a click exactly once and redirects reliably
- failed telemetry recording has an explicitly defined fallback that does not trap the user on Startpage

### AI boundaries

- invalid model JSON is rejected
- policy engine refuses unauthorized/destructive model suggestions
- cached fingerprint behavior
- manual recalculation priority
- AI outage does not break core navigation

### Homelab

- stale vs down distinction
- source failure retains last-known snapshot
- service/link mapping remains explicit
- browser endpoints expose no mutation actions for infrastructure

### UI

- Home and Homelab primary navigation
- command palette keyboard flow
- workflow feedback
- Recommendations approval flow
- archive restore
- responsive Home baseline

## 23. Non-goals for initial release

- multi-user accounts/tenancy
- infrastructure mutation from the web UI
- full Prometheus/Grafana replacement
- autonomous destructive AI actions
- model fine-tuning from click history
- storing general browser history outside Startpage
- advanced weather integration
- copying Stitch-generated HTML directly into production
- retaining the old CRA architecture for compatibility

## 24. Acceptance criteria

The design is successfully implemented when:

1. `startpage.nmless.xyz` provides the approved Home/Homelab experience behind Cloudflare Access.
2. Existing links/bookmarks/services can seed a coherent initial dashboard.
3. Every managed link click can be measured without invasive tracking.
4. Ranking adapts with fast-rise/slow-fall behavior and respects pin/protection policy.
5. The local AI can infer and display temporary workflows and accept durable user feedback.
6. AI failure does not break normal Startpage use.
7. Homelab displays normalized read-only service health/inventory with correct stale/unknown semantics.
8. Recommendations gate permanent/destructive actions during the initial autonomy stage.
9. The UI follows the approved Stitch standardized visual language rather than the legacy CRA design.
10. ChatGPT can manage Startpage through a scoped Streamable HTTP MCP without direct database or infrastructure privileges.
