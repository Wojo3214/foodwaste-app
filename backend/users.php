<?php
    include("mysql.php");

    $allUsers = "SELECT * FROM userInfo ORDER BY PK_id DESC";

    $result = $mySQL->query($allUsers);

    // $userInfo = $row = $result->fetch_assoc();

    //echo $userInfo;

    // var_dump($userInfo);

    // while($row = $result->fetch_object()){
    //    echo $row->PK_id;
    //    echo $row->firstName;
    //    echo $row->email;
    // }

   

   
    
?>