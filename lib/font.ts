import { Manrope } from "next/font/google";

// The section's typeface, for the root layout and the global 404 page.
export const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-manrope",
});
