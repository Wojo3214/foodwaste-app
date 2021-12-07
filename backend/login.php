<?php
    session_start();
    include("mysql.php");
    include("users.php");


    // ******* Log Out - GET method called ********//
    if (isset($_GET['action'])) {
        $action = $_GET['action'];
    
        if ($action == "logout") {
            session_destroy();
            $response['authenticated'] = FALSE;
            echo json_encode($response);
        }
    }


    // ******* Log In - GET method called ********//
    if($_GET['action'] == "loginUser") {

        $loginObject = json_decode(file_get_contents('php://input'));
        // var_dump($loginObject);


        $email = $loginObject->email;
        $password = $loginObject->password;

        // SQL query to get user information
        $sql = "SELECT * FROM userInfo WHERE email = '$email' LIMIT 1";  
        $result = $mySQL->query($sql);
        
        // Checking if the email exists
        if ($result->num_rows == 1) {
            $data = $result->fetch_object();
            $userPassword = $data->userPassword;
            $passVerify = ($password == $userPassword);
            // $passVerify = password_verify($userPassword, $password);

            // Checking if the password fits the given email
            if ($passVerify) {
                $sql = "SELECT * FROM userInfo WHERE PK_id = '$data->PK_id'";
                $user = $mySQL->query($sql)->fetch_object();
                $response['authenticated'] = TRUE;
                $response['userData'] = $user;
                $response['loginObject'] = $loginObject;
                echo json_encode($response);
            } else {
                $response['authenticated'] = FALSE;
                $response['error'] = "Wrong password";
                echo json_encode($response);
            }
        } else {
            $response['authenticated'] = FALSE;
            $response['error'] = "User doesn't exist";
            echo json_encode($response);
        }

        // while($userInfo = true) {
        //     // Save every row from the result as a new array index
        //     echo $userInfo;
        // };

        // while($row = $result->fetch_assoc()){
        //     echo $row;
        // }

        

        // If the user did not input anything
        // if(empty($jsonInput) || $jsonInput == "") {
        //     // Create an array and return it as json
        //     $jsonInput['status'] = "error";
        //     $jsonInput['errorCode'] = "Missing input";      
        // } 
        // echo json_encode($jsonInput); 
        // while ($row = $result->fetch_assoc()) {
        //     if($row["email"] == $logedInUser) {
        //         $logedInUser['status'] = "success";
        //         echo json_encode($logedInUser);
        //     }
        // };

        // exit;

    //     // Check if the SQL call was a success
    //     if($result = $mySQL->query($sql)) {
    //         // Make sure the SQL returned at least one row as a result
    //         if(mysqli_num_rows($result) > 0) {
    //             // Create an array to store the SQL result
    //             $results = [];
    //             while($row = $result->fetch_assoc()) {
    //                 // Save every row from the result as a new array index
    //                 $results[] = $row;
    //             }

    //             // Create an array and return it as json                
    //             $array['status'] = "success";
    //             $array['data'] = $results;
    //             echo json_encode($array);
    //             exit;
    //         } else {
    //             // Create an array and return it as json (if no results were returned)               
    //             $array['status'] = "error";
    //             $array['errorCode'] = "No results";
    //             echo json_encode($array);
    //             exit;
    //         }
    //     } else {
    //         // Create an array and return it as json (if the SQL call failed)               
    //         $array['status'] = "error";
    //         $array['errorCode'] = "Wrong query";
    //         echo json_encode($array);
    //     }
     }
