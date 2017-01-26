/**
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

// Shortcuts to DOM Elements.
var contactForm = document.getElementById('contact-form');
var nameInput = document.getElementById('new-contact-name');
var emailInput = document.getElementById('new-contact-email');
var signInButton = document.getElementById('sign-in-button');
var signOutButton = document.getElementById('sign-out-button');
var splashPage = document.getElementById('page-splash');

var signupForm = document.getElementById('signup-form');
var thankYouSection = document.getElementById('thank-you');


// Bindings on load.
window.addEventListener('load', function() {
  /*
  // Bind Sign in button.
  signInButton.addEventListener('click', function() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  });

  // Bind Sign out button.
  signOutButton.addEventListener('click', function() {
    firebase.auth().signOut();
  });
  

  // Listen for auth state changes
  firebase.auth().onAuthStateChanged(onAuthStateChanged);
  */

  // Saves contact on form submit.
  contactForm.onsubmit = function(e) {
    e.preventDefault();
    
    var email = emailInput.value;
    var name = nameInput.value;
    
    if (name && email) {
      writeNewContact(name, email).then(function() {
        showSection(thankYouSection);
      });
      
      emailInput.value = '';
      nameInput.value = '';
    }
  };
  
  showSection(signupForm);
}, false);


/**
 * Saves a new contact to the Firebase DB.
 */
// [START write_fan_out]
function writeNewContact(name, email) {
  // Get a key for a new Contact.
  var newContactKey = firebase.database().ref().child('contacts').push().key;
  
  return firebase.database().ref('contacts/' + newContactKey).set({
    name: name,
    email: email,
  });
}
// [END write_fan_out]

/**
 * Displays the given section element and changes styling of the given button.
 */
function showSection(sectionElement, buttonElement) {
  thankYouSection.style.display = 'none';
  signupForm.style.display = 'none';


  if (sectionElement) {
    sectionElement.style.display = 'block';
  }
  if (buttonElement) {
    buttonElement.classList.add('is-active');
  }
}















/**
 * The ID of the currently signed-in User. We keep track of this to detect Auth state change events that are just
 * programmatic token refresh but not a User status change.
 */
var currentUID;

/**
 * Triggers every time there is a change in the Firebase auth state (i.e. user signed-in or user signed out).
 */
function onAuthStateChanged(user) {
  // We ignore token refresh events.
  if (user && currentUID === user.uid || !user && currentUID === null) {
    return;
  }
  currentUID = user ? user.uid : null;

  if (user) {
    splashPage.style.display = 'none';
    writeUserData(user.uid, user.displayName, user.email, user.photoURL);
  } else {
    // Display the splash page where you can sign-in.
    splashPage.style.display = '';
  }
}


/**
 * Writes the user's data to the database.
 */
// [START basic_write]
function writeUserData(userId, name, email, imageUrl) {
  firebase.database().ref('users/' + userId).set({
    username: name,
    email: email,
    profile_picture : imageUrl
  });
}
// [END basic_write]
