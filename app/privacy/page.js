export const metadata = {
  title: "Privacy Policy | Life Insurance Coverage Calculator",
  description: "Privacy policy for Life Insurance Coverage Calculator. Learn how we handle data, cookies, and third-party services including Google AdSense and Google Analytics.",
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <main style={{ maxWidth: "780px", margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'DM Mono', monospace", color: "#1a1a1a", background: "#faf8f4", minHeight: "100vh" }}>
      <p style={{ fontSize: "12px", marginBottom: "1.5rem" }}>
        <a href="/" style={{ color: "#1e40af", textDecoration: "none" }}>← Back to Life Insurance Coverage Calculator</a>
      </p>

      <h1 style={{ fontFamily: "Georgia, serif", fontSize: "2rem", marginBottom: ".5rem" }}>Privacy Policy</h1>
      <p style={{ fontSize: "12px", color: "#888", marginBottom: "2rem" }}>Last updated: May 19, 2026</p>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: ".75rem" }}>About this site</h2>
        <p style={{ fontSize: "13px", lineHeight: "1.8", color: "#444" }}>
          Life Insurance Coverage Calculator (lifeinsurancecoveragecalculator.com) is a free tool that helps users estimate how much life insurance coverage their family needs. It is operated by MoneyWise Calculators, a network of free online financial tools.
        </p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: ".75rem" }}>Information we do not collect</h2>
        <p style={{ fontSize: "13px", lineHeight: "1.8", color: "#444" }}>
          We do not collect, store, or transmit any financial data you enter into this tool. Income, debt, mortgage, and savings information are processed entirely within your browser. Nothing you enter is sent to our servers or shared with any third party.
        </p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: ".75rem" }}>Cookies & Third-party services</h2>
        <p style={{ fontSize: "13px", lineHeight: "1.8", color: "#444" }}>
          This site uses cookies for analytics and advertising via Google AdSense and Google Analytics. You may opt out of personalized advertising by visiting{" "}
          <a href="https://www.google.com/settings/ads" style={{ color: "#1e40af" }} target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.
        </p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: ".75rem" }}>Contact</h2>
        <p style={{ fontSize: "13px", lineHeight: "1.8", color: "#444" }}>
          Contact us through <a href="https://moneywisecalculator.com" style={{ color: "#1e40af" }}>MoneyWise Calculator</a>.
        </p>
      </section>

      <p style={{ fontSize: "12px", color: "#aaa", borderTop: "1px solid #e0dbd3", paddingTop: "1.5rem" }}>
        © 2026 MoneyWise Calculators · <a href="/terms" style={{ color: "#aaa" }}>Terms of Service</a>
      </p>
    </main>
  );
}