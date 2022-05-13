function add_log() {
  console.log("enter in js file");
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
      console.log(res);

      if (res == "1") {
        console.log(session_id);
        //store session id locally
        sessionStorage.setItem("a_s_id", user_email);
        // localStorage.setItem("s_id", user_email);
        console.log(sessionStorage.getItem("a_s_id"));
        // window.alert("sucessfully loged in .... enjoy!!!! ");
        url = "../admin/admin.html";
        document.location.href = url;
      } else if (res == "0") {
        window.alert("Wrong Password try again");
      } else if (res == "10") {
        window.alert("You are already loged in.........!!!!!!!!!!!!");
        console.log(session_id);
        //store session id locally
        sessionStorage.setItem("a_s_id", user_email);
        // localStorage.setItem("s_id", user_email);
        console.log(sessionStorage.getItem("a_s_id"));
        url = "../admin/admin.html";
        document.location.href = url;
      } else if (res == "2") {
        window.alert(
          "there is no account with this email id...you have to sign in first.. thank you!!"
        );
      } else {
        // console.log(res);
        window.alert("Wrong Password try again");
      }
    }
  };
  xmlhttp.open("POST", "../php-file/admin_login.php", true);
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xmlhttp.send(data);
}
