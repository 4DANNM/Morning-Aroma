document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault();

  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;


  var isAuthenticated = true;

  if (username == "jimuel" && password == "torres123") {
    window.location.href = "homepage.html";
    alert("Login Successfully");
  } else {
    alert("Incorrect username or password.");
  }
});


