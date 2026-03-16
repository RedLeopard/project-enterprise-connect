import json
import logging

logger = logging.getLogger()
logger.setLevel(logging.INFO)

def lambda_handler(event, context):
    # Log the entire event so you can see it in CloudWatch
    logger.info(f"Received event: {json.dumps(event)}")
    
    # Extract details from Amazon Connect
    contact_id = event.get('ContactData', {}).get('ContactId')
    customer_number = event.get('ContactData', {}).get('CustomerEndpoint', {}).get('Address')
    
    print(f"Processing call for ContactID: {contact_id} from {customer_number}")

    # You can add logic here to look up a customer in a DB 
    # and return attributes to the IVR.
    
    # Return a simple map to Amazon Connect
    return {
        "lambdaResult": "Success",
        "customerStatus": "Active",
        "recordLogged": "True"
    }