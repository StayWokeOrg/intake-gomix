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

- [ ] Even if there's only a single topic selected, make it an array for consistency

- [ ] Put it on a real subdomain
- [ ] Fix Firebase contacts on map thing
- [ ] Consider additionally indexing contacts by zip for easy lookup
- [ ] Take a look at failing tests and update for Firebase's different input requirements
- [ ] Fix the lint command since we don't have a `src` directory


- [ ] Bring back the option for social auth
- [ ] Figure out why debug isn't logging to console
