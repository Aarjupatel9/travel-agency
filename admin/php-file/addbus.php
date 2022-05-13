<?php
$ini = parse_ini_file('../../conf/config.ini');

$json_data = file_get_contents('php://input');


//data from html page
$str_json = file_get_contents('php://input');
$text_data = json_decode($str_json);

$bus_name = trim($text_data->{'bus_name'});
$bus_number = trim($text_data->{'bus_number'});
$capacity = $text_data->{'capacity'};
$ac = trim($text_data->{'ac'});
$sleeper = trim($text_data->{'sleeper'});


$conn = new mysqli($ini['host'], $ini['dbUsername'], $ini['dbPassword'], $ini['dbName']);

if ($conn->connect_error) {
    die('Could not connect to the database.');
} else {


    $Select = "SELECT bus_number FROM bus_info WHERE bus_number = ? LIMIT 1";
    $Insert = "INSERT INTO bus_info(bus_number, capacity, ac,sleeper, bus_name) values(?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($Select);
    $stmt->bind_param("s", $bus_number);
    $stmt->execute();
    $stmt->bind_result($resultEmail);
    $stmt->store_result();
    $stmt->fetch();
    $rnum = $stmt->num_rows;

    if ($rnum == 0) {
        $stmt->close();

        $stmt = $conn->prepare($Insert);
        $stmt->bind_param("sssss", $bus_number, $capacity, $ac, $sleeper,$bus_name);
        if ($stmt->execute()) {
            echo "1";
        } else {

            //echo $stmt->error;
        }
    } else {
        //alresdy this bus is exits
        echo "0";
    }

    $stmt->close();
    $conn->close();
}
