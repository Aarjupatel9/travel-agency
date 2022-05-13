var xjsvar;

window.onload = function () {
  //to set user icon
  var l_or_not = sessionStorage.getItem("s_id");

  if (l_or_not === null) {
    //goto login page
    window.alert("You Have To Log In First To show your current Booking..");
    var url = "../html-file/login.html";
    document.location.href = url;
  }
  console.log("icon page : " + l_or_not);
  document.getElementById("user_image").src = "../image/user_icon2.png";

  /// request for data

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var res = this.responseText;
      console.log(res);
      var res_json = JSON.parse(res);

      xjsvar = res_json;
      console.log(res_json);
      addTable();
    }
  };
  // var d = new Date();
  // console.log(d.getDay());
  var email = l_or_not;
  console.log(email);

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  console.log(dd);

  xmlhttp.open("GET", "../php-file/my_booking.php?email=" + email, true);
  xmlhttp.send();
};

function addTable() {
  var text =
    "<tr><td>Bus Name</td><td>Bus Number</td><td>source</td><td>destination</td><td>time</td><td>date</td><td>ticket no</td></tr>";

  document.getElementById("route_data").innerHTML = text;

  for (var i = 0; i < xjsvar.length; i++) {
    //console.log(xjsvar[i].available_ticket);
    if (xjsvar[i].ticket_no > 0) {
      text =
        "<tr><td>" +
        xjsvar[i].bus_name +
        "</td><td>" +
        xjsvar[i].bus_number +
        "</td><td>" +
        xjsvar[i].source +
        "</td><td>" +
        xjsvar[i].destination +
        "</td><td>" +
        xjsvar[i].pickup_time +
        "</td><td>" +
        xjsvar[i].date +
        "</td><td>" +
        xjsvar[i].ticket_no +
        "</td></tr>";

      document.getElementById("route_data").innerHTML += text;
    }
  }
}
