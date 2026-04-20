import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lake Washington Square — Melbourne, FL Retail Investment",
  description:
    "Invest in Lake Washington Square: a 111,858 SF, 100%-leased NNN neighborhood retail center in Melbourne, FL with 7.8% Year-1 cash-on-cash and 23-tenant diversity.",
  alternates: {
    canonical:
      "https://risingtidepg.com/investments/lake-washington-square",
  },
  openGraph: {
    title:
      "Lake Washington Square — Melbourne, FL Retail Investment",
    description:
      "111,858 SF, 100%-leased NNN retail center in Melbourne, FL. 7.8% Year-1 cash-on-cash, 23-tenant portfolio, Space Coast growth corridor. Capital raise open.",
    url: "https://risingtidepg.com/investments/lake-washington-square",
    images: [
      {
        url: "https://risingtidepg.com/images/og-card.png",
        width: 1200,
        height: 630,
        alt: "Lake Washington Square — Rising Tide Property Group Partners",
      },
    ],
  },
};

export default function LakeWashingtonSquareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
