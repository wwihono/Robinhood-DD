# Robinhood-DD

Robinhood-DD is a Cursor Canvas dashboard for a company deep dive on Robinhood Markets (`HOOD`). It presents a scrollable, section-by-section investment research view covering company identity, product positioning, revenue growth, balance sheet strength, expected five-year return scenarios, profitability milestones, and long-term investment quality.

The dashboard is implemented in [`company-deep-dive.canvas.tsx`](company-deep-dive.canvas.tsx). Almost everything shown on screen is derived from the `companyData` object near the top of that file, so the same dashboard template can be reused for another public company by replacing the company profile, financial metrics, chart data, scenario assumptions, and quality scores.

## Dashboard Structure

The canvas is built as a full-screen vertical story. Each major container occupies one scroll-snapped viewport section. As the user scrolls, the active section scales into view while inactive sections fade and shrink slightly. The background uses slow-moving theme-based gradients, and the pointer trail leaves a soft brand-colored glow.

There are seven dashboard sections:

1. Identity & snapshot
2. Product & business
3. Revenue & growth
4. Debt & balance sheet
5. Expected 5-year ROI
6. Profitability trajectory
7. Long-term investment quality

## Container Details

### 1. Identity & Snapshot

This is the opening container and gives the reader the quick context needed before looking at the deeper sections.

It shows:

- Company name: `Robinhood Markets`
- Ticker pill: `HOOD`
- Sector: `Fintech / Online Brokerage`
- IPO date: `Jul 29, 2021`
- IPO price: `$38`

Below the title area is a four-column stat grid:

- Current price: shows the current modeled share price from `companyData.currentPrice`, formatted as dollars.
- Market cap: shows the market capitalization string from `companyData.marketCap`.
- IPO price: repeats the IPO price as a quick reference point.
- Return since IPO: calculates the return from IPO price to current price inside the component. For the current values, it compares `$56.40` against `$38` and displays an approximately `+48%` return.

This section ends with a short instruction telling the user to scroll through the deep dive.

### 2. Product & Business

This container explains what Robinhood does and where it competes.

It contains a card labeled `What they do`. Inside the card, the dashboard renders each paragraph from `companyData.productOverview`.

The current content covers:

- Robinhood's core brokerage and consumer-fintech platform.
- Revenue streams including payment for order flow, interest income, crypto trading spreads, and Robinhood Gold subscriptions.
- Product areas such as equities, options, crypto, retirement accounts, futures, credit card, U.K. brokerage, and EU crypto.
- The younger customer demographic and why that may create a long runway as customer balances mature.
- Competitive context against Schwab, Fidelity, Interactive Brokers, Coinbase, SoFi, and Webull.
- Robinhood's differentiation through user experience, mobile onboarding, crypto access, and product breadth.

This section is qualitative. Its purpose is to frame the business model before the financial charts appear.

### 3. Revenue & Growth

This container summarizes top-line performance and visualizes the revenue trajectory.

At the top is a three-column stat grid:

- TTM revenue: `$2.95B`
- YoY growth: `+58%`
- Gross margin: `~88%`

Below the stat grid is a filled line chart labeled `Revenue ($M)`. It uses `companyData.revenueByYear`.

Current chart values:

| Year | Revenue ($M) |
| --- | ---: |
| 2021 | 1,815 |
| 2022 | 1,358 |
| 2023 | 1,865 |
| 2024 | 2,948 |
| 2025E | 3,450 |

This container is intended to show the post-IPO revenue reset in 2022, the recovery in 2023, the sharp acceleration in 2024, and the modeled continuation into 2025E.

### 4. Debt & Balance Sheet

This container focuses on financial health and leverage.

At the top is another three-column stat grid:

- Cash & equivalents: `$4.55B`
- Long-term debt: `~$60M`
- Leverage: `Net cash`

Below the stats is a grouped bar chart comparing cash and debt by year. It uses `companyData.debtVsCash`.

Current chart values:

| Year | Cash ($M) | Debt ($M) |
| --- | ---: | ---: |
| 2022 | 6,326 | 0 |
| 2023 | 4,830 | 0 |
| 2024 | 4,550 | 60 |

The container is designed to make the balance sheet story easy to see: Robinhood is modeled with a large cash position, minimal debt, and net cash leverage.

### 5. Expected 5-Year ROI

This container presents valuation outcomes as an illustrative scenario table.

The section header is `Expected 5-year ROI`, followed by a note that the price targets and total returns are measured against the current modeled price of `$56.40`.

The table has five columns:

- Scenario
- Price target
- Total return
- 5Y CAGR
- Key assumption

Current scenarios:

| Scenario | Price Target | Total Return | 5Y CAGR | Key Assumption |
| --- | ---: | ---: | ---: | --- |
| Bear | `$32` | `-43%` | `-10.6%` | Trading volumes cool, crypto spreads compress, the multiple re-rates lower, and revenue stalls near 2024 levels. |
| Base | `$78` | `+38%` | `+6.7%` | Mid-teens revenue CAGR, sustained operating leverage, net margin above 30%, and roughly 25x forward earnings. |
| Bull | `$135` | `+139%` | `+19.0%` | International expansion and retirement scale, ARPU doubles, and the market assigns a premium fintech growth multiple. |

Rows are color-toned by scenario: bear is negative, base is neutral, and bull is positive.

### 6. Profitability Trajectory

This container tracks historical and forward profitability milestones.

The title is dynamic. Because `companyData.isProfitable` is currently `true`, the dashboard uses `Profitability trajectory`. If the data were changed to an unprofitable company, the same container would render as `Path to profitability`.

The section includes a table with three columns:

- When
- Milestone
- Status

Current milestones:

| When | Milestone | Status |
| --- | --- | --- |
| Q3 2023 | First GAAP-profitable quarter post-IPO | Done |
| FY 2024 | First full year of GAAP profitability, modeled at about `$1.4B` net income | Done |
| FY 2025 | Sustained operating leverage with adjusted EBITDA margin above 50% | In progress |
| FY 2026 | Retirement IRA AUM crosses `$25B` and turns accretive | Target |
| FY 2027 | International U.K. and EU businesses contribute more than 10% of revenue | Target |
| FY 2028 | Net margin reaches 35%+ and ARPU exceeds `$200` | Stretch |

Status rows are styled by status type:

- `Done` uses a success tone.
- `In progress` uses an info tone.
- `Target` uses a neutral tone.
- `Stretch` uses a warning tone.

### 7. Long-Term Investment Quality

This final container gives the dashboard's overall investment-quality assessment.

The left side shows a headline score:

- Overall rating: `3.6 / 5.0`

The right side shows a horizontal bar chart with each quality dimension scored out of five.

Current dimension scores:

| Dimension | Score |
| --- | ---: |
| Moat | 3.0 / 5 |
| Growth | 4.0 / 5 |
| Financial health | 4.0 / 5 |
| Management | 3.5 / 5 |
| Valuation | 3.5 / 5 |

Below the chart is a callout titled `Why this score`. It explains that Robinhood is modeled as a capable founder-led franchise with strong cash generation, negligible leverage, and a credible multi-product growth story, but the score is moderated by limited switching costs, sensitivity to retail trading cycles, and a higher valuation after the 2024-2025 run.

The section ends with a disclaimer that figures are illustrative, may not reflect the latest filings, and are for research and education only.

## Data Model

The dashboard is powered by the `CompanyData` type. Key fields include:

- `name`, `ticker`, `sector`, `ipoDate`, `ipoPrice`, `currentPrice`, and `marketCap` for the opening snapshot.
- `productOverview` for the product and business narrative.
- `ttmRevenue`, `yoyGrowth`, `grossMargin`, and `revenueByYear` for the revenue section.
- `cashOnHand`, `totalDebt`, `leverage`, and `debtVsCash` for the balance sheet section.
- `roiScenarios` for the five-year return table.
- `isProfitable` and `profitabilityMilestones` for the profitability section.
- `qualityRating` for the overall rating, dimension scores, and score rationale.

To adapt the dashboard to another company, update the values in `companyData`. The rendered containers, charts, tables, stat cards, tones, and labels will update from those values.

## Design Notes

- The dashboard uses Cursor Canvas components such as `Stat`, `Grid`, `LineChart`, `BarChart`, `Table`, `Card`, `Pill`, and `Callout`.
- The brand tone is currently `success`, matching Robinhood's green brand association.
- The component avoids raw hard-coded color values in the rendered UI and instead maps brand tone to the host theme tokens.
- The scroll experience is controlled by `activeSection`, which updates based on scroll position.
- The pointer trail is stored in canvas state as `cursorTrail`.
- The saved canvas state is kept in `company-deep-dive.canvas.data.json`.

## Important Disclaimer

This dashboard is a research and visualization tool. The figures, scenarios, price targets, and ratings are illustrative and may not reflect the latest Robinhood filings or market data. Nothing in this project should be treated as investment advice.
