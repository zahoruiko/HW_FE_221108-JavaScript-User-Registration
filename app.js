console.log("JS-script is started.");
let _html = {};

// Registration form
_html.signUp =
  '<h1>Sign up</h1>' +
  '<div id="message"></div>' +
  '<form><div class="form-group">' +
  '<label for="username">Username:</label>' +
  '<input type="text" class="form-control" id="username" />' +
  '</div>' +
  '<div class="form-group">' +
  '<label for="exampleInputPassword1">Password:</label>' +
  '<input type="password" class="form-control" id="password1" />' +
  '</div>' +
  '<div class="form-group">' +
  '<label for="exampleInputPassword2">Password confirmation:</label>' +
  '<input type="password" class="form-control" id="password2" />' +
  '</div>' +
  '<br /><button id="signInButton" type="button" class="btn btn-outline-primary">Log in</button> ' +
  'or <button id="singUpButton" type="button" class="btn btn-primary">Sign up</button></form>';

// Login form
_html.signIn =
  '<h1>Log in</h1>' +
  '<span id="message"></span>' +
  '<form><div class="form-group">' +
  '<label for="username">Username:</label>' +
  '<input type="text" class="form-control" id="username" />' +
  '</div>' +
  '<div class="form-group">' +
  '<label for="password">Password:</label>' +
  '<input type="password" class="form-control" id="password" />' +
  '</div>' +
  '<br /><button id="singUpButton" type="button" class="btn btn-outline-primary">Sign up</button> ' +
  'or <button id="signInButton" type="button" class="btn btn-primary">Log in</button></form>';

// form for displaying user data
_html.userData =
  '<h1>User account</h1>' +
  '<div id="message"></div>' +
  '<form><div class="form-group">' +
  '<label for="username">Username:</label>' +
  '<input type="text" class="form-control" id="username" />' +
  '</div>' +
  '<div class="form-group">' +
  '<label for="age">Age:</label>' +
  '<input type="text" class="form-control" id="age" />' +
  '</div>' +
  '<div class="form-group">' +
  '<label for="avatar">Avatar URL:</label>' +
  '<input type="text" class="form-control" id="avatar" />' +
  '</div>' +
  '<br /><button id="signOutButton" type="button" class="btn btn-outline-primary">Log out</button> ' +
  'or <button id="updateButton" type="button" class="btn btn-primary">Update</button></form>';

// Form for the logout page  
_html.signOut = "<h2>You are logged out</h2><hr>";
  '<br /><button id="singUpButton" type="button" class="btn btn-outline-primary">Sign up</button> ' +
  'or <button id="signInButton" type="button" class="btn btn-primary">Log in</button></form>';

// Loading the initial form
document.addEventListener("DOMContentLoaded", function () {
  console.log("Start: Sign up form is loaded.");
  showSignUpForm();
});

// Loading function of HTML fragments into the template container
function _appendWrapper(_htmlBlock) {
  document.getElementById("wrapper").innerHTML = _htmlBlock;
}

// Form for registration and determine the processing of clicking on the buttons
function showSignUpForm() {
  console.log("Called: showSignUpForm()");
  _appendWrapper(_html.signUp);
  document
    .getElementById("singUpButton")
    .addEventListener("click", function () {
      signUp();
    });
  document
    .getElementById("signInButton")
    .addEventListener("click", function () {
      console.log("Switch to login form");
      showSignInForm();
    });
}

// The entry form and determine the processing of pressing the buttons
function showSignInForm() {
  console.log("Called: showSignInForm()");
  _appendWrapper(_html.signIn);
  document
    .getElementById("signInButton")
    .addEventListener("click", function () {
      signIn();
    });
  document
    .getElementById("singUpButton")
    .addEventListener("click", function () {
      showSignUpForm();
    }); 
}

// A form for displaying user data and defining the processing of button clicks
function showUserDataForm() {
  console.log("Called: showUserDataForm()");
  _appendWrapper(_html.userData);
  document
    .getElementById("updateButton")
    .addEventListener("click", function () {
      updateUserData();
    });
  document
    .getElementById("signOutButton")
    .addEventListener("click", function () {
      showSignOutForm();
    });
}

// The form for logging out and defining the processing of button clicks
function showSignOutForm() {
  console.log("Called: showSignOutForm()");
  _appendWrapper(_html.signOut);
  document
    .getElementById("singUpButton")
    .addEventListener("click", function () {
      showSignUpForm();
    });
  document
    .getElementById("signInButton")
    .addEventListener("click", function () {
      showSignInForm();
    });
}

// Processing user registration
async function signUp() {
  console.log("Called: signUp()");
  // We get the data entered by the user from the form
  let username = document.getElementById("username").value.trim();
  console.log("Username = ", username);
  let password = document.getElementById("password1").value.trim();
  console.log("Password1 = ", password);
  let confirmPassword = document.getElementById("password2").value.trim();
  console.log("Password2 = ", confirmPassword);
  // Creating an array to store parts of the text about the identified problems
  let errorAnswerParts = [];
  // We check the presence of the entered data and their validity
  if (username == "") {
    errorAnswerParts.push("your name");
  }
  if (password == "") {
    errorAnswerParts.push("your password");
  }
  if (confirmPassword == "") {
    errorAnswerParts.push("password confirmation");
  }
  if (password !== confirmPassword && password != "" && confirmPassword != "") {
    errorAnswerParts.push("the same password for confirmation");
  }
  // If there are errors, then we display them to the user 
  // and wait for the next click on the registration button
  if (errorAnswerParts.length > 0) {
    document.getElementById("message").innerText =
      "Please enter: " + errorAnswerParts.join(", ").toString();
  } else {
    // If there was no error, then we are trying to register the user
    // Creating a data object that will be sent to a remote server
    let data = {
      username: username,
      password: password,
      confirm_password: confirmPassword,
    };
    // Initialize variables to execute a request from a remote server
    let queryUrl =
      "https://8fd4-2a02-2a57-4052-0-145f-d48e-abbc-890d.eu.ngrok.io/signup";
    let queryBody = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "User-Agent": "telran",
        "ngrok-skip-browser-warning": "69420",
      },
      body: JSON.stringify(data),
    };
    // Initialize a variable to control the result of the request and store the received JSON
    let processingError = false;
    let responseJson;
    try {
      // We send a request and receive a response
      let response = await fetch(queryUrl, queryBody);
      console.log("Response = ", response);
      // Converting the received response to json format
      responseJson = await response.json();
      console.log("ResponseJson = ", responseJson);
    } catch (error) {
      // if an error has occurred, we save the fact of its occurrence in a logical flag
      processingError = true;
      // Displaying the error to the console and to the user
      console.error("Error (fetch & json): " + error);
      document.getElementById("message").innerHTML = error.message;
    }
    // If the response to the request was received without errors
    if (!processingError && responseJson !== undefined) {
      console.log("ResponseJson = " + responseJson);
      console.log("Token = " + responseJson.token);
      localStorage.setItem("token", responseJson.token);  
      console.log("Downloading data for the user's data page from the server");
      getMe();
    } else { // If an error occurred during registration
      console.error("We leave the user registration form available");
      document.getElementById("message").innerHTML = "An error occurred on the remote server. Try to sign up later. We are working to eliminate the causes of this error";
    }
  }
}

// Displaying user data
async function getMe() {
  console.log("Called: getMe()");
  let token = localStorage.getItem("token");
  console.log("Token = ", token);
  if(token != "") {
    let queryUrl = "https://8fd4-2a02-2a57-4052-0-145f-d48e-abbc-890d.eu.ngrok.io/me";
    let queryBody = {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "User-Agent": "telran",
        "ngrok-skip-browser-warning": "69420",
        "x-access-token": token,
      },
    };
    // Initialize a variable to control the result of the request and store the received JSON
    let processingError = false;
    let responseJson;
    try {
      // We send a request and receive a response
      let response = await fetch(queryUrl, queryBody);
      console.log("Response = ", response);
      // Converting the received response to json format
      responseJson = await response.json();
      console.log("ResponseJson = ", responseJson);
    } catch (error) {
      // if an error has occurred, we save the fact of its occurrence in a logical flag
      processingError = true;
      // Displaying the error to the console and to the user
      console.error("Error (fetch & json): " + error);
      document.getElementById("message").innerHTML = error.message;
    }
    // Uploading an HTML form to display user data
    showUserDataForm();
    // If the response to the request was received without errors
    if (!processingError && responseJson !== undefined) {
      console.log("ResponseJson = " + responseJson);
      console.log("User id = ", responseJson.id);
      console.log("Username = ", responseJson.username);
      console.log("User age = ", responseJson.age);
      console.log("User avatar = ", responseJson.avatar);
  
      // Inserting user data into an HTML form
      document.getElementById("username").value.innerHTML = responseJson.username;
      document.getElementById("age").value.innerHTML = responseJson.age;
      document.getElementById("avatar").value.innerHTML = responseJson.avatar;
    } else {
      // If an error has occurred
      console.error("Displaying the user registration form and error");
      document.getElementById("message").innerHTML = "An error occurred on the remote server. Try to sign up later. We are working to eliminate the causes of this error";
    }
  } else {
    // If the token is not defined, then we display a form for user registration
    showSignUpForm();
  }
}

// Processing user data updates
async function updateUserData() {
  console.log("Called: updateUserData()");
  let token = localStorage.getItem("token");
  console.log("Token = ", token);
  if(token != "") {
    let username = document.getElementById("username").value.trim();
    console.log("Username = ", username);
    let password = document.getElementById("avatar").value.trim();
    console.log("Password = ", password);
    let age = document.getElementById("age").value.trim();
    console.log("Age = ", age);
    // array for storing parts of the text about the identified problems
    let errorAnswerParts = []; 
    if (username == "") {
      errorAnswerParts.push("your name (required!)");
    }
    //  User data
    let userData = {
      username: username,
      avatar: avatar,
      age: age,
    };

    // If there are errors, then we display them to the user 
    // and wait for the next click on the registration button
    if (errorAnswerParts.length > 0) {
      document.getElementById("message").innerText =
        "Please enter: " + errorAnswerParts.join(", ").toString();
    } else {
      let queryUrl = "https://8fd4-2a02-2a57-4052-0-145f-d48e-abbc-890d.eu.ngrok.io/me";
      let queryBody = {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "User-Agent": "telran",
          "ngrok-skip-browser-warning": "69420",
          "x-access-token": token,
        },
        body: JSON.stringify(userData),
      };
  
      let processingError = false;
      let responseJson;
      try {
        // We send a request and receive a response
        let response = await fetch(queryUrl, queryBody);
        console.log("Response = ", response);
        // Converting the received response to json format
        responseJson = await response.json();
        console.log("ResponseJson = ", responseJson);
      } catch (error) {
        // if an error has occurred, we save the fact of its occurrence in a logical flag
        processingError = true;
        // Displaying the error to the console and to the user
        console.error("Error (fetch & json): " + error);
        document.getElementById("message").innerHTML = error.message;
      }
      
      // Trying to display the current user data
      getMe();
      if (!processingError && responseJson !== undefined) {
        console.log("ResponseJson = " + responseJson);
        document.getElementById("message").innerHTML = "The user data is succefully updated.";
      } else {
        // If an error has occurred
        console.error("Displaying the error of updating user data");
        document.getElementById("message").innerHTML = "An error occurred while updating user data. Please try to sign up later. We are working to eliminate the causes of this error.";
      }
    }
  } else {
    // If the token is not defined, then we display the login form
    showSignInForm();
  }
}

// Logout Processing
async function signOut() {
  console.log("Called: signOut()");
  let token = localStorage.getItem("token");
  if(token != "") {
    let queryUrl = "https://8fd4-2a02-2a57-4052-0-145f-d48e-abbc-890d.eu.ngrok.io/destroy-session";
    let queryBody = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "User-Agent": "telran",
        "ngrok-skip-browser-warning": "69420",
        "x-access-token": token,
      },
    };
    let processingError = false;
    let responseJson;
    try {
      // We send a request and receive a response
      let response = await fetch(queryUrl, queryBody);
      console.log("response = ", response);
      // Converting the received response to json format
      responseJson = await response.json();
      console.log("responseJson = ", responseJson);
    } catch (error) {
      // if an error has occurred, we save the fact of its occurrence in a logical flag
      processingError = true;
      // Displaying the error to the console and to the user
      console.error("Error (fetch & json): " + error);
      document.getElementById("message").innerHTML = error.message;
    }

    if (!processingError && responseJson !== undefined) {
      console.log("ResponseJson = " + responseJson);
      showSignOutForm();
      document.getElementById("message").innerHTML = "You are signed out.";
    } else {
      // If an error has occurred
      console.error("Logout error");
      // Displaying a page with user data
      getMe();
      document.getElementById("message").innerHTML = "You are signed out. Please try later. We are working to eliminate the causes of this error.";
    }
  } else {
    // If the token is not defined, then we display a form for user registration
    showSignInForm();
    document.getElementById("message").innerHTML = "Your are already signed out.";
  }
}

// Login processing
async function signIn() {
  console.log("Called: signIn()");
  let token = localStorage.getItem("token");
  if(token != "") {
    let username = document.getElementById("username").value.trim();
    console.log("username = ", username);
    let password = document.getElementById("password").value.trim();
    console.log("password = ", password);
  
    const authData = {
      username: username,
      password: password,
    };
  
    let queryUrl = "https://8fd4-2a02-2a57-4052-0-145f-d48e-abbc-890d.eu.ngrok.io/signin";
    let queryBody = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "User-Agent": "telran",
        "ngrok-skip-browser-warning": "69420",
      },
      body: JSON.stringify(authData),
    };
  
    let processingError = false;
    let responseJson;
    try {
      // We send a request and receive a response
      let response = await fetch(queryUrl, queryBody);
      console.log("response = ", response);
      // Converting the received response to json format
      responseJson = await response.json();
      console.log("responseJson = ", responseJson);
    } catch (error) {
      // if an error has occurred, we save the fact of its occurrence in a logical flag
      processingError = true;
      // Displaying the error to the console and to the user
      console.error("Error (fetch & json): " + error);
      document.getElementById("message").innerHTML = error.message;
    }
  
    if (!processingError && responseJson !== undefined) {
      console.log("ResponseJson = " + responseJson);
      // saving the session token
      localStorage.setItem("token", data.token);
      // Trying to display the current user data
      getMe();
      document.getElementById("message").innerHTML = "You are signed in.";
    } else {
      // If an error has occurred
      console.error("Displaying a user login error");
      // If it was not possible to log in, then we display the user registration form
      showSignInForm();
      document.getElementById("message").innerHTML = "An error occurred while signing in. Please try to sign up later. We are working to eliminate the causes of this error.";
    }
  } else { // If the user has already logged in (if the session token has already been saved)
    console.error("The user has already logged in and is trying to do it again");
    // Displaying a page with user data
    getMe();
    document.getElementById("message").innerHTML = "You are already signed in.";
  }
}
