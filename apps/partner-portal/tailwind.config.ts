import type { Config } from "tailwindcss";

// Colors reproduced from ../../design-system/biotest-design-system-colors.csv —
// same tokens as patient-app, not re-derived. Partner Portal is navy-forward
// per client-apps-plan.md (professional B2B chrome) but the accent role stays
// the same teal used everywhere else.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          50: "#E7EBF2",
          100: "#CFD9E8",
          200: "#A9BAD6",
          300: "#7C93BB",
          400: "#5773A0",
          500: "#14305C",
          600: "#102647",
          700: "#0C1D37",
          800: "#08142A",
          900: "#05101C",
          950: "#020810",
        },
        teal: {
          50: "#EAF6F6",
          100: "#D3EDEC",
          200: "#ABDCDB",
          300: "#7CC7C6",
          400: "#4FB0AE",
          500: "#0E7C7F",
          600: "#0C6668",
          700: "#0A5456",
          800: "#084244",
        },
        mist: "#F7F9FC",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
      borderRadius: {
        card: "8px",
      },
    },
  },
  plugins: [],
};

export default config;
