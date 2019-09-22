// https://slack.dev/node-slack-sdk/rtm-api

const { RTMClient } = require('@slack/rtm-api');
const token = process.env.SLACK_BOT_TOKEN;

const rtm = new RTMClient(token);

const { WebClient } = require('@slack/web-api');
const web = new WebClient(token);

rtm.on('message', async (event) => {
  console.log(event);
  try {
    // Send a welcome message to the same channel where the new member just joined, and mention the user.
    // const reply = await rtm.sendMessage(`Welcome to the channel, <@${event.user}>`, event.channel)
    // console.log('Message sent successfully', reply.ts);


    const result = await web.chat.postMessage({
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `Welcome to the channel, <@${event.user}>. We're here to help. Let us know if you have an issue.`,
          },
          accessory: {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'Get Help',
            },
            value: 'get_help',
          },
        },
      ],
      channel: event.channel,
    });
    console.log('Message sent successfully', result.ts);
  } catch (error) {
    console.log('An error occurred', error);
  }
});

rtm.on('authenticated', async (event) => {
  console.log("認証されました。");
});

(async () => {
  // Connect to Slack
  const { self, team } = await rtm.start();
})();