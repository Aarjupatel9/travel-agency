<?php
$ini = parse_ini_file('../../conf/config.ini');

$json_data = file_get_contents('php://input');


//data from html page
$str_json = file_get_contents('php://input');
$text_data = json_decode($str_json);

$bus_number = trim($text_data->{'bus_number'});
$starting_point = trim($text_data->{'starting_point'});
$destination = trim($text_data->{'destination'});
$departure_time = trim($text_data->{'departure_time'});
$daily_ser = trim($text_data->{'daily_ser'});
$price = trim($text_data->{'price'});

$conn = new mysqli($ini['host'], $ini['dbUsername'], $ini['dbPassword'], $ini['dbName']);

if ($conn->connect_error) {
    die('Could not connect to the database.');
} else {

    $select_f = "SELECT * FROM route_info WHERE bus_number = '$bus_number' AND source='$starting_point' AND destination='$destination' AND pickup_time='$departure_time'";
    $result_f = $conn->query($select_f);
    if ($result_f->num_rows > 0) {
        echo "0";
    } else {
        $Select = "SELECT * FROM bus_info WHERE bus_number = '$bus_number'";
        $result = $conn->query($Select);

        if ($result->num_rows > 0) {
            $counter = 0;
            while ($row = $result->fetch_assoc()) {
                //for each row data is stored into 2D array
                $bus_data[$counter] = array(
                    "bus_number" => $row["bus_number"],
                    "bus_name" => $row["bus_name"],
                    "capacity" => $row["capacity"],
                    "sleeper" => $row["sleeper"],
                    "ac" => $row["ac"]
                );
            }
            $capacity_bus = $bus_data[0]["capacity"];
            $bus_name = $bus_data[0]["bus_name"];
            // $Insert = "INSERT INTO route_info(bus_number, destination, source, pickup_time, daily_ser, bus_name, capacity , price) VALUES ($bus_number , $destination , $starting_point ,$departure_time , $daily_ser , $bus_name , $capacity_bus, $price)";
            $Insert = "INSERT INTO route_info(bus_number, destination, source, pickup_time, daily_ser, bus_name, capacity , price) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

            //$Insert = "INSERT INTO bus_info(bus_number, capacity, ac,sleeper, bus_name) values(?, ?, ?, ?, ?)";

            $stmt = $conn->prepare($Insert);
            $stmt->bind_param("ssssssss", $bus_number, $destination, $starting_point, $departure_time, $daily_ser ,$bus_name ,$capacity_bus , $price);
            if ($stmt->execute()) {
                echo "1";
            } else {

                echo "2";
            }
        }
            
        //     $in_result = $conn->query($Insert);
        //     if ($in_result) {
        //         echo "1";
        //     } else {
        //         echo "2";
        //     }
        // }
        else{
            echo "3";
        }
    }
    $conn->close();
}
