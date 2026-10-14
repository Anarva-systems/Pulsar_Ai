# Calm UI (design canvas "Pulsar Support: calmer UI"), fixture screenshots

The app now follows the design canvas's four screens and its Tokens sheet, frozen in
`platform/operator-app/src/ui/tokens.css`: a cool grey canvas, white cards, ink text and
one accent (Vega's vermilion) for Vega, needs-you dots, focus and the loader. State colour
lives only in chips; the page title appears once; each section is one card with its
footer inside; the top bar is search, one status pill and Vega.

Rendered at 1280x800, light theme, from `dev-fixtures/index.html` with the dev-only fixture
bridge (rows marked FIXTURE), saved at 800x500. Fixture screenshots, not product evidence.
The previous look (website palette) is in `../m2/`.

- `sign-in.jpg`: email first; the workspace's sign-in policy then opens company SSO (for
  listed email domains) or asks for a password (`sign-in-password.jpg`, showing the one
  answer given for a wrong password, an unknown email and a locked ID). An admin's
  one-time code typed as the password leads to choosing a password.
- `sign-in-code.jpg`: the authenticator-app code step when two-factor codes are on
- `sign-in-enroll.jpg`: first sign-in when the workspace requires codes but the person
  has none yet (the setup key is a FIXTURE value)
- `settings-account.jpg`: password, two-factor codes, where you are signed in
- `settings-team.jpg`: people with a Two-factor column, and the Sign-in policy card
  (SSO domains, password on or off, codes required)
- `inbox.jpg`: Needs you / Open / Resolved plus More views; at most two chips per row
- `approvals.jpg`: one card per request, amount on the right, evidence, actions in the footer
- `security.jpg`: one card, monitor status in its header, the advisory note in its footer

Insights, Settings and dark mode were not in the canvas; they follow the same rules.
