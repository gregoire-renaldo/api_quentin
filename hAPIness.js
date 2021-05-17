require('dotenv').config()
// this is my index.js
const express = require('express');

// from slack api event https://github.com/slackapi/node-slack-sdk
const { createEventAdapter } = require('@slack/events-api');
const slackEvents = createEventAdapter(process.env.SLACK_SIGNING_SECRET);

const bodyParser = require("body-parser");
const axios = require('axios');
// pour tester lancer ngrok sur port 3000 ./ngrok http 3000  (simule un serveur)
// https://d7335118911c.ngrok.io/open

// Nous définissons ici les paramètres du serveur.
const PORT = process.env.PORT || 3000
const app = express();
// Démarrer le serveur
app.listen(PORT, () => console.log(`Listening on ${PORT}`))

// Start a basic HTTP server
// slackEvents.start(PORT).then(() => {
//   // Listening on path '/slack/events' by default
//   console.log(`server listening on port ${PORT}`);
// });

app.use(express.static('public'));

// Attach listeners to events by Slack Event "type". See: https://api.slack.com/events/message.im
// slackEvents.on('message', (event) => {
//   console.log(`Received a message event: user ${event.user} in channel ${event.channel} says ${event.text}`);
// });

// Handle errors (see `errorCodes` export)
slackEvents.on('error', console.error);

app.get('/', (req, res) => {
  console.log('saluttttttt')
  res.send('hello World');
});

app.use(express.json());
// url to set on slack, not http://localhost:3000/actions ....

app.post('/open', function (request, response) {
  console.log('avant le if, dans /open' + request)
  console.log(request.body)
  if ("type" in request.body.event && request.body.event.type == "app_home_opened") {
    console.log("opennnn")
    const data = {
      token: request.body.token,
      team_id: request.body.team_id,
      api_app_id: request.body.api_app_id,
      event_type: request.body.event.type,
      event_user: request.body.event.user,
      event_channel: request.body.event.channel,
      event_tab: request.body.event.tab,
      event_event_ts: request.body.event.event_ts,
      type: request.body.type,
      event_id: request.body.event_id,
      event_time: request.body.event_time,
      authorizations_enterprise_id: request.body.authorizations[0].enterprise_id,
      authorizations_team_id: request.body.authorizations[0].team_id,
      authorizations_user_id: request.body.authorizations[0].user_id,
      authorizations_is_bot: request.body.authorizations[0].is_bot,
      authorizations_is_enterprise_install: request.body.authorizations[0].is_enterprise_install,
      is_ext_shared_channel: request.body.is_ext_shared_channel
    }
    console.log("home opeeeeened" + response.json(data))
    // change the url for bubble's url
    axios.post('https://joypool12.bubbleapps.io/version-test/api/1.1/wf/endpoint-rc/', data)
      // axios.post('https://joypool12.bubbleapps.io/version-test/api/1.1/wf/endpoint-rc/initialize', data)
      .then((res) => {
        // console.log(res.headers);
        // console.log(`Status: ${res.status}`);
        // console.log('Body: ', res.data);
      }).catch((err) => {
        console.error(err);
      });
  } else if (request.body.type == "block_actions") {
    console.log("block actionsss")
    const data = {
      type: request.body.type,
      user_id: request.body.user.id,
      user_username: request.body.user.username,
      user_name: request.body.user.name,
      user_team_id: request.body.user.team_id,
      api_app_id: request.body.api_app_id,
      token: request.body.token,
      container_type: request.body.container.type,
      container_message: request.body.container.message,
      container_channel_id: request.body.container.channel_id,
      container_is_ephemmeral: request.body.container.container_is_ephemmeral,
      trigger_id: request.body.trigger_id,
      team_id: request.body.team.id,
      team_domain: request.body.team.domain,
      enterprise: request.body.enterprise,
      is_enterprise_install: request.body.is_enterprise_install,
      channel_id: request.body.channel.id,
      channel_name: request.body.channel.name,
      message_bot_id: request.body.message.bot_id,
      message_type: request.body.message.type,
      message_text: request.body.message.text,
      message_user: request.body.message.user,
      message_team: request.body.message.team,
      message_blocks_block_1_type: request.body.message.blocks[0].type,
      message_blocks_block_1_block_id: request.body.message.blocks[0].block_id,
      message_blocks_block_1_text_type: request.body.message.blocks[0].text.type,
      message_blocks_block_1_text_text: request.body.message.blocks[0].text.text,
      message_blocks_block_1_text_emoji: request.body.message.blocks[0].text.emoji,
      message_blocks_block_2_type: request.body.message.blocks[1].type,
      message_blocks_block_2_block_id: request.body.message.blocks[1].block_id,
      message_blocks_block_2_text_type: request.body.message.blocks[1].text.type,
      message_blocks_block_2_text_text: request.body.message.blocks[1].text.text,
      message_blocks_block_2_text_verbatim: request.body.message.blocks[1].text.verbatim,
      message_blocks_block_2_accessory_type: request.body.message.blocks[1].accessory.type,
      message_blocks_block_2_accessory_image_url: request.body.message.blocks[1].accessory.image_url,
      message_blocks_block_2_accessory_alt_text: request.body.message.blocks[1].accessory.alt_text,
      message_blocks_block_3_type: request.body.message.blocks[2].type,
      message_blocks_block_3_block_id: request.body.message.blocks[2].block_id,
      message_blocks_block_3_elements_1_type: request.body.message.blocks[2].elements[0].type,
      message_blocks_block_3_elements_1_action_id: request.body.message.blocks[2].elements[0].action_id,
      message_blocks_block_3_elements_1_text_type: request.body.message.blocks[2].elements[0].text.type,
      message_blocks_block_3_elements_1_text_text: request.body.message.blocks[2].elements[0].text.text,
      message_blocks_block_3_elements_1_text_emoji: request.body.message.blocks[2].elements[0].text.emoji,
      message_blocks_block_3_elements_1_style: request.body.message.blocks[2].elements[0].style,
      message_blocks_block_3_elements_1_value: request.body.message.blocks[2].elements[0].value,
      message_blocks_block_3_elements_1_url: request.body.message.blocks[2].elements[0].url,
      state_values: request.body.state.values,
      response_url: request.body.response_url,
      actions_1_action_id: request.body.actions[0].action_id,
      actions_1_block_id: request.body.actions[0].block_id,
      actions_1_text_type: request.body.actions[0].text.type,
      actions_1_text_text: request.body.actions[0].text.text,
      actions_1_text_emoji: request.body.actions[0].text.emoji,
      actions_1_value: request.body.actions[0].value,
      actions_1_style: request.body.actions[0].style,
      actions_1_type: request.body.actions[0].type,
      actions_1_action_ts: request.body.actions[0].action_ts,
    }
    console.log("actionnnn" + response.json(data))
    // change the url for bubble's url
    // axios.post('https://joypool12.bubbleapps.io/version-test/api/1.1/wf/endpoint-rc/initialize', data)
    // axios.post('https://joypool12.bubbleapps.io/version-test/api/1.1/wf/endpoint-rc/', data)
    axios.post('https://joypool12.bubbleapps.io/version-test/api/1.1/wf/endpoint-action/initialize', data)
      .then((res) => {
        // console.log(res.headers);
        // console.log(`Status: ${res.status}`);
        console.log('Body: action', res.data);
      }).catch((err) => {
        console.error(err);
      });
  } else {
    console.log("something other than home_opened or block_action")
  }

})

// app.post('/open', function (request, response) {
//   const data = {
//     token: request.body.token,
//     team_id: request.body.team_id,
//     api_app_id: request.body.api_app_id,
//     event_type: request.body.event.type,
//     event_user: request.body.event.user,
//     event_channel: request.body.event.channel,
//     event_tab: request.body.event.tab,
//     event_event_ts: request.body.event.event_ts,
//     type: request.body.type,
//     event_id: request.body.event_id,
//     event_time: request.body.event_time,
//     authorizations_enterprise_id: request.body.authorizations[0].enterprise_id,
//     authorizations_team_id: request.body.authorizations[0].team_id,
//     authorizations_user_id: request.body.authorizations[0].user_id,
//     authorizations_is_bot: request.body.authorizations[0].is_bot,
//     authorizations_is_enterprise_install: request.body.authorizations[0].is_enterprise_install,
//     is_ext_shared_channel: request.body.is_ext_shared_channel
//   }
//   console.log(response.json(data))

//   // change the url for bubble's url
//   axios.post('https://joypool12.bubbleapps.io/version-test/api/1.1/wf/endpoint-rc/', data)
//   // axios.post('https://joypool12.bubbleapps.io/version-test/api/1.1/wf/endpoint-rc/initialize', data)
//   .then((res) => {
//     // console.log(res.headers);
//     // console.log(`Status: ${res.status}`);
//     // console.log('Body: ', res.data);
//   }).catch((err) => {
//     console.error(err);
//   });
// })


// app.post('/actions', function (request, response) {
//   // console.log(request.body);
//   // console.log(response)
//   const data = {
//     type: request.body.type,
//     user_id: request.body.user.id,
//     user_username: request.body.user.username,
//     user_name: request.body.user.name,
//     user_team_id: request.body.user.team_id,
//     api_app_id: request.body.api_app_id,
//     token: request.body.token,
//     container_type: request.body.container.type,
//     container_message: request.body.container.message,
//     container_channel_id: request.body.container.channel_id,
//     container_is_ephemmeral: request.body.container.container_is_ephemmeral,
//     trigger_id: request.body.trigger_id,
//     team_id: request.body.team.id,
//     team_domain: request.body.team.domain,
//     enterprise: request.body.enterprise,
//     is_enterprise_install: request.body.is_enterprise_install,
//     channel_id: request.body.channel.id,
//     channel_name: request.body.channel.name,
//     message_bot_id: request.body.message.bot_id,
//     message_type: request.body.message.type,
//     message_text: request.body.message.text,
//     message_user: request.body.message.user,
//     message_team: request.body.message.team,
//     message_blocks_block_1_type: request.body.message.blocks[0].type,
//     message_blocks_block_1_block_id: request.body.message.blocks[0].block_id,
//     message_blocks_block_1_text_type: request.body.message.blocks[0].text.type,
//     message_blocks_block_1_text_text: request.body.message.blocks[0].text.text,
//     message_blocks_block_1_text_emoji: request.body.message.blocks[0].text.emoji,
//     message_blocks_block_2_type: request.body.message.blocks[1].type,
//     message_blocks_block_2_block_id: request.body.message.blocks[1].block_id,
//     message_blocks_block_2_text_type: request.body.message.blocks[1].text.type,
//     message_blocks_block_2_text_text: request.body.message.blocks[1].text.text,
//     message_blocks_block_2_text_verbatim: request.body.message.blocks[1].text.verbatim,
//     message_blocks_block_2_accessory_type: request.body.message.blocks[1].accessory.type,
//     message_blocks_block_2_accessory_image_url: request.body.message.blocks[1].accessory.image_url,
//     message_blocks_block_2_accessory_alt_text: request.body.message.blocks[1].accessory.alt_text,
//     message_blocks_block_3_type: request.body.message.blocks[2].type,
//     message_blocks_block_3_block_id: request.body.message.blocks[2].block_id,
//     message_blocks_block_3_elements_1_type: request.body.message.blocks[2].elements[0].type,
//     message_blocks_block_3_elements_1_action_id: request.body.message.blocks[2].elements[0].action_id,
//     message_blocks_block_3_elements_1_text_type: request.body.message.blocks[2].elements[0].text.type,
//     message_blocks_block_3_elements_1_text_text: request.body.message.blocks[2].elements[0].text.text,
//     message_blocks_block_3_elements_1_text_emoji: request.body.message.blocks[2].elements[0].text.emoji,
//     message_blocks_block_3_elements_1_style: request.body.message.blocks[2].elements[0].style,
//     message_blocks_block_3_elements_1_value: request.body.message.blocks[2].elements[0].value,
//     message_blocks_block_3_elements_1_url: request.body.message.blocks[2].elements[0].url,

//     state_values: request.body.state.values,
//     response_url: request.body.response_url,

//     actions_1_action_id: request.body.actions[0].action_id,
//     actions_1_block_id: request.body.actions[0].block_id,
//     actions_1_text_type: request.body.actions[0].text.type,
//     actions_1_text_text: request.body.actions[0].text.text,
//     actions_1_text_emoji: request.body.actions[0].text.emoji,
//     actions_1_value: request.body.actions[0].value,
//     actions_1_style: request.body.actions[0].style,
//     actions_1_type: request.body.actions[0].type,
//     actions_1_action_ts: request.body.actions[0].action_ts,
//   }
//   response.json(data)
//   // change the url for bubble's url
//   axios.post('https://joypool12.bubbleapps.io/version-test/api/1.1/wf/endpoint-rc/', data)
//     .then((res) => {
//       // console.log(res.headers);
//       // console.log(`Status: ${res.status}`);
//       console.log('Body: ', res.data);
//     }).catch((err) => {
//       console.error(err);
//     });
// });



