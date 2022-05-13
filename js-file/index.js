function logout() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var res = this.responseText;
      //var res_json = JSON.parse(this.responseText);
      if (res == "1") {
        sessionStorage.removeItem("s_id");
        console.log(
          "after logout successfull : " + sessionStorage.getItem("s_id")
        );
        document.getElementById("user_image").src = "image/ser.ico";
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
  var session_id = sessionStorage.getItem("s_id");
  console.log(session_id);
  var session_date = '{"s_id" : "' + session_id + '"}';
  xmlhttp.open("POST", "php-file/logout.php", true);
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xmlhttp.send(session_date);
}
