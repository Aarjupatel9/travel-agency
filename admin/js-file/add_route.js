function callhome() {
  window.location.href = "admin.html";
}

var xjsvar;

function add_route() {
  console.log("enter in js file");

  var bus_number = document.getElementById("bus_number").value;
  var starting_point = document.getElementById("starting_point").value;
  var destination = document.getElementById("destination").value;
  var departure_time = document.getElementById("departure_time").value;
  var daily_ser = document.getElementById("daily_ser").value;
  var price = document.getElementById("price").value;

  console.log(departure_time);
  pt = departure_time + ":00";
  console.log(pt);
  if (
    bus_number == "" ||
    starting_point == "" ||
    destination == "" ||
    daily_ser == "" ||
    departure_time == ""
  ) {
    window.alert("please enter full details");
    return;
  }

  const text =
    '{"bus_number": " ' +
    bus_number +
    ' ","starting_point": " ' +
    starting_point +
    ' ", "destination":"' +
    destination +
    '", "departure_time":"' +
    departure_time +
    '", "daily_ser":"' +
    daily_ser +
    '", "price":"' +
    price +
    '"}';

  // console.log(text);
  const str_json = JSON.parse(text);
  console.log(str_json);

  request = new XMLHttpRequest();
  request.open("POST", "../php-file/add_route.php");

  request.setRequestHeader("Content-type", "application/json");
  request.onload = function () {
    var res = this.response;
    if (res == "1") {
      window.alert("route info is added successfullly..");
    }
    else if (res == "0") {
      window.alert("already this route is exits");
    } else if (res == "3") {
      window.alert("This bus number is not for our agency's bus");
    } else if (res == "2") {
      window.alert("some error");
    } else {
      console.log(res);
    }
    
  };
  request.send(text);

}
