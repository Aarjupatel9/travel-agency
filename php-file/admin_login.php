<?php

$ini = parse_ini_file('../conf/config.ini');


$str_json = file_get_contents('php://input');
$text_data = json_decode($str_json);

$email = $text_data->{'user_email'};
$password = $text_data->{'pass'};

session_start();

if (isset($_SESSION[$email])) {
    // header("location: welcome.php");
    echo "10";
    unset($_SESSION[$email]);
    exit;
}

$conn = new mysqli($ini['host'], $ini['dbUsername'], $ini['dbPassword'], $ini['dbName']);


if ($conn->connect_error) {
    die('Could not connect to the database.');
} else {
    $Select = "SELECT password FROM admin_info WHERE email = '$email' ";
    $result = $conn->query($Select);
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {

            if ($password == $row["password"]) {
               
                // include '../admin/admin.htm';
                $_SESSION[$email] = $email;
                echo "1";
                $conn->close();
                exit;

            } else {

                echo "0";
            }
        }
    } else {
        //anmid not exits with this email
        echo  "2";
    }
   
}
