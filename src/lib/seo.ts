import type { Metadata } from "next";
import { SITE_URL, SOCIAL_IMAGE_URL, STORE_NAME } from "./config";

export function createPageMetadata({
  title,
  description,
  path,
  image = SOCIAL_IMAGE_URL,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const url = `${SITE_URL}${path || "/"}`;

  return {
    title,
    description,
    alternates: { canonical: path || "/" },
    openGraph: {
      title: `${title} | ${STORE_NAME}`,
      description,
      url,
      siteName: STORE_NAME,
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: `${STORE_NAME} editorial fashion` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${STORE_NAME}`,
      description,
      images: [image],
    },
  };
}
