'use strict';

// Shortcuts to DOM Elements.
var contactForm = document.getElementById('signup-form');

var nameInput = document.getElementById('name');
var emailInput = document.getElementById('email');
var phoneInput = document.getElementById('phone');
var zipInput = document.getElementById('zip');

var signupSection = document.getElementById('signup-section');
var thankYouSection = document.getElementById('thank-you');


window.addEventListener('load', function() {
  contactForm.onsubmit = function(e) {
    e.preventDefault();
    
    var email = emailInput.value;
    var name = nameInput.value;
    var phone = phoneInput.value;
    var zip = zipInput.value;
    var issues = '@todo';
    
    if (name && email && zip) {
      writeNewContact(name, email, phone, zip, issues).then(function() {
        showSection(thankYouSection);
      });
    }
  };
  
  showSection(signupSection);
}, false);


/**
 * Save a signup to the Firebase DB.
 */
function writeNewContact(name, email, phone, zip) {
  // Get a key for a new Contact.
  var newContactKey = firebase.database().ref().child('contacts').push().key;
  
  return firebase.database().ref('contacts/' + newContactKey).set({
    name: name,
    email: email,
    phone: phone,
    zip: zip,
    issues: issues,
  });
}

/**
 * Display a given section element
 */
function showSection(sectionElement) {
  thankYouSection.style.display = 'none';
  signupSection.style.display = 'none';


  if (sectionElement) {
    sectionElement.style.display = 'block';
  }
}