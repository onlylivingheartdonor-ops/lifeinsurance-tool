export const metadata = {
  title: "Terms of Service | Life Insurance Coverage Calculator",
  description: "Terms of service for Life Insurance Coverage Calculator. Please read these terms before using the tool.",
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <main style={{ maxWidth: "780px", margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'DM Mono', monospace", color: "#1a1a1a", background: "#faf8f4", minHeight: "100vh" }}>
      <p style={{ fontSize: "12px", marginBottom: "1.5rem" }}>
        <a href="/" style={{ color: "#1e40af", textDecoration: "none" }}>← Back to Life Insurance Coverage Calculator</a>
      </p>

      <h1 style={{ fontFamily: "Georgia, serif", fontSize: "2rem", marginBottom: ".5rem" }}>Terms of Service</h1>
      <p style={{ fontSize: "12px", color: "#888", marginBottom: "2rem" }}>Last updated: May 19, 2026</p>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: ".75rem" }}>Acceptance of terms</h2>
        <p style={{ fontSize: "13px", lineHeight: "1.8", color: "#444" }}>
          By using Life Insurance Coverage Calculator, you agree to these Terms of Service.
        </p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: ".75rem" }}>Accuracy of results</h2>
        <p style={{ fontSize: "13px", lineHeight: "1.8", color: "#444" }}>
          Results are estimates based on the DIME method and other common insurance calculation frameworks. Actual coverage needs vary significantly based on individual circumstances, location, and financial goals.
        </p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: ".75rem" }}>No insurance advice</h2>
        <p style={{ fontSize: "13px", lineHeight: "1.8", color: "#444" }}>
          This tool does not constitute insurance advice. Consult a licensed insurance professional before purchasing a life insurance policy.
        </p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: ".75rem" }}>Contact</h2>
        <p style={{ fontSize: "13px", lineHeight: "1.8", color: "#444" }}>
          Contact us through <a href="https://moneywisecalculator.com" style={{ color: "#1e40af" }}>MoneyWise Calculator</a>.
        </p>
      </section>

      <p style={{ fontSize: "12px", color: "#aaa", borderTop: "1px solid #e0dbd3", paddingTop: "1.5rem" }}>
        © 2026 MoneyWise Calculators · <a href="/privacy" style={{ color: "#aaa" }}>Privacy Policy</a>
      </p>
    </main>
  );
}