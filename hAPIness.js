const express = require('express');
const bodyParser = require("body-parser");

const axios = require('axios');



// Nous définissons ici les paramètres du serveur.
const hostname = 'localhost';
const port = 3000;

const app = express();

// Démarrer le serveur
app.listen(port, hostname, function () {
  console.log("Mon serveur fonctionne sur http://" + hostname + ":" + port + "\n");
});

app.use(express.json());
// url to set on slack, not http://localhost:3000/actions ....
app.post('/open', function (request, response) {
  const data = {
    type: request.body.type,
    user: request.body.user,
    channel: request.body.channel,
    event_ts: request.body.event_ts,
    tab: request.body.tab,
    id: request.body.view.id,
    team_id: request.body.view.team_id,
    type_view: request.body.view.type,
    private_metadata: request.body.view.private_metadata,
    callback_id: request.body.view.callback_id,
    hash: request.body.view.hash,
    clear_on_close: request.body.view.clear_on_close,
    notify_on_close: request.body.view.notify_on_close,
    root_view_id: request.body.view.root_view_id,
    app_id: request.body.view.app_id,
    external_id: request.body.view.external_id,
    app_installed_team_id: request.body.view.app_installed_team_id,
    bot_id: request.body.view.bot_id,
  }
  // console.log(data)
  response.json(data)
  // change the url for bubble's url
  axios.post('https://reqres.in/api/users', data)
    .then((res) => {
      console.log(res.headers);
      console.log(`Status: ${res.status}`);
      console.log('Body: ', res.data);
    }).catch((err) => {
      console.error(err);
    });
  })


app.post('/actions', function (request, response) {
  // console.log(request.body);
  // console.log(response)
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
  response.json(data)
  // change the url for bubble's url
  axios.post('https://reqres.in/api/users', data)
    .then((res) => {
      // console.log(res.headers);
      // console.log(`Status: ${res.status}`);
      console.log('Body: ', res.data);
    }).catch((err) => {
      console.error(err);
    });
});



