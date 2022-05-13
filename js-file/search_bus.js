//for booking window redirect
var index;
var uni_date;
function booking_redirect(index) {
  console.log(index);
  var myTab = document.getElementById("route_data");

  var row_data = myTab.rows.item(index).cells;

  var bus_name = row_data.item(0).innerHTML;
  var source = row_data.item(1).innerHTML;
  var destination = row_data.item(2).innerHTML;
  var pickup_time = row_data.item(3).innerHTML;
  var price_per_ticket = row_data.item(4).innerHTML;
  var available_ticket = row_data.item(5).innerHTML;
  console.log("in search bus redirect func : " + pickup_time);

  console.log(price_per_ticket);
  // alert("see consol");
  url =
    "../html-file/booking.html?bus_name=" +
    encodeURIComponent(bus_name) +
    "&source=" +
    encodeURIComponent(source) +
    "&destination=" +
    encodeURIComponent(destination) +
    "&pickup_time=" +
    encodeURIComponent(pickup_time) +
    "&available_ticket=" +
    encodeURIComponent(available_ticket) +
    "&t_date=" +
    encodeURIComponent(uni_date) +
    "&price=" +
    encodeURIComponent(price_per_ticket);

  document.location.href = url;
}

//for bus information from database
var xjsvar;
function get_bus_info() {
  uni_date = document.getElementById("travelling_date").value;
  console.log("enter in js file");

  let s_point = document.getElementById("starting_point").value;
  let destination = document.getElementById("destination").value;
  let d = new Date(document.getElementById("travelling_date").value);
  //date validation for database sutability
  let travelling_date =
    d.getDate() + "_" + (d.getMonth() + 1) + "_" + d.getFullYear();

  console.log(uni_date);

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var res = this.responseText;
      console.log(res);
      if (res == "0") {
        window.alert("this route is not available");
      } else {
        var res_json = JSON.parse(res);
        xjsvar = res_json;
        console.log(res_json);
        addTable();
      }
    }
  };
  xmlhttp.open(
    "GET",
    "../php-file/search_bus.php?s_point=" +
      s_point +
      "&destination=" +
      destination +
      "&date=" +
      travelling_date,
    true
  );
  xmlhttp.send();
}

//for display bus information data which fetched from database
function addTable() {
  var text =
    "<tr><td>bus</td><td>source</td><td>destination</td><td>time</td><td>price pr ticket</td><td>available_ticket</td><td>button</td></tr>";

  document.getElementById("route_data").innerHTML = text;

  for (var i = 0; i < xjsvar.length; i++) {
    //console.log(xjsvar[i].available_ticket);
    text =
      "<tr><td>" +
      xjsvar[i].bus_name +
      "</td><td>" +
      xjsvar[i].source +
      "</td><td>" +
      xjsvar[i].destination +
      "</td><td>" +
      xjsvar[i].pickup_time +
      "</td><td>" +
      xjsvar[i].price +
      "</td><td>" +
      (xjsvar[i].capacity - xjsvar[i].reserved_ticket) +
      "</td><td onclick=" +
      "booking_redirect(" +
      (i + 1) +
      ")><button class= &#34 btn btn-primary &#34 > Book </button>" +
      "</td></tr>";

    document.getElementById("route_data").innerHTML += text;
  }
}

{/* <button class= &#34 btn btn-primary &#34 > Book </button> */}