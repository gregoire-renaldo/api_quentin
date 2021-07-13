code to do first to initialize connection with slack event api :

// from slack api event https://github.com/slackapi/node-slack-sdk
const { createEventAdapter } = require('@slack/events-api');

// TO set for slack verif, then to comment
// Start a basic HTTP server
// slackEvents.start(PORT).then(() => {
//   // Listening on path '/slack/events' by default
//   console.log(`server listening on port ${PORT}`);
// });

// Attach listeners to events by Slack Event "type". See: https://api.slack.com/events/message.im
// slackEvents.on('message', (event) => {
//   console.log(`Received a message event: user ${event.user} in channel ${event.channel} says ${event.text}`);
// });
// Handle errors (see `errorCodes` export)
slackEvents.on('error', console.error);
