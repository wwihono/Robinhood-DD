/**
 * Company Deep Dive — a reusable template for S&P 500 and recent-IPO research.
 *
 * To repurpose this canvas for another ticker, edit only the `companyData`
 * object below. Everything the dashboard renders is derived from it.
 *
 * Brand color:
 *   `brandTone` maps a company's brand color to the closest semantic tone
 *   in the canvas palette (which works in both light and dark mode):
 *     - lime / green brands (Robinhood, Spotify)   -> "success"
 *     - red brands (Target, Coca-Cola, YouTube)    -> "danger"
 *     - blue brands (Meta, Ford, Walmart, Intel)   -> "info"
 *     - yellow / gold brands (McDonald's, Hertz)   -> "warning"
 *
 * Profitability section:
 *   When `isProfitable` is true the heading reads "Profitability trajectory"
 *   (historical + forward milestones); otherwise it reads "Path to profitability".
 *
 * Interaction:
 *   Pointer trail uses layered translucent dots (theme colors).
 *   Ambient background uses slow-moving CSS gradients derived from theme tokens.
 *   Depth uses borders + elevated fills — no box-shadow (canvas guidelines).
 */
import {
  BarChart,
  Callout,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Grid,
  H1,
  H2,
  LineChart,
  Pill,
  Row,
  Stack,
  Stat,
  Table,
  Text,
  mergeStyle,
  useCanvasState,
  useHostTheme,
  type ChartTone,
  type PillTone,
  type StatTone,
  type TableRowTone,
} from 'cursor/canvas';

type BrandTone = 'success' | 'info' | 'warning' | 'danger';

type MilestoneStatus = 'Done' | 'In progress' | 'Target' | 'Stretch';

type Milestone = {
  date: string;
  milestone: string;
  status: MilestoneStatus;
};

type Scenario = {
  scenario: 'Bear' | 'Base' | 'Bull';
  priceTarget: string;
  totalReturn: string;
  cagr: string;
  assumption: string;
};

type Dimension = { name: string; score: number };

type CompanyData = {
  name: string;
  ticker: string;
  sector: string;
  brandTone: BrandTone;
  ipoDate: string;
  ipoPrice: number;
  currentPrice: number;
  marketCap: string;
  productOverview: string[];
  ttmRevenue: string;
  yoyGrowth: string;
  grossMargin: string;
  revenueByYear: { categories: string[]; values: number[] };
  cashOnHand: string;
  totalDebt: string;
  leverage: string;
  debtVsCash: { categories: string[]; cash: number[]; debt: number[] };
  roiScenarios: Scenario[];
  isProfitable: boolean;
  profitabilityMilestones: Milestone[];
  qualityRating: {
    overall: number;
    dimensions: Dimension[];
    rationale: string;
  };
};

const companyData: CompanyData = {
  name: 'Robinhood Markets',
  ticker: 'HOOD',
  sector: 'Fintech / Online Brokerage',
  brandTone: 'success',
  ipoDate: 'Jul 29, 2021',
  ipoPrice: 38,
  currentPrice: 56.4,
  marketCap: '$50.1B',
  productOverview: [
    'Robinhood is a commission-free brokerage and consumer-fintech platform that pioneered mobile-first investing for retail customers. Core revenue streams include payment-for-order-flow on equities and options, interest income on customer cash and margin balances, crypto trading spreads, and a fast-growing subscription business through Robinhood Gold.',
    'The platform now spans U.S. equities and options, crypto, retirement accounts (Robinhood Retirement, with the industry-first 1% IRA match), futures, an in-house credit card, and an expanding international footprint (U.K. brokerage and EU crypto). The customer base skews younger than incumbents like Schwab and Fidelity, giving HOOD a long demographic runway as wallets and balances mature.',
    'Key competitors: Charles Schwab, Fidelity, Interactive Brokers, Coinbase (crypto), SoFi, and Webull. Robinhood differentiates on UX, mobile-native onboarding, and aggressive crypto and product breadth, but lacks the entrenched advisory and wealth franchise of the legacy brokerages.',
  ],
  ttmRevenue: '$2.95B',
  yoyGrowth: '+58%',
  grossMargin: '~88%',
  revenueByYear: {
    categories: ['2021', '2022', '2023', '2024', '2025E'],
    values: [1815, 1358, 1865, 2948, 3450],
  },
  cashOnHand: '$4.55B',
  totalDebt: '~$60M',
  leverage: 'Net cash',
  debtVsCash: {
    categories: ['2022', '2023', '2024'],
    cash: [6326, 4830, 4550],
    debt: [0, 0, 60],
  },
  roiScenarios: [
    {
      scenario: 'Bear',
      priceTarget: '$32',
      totalReturn: '-43%',
      cagr: '-10.6%',
      assumption:
        'Trading volumes cool, crypto spreads compress, and the multiple re-rates lower. Revenue stalls near 2024 levels.',
    },
    {
      scenario: 'Base',
      priceTarget: '$78',
      totalReturn: '+38%',
      cagr: '+6.7%',
      assumption:
        'Mid-teens revenue CAGR with sustained operating leverage. Net margin holds above 30%; ~25x forward earnings.',
    },
    {
      scenario: 'Bull',
      priceTarget: '$135',
      totalReturn: '+139%',
      cagr: '+19.0%',
      assumption:
        'International + retirement scale; ARPU doubles. Premium multiple as a structurally higher-growth fintech.',
    },
  ],
  isProfitable: true,
  profitabilityMilestones: [
    { date: 'Q3 2023', milestone: 'First GAAP-profitable quarter post-IPO', status: 'Done' },
    { date: 'FY 2024', milestone: 'First full year of GAAP profitability (~$1.4B net income)', status: 'Done' },
    { date: 'FY 2025', milestone: 'Sustained operating leverage; adj. EBITDA margin > 50%', status: 'In progress' },
    { date: 'FY 2026', milestone: 'Retirement (IRA) AUM crosses $25B and turns accretive', status: 'Target' },
    { date: 'FY 2027', milestone: 'International (U.K. / EU) contributes > 10% of revenue', status: 'Target' },
    { date: 'FY 2028', milestone: 'Net margin reaches 35%+ and ARPU exceeds $200', status: 'Stretch' },
  ],
  qualityRating: {
    overall: 3.6,
    dimensions: [
      { name: 'Moat', score: 3.0 },
      { name: 'Growth', score: 4.0 },
      { name: 'Financial health', score: 4.0 },
      { name: 'Management', score: 3.5 },
      { name: 'Valuation', score: 3.5 },
    ],
    rationale:
      'A capable founder-led franchise with strong cash generation, negligible leverage, and a credible multi-product growth story (retirement, crypto, futures, international). Tempered by the absence of true switching costs against Schwab and Fidelity, sensitivity to retail trading cycles, and a meaningfully expanded multiple after the 2024-2025 run.',
  },
};

const statusToTone: Record<MilestoneStatus, TableRowTone> = {
  'Done': 'success',
  'In progress': 'info',
  'Target': 'neutral',
  'Stretch': 'warning',
};

const scenarioToTone: Record<Scenario['scenario'], TableRowTone> = {
  Bear: 'danger',
  Base: 'neutral',
  Bull: 'success',
};

const brandToPillTone = (t: BrandTone): PillTone =>
  t === 'danger' ? 'deleted' : t;

/** Maps brand tone to theme token fills (no raw hex in components). */
function brandAccentFill(tone: BrandTone, t: ReturnType<typeof useHostTheme>): string {
  switch (tone) {
    case 'success':
      return t.tokens.diff.insertedLine;
    case 'danger':
      return t.tokens.diff.removedLine;
    case 'info':
      return t.tokens.fill.primary;
    case 'warning':
      return t.tokens.fill.secondary;
    default:
      return t.tokens.fill.tertiary;
  }
}

const SECTION_COUNT = 7;

export default function CompanyDeepDive() {
  const theme = useHostTheme();
  const [trail, setTrail] = useCanvasState<Array<{ x: number; y: number }>>('cursorTrail', []);
  const [activeSection, setActiveSection] = useCanvasState('activeSection', 0);

  const c = companyData;
  const brand = c.brandTone;
  const pillTone = brandToPillTone(brand);
  const roadmapTitle = c.isProfitable ? 'Profitability trajectory' : 'Path to profitability';
  const sinceIPOReturn = ((c.currentPrice - c.ipoPrice) / c.ipoPrice) * 100;
  const returnLabel = `${sinceIPOReturn >= 0 ? '+' : ''}${sinceIPOReturn.toFixed(0)}%`;
  const trailColor = brandAccentFill(brand, theme);

  const handleMouseMove = (e: {
    currentTarget: HTMLElement;
    clientX: number;
    clientY: number;
  }) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setTrail((prev) => [...prev.slice(-18), { x, y }]);
  };

  const handleScroll = (e: { currentTarget: HTMLElement }) => {
    const el = e.currentTarget;
    const h = el.clientHeight;
    if (h <= 0) return;
    const idx = Math.min(SECTION_COUNT - 1, Math.max(0, Math.round(el.scrollTop / h)));
    setActiveSection(idx);
  };

  const sectionSurface = (index: number) =>
    mergeStyle({
      width: '100%',
      maxWidth: 880,
      maxHeight: 'calc(100vh - 72px)',
      overflowY: 'auto',
      boxSizing: 'border-box',
      borderRadius: 8,
      border: `1px solid ${theme.stroke.secondary}`,
      background: theme.bg.elevated,
      padding: 24,
      transform:
        activeSection === index
          ? 'scale(1) translateY(0)'
          : 'scale(0.94) translateY(14px)',
      opacity: activeSection === index ? 1 : 0,
      transition:
        'opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1), transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)',
      pointerEvents: activeSection === index ? 'auto' : 'none',
    });

  const sectionViewport = mergeStyle({
    minHeight: '100vh',
    scrollSnapAlign: 'start',
    scrollSnapStop: 'always',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 36,
    boxSizing: 'border-box',
  });

  const g = theme.tokens;

  return (
    <div
      style={{
        position: 'relative',
        height: '100vh',
        overflow: 'hidden',
        background: theme.bg.editor,
      }}
      onMouseMove={handleMouseMove}
    >
      <style>{`
        @keyframes dd-bg-float-a {
          0%, 100% { transform: translate(-14%, -12%) rotate(0deg) scale(1.05); }
          50% { transform: translate(12%, 16%) rotate(10deg) scale(1.18); }
        }
        @keyframes dd-bg-float-b {
          0%, 100% { transform: translate(10%, 14%) rotate(-6deg) scale(1.1); }
          50% { transform: translate(-16%, -10%) rotate(4deg) scale(1.22); }
        }
        @keyframes dd-bg-float-c {
          0%, 100% { transform: translate(4%, 22%) scale(1.08); }
          50% { transform: translate(-8%, -18%) scale(1.15); }
        }
        @keyframes dd-bg-drift-opacity {
          0%, 100% { opacity: 0.42; }
          50% { opacity: 0.62; }
        }
      `}</style>

      {/* Slow-moving ambient gradients (theme-derived colors) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: '-35%',
            background: `linear-gradient(
              132deg,
              ${g.diff.insertedLine} 0%,
              ${g.fill.tertiary} 38%,
              ${g.accent.primary} 72%,
              transparent 92%
            )`,
            opacity: 0.38,
            animation:
              'dd-bg-float-a 72s ease-in-out infinite, dd-bg-drift-opacity 42s ease-in-out infinite',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: '-40%',
            background: `linear-gradient(
              218deg,
              transparent 0%,
              ${g.fill.secondary} 28%,
              ${g.diff.removedLine} 58%,
              ${g.fill.quaternary} 88%
            )`,
            opacity: 0.22,
            mixBlendMode: 'soft-light',
            animation: 'dd-bg-float-b 96s ease-in-out infinite reverse',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: '-30%',
            background: `linear-gradient(
              90deg,
              ${g.accent.control} 0%,
              transparent 42%,
              ${g.diff.insertedLine} 78%,
              transparent 100%
            )`,
            opacity: 0.18,
            animation: 'dd-bg-float-c 54s ease-in-out infinite',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(
              80% 70% at 50% 120%,
              ${g.fill.primary} 0%,
              transparent 68%
            )`,
            opacity: 0.55,
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(
              180deg,
              ${theme.bg.editor} 0%,
              transparent 22%,
              transparent 78%,
              ${theme.bg.editor} 100%
            )`,
            opacity: 0.85,
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Cursor trail — layered dots read as a soft glow without CSS gradients */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 1,
          overflow: 'hidden',
        }}
      >
        {trail.map((pt, i) => {
          const age = (i + 1) / trail.length;
          const r = 4 + age * 38;
          const o = age * 0.42;
          return (
            <div
              key={`${pt.x}-${pt.y}-${i}`}
              style={{
                position: 'absolute',
                left: pt.x - r,
                top: pt.y - r,
                width: r * 2,
                height: r * 2,
                borderRadius: 9999,
                background: trailColor,
                opacity: o,
              }}
            />
          );
        })}
      </div>

      <div
        onScroll={handleScroll}
        style={{
          position: 'relative',
          zIndex: 2,
          height: '100%',
          overflowY: 'scroll',
          scrollSnapType: 'y mandatory',
          scrollBehavior: 'smooth',
        }}
      >
        {/* Section 0 — Identity & snapshot */}
        <div style={sectionViewport}>
          <div style={sectionSurface(0)}>
            <Stack gap={20}>
              <Stack gap={8}>
                <Row gap={12} align="center" wrap>
                  <H1>{c.name}</H1>
                  <Pill tone={pillTone} active>{c.ticker}</Pill>
                </Row>
                <Row gap={12} wrap>
                  <Text tone="secondary">{c.sector}</Text>
                  <Text tone="tertiary">·</Text>
                  <Text tone="secondary">IPO {c.ipoDate} @ ${c.ipoPrice}</Text>
                </Row>
              </Stack>
              <Grid columns={4} gap={16}>
                <Stat value={`$${c.currentPrice.toFixed(2)}`} label="Current price" />
                <Stat value={c.marketCap} label="Market cap" />
                <Stat value={`$${c.ipoPrice}`} label="IPO price" />
                <Stat value={returnLabel} label="Return since IPO" tone={brand as StatTone} />
              </Grid>
              <Divider />
              <Text tone="tertiary" size="small">
                Scroll to walk each section of this deep dive.
              </Text>
            </Stack>
          </div>
        </div>

        {/* Section 1 — Product */}
        <div style={sectionViewport}>
          <div style={sectionSurface(1)}>
            <Stack gap={12}>
              <H2>Product & business</H2>
              <Card>
                <CardHeader>What they do</CardHeader>
                <CardBody>
                  <Stack gap={12}>
                    {c.productOverview.map((paragraph, i) => (
                      <Text key={i}>{paragraph}</Text>
                    ))}
                  </Stack>
                </CardBody>
              </Card>
            </Stack>
          </div>
        </div>

        {/* Section 2 — Revenue */}
        <div style={sectionViewport}>
          <div style={sectionSurface(2)}>
            <Stack gap={12}>
              <H2>Revenue & growth</H2>
              <Grid columns={3} gap={16}>
                <Stat value={c.ttmRevenue} label="TTM revenue" />
                <Stat value={c.yoyGrowth} label="YoY growth" tone={brand as StatTone} />
                <Stat value={c.grossMargin} label="Gross margin" />
              </Grid>
              <LineChart
                categories={c.revenueByYear.categories}
                series={[
                  {
                    name: 'Revenue ($M)',
                    data: c.revenueByYear.values,
                    tone: brand as ChartTone,
                  },
                ]}
                fill
                height={240}
              />
            </Stack>
          </div>
        </div>

        {/* Section 3 — Debt */}
        <div style={sectionViewport}>
          <div style={sectionSurface(3)}>
            <Stack gap={12}>
              <H2>Debt & balance sheet</H2>
              <Grid columns={3} gap={16}>
                <Stat value={c.cashOnHand} label="Cash & equivalents" tone="success" />
                <Stat value={c.totalDebt} label="Long-term debt" />
                <Stat value={c.leverage} label="Leverage" tone="info" />
              </Grid>
              <BarChart
                categories={c.debtVsCash.categories}
                series={[
                  { name: 'Cash ($M)', data: c.debtVsCash.cash, tone: 'success' },
                  { name: 'Debt ($M)', data: c.debtVsCash.debt, tone: 'danger' },
                ]}
                height={220}
              />
            </Stack>
          </div>
        </div>

        {/* Section 4 — ROI */}
        <div style={sectionViewport}>
          <div style={sectionSurface(4)}>
            <Stack gap={12}>
              <H2>Expected 5-year ROI</H2>
              <Text tone="secondary">
                Illustrative price targets and total returns five years out, against the current ${c.currentPrice.toFixed(2)} price.
              </Text>
              <Table
                headers={['Scenario', 'Price target', 'Total return', '5Y CAGR', 'Key assumption']}
                rows={c.roiScenarios.map((s) => [
                  s.scenario,
                  s.priceTarget,
                  s.totalReturn,
                  s.cagr,
                  s.assumption,
                ])}
                rowTone={c.roiScenarios.map((s) => scenarioToTone[s.scenario])}
                columnAlign={['left', 'right', 'right', 'right', 'left']}
              />
            </Stack>
          </div>
        </div>

        {/* Section 5 — Profitability */}
        <div style={sectionViewport}>
          <div style={sectionSurface(5)}>
            <Stack gap={12}>
              <H2>{roadmapTitle}</H2>
              <Text tone="secondary">
                Historical hits and forward operating milestones that anchor the profitability story.
              </Text>
              <Table
                headers={['When', 'Milestone', 'Status']}
                rows={c.profitabilityMilestones.map((m) => [m.date, m.milestone, m.status])}
                rowTone={c.profitabilityMilestones.map((m) => statusToTone[m.status])}
                columnAlign={['left', 'left', 'left']}
              />
            </Stack>
          </div>
        </div>

        {/* Section 6 — Quality & disclaimer */}
        <div style={sectionViewport}>
          <div style={sectionSurface(6)}>
            <Stack gap={12}>
              <H2>Long-term investment quality</H2>
              <Grid columns="minmax(0, 220px) 1fr" gap={24} align="center">
                <Stat
                  value={`${c.qualityRating.overall.toFixed(1)} / 5.0`}
                  label="Overall rating (1.0 – 5.0)"
                  tone={brand as StatTone}
                />
                <BarChart
                  categories={c.qualityRating.dimensions.map((d) => d.name)}
                  series={[
                    {
                      name: 'Score',
                      data: c.qualityRating.dimensions.map((d) => d.score),
                      tone: brand as ChartTone,
                    },
                  ]}
                  horizontal
                  height={220}
                  valueSuffix=" / 5"
                />
              </Grid>
              <Callout tone="neutral" title="Why this score">
                {c.qualityRating.rationale}
              </Callout>
              <Divider />
              <Text tone="tertiary" size="small">
                Figures shown are illustrative and may not reflect the latest company filings. For research and education only — not investment advice.
              </Text>
            </Stack>
          </div>
        </div>
      </div>
    </div>
  );
}
