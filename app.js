console.log("JS-script is started.");
let _html = {};

// Форма для регистрации
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

// Форма для входа
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

// форма для отображения данных пользователя
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

// Форма для страницы выхода из системы  
_html.signOut = "<h2>You are logged out</h2><hr>";
  '<br /><button id="singUpButton" type="button" class="btn btn-outline-primary">Sign up</button> ' +
  'or <button id="signInButton" type="button" class="btn btn-primary">Log in</button></form>';

// Загружаем начальную форму
document.addEventListener("DOMContentLoaded", function () {
  console.log("Start: Sign up form is loaded.");
  showSignUpForm();
});

// Функция загрузки HTML-фрагментов в контейнер шаблона
function _appendWrapper(_htmlBlock) {
  document.getElementById("wrapper").innerHTML = _htmlBlock;
}

// Форма для регистрации и определяем обработку нажатия на кнопки
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

// Форма для входа и определяем обработку нажатия на кнопки
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

// Форма для отображения данных пользователя и определяем обработку нажатия на кнопки
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

// Форма для выхода из системы и определяем обработку нажатия на кнопки
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

// Обработка регистрации пользователя
async function signUp() {
  console.log("Called: signUp()");
  // Получаем из формы введенные пользователем данные
  let username = document.getElementById("username").value.trim();
  console.log("username = ", username);
  let password = document.getElementById("password1").value.trim();
  console.log("password1 = ", password);
  let confirmPassword = document.getElementById("password2").value.trim();
  console.log("password2 = ", confirmPassword);
  // Создаем массив для хранения частей текста о выявленных проблемах
  let errorAnswerParts = [];
  // Проверяем наличие введенных данных и их допустимость
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
  // Если есть ошибки, тогда отображаем их пользователю
  // и ждем следующего нажатия на кнопку регистрации
  if (errorAnswerParts.length > 0) {
    document.getElementById("message").innerText =
      "Please enter: " + errorAnswerParts.join(", ").toString();
  } else {
    // Если ошибки не было, тогда пытаемся зарегистрировать пользователя
    // Создаем объект данных, которые будет отправлен на удаленный сервер
    let data = {
      username: username,
      password: password,
      confirm_password: confirmPassword,
    };
    // Инициализируем переменные для выполнения запроса у удаленному серверу
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
    // Инициализируем переменную для контроля результата запроса и хранения полученного JSON
    let processingError = false;
    let responseJson;
    try {
      // Отправляем запрос и получаем ответ
      let response = await fetch(queryUrl, queryBody);
      console.log("response = ", response);
      // Преобразовыаем полученный ответ в json-формат
      responseJson = await response.json();
      console.log("responseJson = ", responseJson);
    } catch (error) {
      // если произошла ошибка сохраняем факт ее свершения в логический флаг
      processingError = true;
      // Отображаем ошибку в консоль и для пользователя
      console.error("Error (fetch & json): " + error);
      document.getElementById("message").innerHTML = error.message;
    }
    // Если ответ на запрос был получен без ошибок
    if (!processingError && responseJson !== undefined) {
      console.log("ResponseJson = " + responseJson);
      console.log("Token = " + responseJson.token);
      localStorage.setItem("token", responseJson.token);  
      console.log("Загружаем данные для страницы данных пользователя с сервера");
      getMe();
    } else { // Если при регистрации произошла ошибка
      console.error("Оставляем доступной форму регистрации пользователя");
      document.getElementById("message").innerHTML = "An error occurred on the remote server. Try to sign up later. We are working to eliminate the causes of this error";
    }
  }
}

// Отображение данных пользователя
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
    // Инициализируем переменную для контроля результата запроса и хранения полученного JSON
    let processingError = false;
    let responseJson;
    try {
      // Отправляем запрос и получаем ответ
      let response = await fetch(queryUrl, queryBody);
      console.log("response = ", response);
      // Преобразовыаем полученный ответ в json-формат
      responseJson = await response.json();
      console.log("responseJson = ", responseJson);
    } catch (error) {
      // если произошла ошибка сохраняем факт ее свершения в логический флаг
      processingError = true;
      // Отображаем ошибку в консоль и для пользователя
      console.error("Error (fetch & json): " + error);
      document.getElementById("message").innerHTML = error.message;
    }
    // Загружаем HTML-форму для отображения данных пользователя
    showUserDataForm();
    // Если ответ на запрос был получен без ошибок
    if (!processingError && responseJson !== undefined) {
      console.log("ResponseJson = " + responseJson);
      console.log("User id = ", responseJson.id);
      console.log("Username = ", responseJson.username);
      console.log("User age = ", responseJson.age);
      console.log("User avatar = ", responseJson.avatar);
  
      // Вставляем данные пользователя в HTML-форму
      document.getElementById("username").value.innerHTML = responseJson.username;
      document.getElementById("age").value.innerHTML = responseJson.age;
      document.getElementById("avatar").value.innerHTML = responseJson.avatar;
    } else {
      // Если произошла ошибка
      console.error("Отображаем форму регистрации пользователя и ошибку");
      document.getElementById("message").innerHTML = "An error occurred on the remote server. Try to sign up later. We are working to eliminate the causes of this error";
    }
  } else {
    // Если токен не определен, тогда отображаем форму для регистрации пользователя
    showSignUpForm();
  }
}

// Обработка обновления данных пользователя
async function updateUserData() {
  console.log("Called: updateUserData()");
  let token = localStorage.getItem("token");
  console.log("Token = ", token);
  if(token != "") {
    let username = document.getElementById("username").value.trim();
    console.log("username = ", username);
    let password = document.getElementById("avatar").value.trim();
    console.log("password = ", password);
    let age = document.getElementById("age").value.trim();
    console.log("age = ", age);
    // массив для хранения частей текста о выявленных проблемах
    let errorAnswerParts = []; 
    if (username == "") {
      errorAnswerParts.push("your name (required!)");
    }
    //  Данные пользователя
    let userData = {
      username: username,
      avatar: avatar,
      age: age,
    };

    // Если же есть ошибки, тогда отображаем их пользователю
    // и ждем следующего нажатия на кнопку регистрации
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
        // Отправляем запрос и получаем ответ
        let response = await fetch(queryUrl, queryBody);
        console.log("response = ", response);
        // Преобразовыаем полученный ответ в json-формат
        responseJson = await response.json();
        console.log("responseJson = ", responseJson);
      } catch (error) {
        // если произошла ошибка сохраняем факт ее свершения в логический флаг
        processingError = true;
        // Отображаем ошибку в консоль и для пользователя
        console.error("Error (fetch & json): " + error);
        document.getElementById("message").innerHTML = error.message;
      }
      
      // Пытаемся отобразить текущие данные пользователя
      getMe();
      if (!processingError && responseJson !== undefined) {
        console.log("ResponseJson = " + responseJson);
        document.getElementById("message").innerHTML = "The user data is succefully updated.";
      } else {
        // Если произошла ошибка
        console.error("Отображаем ошибку обновления данных пользователя");
        document.getElementById("message").innerHTML = "An error occurred while updating user data. Please try to sign up later. We are working to eliminate the causes of this error.";
      }
    }
  } else {
    // Если токен не определен, тогда отображаем форму для входа в систему
    showSignInForm();
  }
}

// Обрабтка выхода из системы
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
      // Отправляем запрос и получаем ответ
      let response = await fetch(queryUrl, queryBody);
      console.log("response = ", response);
      // Преобразовыаем полученный ответ в json-формат
      responseJson = await response.json();
      console.log("responseJson = ", responseJson);
    } catch (error) {
      // если произошла ошибка сохраняем факт ее свершения в логический флаг
      processingError = true;
      // Отображаем ошибку в консоль и для пользователя
      console.error("Error (fetch & json): " + error);
      document.getElementById("message").innerHTML = error.message;
    }

    if (!processingError && responseJson !== undefined) {
      console.log("ResponseJson = " + responseJson);
      showSignOutForm();
      document.getElementById("message").innerHTML = "You are signed out.";
    } else {
      // Если произошла ошибка
      console.error("Ошибка выхода из системы");
      // Отображаем страницу с данными пользователя
      getMe();
      document.getElementById("message").innerHTML = "You are signed out. Please try later. We are working to eliminate the causes of this error.";
    }
  } else {
    // Если токен не определен, тогда отображаем форму для регистрации пользователя
    showSignInForm();
    document.getElementById("message").innerHTML = "Your are already signed out.";
  }
}

// Обработка входа в систему
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
      // Отправляем запрос и получаем ответ
      let response = await fetch(queryUrl, queryBody);
      console.log("response = ", response);
      // Преобразовыаем полученный ответ в json-формат
      responseJson = await response.json();
      console.log("responseJson = ", responseJson);
    } catch (error) {
      // если произошла ошибка сохраняем факт ее свершения в логический флаг
      processingError = true;
      // Отображаем ошибку в консоль и для пользователя
      console.error("Error (fetch & json): " + error);
      document.getElementById("message").innerHTML = error.message;
    }
  
    if (!processingError && responseJson !== undefined) {
      console.log("ResponseJson = " + responseJson);
      // сохраняем токен сессии
      localStorage.setItem("token", data.token);
      // Пытаемся отобразить текущие данные пользователя
      getMe();
      document.getElementById("message").innerHTML = "You are signed in.";
    } else {
      // Если произошла ошибка
      console.error("Отображаем ошибку входа пользователя в систему");
      // Если не удалось войти, тогда отображаем форму для регистрации пользователя
      showSignInForm();
      document.getElementById("message").innerHTML = "An error occurred while signing in. Please try to sign up later. We are working to eliminate the causes of this error.";
    }
  } else { // Если пользователь уже вошел (если токен сессии уже сохранен)
    console.error("Пользователь уже вошел в систему и пытается это сделать еще раз");
    // Отображаем страницу с данными пользователя
    getMe();
    document.getElementById("message").innerHTML = "You are already signed in.";
  }
}
