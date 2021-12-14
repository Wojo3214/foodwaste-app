<?php
    include("mysql.php");

    $allUsers = "SELECT * FROM userInfo ORDER BY PK_id DESC";

    $result = $mySQL->query($allUsers);
    
?>