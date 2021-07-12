require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Setup = require('./models/Setup')

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

mongoose.connect(process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


// TO set for slack verif, then to comment
// Start a basic HTTP server
// slackEvents.start(PORT).then(() => {
//   // Listening on path '/slack/events' by default
//   console.log(`server listening on port ${PORT}`);
// });

app.use(express.static('public'));
app.set('views', './views')
app.set('view engine', 'ejs')

// Attach listeners to events by Slack Event "type". See: https://api.slack.com/events/message.im
// slackEvents.on('message', (event) => {
//   console.log(`Received a message event: user ${event.user} in channel ${event.channel} says ${event.text}`);
// });
// Handle errors (see `errorCodes` export)
slackEvents.on('error', console.error);


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const devUrl = 'https://joypool12.bubbleapps.io/version-test/api/1.1/wf/endpoint-rc/'
const prodUrl = 'https://joypool12.bubbleapps.io/api/1.1/wf/endpoint-rc/'

// pour set le mode dev ou prod: on vérifie quel mode, il va servir de parametre
let bubbleUrl = Setup.find({ mode: 'active' }, function (err, docs) {
  if (err) {
    console.log(err);
  }
  else {
    console.log("First function call : ", docs[0].urlEndpoint);
    bubbleUrl = docs[0].urlEndpoint
  }
});

console.log('this is bubbleUrl' + bubbleUrl)

// pour creer les modes dev & prod
app.post('/bubble_endpoint', (req, res, next) => {
  const setup = new Setup({
    ...req.body
  });
  setup.save()
    .then(() => res.status(201).json({ message: 'Object added' }))
    .catch(error => res.status(400).json({ error }))
});



// pour update active mode en db
app.post('/change_bubble_endpoint', (req, res, next) => {
  console.log(req.body)
  Setup.updateOne({ mode: 'active'}, { ...req.body})
  .then(
    () => res.status(200).json({ message: 'Objet modifié !'}) )
  .catch(error => res.status(400).json({ error }))
})


// route to update mongodb value -- update
// create the 2 values in mongo-db
  //  1 button with route to update to dev
  // 1 button to update route to prod


// add in the view button to switch
// display the value in the view

app.get('/salut', (req, res) => {
  console.log('saluttttttt')
  let bubbleUrl = Setup.find({ mode: 'active' }, function (err, docs) {
    if (err) {
      console.log(err);
    }
    else {
      console.log("First function call : ", docs[0].urlEndpoint);
      bubbleUrl = docs[0].urlEndpoint
    }
  });
  console.log(bubbleUrl)
  res.send('go back to home !!');
});

app.get('',(req,res) => {
  res.render('index', { active_redir: bubbleUrl, devUrl: devUrl, prodUrl: prodUrl })
})


app.post('/open', function (request, response) {
  // let bubbleUrl = mongoose variable
  // replace string url with bubbleUrl
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
    axios.post(bubbleUrl, data)
      // axios.post('https://joypool12.bubbleapps.io/version-test/api/1.1/wf/endpoint-rc/initialize', data)
      .then((res) => {
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    console.log('dans le else ')
    console.log('request'+' '+request)
    response.sendStatus(200)
    let slack_payload = JSON.parse(request.body.payload);
    let dataPost = {
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
    console.log('response'+' '+ response)
    axios.post(bubbleUrl, dataPost)
      .then((res) => {
      }).catch((err) => {
        console.error(err);
      });
    };
  }
)
