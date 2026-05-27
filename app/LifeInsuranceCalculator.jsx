"use client"

import { useState } from "react"

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

export default function LifeInsuranceCalculator() {
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

  const incomePart  = inc * yrs
  const coverage    = Math.max(0, incomePart + dbt + mtg + edu - sav)

  const rule10x     = Math.max(0, inc * 10 - sav)
  const ruleHuman   = Math.max(0, inc * yrs * 0.85 - sav)
  const ruleDime    = coverage

  const activeAmount = activeRule === "dime" ? ruleDime : activeRule === "10x" ? rule10x : ruleHuman

  const ruleMessages = {
    dime: "The DIME method adds up your debts (" + fmtFull(dbt) + "), income replacement (" + fmtFull(incomePart) + "), mortgage (" + fmtFull(mtg) + "), and education costs (" + fmtFull(edu) + "), then subtracts existing savings (" + fmtFull(sav) + "). It is the most thorough of the common methods and works well for households with dependents and a mortgage.",
    "10x": "The 10× rule suggests buying coverage equal to ten times your annual income — a quick estimate of " + fmtFull(inc * 10) + " before savings. After subtracting your existing assets (" + fmtFull(sav) + "), that gives a need of roughly " + fmtFull(rule10x) + ". It is a useful sanity check but does not account for specific debts, education costs, or term length.",
    human: "The Human Life Value method estimates the present value of your future earnings — what your income stream is worth today in today's dollars. Using a modest discount rate, that comes to approximately " + fmtFull(ruleHuman) + " after existing savings. This method is most useful for people whose primary concern is income replacement rather than debt coverage.",
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
  )
}