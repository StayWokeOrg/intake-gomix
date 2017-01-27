# Intake on GoMix

Forked from this:
https://firebase-quickstart.gomix.me/

and this:

https://github.com/staywokeorg/intake

## Todo
- [x] Import icon fonts
- [x] Make success page look better
- [x] Make the entire firebase transaction happen on the Node side instead of the frontend to make it more secure
- [x] Figure out why web.js@submit is timing out
- [x] Move the build scripts over so we can rely on grunt/etc.
- [x] Make sure it's easy (and documented) to get this version running locally
- [x] Bring over tests and Travis config
- [x] Move the docs over
- [x] Figure out why debug isn't logging to console

- [ ] Even if there's only a single topic selected, make it an array for consistency

- [ ] Put it on a real subdomain
- [ ] Fix Firebase contacts on map thing
- [ ] Consider additionally indexing contacts by zip for easy lookup
- [ ] Take a look at failing tests and update for Firebase's different input requirements
- [ ] Fix the lint command since we don't have a `src` directory

- [ ] Bring back the option for social auth


Original README:

# StayWoke intake application

The goal: to capture the contact information for as many people who are attending a protest as possible, for the purpose of getting them to be more connected and involved in future actions.

## Getting started

- `cp .env.example .env`
- Open `.env` in your editor. You may need to fill in some values for your dev. See comments in that file.
- `npm install`
- `npm run build`
- `npm start`
- `open http://localhost:3030`

## Updating the build
If you’re making changes to styles.less, you can use `npm run build:watch` in a new shell and it will rebuild on every save.

## Running tests
- `npm test`
- `npm run test:watch` to run continuously

## To test SMS

### 1. Set up ngrok
`ngrok` is software that allows you to expose your local dev server to the world using a dynamic domain name, e.g. http://yourngrokurl.ngrok.io.
- [Sign up for ngrok](https://ngrok.com/).
- [Install ngrok](https://ngrok.com/download). If you use [homebrew](http://brew.sh) on a Mac, you can do `brew cask install ngrok`.
- Install your ngrok authtoken. The command for this can be found on your [ngrok dashboard](https://dashboard.ngrok.com/get-started).
- In a new shell, start ngrok with `ngrok http 3030`. (Make sure your express server is already running.)
- Copy your ngrok hostname; you'll need it to configure Twilio.

### 2. Set up Twilio
Twilio is the API server that routes SMS messages to this app.
- [Sign up for a Twilio trial account](https://www.twilio.com). You can use this account indefinitely, but you'll only be able to interact with your own phone number.
- [Buy a phone number](https://www.twilio.com/console/phone-numbers/search). I think the lowest price is $1/month. (I think new Twilio users get $1 in free credits, so you won't have to enter payment info right away.)
- Configure your phone number in Twilio. In the messaging section, set a webhook for when a message comes in, routing to `http://yourngrokurl.ngrok.io/sms`. You'll need to reset this with a new URL each time you start ngrok.

### 3. Send a text
Send an SMS to your new Twilio phone number, from your own phone. You should see the response logged in your express console, and you should get an SMS reply back to your phone.

## Read more

See the [purpose document](docs/purpose.md) to learn about what we're aiming to accomplish.
