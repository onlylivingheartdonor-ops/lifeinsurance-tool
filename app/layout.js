export const metadata = {
  title: "Life Insurance Coverage Calculator | How Much Life Insurance Do You Need?",
  description: "Calculate how much life insurance coverage your family needs using the DIME method (Debt, Income, Mortgage, Education). Compare with 10× income and Human Life Value methods.",

  alternates: {
    canonical: "https://www.lifeinsurancecoveragecalculator.com",
  },

  openGraph: {
    title: "Life Insurance Coverage Calculator | How Much Life Insurance Do You Need?",
    description: "Calculate how much life insurance coverage your family needs using the DIME method. Compare with 10× income and Human Life Value methods.",
    url: "https://www.lifeinsurancecoveragecalculator.com",
    siteName: "MoneyWise Calculators",
    images: [
      {
        url: "https://www.lifeinsurancecoveragecalculator.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Life Insurance Coverage Calculator — How much coverage do you need?",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Life Insurance Coverage Calculator | How Much Life Insurance Do You Need?",
    description: "Calculate how much life insurance coverage your family needs using the DIME method.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  authors: [{ name: "David Graham" }],
  creator: "MoneyWise Calculators",
  publisher: "MoneyWise Calculators",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3475627763908800"
          crossOrigin="anonymous"
        ></script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Life Insurance Coverage Calculator",
              description: "Free tool to calculate how much life insurance coverage your family needs using the DIME method (Debt, Income, Mortgage, Education).",
              url: "https://www.lifeinsurancecoveragecalculator.com",
              applicationCategory: "FinanceApplication",
              operatingSystem: "All",
              browserRequirements: "Requires JavaScript",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD"
              },
              author: {
                "@type": "Organization",
                name: "MoneyWise Calculators",
                url: "https://moneywisecalculator.com"
              }
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}