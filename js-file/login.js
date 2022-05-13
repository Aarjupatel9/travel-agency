var session_id;
var session_data;

function logout() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var res = this.responseText;

      if (res == "1") {
        sessionStorage.removeItem("s_id");
        session_id = "";
        session_data = "";
        console.log("after logout successfull : " + sessionStorage.getItem("s_id"));
        document.getElementById("user_image").src = "../image/ser.ico";
        window.alert("log out succsessfull........");

      } else if (res == "0") {
        window.alert("log out unsucsees......");
      } else if (res == "5") {
        window.alert("you are already not Log In......");
      } else {
        console.log(res);
      }
    }
  };

  // fetch local session data
  // session_id = localStorage.getItem("s_id");
  session_id = sessionStorage.getItem("s_id");
  console.log(session_id);

  session_data = '{"s_id" : "' + session_id + '"}'; // data which will pass to logout.php file

  xmlhttp.open("POST", "../php-file/logout.php", true);
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xmlhttp.send(session_data);
}

function log() {
  var user_email = document.getElementById("email").value;
  var pass = document.getElementById("password").value;

  //validate email and password
  if (user_email == "" || pass == "") {
    window.alert("fill username and password correctly...");
    return;
  }

  //init... data for the server
  var data = '{"user_email":"' + user_email + '", "pass":"' + pass + '"}';
  var data_json = JSON.parse(data);

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var res = this.responseText;

      if (res == "1") {
        console.log("pass");
        // console.log(session_id);
        // console.log(sessionStorage.getItem("s_id"));

        //store session id locally
        sessionStorage.setItem("s_id", user_email);
        // localStorage.setItem("s_id", user_email);
        console.log(sessionStorage.getItem("s_id"));

        window.alert("sucessfully loged in .... enjoy!!!! ");
        url = "../index.html";
        document.location.href = url;
      } else if (res == "0") {
        window.alert("Wrong Password try again");
      } else if (res == "10") {
        window.alert("You are already loged in.........!!!!!!!!!!!!");
      } else if (res == "2") {
        window.alert(
          "there is no account with this email id...you have to sign in first.. thank you!!"
        );
      } else {
        console.log(res);
      }
    }
  };
  xmlhttp.open("POST", "../php-file/login.php", true);
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xmlhttp.send(data);
}
