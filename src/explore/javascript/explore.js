const fs = require('fs');
const Twilio = require('twilio');

/* Load client secrets from a local file: */
fs.readFile('../credentials.json', (err, content) => {
    if (err) return console.log("Error loading client secret file:\n", err);
    explore(JSON.parse(content));
});

function explore(credentials) {
    
    const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = credentials;
    const client = new Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

    client.messages
        .list()
        .then(messages =>
            console.log(`The most recent message is:\n${messages[0].body}`)
        )
        .catch(err =>
            console.log(err)
        );

    console.log("Gathering your message log...")

}
