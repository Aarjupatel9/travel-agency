<?php

//data from html page
$str_json = file_get_contents('php://input');
$text_data = json_decode($str_json);

// echo $str_json;
$s_id = $text_data->{'s_id'};

session_start();
// echo $s_id;

//main code to destroy session


if (isset($_SESSION[$s_id])) {
    unset($_SESSION[$s_id]);
    echo "1";
}
else{
    echo "5";
    return;
}

if (isset($_SESSION[$s_id])) {
    echo "0";
}

session_unset();
session_destroy();
