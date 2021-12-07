<?php
    session_start();
    include("mysql.php");

    if(isset($_GET['action'])){
        $action = $_GET['action'];

        if ($action == "getFoodProducts"){

            // SQL query to get user information
            $sql = "SELECT * FROM foodItems";  
            $result = $mySQL->query($sql);

            if($result){
                while($row = $result->fetch_object()){
                    // echo $foodName = $row->foodName;
                    // echo $fromTime = $row->fromTime;
                    // echo $untilTime = $row->untilTime;
                    $data[] = $row;
                    $response['foodData'] = $data;
                    //$response['foodData'] = $fromTime;
                }
                //$response['foodData'] += $foodName;
                
                echo json_encode($response);
            }
        }
    }
?>