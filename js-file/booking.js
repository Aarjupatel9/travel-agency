//globle declaration
var available_ticket;
var xjsvar;
var departure_time;

window.onload = function () {
  //to set user icon
  var l_or_not = sessionStorage.getItem("s_id");

  if (l_or_not === null) {
    document.getElementById("user_image").src = "../image/ser.ico";
  } else {
    document.getElementById("user_image").src = "../image/user_icon2.png";
  }

  /// ferther stuff

  var url = document.location.href,
    params = url.split("?")[1].split("&"),
    data = {},
    tmp;
  for (var i = 0, l = params.length; i < l; i++) {
    tmp = params[i].split("=");
    data[tmp[0]] = tmp[1];
  }

  var bus_name = data.bus_name;
  var source = data.source;
  var destination = data.destination;
  var pickup_time = data.pickup_time;
  available_ticket = data.available_ticket;
  var travelling_date = data.t_date;
  var price_per_ticket_1 = data.price;
  departure_time = decodeURIComponent(data.pickup_time);

  console.log("in booking onload : " + departure_time);
  
  
  let d = new Date(travelling_date);
  
  document.getElementById("starting_point").value = source;
  document.getElementById("destination").value = destination;
  document.getElementById("travelling_date").value = travelling_date;
  document.getElementById("bus_name").value = bus_name;
  document.getElementById("price").value = price_per_ticket_1;
  document.getElementById("number_of_sit").value = 1;
  document.getElementById("total_price").value = price_per_ticket_1;
  document.getElementById("departure_time").value = departure_time;

  document.getElementById("user_email").value = l_or_not;

  // fetching data from local storage of login session
  let email = sessionStorage.getItem("s_id");
  // console.log(email);
  // window.alert("normal push notification");//for testing
  if (email == null) {
    window.alert("You Have To Log In First To Book Ticket..");

    var url = "../html-file/login.html";
    document.location.href = url;
  } else {
    document.getElementById("user_email").value = email;
  }

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      var res_json = JSON.parse(this.responseText);
      // xjsvar = res_json;
      document.getElementById("bus_number").value = res_json[0].bus_number;
      console.log(res_json);
      console.log(res_json[0].bus_number);
    }
  };
  xmlhttp.open(
    "GET",
    "../php-file/get_bus_info_for_booking.php?s_point=" +
      source +
      "&destination=" +
      destination +
      "&date=" +
      travelling_date +
      "&bus_name=" +
      bus_name +
      "&pickup_time=" +
      pickup_time,
    true
  );
  xmlhttp.send();
};

function onbooking() {
  var nofsit = document.getElementById("number_of_sit").value;
  var password = document.getElementById("pass").value;
  if (password == "") {
    window.alert("enter the password");
    return;
  }
  if (available_ticket == 0) {
    window.alert("this bus is full... you can't book ticket for this bus..");
    return;
  }
  if (nofsit == "") {
    window.alert("enter number of ticket for book");
    return;
  } else if (nofsit > available_ticket) {
    console.log(nofsit);
    console.log(available_ticket);
    window.alert("only  " + available_ticket + "  ticket is available");
    return;
  } else {

    
    document.getElementById("booking_btn").disabled = true;
    window.alert("Process is Being Running , Please wait for some time..... You can close pop up");
      setTimeout(function () {
        document.getElementById("booking_btn").disabled = false;
      }, 10000);

    //getting data from html page for booking

    var bus_number = document.getElementById("bus_number").value;
    var tra_date = document.getElementById("travelling_date").value;
    var nosit = document.getElementById("number_of_sit").value;
    var t_price = document.getElementById("total_price").value;
    var user_email = document.getElementById("user_email").value;
    var destination = document.getElementById("destination").value;
    var source = document.getElementById("starting_point").value;
    // var pass = document.getElementById("pass").value;

    let d = new Date(tra_date);
    //date validation for database sutability
    let travel_date =
      d.getDate() + "_" + (d.getMonth() + 1) + "_" + d.getFullYear();

    var booking_data =
      '{"bus_number":"' +
      bus_number +
      '", "tra_date":"' +
      travel_date +
      '", "nosit":"' +
      nosit +
      '","t_price":"' +
      t_price +
      '","departure_time":"' +
      departure_time +
      '","user_email":"' +
      user_email +
      '","destination":"' +
      destination +
      '","source":"' +
      source +
      '"}'; //+'","pass":"' + pass;
    var data_json = JSON.parse(booking_data);
    console.log(data_json);
    console.log("redy for booking");

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var res = this.responseText;
        //var res_json = JSON.parse(this.responseText);
        if (res == "1") {
          window.alert("ticket booked successfully...   Email reciept is genarated and sent to you  If you not Get Email receipt Than contact us","Thank you for booking - Have a best trip");
          document.location.reload(true);
        } else if (res == "0") {
          window.alert("This user is not exits ...  please register first");
        } else if (res == "wrong password") {
          windows.alert("Wrong Password...");
        } else {
          console.log("res");
        }
      }
    };
    xmlhttp.open("POST", "../php-file/booking.php", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(booking_data);
  }
}

function get_total_price() {
  var nos = document.getElementById("number_of_sit").value;
  var price = document.getElementById("price").value;
  var total_price = nos * price;
  document.getElementById("total_price").value = total_price;
}

//below this there are not usefull function(for testing perpose)
function get_bus_info() {
  console.log("enter in js file");

  let s_point = document.getElementById("starting_point").value;
  let destination = document.getElementById("destination").value;
  let d = new Date(document.getElementById("travelling_date").value);
  //date validation for database sutability
  let travelling_date =
    d.getDate() + "_" + (d.getMonth() + 1) + "_" + d.getFullYear();
}

function testJS() {
  console.log("enter in js file");

  let s_point = document.getElementById("starting_point").value;
  let destination = document.getElementById("destination").value;
  let d = new Date(document.getElementById("travelling_date").value);
  //date validation for database sutability
  let travelling_date =
    d.getDate() + "_" + (d.getMonth() + 1) + "_" + d.getFullYear();

  var b = document.getElementById("name").value,
    url =
      "http://path_to_your_html_files/next.html?name=" + encodeURIComponent(b);

  document.location.href = url;
}
