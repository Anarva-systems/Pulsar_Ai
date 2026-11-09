import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default [
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Images are plain <picture> elements with AVIF/WebP sources and explicit dimensions, by design.
      "@next/next/no-img-element": "off",
    },
  },
  { ignores: [".next/**", "node_modules/**", "next-env.d.ts", "scripts/**"] },
];
