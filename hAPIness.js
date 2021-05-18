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

const PORT = process.env.PORT || 3000
const app = express();
// Démarrer le serveur
app.listen(PORT, () => console.log(`Listening on ${PORT}`))

// TO set for slack verif, then to comment
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
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/open', function (request, response) {
  console.log('avant le if, dans /open requuest =' + request)
  if (request.body.hasOwnProperty('event') && request.body.event.type == "app_home_opened") {
    console.log(" dans le opennnn")
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
    console.log(request.body.event.type)
    // change the url for bubble's url
    axios.post('https://joypool12.bubbleapps.io/version-test/api/1.1/wf/endpoint-rc/', data)
      // axios.post('https://joypool12.bubbleapps.io/version-test/api/1.1/wf/endpoint-rc/initialize', data)
      .then((res) => {
        // console.log(res.headers);
        // console.log(`Status: ${res.status}`);
      }).catch((err) => {
        console.error(err);
      });
  } else {
    console.log('dans le else ')
    const slack_payload = JSON.parse(request.body.payload);
    const data = {
      type: slack_payload.type,
      user_id: slack_payload.user.id,
      user_username: slack_payload.user.username,
      user_name: slack_payload.user.name,
      user_team_id: slack_payload.user.team_id,
      api_app_id: slack_payload.api_app_id,
      token: slack_payload.token,
      container_type: slack_payload.container.type,
      container_message: slack_payload.container.message,
      container_channel_id: slack_payload.container.channel_id,
      container_is_ephemmeral: slack_payload.container.container_is_ephemmeral,
      trigger_id: slack_payload.trigger_id,
      team_id: slack_payload.team.id,
      team_domain: slack_payload.team.domain,
      enterprise: slack_payload.enterprise,
      is_enterprise_install: slack_payload.is_enterprise_install,
      channel_id: slack_payload.channel.id,
      channel_name: slack_payload.channel.name,
      message_bot_id: slack_payload.message.bot_id,
      message_type: slack_payload.message.type,
      message_text: slack_payload.message.text,
      message_user: slack_payload.message.user,
      message_ts: slack_payload.message.ts,
      message_team: slack_payload.message.team,
      // message_blocks_block_1_type: slack_payload.message.blocks[0].type,
      // message_blocks_block_1_block_id: slack_payload.message.blocks[0].block_id,
      // message_blocks_block_1_text_type: slack_payload.message.blocks[0].text.type,
      // message_blocks_block_1_text_text: slack_payload.message.blocks[0].text.text,
      // message_blocks_block_1_text_emoji: slack_payload.message.blocks[0].text.emoji,
      // message_blocks_block_2_type: slack_payload.message.blocks[1].type,
      // message_blocks_block_2_block_id: slack_payload.message.blocks[1].block_id,
      // message_blocks_block_2_text_type: slack_payload.message.blocks[1].text.type,
      // message_blocks_block_2_text_text: slack_payload.message.blocks[1].text.text,
      // message_blocks_block_2_text_verbatim: slack_payload.message.blocks[1].text.verbatim,
      // message_blocks_block_2_accessory_type: slack_payload.message.blocks[1].accessory.type,
      // message_blocks_block_2_accessory_image_url: slack_payload.message.blocks[1].accessory.image_url,
      // message_blocks_block_2_accessory_alt_text: slack_payload.message.blocks[1].accessory.alt_text,
      // message_blocks_block_3_type: slack_payload.message.blocks[2].type,
      // message_blocks_block_3_block_id: slack_payload.message.blocks[2].block_id,
      // message_blocks_block_3_elements_1_type: slack_payload.message.blocks[2].elements[0].type,
      // message_blocks_block_3_elements_1_action_id: slack_payload.message.blocks[2].elements[0].action_id,
      // message_blocks_block_3_elements_1_text_type: slack_payload.message.blocks[2].elements[0].text.type,
      // message_blocks_block_3_elements_1_text_text: slack_payload.message.blocks[2].elements[0].text.text,
      // message_blocks_block_3_elements_1_text_emoji: slack_payload.message.blocks[2].elements[0].text.emoji,
      // message_blocks_block_3_elements_1_style: slack_payload.message.blocks[2].elements[0].style,
      // message_blocks_block_3_elements_1_value: slack_payload.message.blocks[2].elements[0].value,
      // message_blocks_block_3_elements_1_url: slack_payload.message.blocks[2].elements[0].url,
      state_values: slack_payload.state.values,
      response_url: slack_payload.response_url,
      actions_1_action_id: slack_payload.actions[0].action_id,
      actions_1_block_id: slack_payload.actions[0].block_id,
      actions_1_text_type: slack_payload.actions[0].text.type,
      actions_1_text_text: slack_payload.actions[0].text.text,
      actions_1_text_emoji: slack_payload.actions[0].text.emoji,
      actions_1_value: slack_payload.actions[0].value,
      actions_1_style: slack_payload.actions[0].style,
      actions_1_type: slack_payload.actions[0].type,
      actions_1_action_ts: slack_payload.actions[0].action_ts,
    }
    // change the url for bubble's url
    // axios.post('https://joypool12.bubbleapps.io/version-test/api/1.1/wf/endpoint-rc/initialize', data)
    // axios.post('https://joypool12.bubbleapps.io/version-test/api/1.1/wf/endpoint-action/', data);
    response.status(200).send('OK')
    // .then((res) => {
    //     console.log('response'+ ' '+response)
    //   }).catch((err) => {
    //     console.error(err);
    //   });
  }
})


// app.post('/open', function (request, response) {
//   const slack_payload = JSON.parse(request.body.payload);
//   console.log(slack_payload)
//     const data = {
//       type: slack_payload.type,
//       user_id: slack_payload.user.id,
//       user_username: slack_payload.user.username,
//       user_name: slack_payload.user.name,
//       user_team_id: slack_payload.user.team_id,
//       api_app_id: slack_payload.api_app_id,
//       token: slack_payload.token,
//       container_type: slack_payload.container.type,
//       container_message: slack_payload.container.message,
//       container_channel_id: slack_payload.container.channel_id,
//       container_is_ephemmeral: slack_payload.container.container_is_ephemmeral,
//       trigger_id: slack_payload.trigger_id,
//       team_id: slack_payload.team.id,
//       team_domain: slack_payload.team.domain,
//       enterprise: slack_payload.enterprise,
//       is_enterprise_install: slack_payload.is_enterprise_install,
//       channel_id: slack_payload.channel.id,
//       channel_name: slack_payload.channel.name,
//       message_bot_id: slack_payload.message.bot_id,
//       message_type: slack_payload.message.type,
//       message_text: slack_payload.message.text,
//       message_user: slack_payload.message.user,
//       message_ts: slack_payload.message.ts,
//       message_team: slack_payload.message.team,
//       // message_blocks_block_1_type: slack_payload.message.blocks[0].type,
//       // message_blocks_block_1_block_id: slack_payload.message.blocks[0].block_id,
//       // message_blocks_block_1_text_type: slack_payload.message.blocks[0].text.type,
//       // message_blocks_block_1_text_text: slack_payload.message.blocks[0].text.text,
//       // message_blocks_block_1_text_emoji: slack_payload.message.blocks[0].text.emoji,
//       // message_blocks_block_2_type: slack_payload.message.blocks[1].type,
//       // message_blocks_block_2_block_id: slack_payload.message.blocks[1].block_id,
//       // message_blocks_block_2_text_type: slack_payload.message.blocks[1].text.type,
//       // message_blocks_block_2_text_text: slack_payload.message.blocks[1].text.text,
//       // message_blocks_block_2_text_verbatim: slack_payload.message.blocks[1].text.verbatim,
//       // message_blocks_block_2_accessory_type: slack_payload.message.blocks[1].accessory.type,
//       // message_blocks_block_2_accessory_image_url: slack_payload.message.blocks[1].accessory.image_url,
//       // message_blocks_block_2_accessory_alt_text: slack_payload.message.blocks[1].accessory.alt_text,
//       // message_blocks_block_3_type: slack_payload.message.blocks[2].type,
//       // message_blocks_block_3_block_id: slack_payload.message.blocks[2].block_id,
//       // message_blocks_block_3_elements_1_type: slack_payload.message.blocks[2].elements[0].type,
//       // message_blocks_block_3_elements_1_action_id: slack_payload.message.blocks[2].elements[0].action_id,
//       // message_blocks_block_3_elements_1_text_type: slack_payload.message.blocks[2].elements[0].text.type,
//       // message_blocks_block_3_elements_1_text_text: slack_payload.message.blocks[2].elements[0].text.text,
//       // message_blocks_block_3_elements_1_text_emoji: slack_payload.message.blocks[2].elements[0].text.emoji,
//       // message_blocks_block_3_elements_1_style: slack_payload.message.blocks[2].elements[0].style,
//       // message_blocks_block_3_elements_1_value: slack_payload.message.blocks[2].elements[0].value,
//       // message_blocks_block_3_elements_1_url: slack_payload.message.blocks[2].elements[0].url,
//       state_values: slack_payload.state.values,
//       response_url: slack_payload.response_url,
//       actions_1_action_id: slack_payload.actions[0].action_id,
//       actions_1_block_id: slack_payload.actions[0].block_id,
//       actions_1_text_type: slack_payload.actions[0].text.type,
//       actions_1_text_text: slack_payload.actions[0].text.text,
//       actions_1_text_emoji: slack_payload.actions[0].text.emoji,
//       actions_1_value: slack_payload.actions[0].value,
//       actions_1_style: slack_payload.actions[0].style,
//       actions_1_type: slack_payload.actions[0].type,
//       actions_1_action_ts: slack_payload.actions[0].action_ts,
//     }
//     console.log('data'+ ' '+ data)
//     // console.log("actionnnn" + response.json(data))
//     // console.log(request.body)
//     // change the url for bubble's url
//     // axios.post('https://joypool12.bubbleapps.io/version-test/api/1.1/wf/endpoint-rc/initialize', data)
//     // axios.post('https://joypool12.bubbleapps.io/version-test/api/1.1/wf/endpoint-rc/', data)
//     axios.post('https://joypool12.bubbleapps.io/version-test/api/1.1/wf/endpoint-action/initialize', data)
//       .then((res) => {
//         // console.log(res.headers);
//         // console.log(`Status: ${res.status}`);
//         // console.log('Body: action', res.data);
//       }).catch((err) => {
//         console.error(err);
//       });
//   }
// )
