# codetitan-demo

A sample TypeScript app used to demonstrate [CodeTitan](https://codetitan.dev) in action.

**See the [Pull Requests](../../pulls) tab** to watch CodeTitan catch real issues on live PRs.

## What this repo shows

- The CodeTitan GitHub Action running on every PR
- Diff-aware analysis (only changed files, not the whole repo)
- PR comments with findings, risk score, and a shareable report link
- What a clean pass looks like vs. a gate failure

## How to add CodeTitan to your own repo

Add this to `.github/workflows/codetitan.yml`:

```yaml
- uses: actions/checkout@v4
- uses: Noa-Lia/codetitan.dev@v1
- uses: actions/upload-artifact@v4
  with:
    name: codetitan-report
    path: codetitan-report.json
```

That's it. The first 3 scans are free — no account required.

## Running locally

```bash
npm install -g @noalia/codetitan
codetitan analyze .
```

Or cold-audit any public repo:

```bash
codetitan analyze --public expressjs/express --share
```
