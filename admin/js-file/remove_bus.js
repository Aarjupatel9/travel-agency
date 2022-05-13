function callhome() {
  window.location.href = "admin.html";
}

var xjsvar;

function rem_bus() {
  console.log("enter in js file");

  var bus_num = document.getElementById("bus_num").value;
  var capacity = document.getElementById("capacity").value;
  var ac = document.getElementById("ac").value;
  var sleeper = document.getElementById("sleeper").value;

  if (
    bus_num == "" ||
    capacity == "" ||
    ac == "" ||
    sleeper == ""
  ) {
    window.alert("please enter full details");
    return;
  }

  const text =
    '{"bus_number": " ' +
    bus_num +
    ' ", "capacity":"' +
    capacity +
    '", "ac":"' +
    ac +
    '", "sleeper":"' +
    sleeper +
    '"}';

  console.log(bus_num);
  const str_json = JSON.parse(text);
  console.log(str_json);

  request = new XMLHttpRequest();
  request.open("POST", "../php-file/remove_bus.php");
  request.setRequestHeader("Content-type", "application/json");
  request.onload = function () {
    var res = this.response;
    if (res == "1") {
      window.alert("Bus info is deleted successfullly..");
    } else if (res == "2") {
      window.alert("this bus is already not exits");
    } else {
      console.log(res);
    }
  };
  request.send(text);
}
