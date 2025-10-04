# Runbook — 60–90s Demo Script

1) **Overview** — “This is Project Enterprise Connect: an Amazon Connect IVR that routes callers to SupportQueue.
   Here’s the flow canvas showing Menu → SetDept → (Invoke Lambda) → SetWorkingQueue → Transfer.”
2) **Live Test** — Place a call, press 1 or 2, show CCP ringing.
3) **Ops Visibility** — Show Real-time metrics (Contacts in queue, Agent states).
4) **Audit Hook** (Optional) — Show DynamoDB row created by Lambda on selection.
5) **Next Steps** — Callbacks, business hours, CRM screen-pop.

## Key Artifacts to Show
- Flow canvas screenshot (`architecture/main-ivr.png`)
- Number assigned to MainIVR
- Routing profile (Voice=1; SupportQueue)
- Real-time metrics widgets
- DynamoDB table with a row from a real call
