import type { MetadataRoute } from "next";

const siteUrl = "https://mohamed-kchaou-portfolio.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: siteUrl }];
}
