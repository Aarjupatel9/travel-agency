
function callhome() {
  window.location.href = "admin.html";
}


//for booking window redirect
var index;
var uni_date;

//for bus information from database
var xjsvar;
function get_bus_info() {

  uni_date = document.getElementById("travelling_date").value;
  console.log("enter in js file");

  let s_point = document.getElementById("starting_point").value;
  let destination = document.getElementById("destination").value;
  let d = new Date(document.getElementById("travelling_date").value);
  //date validation for database sutability
  let travelling_date = d.getDate() + "_" + (d.getMonth()+1) + "_" + d.getFullYear();

  console.log(uni_date);

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      var res_json = JSON.parse(this.responseText);
      
      xjsvar = res_json;
      console.log(res_json);
      addTable();
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
    "<tr><td>bus</td><td>source</td><td>destination</td><td>time</td><td>price pr ticket</td><td>available_ticket</td></tr>";


  document.getElementById("route_data").innerHTML = text;

  for (var i = 0; i < xjsvar.length; i++) {
    // console.log(xjsvar[i].available_ticket);
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
      "</td></tr>";

    document.getElementById("route_data").innerHTML += text;
  }

}