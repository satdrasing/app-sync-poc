
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

export const lambdaHandler = async (event, context) => {

    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'hello world',
      })
    };

    await events.post('/default/test', {some: response});
    return response;
  };
  