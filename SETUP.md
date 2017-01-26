## What You Need
*   A [Google Account](https://firebase.google.com/)

## Step 1: Set up your App in Firebase
Start by [remixing the example project](https://gomix.com/#!/remix/Firebase/fb2f9ebf-77b2-4f81-9f07-e5425f261f57), so that you have your own copy of the code. Then create a new project from the [Firebase Console](https://console.firebase.google.com/) by selecting 'Create new project' and setting your project name and region. You can then create a Service Account by clicking on the Settings cog icon and selecting Permissions > Service Accounts > Create Service Account. Enter Project > Editor under 'Role', and check the box for 'Furnish a new private key', leaving JSON selected. This will generate and download a JSON file containing your credentials.

## Step 2: Add your App credentials to .env
Using the details in that JSON file, we can now enter our Firebase app credentials into the `.env` file. Open the JSON file and copy and paste the corresponding values for `PROJECT_ID`, `CLIENT_EMAIL`, and `PRIVATE_KEY` into the `.env` file. You want to copy everything between the quotes. If you have and are going to use a Gmail account to send notification emails, then add your details for `GMAIL_USERNAME` and `GMAIL_PASSWORD` into the `.env` file too. You might need to use an app-specific password. However, if you're going to use another email sender (like SendGrid, Mandrill, Mailgun etc.), then you'll need to configure your email transport settings in `index.js` (you might find the code in our [Nodemailer/Mailgun example project](https://gomix.com/#!/project/nodemailer) useful for that). Now you need to paste the initialization snippet (Select 'Add Firebase to your web app' from your app's homepage in Firebase) into the head of `public/index.html`, replacing the commented out `TODO(DEVELOPER)` section.

## Step 3: Configure Your App
Lastly, since this example uses Google Auth, we need to enable Google Auth from the Auth > Sign-in Method tab in Firebase. Then add your project's publish URL to the list of 'OAuth redirect domains' further down the page. Your project's publish URL is the URL shown when you click 'Show' and will have the format project-name.gomix.me. So in our example, we entered 'firebase-quickstart.gomix.me' after selecting 'Add Domain', and then we click 'Add' to finish.

## Code Overview
The important parts of the code are mainly split between two files. Both are well commented, so I'll avoid duplicating their comments here. But essentially:

*   `index.js` implements the back-end components for sending notification emails, updating project metadata and listening out for in-app events and HTTP requests.

*   `public/scripts/main.js` uses the [Firebase JavaScript API](https://www.firebase.com/docs/web/api/) for creating posts, stars, and comments as well as handling user-input.

If you now go to your app you should be able to login with Google Auth, then create posts with messages, and add comments. When you star a post you should also receive a notification email too. 