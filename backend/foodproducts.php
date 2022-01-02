<?php
    session_start();
    include("mysql.php");

    if(isset($_GET['action'])){
        $action = $_GET['action'];

        //Displaying Food Products on HOME PAGE
        if ($action == "getFoodProducts"){

            $userObject = json_decode(file_get_contents('php://input'));
            $id = $userObject->userID;

            // SQL query to get user information
            $sql = "SELECT * FROM foodItems WHERE userID != '$id'";  
            $result = $mySQL->query($sql);

            if($result){
                while($row = $result->fetch_object()){
                    $data[] = $row;
                    $response['foodData'] = $data;
                }
                
                echo json_encode($response);
            }
        } 

        if ($action == "getFoodProductsProfile"){

            $userObject = json_decode(file_get_contents('php://input'));
            $id = $userObject->userID;

            // SQL query to get user information
            $sql = "SELECT * FROM foodItems WHERE userID = '$id'";  
            $result = $mySQL->query($sql);

            if($result){
                while($row = $result->fetch_object()){
                    $data[] = $row;
                    $response['foodProfileData'] = $data;
                }
                
                echo json_encode($response);
            }
        }
        
        //Displaying Food Products on PRODUCT DETAILS PAGE
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
        } //Displaying Food Products on BOOKING PAGE (SLIDER)
        else if ($action == "getChosenContent"){

            $chosenProductObject = json_decode(file_get_contents('php://input'));
            $id = $chosenProductObject->productId;
            $sellerID = $chosenProductObject->sellerID;
            $buyerID = $chosenProductObject->buyerID;

            // SQL query to get user information
            $sql = "SELECT * FROM productInfo WHERE PK_id = '$sellerID'";  
            $result = $mySQL->query($sql);

            if($result){
                while($row = $result->fetch_object()){
                    $data[] = $row;
                    $response['productsData'] = $data;
                }
                
                echo json_encode($response);
            }
        } //Displaying Food Products on BOOKING PAGE (TOP LIST)
        else if ($action == "getChosenProduct"){

            $chosenProductObject = json_decode(file_get_contents('php://input'));
            $id = $chosenProductObject->productId;

            // SQL query to get user information
            $sql = "SELECT * FROM productInfo WHERE PK_foodID = '$id'";  
            $result = $mySQL->query($sql);

            if($result){
                while($row = $result->fetch_object()){
                    $data[] = $row;
                    $response['productData'] = $data;
                }
                
                echo json_encode($response);
            }
        } else if ($action == "createOrder"){

            $orderObject = json_decode(file_get_contents('php://input'));
            $orderTime = date("Y-m-d h:i:s");
            $orderStatus = 1;
            $productID = $orderObject->productID;
            $buyer = $orderObject->buyer;
            $seller = $orderObject->seller;
            $pickUpDate = $orderObject->pickUpDate;
            $pickUpTime = $orderObject->pickUpTime;
            
            if (!empty($orderTime && $orderStatus && $productID && $buyer && $seller && $pickUpDate && $pickUpTime)) {

                $sql = "CALL addOrder('$orderTime', '$buyer', '$seller', '$pickUpDate', '$pickUpTime', '$productID', '$orderStatus')";
            
                if ($mySQL->query($sql) === TRUE) {
                    $response['addOrder'] = TRUE;
                    $response['seller'] = $seller;
                    echo json_encode($response);
                } else {
                    $response['addOrder'] = FALSE;
                    $response['error'] = "Adding order failed.";
                    echo json_encode($response);
                }
            } 
        } else if ($action == "getOrders"){
            $loggedInUser = json_decode(file_get_contents('php://input'));
            $id = $loggedInUser->userID;

            $sql = "SELECT * FROM orderInfo WHERE requestedUserID = '$id'";

            $result = $mySQL->query($sql);
            if($result){
                while($row = $result->fetch_object()){
                    $data[] = $row;
                    $response['orderData'] = $data;
                }
                echo json_encode($response);
            }
        } else if ($action == "getShared"){
            $loggedIn = json_decode(file_get_contents('php://input'));
            $id = $loggedIn->userID;

            $sql = "SELECT * FROM orderInfo WHERE sellerId = '$id'";

            $result = $mySQL->query($sql);
            if($result){
                while($row = $result->fetch_object()){
                    $data[] = $row;
                    $response['sharedData'] = $data;
                }
                echo json_encode($response);
            } 
        } else if ($action == "updateStatus"){
            $orderObject = json_decode(file_get_contents('php://input'));
            $id = $orderObject->orderFoodID;

            $sql = "UPDATE orders SET orderStatus = 2 WHERE PK_orderID = '$id'";
            
            if ($mySQL->query($sql) === TRUE) {
                $response['orderAccepted'] = TRUE;
                echo json_encode($response);
            }
            
        } else if ($action == "pickUpStatus"){
            $orderObject = json_decode(file_get_contents('php://input'));
            $id = $orderObject->orderFoodID;

            $sql = "UPDATE orders SET orderStatus = 3 WHERE PK_orderID = '$id'";
            
            if ($mySQL->query($sql) === TRUE) {
                $response['orderAccepted'] = TRUE;
                echo json_encode($response);
            }

        } else if ($action == "cancelStatus"){
            $orderObject = json_decode(file_get_contents('php://input'));
            $id = $orderObject->orderFoodID;

            $sql = "UPDATE orders SET orderStatus = 0 WHERE PK_orderID = '$id'";
            
            if ($mySQL->query($sql) === TRUE) {
                $response['orderCanceled'] = TRUE;
                echo json_encode($response);
            }
        }
    }

    if ($action == "getReviews"){

        $reviewObject = json_decode(file_get_contents('php://input'));

        // SQL query to get user information
        $sql = "SELECT * FROM ratings";  
        
        $result = $mySQL->query($sql);

        if($result){
            while($row = $result->fetch_object()){
                $data[] = $row;
                $response['reviewData'] = $data;
            }
            
            echo json_encode($response);
        }
    } 

        if ($action == "getSharedStatistics"){

            $statistics = json_decode(file_get_contents('php://input'));
            $id = $statistics->userID;

            // SQL query to get user information
            $sql = "SELECT * FROM orders WHERE sellerID = '$id'";  
            
            $result = $mySQL->query($sql);

            if($result){
                while($row = $result->fetch_object()){
                    $data[] = $row;
                    $response['statistics'] = $data;
                }
                echo json_encode($response);
            }
        } 

        if ($action == "getCollectedStatistics"){
            $statistics = json_decode(file_get_contents('php://input'));
            $id = $statistics->userID;

            // SQL query to get user information
            $sql = "SELECT * FROM orders WHERE requestedUserID = '$id' AND orderStatus = '3'";  
            
            $result = $mySQL->query($sql);

            if($result){
                while($row = $result->fetch_object()){
                    $data[] = $row;
                    $response['statistics'] = $data;
                }
                echo json_encode($response);
            }
        } 

        if ($action == "getRequestedStatistics"){
            $statistics = json_decode(file_get_contents('php://input'));
            $id = $statistics->userID;

            // SQL query to get user information
            $sql = "SELECT * FROM orders WHERE requestedUserID = '$id' AND orderStatus = '2'";  
            
            $result = $mySQL->query($sql);

            if($result){
                while($row = $result->fetch_object()){
                    $data[] = $row;
                    $response['statistics'] = $data;
                }
                echo json_encode($response);
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
            $currentUserID = $FoodItemObject->authUserID;

            if (!empty($foodName && $foodDescription && $amount && $unit && $foodType && $foodImg && $currentUserID && $expirationDate && $fromTime && $untilTime && $pickUpAddress)) {


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