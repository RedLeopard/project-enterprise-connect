# Troubleshooting

## DTMF not detected / must press twice
- Put the greeting **inside** the Get customer input block (DTMF is interruptible).
- Use a local DID (toll-free can buffer tones).
- Menu: DTMF, Min=1, Max=1, Conditions for "1" and "2".
- Publish and wait ~30–60s for changes to propagate.

## Not routing to agent
- Phone number → Contact flow = MainIVR
- Routing profile: Voice=1; includes SupportQueue (Priority 1)
- User (agent1): profile = Tier1Agents; CCP status = Available
- **Set working queue** must be **before** each Transfer to queue.

## Lambda/DynamoDB audit not writing
- Associate `connect-call-audit` to the Connect instance (Routing → AWS Lambda).
- Lambda env var `DDB_TABLE=ConnectCallEvents`; role allows `dynamodb:PutItem`.
- In Invoke block, select function from dropdown and set JSON payload:
  ```json
  {
    "ContactId": "{Contact.Attribute:ContactId}",
    "Dept": "{Attribute:Dept}",
    "Caller": "{Customer Number}",
    "Timestamp": "{CurrentTime}"
  }
  ```
- Check `/aws/lambda/connect-call-audit` logs for errors.
