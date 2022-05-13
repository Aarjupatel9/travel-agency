<?php
$ini = parse_ini_file('../../conf/config.ini');

$json_data = file_get_contents('php://input');


//data from html page
$str_json = file_get_contents('php://input');
$text_data = json_decode($str_json);

$bus_number = trim($text_data->{'bus_number'});
$capacity = $text_data->{'capacity'};
$ac = trim($text_data->{'ac'});
$sleeper = trim($text_data->{'sleeper'});


$conn = new mysqli($ini['host'], $ini['dbUsername'], $ini['dbPassword'], $ini['dbName']);

if ($conn->connect_error) {
    die('Could not connect to the database.');
} else {
    
    $Select = "SELECT ac FROM bus_info WHERE bus_number = '$bus_number' AND capacity='$capacity' AND ac='$ac' AND sleeper='$sleeper'";
    $result = $conn->query($Select);

    if ($result->num_rows>0) {
        
        $delet_bus_info = "DELETE FROM  bus_info WHERE bus_number='$bus_number'  AND capacity='$capacity' AND ac='$ac' AND sleeper='$sleeper'";
        $delete_result = $conn->query($delet_bus_info);

        if ($delete_result) {
            echo "1";
        } else {
            echo "0";
        }
    } else {
        //alresdy this bus is not exits
        echo "2";
    }
    $conn->close();
}
