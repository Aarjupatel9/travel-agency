<?php

$ini = parse_ini_file('../conf/config.ini');
//GETING DATA from call 
$email = $_GET["email"];


//set time zone
date_default_timezone_set('Asia/Calcutta');
// collect today date
// for ($i = 0; $i < 30; $i++) {
//     $str = "+ ".$i." day";

//     $date = date('d', strtotime($str));
//     $mounth = date('m', strtotime($str));
//     $year = date('y', strtotime($str));
// echo (int)($date);
// echo " ";
// echo (int)($mounth);
// echo " ";
// }

// $tomorrow = date("m", strtotime("+ 20 day"));
// echo $tomorrow;

//array initialization
$data = array();
$per_data = array();
$per_counter = 0;

//database connection sentances
$conn = new mysqli($ini['host'], $ini['dbUsername'], $ini['dbPassword'], $ini['dbName']);
if ($conn->connect_error) {
    // die('Could not connect to the database.');
    echo "server is down.....";
} else {

    $Select = "SELECT * FROM route_info";
    $result = $conn->query($Select);

    if ($result->num_rows > 0) {
        $counter = 0;
        while ($row = $result->fetch_assoc()) {

            //for each row data is stored into 2D array
            $data[$counter] = array(
                "bus_number" => $row["bus_number"],
                "destination" => $row["destination"],
                "source" => $row["source"],
                "pickup_time" => $row["pickup_time"],
                "daily-ser" => $row["daily_ser"],
                "bus_name" => $row["bus_name"],
                "capacity" => $row["capacity"],
                "price" => $row["price"]
            );

            //after adding table
            //after_add_table:
            for ($i = 0; $i < 30; $i++) {
                $str = "+ " . $i . " day";

                $full_date = date('d-m-y', strtotime($str));
                $date = (int)date('d', strtotime($str));
                $mounth = (int)date('m', strtotime($str));
                $year =(int)date('y', strtotime($str));
                $ty = "20".$year;


                $table_name = "ticket_" . $date . "_" . $mounth . "_" . $ty . "_" . $data[$counter]["bus_number"];
                
                // echo $table_name."   ";

                //checking that table  is available or not
                $cheking_table = "SHOW TABLES LIKE '$table_name'";
                $table_isornot = $conn->query($cheking_table);

                // table present
                if ($table_isornot->num_rows > 0) {
                    $select_q = "SELECT * FROM $table_name WHERE user_email = '$email'";
                    $select_q_result = $conn->query($select_q);
                    if ($select_q_result->num_rows > 0); {


                        $data[$counter]["ticket_no"] = $select_q_result->num_rows;
                        $data[$counter]["date"] = $full_date;
                        // now we set perfect data 

                        $per_data[$per_counter]["bus_number"] = $data[$counter]["bus_number"];
                        $per_data[$per_counter]["bus_name"] = $data[$counter]["bus_name"];

                        $per_data[$per_counter]["source"] = $data[$counter]["source"];
                        $per_data[$per_counter]["destination"] = $data[$counter]["destination"];
                        $per_data[$per_counter]["pickup_time"] = $data[$counter]["pickup_time"];
                        $per_data[$per_counter]["date"] = $data[$counter]["date"];
                        $per_data[$per_counter]["ticket_no"] = $data[$counter]["ticket_no"];

                        $per_counter++;
                    
                    }
                }

                //table is not present and we will create table 
                else {
                    // echo "table making error  ";
                }
            }
            $counter++;
        }

        echo json_encode($per_data);
    } else {
        echo "0";
    }

    $conn->close();
}
