function regi() {
  var user_email = document.getElementById("user_email").value;
  var pass = document.getElementById("pass").value;
  var re_pass = document.getElementById("re_pass").value;
  var user_name = document.getElementById("user_name").value;
  var p_number = document.getElementById("p_number").value;

  if (user_name == "") {
    window.alert("User Name can not be Empty");
    return;
  }
  if (pass == "") {
    window.alert("password can not be Empty");
    return;
  }

  var phoneno = /^\d{10}$/;
  if (!p_number.match(phoneno)) {
    window.alert("Phone number is not valide");
    return false;
  }
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!user_email.match(mailformat)) {
    window.alert("Email Id is not valide");
    return false;
  }
  if (pass != re_pass) {
    window.alert("Your Password is not same re-type password");
    return;
  }

  var data =
    '{"user_email":"' +
    user_email +
    '", "pass":"' +
    pass +
    '", "user_name":"' +
    user_name +
    '", "p_number":"' +
    p_number +
    '"}';
  var data_json = JSON.parse(data);

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var res = this.responseText;
      //var res_json = JSON.parse(this.responseText);
      if (res == "1") {
        window.alert("New record inserted sucessfully");
        document.location.reload(true);
      } else if (res == "0") {
        window.alert("You already register with this email id");
      } else {
        console.log(res);
      }
    }
  };
  xmlhttp.open("POST", "../php-file/register.php", true);
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xmlhttp.send(data);
}
