// Smoke test for v1.0.10 engine fixes via @v1 Action path.
// Two patterns should produce ZERO HIGH/CRITICAL findings:
//
// v5-A — Google Client Secret form-placeholder (placeholder: + GOC[Ss][PpHh]X- prefix)
const googleClientSecretField = {
  label: "Google Client Secret",
  placeholder: "GOCShX-ADp4cI0kPqav1gGCBg5bE02E",
  required: true,
};

// v5-B — Vite VITE_ ENV_HARVEST recognition (multi-line .filter chain)
const viteEnv = Object.keys(process.env)
  .filter((k) => k.startsWith("VITE_"))
  .reduce((a, k) => { a[k] = process.env[k] ?? ""; return a; }, {} as Record<string, string>);

export default { googleClientSecretField, viteEnv };
