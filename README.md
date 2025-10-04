# Project Enterprise Connect

A minimal Amazon Connect contact center with:
- IVR menu (DTMF: 1 = Rentals, 2 = Fleet)
- Routing to SupportQueue → agent softphone (CCP)
- Real-time metrics for operations
- Optional audit/orchestration via Lambda → DynamoDB

![Enterprise Connect Architecture](https://github.com/user-attachments/assets/a6376854-873a-4e53-a9f5-cfaff6f427cf)

## Quick Links
- **Live Project Page:** CLOUDFRONT_URL (replace after you publish)
- **Demo Video:** LINK_TO_VIDEO (optional)
- **Runbook:** [`docs/runbook.md`](docs/runbook.md)
- **Troubleshooting:** [`docs/troubleshooting.md`](docs/troubleshooting.md)

## Repo Structure
```
project-enterprise-connect/
├─ README.md
├─ flows/
│  └─ MainIVR.json            # Export from Amazon Connect and place here
├─ docs/
│  ├─ runbook.md
│  └─ troubleshooting.md
├─ architecture/
│  ├─ main-ivr.png            # Flow canvas screenshot
│  └─ connect-arch.png        # Simple diagram (IVR → Queue → Agent)
└─ site/
   ├─ index.html              # Portfolio page
   └─ styles.css
```

## How to Reproduce
1. Create Hours (24/7), Queue (SupportQueue), Routing Profile (Tier1Agents), and user (agent1).
2. Build `MainIVR` with a DTMF menu; ensure **Set working queue** is before every transfer.
3. (Optional) After setting the `Dept` attribute on each branch, invoke Lambda `connect-call-audit` with JSON payload to DynamoDB.
4. Export your flow as `flows/MainIVR.json`.
5. Assign your phone number to **MainIVR**; set agent1 Available in CCP; make a test call.
6. Capture screenshots and place them in `architecture/`.
7. Publish `site/` to S3 + CloudFront and replace **CLOUDFRONT_URL** above.
