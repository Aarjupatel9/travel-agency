<?php

//config file
$ini = parse_ini_file('../conf/config.ini');

//data from html page
$str_json = file_get_contents('php://input');
$text_data = json_decode($str_json);

$email = $text_data->{'user_email'};
$password = $text_data->{'pass'};
$username = $text_data->{'user_name'};
$phone = $text_data->{'p_number'};


$conn = new mysqli($ini['host'], $ini['dbUsername'], $ini['dbPassword'], $ini['dbName']);

if ($conn->connect_error) {
    die('Could not connect to the database.');
} else {
    $Select = "SELECT email FROM user_login_info WHERE email = ? LIMIT 1";
    $Insert = "INSERT INTO user_login_info(username, password, email, number) values(?, ?, ?, ?)";

    $stmt = $conn->prepare($Select);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->bind_result($resultEmail);
    $stmt->store_result();
    $stmt->fetch();
    $rnum = $stmt->num_rows;

    if ($rnum == 0) {
        $stmt->close();

        $stmt = $conn->prepare($Insert);
        $stmt->bind_param("sssi", $username, $password, $email, $phone);
        if ($stmt->execute()) {
            echo "1";
            
            $command = escapeshellcmd('python register_email_genrater.py ' . $email .' '.$username);
            // "> /dev/null 2>/dev/null &"
            // shell_exec($command.' > /dev/null 2>/dev/null &');
            $output = shell_exec($command);
            
        } else {
            echo $stmt->error;
        }
    } else {
        echo "0";
    }
    $stmt->close();
    $conn->close();
}
