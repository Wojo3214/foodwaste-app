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
        
        if ($action == "getProductContent"){

            $productObject = json_decode(file_get_contents('php://input'));
            $id = $productObject->productId;

            // SQL query to get user information
            $sql = "SELECT * FROM productInfo WHERE PK_foodID = '$id'";  
            
            $result = $mySQL->query($sql);

            if($result){
                while($row = $result->fetch_object()){
                    $data[] = $row;
                    $response['foodData'] = $data;
                }
                
                echo json_encode($response);
            }
        } 
    }



    if (isset($_GET['action'])) {
        $action = $_GET['action'];
    
        // adding products to the database
        if ($action == "addFoodItems") {
            $FoodItemObject = json_decode(file_get_contents('php://input'));
            $foodName = $FoodItemObject->foodName;
            $foodDescription = $FoodItemObject->foodDescription;
            $amount = $FoodItemObject->foodAmount;
            $unit = $FoodItemObject->foodUnit;
            $foodType = $FoodItemObject->foodType;
            $expirationDate = $FoodItemObject->foodExpirationDate;
            $fromTime = $FoodItemObject->pickUpTimeFrom;
            $untilTime = $FoodItemObject->pickUpTimeTo;
            $foodImg = "../src/foodImg/" . $FoodItemObject->foodImg;
            $pickUpAddress = $FoodItemObject->foodAddress;

            if (!empty($foodName && $foodDescription && $amount && $unit && $unit && $foodType && $expirationDate && $fromTime && $untilTime && $pickUpAddress)) {

                $currentUserID = "get an ID for current user";

                $sql = "CALL addFoodItem('$foodName', '$foodDescription', '$amount', '$unit', '$foodType', '$expirationDate', '$fromTime', '$untilTime', '$currentUserID', '$foodImg', '$pickUpAddress')";
                if ($mySQL->query($sql) === TRUE) {
                    $response['addItemSuccess'] = TRUE;
                    echo json_encode($response);
                } else {
                    $response['addItemSuccess'] = FALSE;
                    $response['error'] = "Adding food item failed.";
                    echo json_encode($response);
                }
            } else {
                $response['addItemSuccess'] = FALSE;
                $response['error'] = "Adding food item failed. Please fill out all fields.";
                echo json_encode($response);
            }
        }
    }
?>