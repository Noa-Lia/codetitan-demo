// Smoke test for v1.0.9 engine fix: EVAL_USAGE must NOT flag bundler module-identity literals.
// If the published engine 1.0.9 is correctly bundled in @v1, this file should produce
// zero HIGH/CRITICAL findings.

if (require.main === require.cache[eval('__filename')]) {
  console.log('Module is main');
}

module.exports = { isMain: true };
