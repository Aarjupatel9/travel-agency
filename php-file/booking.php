<?php
//config file
$ini = parse_ini_file('../conf/config.ini');

//data from html page
$str_json = file_get_contents('php://input');
$text_data = json_decode($str_json);

// echo $str_json;


$bus_number = $text_data->{'bus_number'};
$tra_date = $text_data->{'tra_date'};
$nosit = $text_data->{'nosit'};
$t_price = $text_data->{'t_price'};
$user_email = $text_data->{'user_email'};
$departure_time = $text_data->{'departure_time'};
$destination = $text_data->{'destination'};
$source = $text_data->{'source'};
// $pass = $text_data->{'pass'};

//array initialization
//echo $user_email;
$route_data = array();


//database connection sentances
$conn = new mysqli($ini['host'], $ini['dbUsername'], $ini['dbPassword'], $ini['dbName']);
if ($conn->connect_error) {
    // die('Could not connect to the database.');
    echo "server is down.....";
} else {

    //first we have to check if user exits or not
    $Select_user = "SELECT password FROM user_login_info WHERE email='$user_email'";
    $select_user_result = $conn->query($Select_user);
    //checking that user exit or not,, row present than exits else not

    if ($select_user_result->num_rows > 0) {    
        
        //now fill the ticket

        $table_name = "ticket_" . $tra_date . "_" . $bus_number;
        $que = "SELECT sit_number from $table_name";
        $que_result = $conn->query($que);

        $reserved_ticket = $que_result->num_rows + 1;
        $ticket_num = $reserved_ticket + $nosit;

        //book ticket for no_of_sit times
        for ($i = $reserved_ticket; $i < $ticket_num; $i++) {

            $ticket_book_query = "INSERT INTO $table_name(sit_number, user_email) VALUES (?,?)";
            // $result_query = $conn->query($ticket_book_query);
            $stmt = $conn->prepare($ticket_book_query);
            $stmt->bind_param("is", $i, $user_email);
            $stmt->execute();
        }
        
        echo "1";
        $command = escapeshellcmd('python booking_email_genrater.py '.$user_email.' '.$bus_number.' '.$tra_date.' '.$nosit.' '.$t_price.' '.$departure_time.' '.$source.' '.$destination . ' > /dev/null 2>/dev/null &');
        $output = shell_exec($command);
        
    } else {
        //user not exits
        echo "0";
    }
}
