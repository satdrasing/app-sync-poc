import { Amplify } from 'aws-amplify';
import { events } from 'aws-amplify/data';

Amplify.configure({
    "API": {
        "Events": {
            "endpoint": "https://<APPSYNC_ENDPOINT>/event",
            "region": "ap-south-1",
            "defaultAuthMode": "apiKey",
            "apiKey": "<KEY>"
        }
    }
});

const channel = await events.connect('/default/test');
channel.subscribe({
    next: (data) => {
        document.getElementById("eventsLog").insertAdjacentText("beforeend", JSON.stringify(data) + '\n');
    },
    error: (err) => console.error('error', err),
});