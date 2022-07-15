import json
from twilio.rest import Client

f = open('../credentials.json')
credentials = json.load(f)

TWILIO_ACCOUNT_SID = credentials['TWILIO_ACCOUNT_SID']
TWILIO_AUTH_TOKEN = credentials['TWILIO_AUTH_TOKEN']
client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

print("Message log:")
for msg in client.messages.list():
    print(msg.body)

MY_PHONE_NUMBER = credentials['MY_PHONE_NUMBER']
MY_TWILIO_PHONE_NUMBER = credentials['MY_TWILIO_PHONE_NUMBER']
new_msg = client.messages.create(
    to=MY_PHONE_NUMBER,
    from_=MY_TWILIO_PHONE_NUMBER,
    body="Coucou! (sent from Python)"
)
print(f"Just created a new message {new_msg.sid}:\n{new_msg.body}")
