import * as functions from "firebase-functions";

// boolean to control ignoring slack bots to prevent loops
const ignoreSlackBots = true;

// list of responses that we could send back
const responses = [
  'Cat poop sleeps for no one',
];

// list of trigger words (case insensitive)
const triggerWords = [
  'WFH'
];

/**
 * Intercept slack messages and post a random response whenever
 * the message text contains one of the trigger words
 */
export const helloSlack = functions.https.onRequest((request, response) => {
  if (request) {
    // just logging things
    console.log(request.body);

    // ignore messages from slack bots if ignoreSlackBots === true
    const ignoreMessage = ignoreSlackBots && request.body.user_id === 'USLACKBOT';
    
    // if the message contains one of the trigger words,
    // grab a random response and reply back in the channel
    if (!ignoreMessage && triggered(request.body.text)) {
      const text = responses[Math.floor(Math.random() * responses.length)];
      response.status(200).send({ text });
    }
  } else {
    console.log('Request Error...');
    throw response.status(500);
  }
});

/**
 * Determine if the message contains one of the trigger words
 * @param text the message from slack
 */
function triggered(text: string) {
  const lowercase = text.toLowerCase();
  for (const word of triggerWords) {
    if (lowercase.includes(word.toLowerCase())) {
      return true;
    }
  }
  return false;
}