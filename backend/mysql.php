<?php
    $server = "mysql68.unoeuro.com"; // Change to domain name, e.g. www.iloveunicorns.com
    $username = "magdalenapolakowska_com"; // Change to the admins username of the server
    $password = "RDpF2Agmnexd"; // Change to the admins password of the server
    $database = "magdalenapolakowska_com_db_raw_share";

    $mySQL = new mysqli($server, $username, $password, $database);
    
    if(!$mySQL) {
        die("Could not connect to the MySQL server: " . mysqli_connect_error());
    }
?>