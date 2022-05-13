window.onload = function () {
  var l_or_not = sessionStorage.getItem("s_id");
  if (l_or_not === null) {
    document.getElementById("user_image").src = "image/ser.ico";
  } else {
    document.getElementById("user_image").src = "image/user_icon2.png";
  }
};