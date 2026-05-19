export const metadata = {
  title: "Life Insurance Coverage Calculator | Rest At Ease Knowing Your Loved Ones Are Protected",
  description: "Free calculators for mortgage affordability, retirement savings, emergency funds, debt payoff, and more. Make smarter money decisions with tools that do the math for you.",
  
  alternates: {
    canonical: "https:/https://www.lifeinsurancecoveragecalculator.com",           // ← MUST CHANGE
  },

  openGraph: {
    title: "Life Insurance Coverage Calculator | Rest At Ease Knowing Your Loved Ones Are Protected",
    description: "Free calculators for mortgage affordability, retirement savings, emergency funds, debt payoff, and more. Make smarter money decisions with tools that do the math for you.",
    url: "https://www.lifeinsurancecoveragecalculator.com",                 // ← MUST CHANGE
    siteName: "Moneywise Calculators",             // ← Change
    images: [
      {
        url: "https://https://www.lifeinsurancecoveragecalculator.com/og-image.png", // ← MUST CHANGE
        width: 1200,
        height: 630,
        alt: "Life Insurance Coverage Calculator",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Life Insurance Coverage Calculator | Rest At Ease Knowing Your Loved Ones Are Protected",
    description: "Free calculators for mortgage affordability, retirement savings, emergency funds, debt payoff, and more. Make smarter money decisions with tools that do the math for you.",
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

  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },

  authors: [{name: "David Graham" }],
  creator: "MoneyWise Calculators",
  publisher: "MoneyWise Calculators",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3475627763908800"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body>{children}</body>
    </html>
  );
}

