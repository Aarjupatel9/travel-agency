<?php
//config file
$ini = parse_ini_file('../conf/config.ini');

//data from html page

$s_point = $_GET["s_point"];
$destination = $_GET["destination"];
$t_date = $_GET["date"];
$bus_name = $_GET["bus_name"];
$pickup_time = $_GET["pickup_time"];



//array initialization
$route_data = array();


//database connection sentances
$conn = new mysqli($ini['host'], $ini['dbUsername'], $ini['dbPassword'], $ini['dbName']);
if ($conn->connect_error) {
    // die('Could not connect to the database.');
    echo "server is down.....";
} else {
    $Select = "SELECT bus_number FROM route_info WHERE source='$s_point' AND destination='$destination' AND pickup_time='$pickup_time' AND bus_name='$bus_name'";
    $route_result = $conn->query($Select);

    if ($route_result->num_rows > 0) {
        $counter = 0;
        while ($row = $route_result->fetch_assoc()) {
            //for each row data is stored into 2D array
            $route_data[$counter] = array(
                "bus_number" => $row["bus_number"]
            );
            $counter++;
        }
    } else {
        echo  "row is not present";
    }
    //send data to html page
    echo json_encode($route_data);

    $conn->close();
}
