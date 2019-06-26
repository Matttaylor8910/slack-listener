# Slack Listener

Slack Listener is a simple example of how to add a custom integration to slack to listen for key words or phrases in a Slack channel and send back responses. My use case is to listen for someone mentioning that they're working from home so I can reply with a silly excuse we've heard in the past. But there's so much more you can do.

![Cat poop sleeps for no one](https://i.imgur.com/5TrrNSJ.png)

Note: Firebase Cloud Functions are serverless, which means they will sometimes take a few seconds to respond if your function hasn't run in a while. 

## Setup

You will need access to a Slack workspace and a Firebase Console account to set up this bot.

### Firebase Setup

- Sign into or create a new firebase account from the [Firebase Console](https://console.firebase.google.com/)
- Once signed in, click `Add Project` and give your project a name
- Download or clone the repository
- Install [the firebase CLI](https://firebase.google.com/docs/cli): `npm install -g firebase-tools`
- Run `firebase init` from the root of the project and follow the prompts
  - The only feature required for this project is `Functions`
  - Select the project from the list that you just created in the Firebase Console
  - Choose `TypeScript` as the language
  - Then just hit enter for the remaining prompts to take the defaults
- Make any changes to the `responses` and `triggerWords` in `functions/src/index.ts`
- Deploy your function to Firebase by running `firebase deploy` in the root of the project
- Back in the Firebase Console, click the `Functions` menu item, and take note of the request URL. We'll need that for the slack setup. It should be in this format: `https://<region>-<project-name>.cloudfunctions.net/helloSlack`

![Cloud Function URL](https://i.imgur.com/63XFdgl.png)

### Slack Setup

- Sign into slack and navigate to the [Outgoing Webhooks page](https://slack.com/apps/A0F7VRG6Q-outgoing-webhooks)
  - Note: this page is deprecated and might be removed soon
- Click `Add Configuration` on the left, then `Add Outgoing WebHooks integration`
- Under `Integration Settings` choose the channel you want this bot to listen in, or look for any trigger words in any channel. 
  - This is different than the Cloud Function trigger words because the Cloud Function looks for the trigger word in any part of the message, and the slack trigger word(s) must be the start of the slack message.
- Next, paste your function's URL into the `URL(s)` block.
- You can customize the label, name, and icon for your slack bot and when you're happy with it click `Save Settings`
  - Note: this will post in the specified channel that you added an integration, which is how you know it's connected
- Now typing any of the words in the `triggerWords` array within one of your messages will post back a random response from the `responses` array.
