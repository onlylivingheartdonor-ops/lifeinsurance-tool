import LifeInsuranceCalculator from "./LifeInsuranceCalculator"
import { RELATED_LINKS as RELATED } from "./lib/links"

const staticCss = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #faf8f4; font-family: 'DM Mono', monospace; color: #1a1a1a; }
  .li-wrap { max-width: 780px; margin: 0 auto; padding: 2rem 1.5rem; }
  .li-header { border-bottom: 2px solid #1a1a1a; padding-bottom: 1.5rem; margin-bottom: 2rem; }
  .li-eyebrow { font-size: 11px; letter-spacing: .12em; text-transform: uppercase; color: #888; margin-bottom: .5rem; }
  .li-title { font-family: 'DM Serif Display', serif; font-size: clamp(2rem, 5vw, 3.2rem); line-height: 1.1; }
  .li-title em { font-style: italic; color: #1e40af; }
  .li-card { background: #fff; border: 1px solid #e0dbd3; border-radius: 4px; padding: 1.5rem; margin-bottom: 1.5rem; }
  .li-section-title { font-family: 'DM Serif Display', serif; font-size: 1.2rem; margin-bottom: 1rem; color: #1a1a1a; }
  .li-field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; margin-bottom: 1.25rem; }
  .li-field-block { }
  .li-field-label { font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: #888; display: block; margin-bottom: .4rem; }
  .li-field-hint { font-size: 12px; color: #888; margin-top: .3rem; line-height: 1.5; }
  .li-input-wrap { position: relative; }
  .li-prefix { position: absolute; left: 0; top: .4rem; font-size: 1rem; color: #aaa; }
  .li-suffix { position: absolute; right: 0; top: .4rem; font-size: 1rem; color: #aaa; }
  .li-input { width: 100%; border: none; border-bottom: 1.5px solid #e0dbd3; background: transparent; font-family: 'DM Mono', monospace; font-size: 1.1rem; color: #1a1a1a; padding: .4rem 1.2rem .4rem 1.2rem; outline: none; transition: border-color .2s; }
  .li-input.no-prefix { padding-left: 0; }
  .li-input:focus { border-color: #1e40af; }
  .li-result-hero { background: #f0f4ff; border: 1px solid #bfdbfe; border-radius: 4px; padding: 1.5rem; margin-bottom: 1.5rem; text-align: center; }
  .li-result-label { font-size: 11px; letter-spacing: .1em; text-transform: uppercase; color: #6b7280; margin-bottom: .4rem; }
  .li-result-val { font-family: 'DM Serif Display', serif; font-size: 3.5rem; color: #1e40af; line-height: 1; }
  .li-result-sub { font-size: 12px; color: #6b7280; margin-top: .5rem; line-height: 1.5; }
  .li-breakdown-grid { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 1px; background: #e0dbd3; border: 1px solid #e0dbd3; border-radius: 2px; overflow: hidden; margin-bottom: 1.5rem; }
  .li-breakdown-cell { background: #fff; padding: .9rem 1rem; }
  .li-breakdown-sign { font-size: 10px; color: #888; margin-bottom: .15rem; }
  .li-breakdown-label { font-size: 10px; letter-spacing: .08em; text-transform: uppercase; color: #888; margin-bottom: .25rem; }
  .li-breakdown-val { font-family: 'DM Serif Display', serif; font-size: 1.1rem; color: #1a1a1a; }
  .li-breakdown-val.positive { color: #1e40af; }
  .li-breakdown-val.negative { color: #166534; }
  .li-bar-section { margin-bottom: 1.25rem; }
  .li-bar-label { font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: #888; margin-bottom: .5rem; }
  .li-bar-rows { display: flex; flex-direction: column; gap: .5rem; }
  .li-bar-row { display: flex; align-items: center; gap: .75rem; font-size: 12px; }
  .li-bar-row-label { width: 120px; color: #555; flex-shrink: 0; }
  .li-bar-track { flex: 1; height: 6px; background: #e0dbd3; border-radius: 3px; overflow: hidden; }
  .li-bar-fill { height: 100%; border-radius: 3px; transition: width .5s; }
  .li-bar-row-val { width: 90px; text-align: right; color: #888; flex-shrink: 0; }
  .li-rule-tabs { display: flex; gap: .5rem; flex-wrap: wrap; margin-bottom: 1rem; }
  .li-rule-tab { padding: .4rem .85rem; border: 1px solid #e0dbd3; border-radius: 2px; font-family: 'DM Mono', monospace; font-size: 12px; color: #555; cursor: pointer; transition: all .15s; background: none; }
  .li-rule-tab.on { border-color: #1e40af; background: #eff6ff; color: #1e40af; }
  .li-rule-result { font-size: 13px; color: #444; background: #f8f9ff; border: 1px solid #e0e7ff; border-radius: 3px; padding: .9rem 1rem; line-height: 1.6; }
  .li-rule-result strong { color: #1e40af; font-weight: 500; }
  .li-info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem; }
  .li-info-item { padding: .75rem; border-left: 2px solid #bfdbfe; }
  .li-info-title { font-size: 12px; font-weight: 500; color: #1a1a1a; margin-bottom: .25rem; }
  .li-info-body { font-size: 12px; color: #888; line-height: 1.5; }
  .li-prose p { font-size: 13px; color: #444; line-height: 1.7; margin-bottom: .75rem; }
  .li-prose p:last-child { margin-bottom: 0; }
  .li-prose ul { font-size: 13px; color: #444; line-height: 1.8; padding-left: 1.2rem; margin-bottom: .75rem; }
  .li-prose ul li { margin-bottom: .3rem; }
  .li-faq-item { border-bottom: 1px solid #e0dbd3; padding: 1rem 0; }
  .li-faq-item:last-child { border-bottom: none; padding-bottom: 0; }
  .li-faq-q { font-size: 13px; font-weight: 500; color: #1a1a1a; margin-bottom: .4rem; }
  .li-faq-a { font-size: 13px; color: #555; line-height: 1.7; }
  .li-tip-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .li-tip-num { font-family: 'DM Serif Display', serif; font-size: 2rem; color: #bfdbfe; line-height: 1; margin-bottom: .4rem; }
  .li-tip-title { font-size: 12px; font-weight: 500; color: #1a1a1a; margin-bottom: .25rem; }
  .li-tip-body { font-size: 12px; color: #888; line-height: 1.5; }
  .li-type-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .li-type-item { padding: .9rem 1rem; border: 1px solid #e0dbd3; border-radius: 3px; }
  .li-type-name { font-size: 12px; font-weight: 500; color: #1a1a1a; margin-bottom: .3rem; }
  .li-type-body { font-size: 12px; color: #888; line-height: 1.5; }
  .li-type-tag { display: inline-block; font-size: 10px; padding: .15rem .5rem; border-radius: 20px; margin-bottom: .4rem; }
  .li-type-tag.term { background: #eff6ff; color: #1e40af; }
  .li-type-tag.perm { background: #fef9c3; color: #854d0e; }
  .sub-nav { font-size: 12px; margin-bottom: 1.5rem; }
  .sub-nav a { color: #1e40af; text-decoration: none; }
  .sub-nav a:hover { text-decoration: underline; }
  .li-related-links { display: flex; flex-wrap: wrap; gap: .5rem; }
  .li-related-label { font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: #888; margin-bottom: .75rem; }
  .li-related-link { font-size: 12px; padding: .35rem .75rem; border: 1px solid #e0dbd3; border-radius: 2px; color: #555; text-decoration: none; transition: all .15s; display: inline-block; }
  .li-related-link:hover { border-color: #1a1a1a; color: #1a1a1a; }
  .li-disclaimer { font-size: 11px; color: #888; line-height: 1.6; border-top: 1px solid #e0dbd3; padding-top: 1rem; margin-top: 1rem; }
  .li-footer-links { display: flex; gap: 1rem; font-size: 11px; margin-top: .75rem; }
  .li-footer-links a { color: #888; text-decoration: underline; }
  @media (max-width: 600px) {
    .li-field-row, .li-info-grid, .li-tip-grid, .li-type-grid { grid-template-columns: 1fr; }
    .li-breakdown-grid { grid-template-columns: 1fr 1fr; }
  }
`

const FAQ = [
  {
    q: "What is the DIME method for life insurance?",
    a: "DIME stands for Debt, Income, Mortgage, and Education. It's a calculation framework that adds up: outstanding non-mortgage debts (credit cards, auto loans, personal loans), income replacement (annual income × number of years to replace), remaining mortgage balance, and estimated future education costs for dependents. Then subtract existing savings and assets that your family could access. The result is a coverage target that accounts for the major categories of financial need most families would face."
  },
  {
    q: "How many years of income should I replace?",
    a: "A common guideline is to replace income until your youngest child reaches adulthood — typically 18–22 years. Others use years until expected retirement. If your spouse would continue working, you might replace a smaller percentage (e.g., 50–75% of your income). The right number depends on your household's specific situation, including your spouse's earning capacity, childcare costs you'd need to replace, and your family's lifestyle expectations."
  },
  {
    q: "Should I buy term or whole life insurance?",
    a: "For most families seeking income replacement and mortgage protection, term life is the appropriate choice. It provides coverage for a specific period (10–30 years) at a fraction of the cost of whole life. Whole life is significantly more expensive and is better suited for estate planning, leaving a tax-free inheritance, or covering lifelong expenses like a special needs dependent. A common strategy is to buy term life for income replacement needs and consider permanent insurance separately for estate planning goals."
  },
  {
    q: "How much life insurance do I need if I'm single with no dependents?",
    a: "If no one depends on your income, you may need little to no life insurance. At minimum, consider enough coverage to pay for final expenses (funeral costs, outstanding debts) — typically $10,000–25,000. If you have co-signed loans (student loans, a mortgage with a partner), ensure coverage would protect the co-signer. The DIME method still applies, but with few or no dependents, your income replacement need is minimal."
  },
  {
    q: "Does my employer-provided life insurance cover my needs?",
    a: "Group life insurance through an employer typically provides 1–2× your annual salary. While valuable as a supplement, it rarely provides sufficient coverage on its own, especially for families with a mortgage or young children. Employer coverage also ends when you leave the job — so it cannot be relied upon for long-term income replacement. Most financial planners recommend having an individual policy as your primary coverage, with employer coverage as a supplement."
  },
  {
    q: "When should I review my life insurance coverage?",
    a: "Review your coverage at major life events: marriage, birth or adoption of a child, purchase of a home, significant salary increase, retirement, or after paying off major debts. Many experts also recommend a review every 3–5 years regardless of life events, as inflation erodes the real value of a fixed death benefit over time. The coverage that made sense at 30 with a new mortgage may be inadequate by 40 even if nothing else changed."
  }
]

export default function Page() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: staticCss }} />
      <main className="li-wrap">

        <p className="sub-nav"><a href="https://moneywisecalculator.com">← More free tools at MoneyWise Calculator</a></p>

        <div className="li-header">
          <p className="li-eyebrow">Personal Finance</p>
          <h1 className="li-title">Life Insurance<br /><em>Coverage Calculator</em></h1>
        </div>

        <p style={{ fontSize: "13px", color: "#555", lineHeight: "1.7", marginBottom: "1.5rem" }}>
          Free tool to calculate how much life insurance coverage your family needs. Uses the DIME method (Debt, Income, Mortgage, Education) and compares with 10× income and Human Life Value methods.
        </p>

        <LifeInsuranceCalculator />

        {/* HOW IT WORKS */}
        <div className="li-card">
          <p className="li-section-title">How this calculator works</p>
          <div className="li-prose">
            <p>This calculator uses the DIME method as its primary approach — one of the most thorough frameworks for estimating life insurance needs. DIME stands for Debt, Income, Mortgage, and Education: four categories that represent the main financial obligations your policy would need to cover.</p>
            <p>The calculation adds up your income replacement need (annual income × years), outstanding non-mortgage debts, mortgage balance, and estimated future education costs for dependents. It then subtracts existing savings and liquid assets, since those would offset the coverage need.</p>
            <p>The method comparison tab lets you see how the DIME result compares to two simpler rules of thumb — the 10× income rule and the Human Life Value approach. Most financial planners recommend using DIME or a similarly detailed method as a starting point, then adjusting based on your specific household situation.</p>
          </div>
          <div className="li-info-grid">
            <div className="li-info-item">
              <p className="li-info-title">Income replacement years</p>
              <p className="li-info-body">A common guideline is to cover income until your youngest dependent reaches adulthood — typically 18–22 years. Others use years until retirement. The right number depends on how long your household would need income support.</p>
            </div>
            <div className="li-info-item">
              <p className="li-info-title">Why subtract savings?</p>
              <p className="li-info-body">Life insurance fills the gap between what your family would need and what they already have. Existing savings, retirement accounts, and investments your spouse could access reduce the coverage amount needed.</p>
            </div>
            <div className="li-info-item">
              <p className="li-info-title">Non-working spouses</p>
              <p className="li-info-body">Even if one spouse doesn't earn income, their contribution has real economic value — childcare, household management, and more. Coverage for a non-working spouse should reflect the cost of replacing those services.</p>
            </div>
            <div className="li-info-item">
              <p className="li-info-title">These are estimates</p>
              <p className="li-info-body">Coverage needs vary significantly by household. This calculator provides a data-informed starting point — a conversation with a licensed insurance professional is recommended before purchasing a policy.</p>
            </div>
          </div>
        </div>

        {/* WHY IT MATTERS */}
        <div className="li-card">
          <p className="li-section-title">Why getting coverage right matters</p>
          <div className="li-prose">
            <p>Most people who have life insurance are underinsured. Studies consistently show that the average American carries significantly less coverage than financial planners would recommend for their income and household situation — often because they chose a round number, relied on a workplace plan with a fixed multiple, or simply guessed.</p>
            <p>The consequences of underinsurance aren't immediately visible — they only materialize in a worst-case scenario. Overinsurance has a cost too: premiums paid for coverage beyond what your family would actually need are dollars that could go toward other financial goals.</p>
            <p>Getting to a thoughtful estimate — one that accounts for your specific income, debts, mortgage, education plans, and existing assets — is what turns life insurance from a vague financial obligation into a specific, purposeful decision. This calculator is designed to make that starting point concrete.</p>
          </div>
        </div>

        {/* REAL-WORLD EXAMPLE */}
        <div className="li-card">
          <p className="li-section-title">Real-world example: How much coverage does a family need?</p>
          <div className="li-prose">
            <p><strong>Meet the Parkers.</strong> Maria earns $75,000/year. She has two young children, a $250,000 mortgage balance, $15,000 in student loans and car loans, and wants $50,000 for future college costs. She has $30,000 in savings.</p>
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "1rem" }}>
            <div style={{ background: "#fff1f2", padding: "1rem", borderRadius: "4px", border: "1px solid #fcd4d4" }}>
              <p style={{ fontSize: "12px", fontWeight: "500", color: "#b91c1c", marginBottom: ".5rem" }}>⚠️ Underinsured scenario</p>
              <p style={{ fontSize: "13px", color: "#444", marginBottom: ".5rem" }}>Her employer provides 1× salary ($75,000) of coverage.</p>
              <p style={{ fontSize: "13px", color: "#444", marginBottom: ".5rem" }}><strong>Total coverage:</strong> $75,000</p>
              <p style={{ fontSize: "13px", color: "#b91c1c", fontWeight: "500", marginTop: ".5rem" }}>Her family would lose the house, take on high-interest debt, and struggle to afford college.</p>
            </div>
            
            <div style={{ background: "#f0fdf4", padding: "1rem", borderRadius: "4px", border: "1px solid #b7d9c8" }}>
              <p style={{ fontSize: "12px", fontWeight: "500", color: "#166534", marginBottom: ".5rem" }}>✅ Properly insured scenario</p>
              <p style={{ fontSize: "13px", color: "#444", marginBottom: ".5rem" }}>DIME calculation: $750k income replacement (10 years) + $15k debts + $250k mortgage + $50k education − $30k savings = $1,035,000.</p>
              <p style={{ fontSize: "13px", color: "#444", marginBottom: ".5rem" }}><strong>Total coverage:</strong> ~$1,000,000</p>
              <p style={{ fontSize: "13px", color: "#166534", fontWeight: "500", marginTop: ".5rem" }}>Her family pays off the house, clears debts, funds college, and has 10 years of income replacement.</p>
            </div>
          </div>
          
          <div style={{ marginTop: "1rem", padding: "1rem", background: "#f5f3ef", borderRadius: "4px" }}>
            <p style={{ fontSize: "13px", color: "#1a1a1a", fontWeight: "500", marginBottom: ".25rem" }}>The bottom line:</p>
            <p style={{ fontSize: "13px", color: "#444" }}>Maria's employer-provided coverage ($75k) would cover less than one year of her income — leaving her family devastated financially. Proper coverage (~$1M) costs roughly $30–50/month for a 20-year term policy. For the cost of a streaming subscription, she turns a catastrophe into a manageable situation.</p>
          </div>
        </div>

        {/* POLICY TYPES */}
        <div className="li-card">
          <p className="li-section-title">Types of life insurance</p>
          <div className="li-type-grid">
            <div className="li-type-item">
              <span className="li-type-tag term">Term</span>
              <p className="li-type-name">Term life</p>
              <p className="li-type-body">Covers a specific period — typically 10, 20, or 30 years. The most affordable option per dollar of coverage, and well-suited to covering income replacement and mortgage for a defined period. No cash value component.</p>
            </div>
            <div className="li-type-item">
              <span className="li-type-tag perm">Permanent</span>
              <p className="li-type-name">Whole life</p>
              <p className="li-type-body">Covers you for life and builds cash value over time. Premiums are significantly higher than term. Best suited for estate planning and lifelong coverage needs rather than income replacement.</p>
            </div>
            <div className="li-type-item">
              <span className="li-type-tag perm">Permanent</span>
              <p className="li-type-name">Universal life</p>
              <p className="li-type-body">A flexible form of permanent insurance with adjustable premiums and a savings component. More complex than term or whole life — the flexibility can be valuable but requires active management.</p>
            </div>
            <div className="li-type-item">
              <span className="li-type-tag term">Term</span>
              <p className="li-type-name">Group / employer life</p>
              <p className="li-type-body">Typically 1–2× annual salary. A useful supplement but rarely sufficient as a standalone policy. Coverage ends when you leave the employer, and it doesn't follow your personal needs as they evolve.</p>
            </div>
          </div>
        </div>

        {/* TIPS */}
        <div className="li-card">
          <p className="li-section-title">Tips for buying life insurance</p>
          <div className="li-tip-grid">
            <div>
              <p className="li-tip-num">01</p>
              <p className="li-tip-title">Buy sooner rather than later</p>
              <p className="li-tip-body">Premiums are primarily determined by age and health at the time of application. A healthy 30-year-old pays a fraction of what the same coverage costs at 45. Every year you delay increases the long-term cost of coverage.</p>
            </div>
            <div>
              <p className="li-tip-num">02</p>
              <p className="li-tip-title">Match term length to your need</p>
              <p className="li-tip-body">A 20-year term policy purchased when your children are young typically covers the period of highest financial dependency. There's no universal right answer — the goal is to match the coverage period to the specific obligation you're protecting against.</p>
            </div>
            <div>
              <p className="li-tip-num">03</p>
              <p className="li-tip-title">Shop multiple carriers</p>
              <p className="li-tip-body">Premiums for identical coverage can vary by 30–50% between insurers for the same age and health profile. Getting quotes from multiple carriers — or working with an independent broker who can access several — is one of the easiest ways to reduce cost.</p>
            </div>
            <div>
              <p className="li-tip-num">04</p>
              <p className="li-tip-title">Revisit coverage at major life events</p>
              <p className="li-tip-body">Marriage, children, a new mortgage, a significant salary increase, or a paid-off debt all change your coverage need. Reviewing your policy every 3–5 years or after any major financial change ensures your coverage stays aligned with your actual situation.</p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="li-card">
          <p className="li-section-title">Frequently asked questions</p>
          {FAQ.map((item, i) => (
            <div className="li-faq-item" key={i}>
              <p className="li-faq-q">{item.q}</p>
              <p className="li-faq-a">{item.a}</p>
            </div>
          ))}
        </div>

        {/* RELATED TOOLS */}
        <div className="li-card">
          <p className="li-section-title">Related tools</p>
          <p className="li-related-label">More free tools from the MoneyWise Calculator network</p>
          <div className="li-related-links">
            {RELATED.map((r, i) => (
              <a key={i} className="li-related-link" href={r.href}>{r.label}</a>
            ))}
          </div>
          <div className="li-disclaimer">
            This tool provides estimates for informational purposes only and does not constitute financial advice. Consult a licensed insurance professional before purchasing a policy. This site uses cookies and analytics. By using this site, you agree to our{" "}
            <a href="/privacy" style={{ color: "#888" }}>Privacy Policy</a> and{" "}
            <a href="/terms" style={{ color: "#888" }}>Terms of Service</a>.
            <div className="li-footer-links">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
              <a href="https://moneywisecalculator.com">MoneyWise Calculator</a>
            </div>
          </div>
        </div>

      </main>
    </>
  )
}