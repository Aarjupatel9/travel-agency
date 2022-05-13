window.onload = function () {

    //to set user icon
    var l_or_not = sessionStorage.getItem("a_s_id");
    console.log(l_or_not);
    if (l_or_not === null) {
        window.alert("you have to login with admin email id first!!!!");
        url = "../html-file/admin_log.html";
        document.location.href = url;
    }
}

function admin_logout() {
  var session_id;
  var session_data;

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var res = this.responseText;

      if (res == "1") {
        sessionStorage.removeItem("a_s_id");
        // localStorage.removeItem("s_id");
        session_id = "";
        session_data = "";
        console.log(sessionStorage.getItem("a_s_id"));

        window.alert("log out succsessfull........");
        url = "../index.html";
        document.location.href = url;
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

  var l_or_not = sessionStorage.getItem("a_s_id");

  if (l_or_not === null) {
    window.alert("error in find session in locsl storage");
  } else {
    session_id = l_or_not;
  }

  session_data = '{"a_s_id" : "' + session_id + '"}'; // data which will pass to logout.php file

  xmlhttp.open("POST", "php-file/admin_logout.php", true);
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xmlhttp.send(session_data);
}




// 20CP020@gmail.com