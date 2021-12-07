<?php
    session_start();
    include("mysql.php");

    if(isset($_GET['action'])){
        $action = $_GET['action'];

        if ($action == "getFoodProducts"){

            // SQL query to get user information
            $sql = "SELECT * FROM foodItems";  
            $result = $mysql->query($sql);

            if($result){
                while($data = $result->fetch_object()){
                    $foodName = $data->foodName;
                    $fromTime = $data->fromTime;
                    $untilTime = $data->untilTime;
                    $response['foodData'] += $foodName;
                }
                //$response['foodData'] = $data;
                echo json_encode($response);
            }
        }
    }
?>