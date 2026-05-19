"use client"

import { useState } from "react"
import { RELATED_LINKS as RELATED } from "./lib/links"

const css = `
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
  .li-breakdown-label { font-size: 10px; letter-spacing: .08em; text-transform: uppercase; color: #888; margin-bottom: .25rem; }
  .li-breakdown-val { font-family: 'DM Serif Display', serif; font-size: 1.1rem; color: #1a1a1a; }
  .li-breakdown-val.positive { color: #1e40af; }
  .li-breakdown-val.negative { color: #166534; }
  .li-breakdown-sign { font-size: 10px; color: #888; margin-bottom: .15rem; }

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

  .li-related-links { display: flex; flex-wrap: wrap; gap: .5rem; }
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

const RULES = [
  { key: "dime",    label: "DIME",       desc: "Debt + Income × years + Mortgage + Education" },
  { key: "10x",     label: "10× Income", desc: "Simple multiplier rule of thumb" },
  { key: "human",   label: "Human Life", desc: "Present value of future earnings" },
]

function fmt(n) {
  if (n >= 1000000) return "$" + (n / 1000000).toFixed(2) + "M"
  return "$" + Math.round(n).toLocaleString("en-US")
}
function fmtFull(n) { return "$" + Math.round(n).toLocaleString("en-US") }

export default function Page() {
  const [income,    setIncome]    = useState("60000")
  const [years,     setYears]     = useState("20")
  const [debts,     setDebts]     = useState("0")
  const [mortgage,  setMortgage]  = useState("0")
  const [education, setEducation] = useState("0")
  const [savings,   setSavings]   = useState("0")
  const [activeRule, setActiveRule] = useState("dime")

  const inc  = parseFloat(income)    || 0
  const yrs  = parseFloat(years)     || 0
  const dbt  = parseFloat(debts)     || 0
  const mtg  = parseFloat(mortgage)  || 0
  const edu  = parseFloat(education) || 0
  const sav  = parseFloat(savings)   || 0

  // Primary: DIME method
  const incomePart  = inc * yrs
  const coverage    = Math.max(0, incomePart + dbt + mtg + edu - sav)

  // Rule comparisons
  const rule10x     = Math.max(0, inc * 10 - sav)
  const ruleHuman   = Math.max(0, inc * yrs * 0.85 - sav) // discounted ~15% for present value approx
  const ruleDime    = coverage

  const activeAmount = activeRule === "dime" ? ruleDime : activeRule === "10x" ? rule10x : ruleHuman

  const ruleMessages = {
    dime: "The DIME method adds up your debts (" + fmtFull(dbt) + "), income replacement (" + fmtFull(incomePart) + "), mortgage (" + fmtFull(mtg) + "), and education costs (" + fmtFull(edu) + "), then subtracts existing savings (" + fmtFull(sav) + "). It is the most thorough of the common methods and works well for households with dependents and a mortgage.",
    "10x": "The 10\u00d7 rule suggests buying coverage equal to ten times your annual income \u2014 a quick estimate of " + fmtFull(inc * 10) + " before savings. After subtracting your existing assets (" + fmtFull(sav) + "), that gives a need of roughly " + fmtFull(rule10x) + ". It is a useful sanity check but does not account for specific debts, education costs, or term length.",
    human: "The Human Life Value method estimates the present value of your future earnings \u2014 what your income stream is worth today in today\u2019s dollars. Using a modest discount rate, that comes to approximately " + fmtFull(ruleHuman) + " after existing savings. This method is most useful for people whose primary concern is income replacement rather than debt coverage.",
  }

  const maxBar = Math.max(incomePart, dbt, mtg, edu, sav, 1)
  const bars = [
    { label: "Income replacement", val: incomePart, color: "#1e40af" },
    { label: "Outstanding debts",  val: dbt,         color: "#6366f1" },
    { label: "Mortgage balance",   val: mtg,         color: "#7c3aed" },
    { label: "Education costs",    val: edu,         color: "#9333ea" },
    { label: "Existing savings",   val: sav,         color: "#166534" },
  ]

  return (
    <>
      <style>{css}</style>
      <main className="li-wrap">

        <div className="li-header">
          <p className="li-eyebrow">Personal Finance</p>
          <h1 className="li-title">Life Insurance<br /><em>Coverage Calculator</em></h1>
        </div>

        {/* TOOL */}
        <div className="li-card">
          <div className="li-field-row">
            <div className="li-field-block">
              <label className="li-field-label" htmlFor="income">Annual income</label>
              <div className="li-input-wrap">
                <span className="li-prefix">$</span>
                <input id="income" className="li-input" type="number" min="0" placeholder="60000"
                  value={income} onChange={e => setIncome(e.target.value)} />
              </div>
            </div>
            <div className="li-field-block">
              <label className="li-field-label" htmlFor="years">Years of income to replace</label>
              <div className="li-input-wrap">
                <input id="years" className="li-input no-prefix" type="number" min="1" max="50" placeholder="20"
                  value={years} onChange={e => setYears(e.target.value)} />
                <span className="li-suffix">yrs</span>
              </div>
              <p className="li-field-hint">Typically until youngest child is grown or until retirement</p>
            </div>
          </div>

          <div className="li-field-row">
            <div className="li-field-block">
              <label className="li-field-label" htmlFor="debts">Outstanding debts</label>
              <div className="li-input-wrap">
                <span className="li-prefix">$</span>
                <input id="debts" className="li-input" type="number" min="0" placeholder="0"
                  value={debts} onChange={e => setDebts(e.target.value)} />
              </div>
              <p className="li-field-hint">Credit cards, auto loans, personal loans</p>
            </div>
            <div className="li-field-block">
              <label className="li-field-label" htmlFor="mortgage">Mortgage balance</label>
              <div className="li-input-wrap">
                <span className="li-prefix">$</span>
                <input id="mortgage" className="li-input" type="number" min="0" placeholder="0"
                  value={mortgage} onChange={e => setMortgage(e.target.value)} />
              </div>
              <p className="li-field-hint">Remaining principal on your home loan</p>
            </div>
          </div>

          <div className="li-field-row">
            <div className="li-field-block">
              <label className="li-field-label" htmlFor="education">Future education costs</label>
              <div className="li-input-wrap">
                <span className="li-prefix">$</span>
                <input id="education" className="li-input" type="number" min="0" placeholder="0"
                  value={education} onChange={e => setEducation(e.target.value)} />
              </div>
              <p className="li-field-hint">Estimated college or education expenses for dependents</p>
            </div>
            <div className="li-field-block">
              <label className="li-field-label" htmlFor="savings">Existing savings &amp; assets</label>
              <div className="li-input-wrap">
                <span className="li-prefix">$</span>
                <input id="savings" className="li-input" type="number" min="0" placeholder="0"
                  value={savings} onChange={e => setSavings(e.target.value)} />
              </div>
              <p className="li-field-hint">Retirement accounts, investments, other liquid assets</p>
            </div>
          </div>

          {inc > 0 && (
            <>
              <div className="li-result-hero">
                <p className="li-result-label">Estimated coverage needed</p>
                <p className="li-result-val">{fmt(activeAmount)}</p>
                <p className="li-result-sub">
                  Based on the {RULES.find(r => r.key === activeRule)?.label} method · switch methods below to compare
                </p>
              </div>

              <div className="li-breakdown-grid">
                <div className="li-breakdown-cell">
                  <p className="li-breakdown-sign">+</p>
                  <p className="li-breakdown-label">Income replacement</p>
                  <p className="li-breakdown-val positive">{fmt(incomePart)}</p>
                </div>
                <div className="li-breakdown-cell">
                  <p className="li-breakdown-sign">+</p>
                  <p className="li-breakdown-label">Debts &amp; mortgage</p>
                  <p className="li-breakdown-val positive">{fmt(dbt + mtg)}</p>
                </div>
                <div className="li-breakdown-cell">
                  <p className="li-breakdown-sign">+</p>
                  <p className="li-breakdown-label">Education costs</p>
                  <p className="li-breakdown-val positive">{fmt(edu)}</p>
                </div>
                <div className="li-breakdown-cell">
                  <p className="li-breakdown-sign">−</p>
                  <p className="li-breakdown-label">Existing savings</p>
                  <p className="li-breakdown-val negative">{fmt(sav)}</p>
                </div>
              </div>

              <div className="li-bar-section">
                <p className="li-bar-label">Coverage component breakdown</p>
                <div className="li-bar-rows">
                  {bars.map((b, i) => (
                    <div className="li-bar-row" key={i}>
                      <span className="li-bar-row-label">{b.label}</span>
                      <div className="li-bar-track">
                        <div className="li-bar-fill" style={{ width: Math.round(b.val / maxBar * 100) + "%", background: b.color }} />
                      </div>
                      <span className="li-bar-row-val">{fmt(b.val)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <p className="li-field-label" style={{ marginBottom: ".5rem" }}>Compare calculation methods</p>
                <div className="li-rule-tabs">
                  {RULES.map(r => (
                    <button key={r.key} className={"li-rule-tab" + (activeRule === r.key ? " on" : "")}
                      onClick={() => setActiveRule(r.key)}>
                      {r.label}
                    </button>
                  ))}
                </div>
                <p className="li-rule-result">{ruleMessages[activeRule]}</p>
              </div>
            </>
          )}
        </div>

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
              <p className="li-info-body">Even if one spouse doesn&apos;t earn income, their contribution has real economic value — childcare, household management, and more. Coverage for a non-working spouse should reflect the cost of replacing those services.</p>
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
            <p>The consequences of underinsurance aren&apos;t immediately visible — they only materialize in a worst-case scenario. Overinsurance has a cost too: premiums paid for coverage beyond what your family would actually need are dollars that could go toward other financial goals.</p>
            <p>Getting to a thoughtful estimate — one that accounts for your specific income, debts, mortgage, education plans, and existing assets — is what turns life insurance from a vague financial obligation into a specific, purposeful decision. This calculator is designed to make that starting point concrete.</p>
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
              <p className="li-type-body">Typically 1–2× annual salary. A useful supplement but rarely sufficient as a standalone policy. Coverage ends when you leave the employer, and it doesn&apos;t follow your personal needs as they evolve.</p>
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
              <p className="li-tip-body">A 20-year term policy purchased when your children are young typically covers the period of highest financial dependency. There&apos;s no universal right answer — the goal is to match the coverage period to the specific obligation you&apos;re protecting against.</p>
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

        {/* ========== MONEYWISE LINK — START ========== */}
        <div style={{ background: "#fff", border: "1px solid #e0dbd3", borderRadius: "4px", padding: "1rem 1.5rem", marginBottom: "1.5rem", textAlign: "center" }}>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "13px", color: "#888" }}>
            Looking for more free financial tools?{" "}
            <a href="https://moneywisecalculator.com" style={{ color: "#b45309", textDecoration: "underline" }}>
              Visit MoneyWiseCalculator.com
            </a>
          </p>
        </div>
        {/* ========== MONEYWISE LINK — END ========== */}

        {/* RELATED */}
        <div className="li-card">
          <p className="li-section-title">Related tools</p>
          <div className="li-related-links">
            {RELATED.map((r, i) => (
              <a key={i} className="li-related-link" href={r.href}>{r.label}</a>
            ))}
          </div>
          <div className="li-disclaimer">
            This tool provides estimates for informational purposes only and does not constitute financial advice. Results assume a fixed interest rate and fixed monthly payment for the full repayment period. This site may use cookies and analytics. By using this site, you agree to our Privacy Policy and Terms of Service.
            <div className="li-footer-links">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
            </div>
          </div>
        </div>

      </main>
    </>
  )
}
