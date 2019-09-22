const { RTMClient } = require('@slack/rtm-api');
const token = process.env.SLACK_BOT_TOKEN;

const rtm = new RTMClient(token);

rtm.on('message', async (event) => {
  console.log(event);
  try {
    // Send a welcome message to the same channel where the new member just joined, and mention the user.
    const reply = await rtm.sendMessage(`Welcome to the channel, <@${event.user}>`, event.channel)
    console.log('Message sent successfully', reply.ts);
  } catch (error) {
    console.log('An error occurred', error);
  }
});

(async () => {
  // Connect to Slack
  const { self, team } = await rtm.start();
})();