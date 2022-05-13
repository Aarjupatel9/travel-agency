<?php
//config file
$ini = parse_ini_file('../conf/config.ini');

//data from html page
$s_point = $_GET["s_point"];
$destination = $_GET["destination"];
$t_date = $_GET["date"];

//array initialization
$data = array();
$route_data = array();
$ticket_data = array();


//database connection sentances
$conn = new mysqli($ini['host'], $ini['dbUsername'], $ini['dbPassword'], $ini['dbName']);
if ($conn->connect_error) {
    // die('Could not connect to the database.');
    echo "server is down.....";
} else {

    $Select = "SELECT * FROM route_info WHERE source='$s_point' AND destination='$destination'";
    $route_result = $conn->query($Select);

    if ($route_result->num_rows > 0) {
        $counter = 0;
        while ($row = $route_result->fetch_assoc()) {
            //for each row data is stored into 2D array
            $route_data[$counter] = array(
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

            $table_name = "ticket_" . $t_date . "_" . $route_data[$counter]["bus_number"];
            //checking that table  is available or not
            $cheking_table = "SHOW TABLES LIKE '$table_name'";
            $table_isornot = $conn->query($cheking_table);

            //table present
            if ($table_isornot->num_rows > 0) {
                $select_reserved_number = "SELECT * FROM $table_name";
                $select_reserved_number_result = $conn->query($select_reserved_number);
                $route_data[$counter]["reserved_ticket"] = $select_reserved_number_result->num_rows;
                //echo $select_reserved_number_result->num_rows;
            }
            //table is not present and we will create table 
            else {
                $create_table = "CREATE TABLE $table_name ( `sit_number` bigint NOT NULL ,  `user_email` VARCHAR(50) NOT NULL);";
                $create_table_result = $conn->query($create_table);
                //$route_data[$counter]["reserved_ticket"] = $row["reserved_ticket"];
                $route_data[$counter]["reserved_ticket"] = 0;

                // goto after_add_table;
            }
            $counter++;
            
        }

        //send data to html page
        echo json_encode($route_data);
    } else {
        echo "0";
    }

    $conn->close();
}