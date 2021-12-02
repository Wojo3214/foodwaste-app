<?php
    session_start();
    include("mysql.php");
    include("users.php");

    // $userEmail = $_POST["mail"];
    // $userPassword = $_POST["password"];

    // $hashkey;
    
    // $userData = "";
    
    // while ($row = $result->fetch_object()) {
    //     if ($userEmail == $row->email ) {
    //         $hashkey = $row -> userPassword;
    //         $userData = $row;
    //     }
    // }

    // $passVerify = password_verify($userPassword, $hashkey);
    
    // if($passVerify) {
    //     $_SESSION ['userID'] = $userData->PK_id;
    //     header("location: ../pages/home.js");
    //     exit;  
    // }
    // else {
    //     header("location: index.php?error=loginFailed");
    //     exit;  
    // }

    // $json = file_get_contents("php://input");
    // $data = json_encode($json);
    // $data;

    if($_GET['action'] == "loginUser") {
        // SQL query to search for users with firstnames matching the user's search input (LIKE is the keyword to do searches)
        //$sql = "SELECT * FROM userInfo WHERE email LIKE('%" . $_GET['mail'] . "%')";                
        $logedInUser = json_encode(file_get_contents("php://input"));
          
        // if(empty($logedInUser)) {
        //     $logedInUser['status'] = "error";
        //     $logedInUser['errorCode'] = "Missing input"; 
        //     $encoded = json_encode($logedInUser);

        // }
        echo $logedInUser;

        // while($userInfo = true) {
        //     // Save every row from the result as a new array index
        //     echo $userInfo;
        // };

        // while($row = $result->fetch_assoc()){
        //     echo $row;
        // }

        
        //exit;
        //$jsonInput = file_get_contents('php://input');

        // If the user did not input anything
        // if(empty($jsonInput) || $jsonInput == "") {
        //     // Create an array and return it as json
        //     $jsonInput['status'] = "error";
        //     $jsonInput['errorCode'] = "Missing input";      
        // } 
        // echo json_encode($jsonInput); 
        while ($row = $result->fetch_assoc()) {
            if($row["email"] == $logedInUser) {
                $logedInUser['status'] = "success";
                echo json_encode($logedInUser);
            }
        };

        exit;

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

        // foreach($userInfo as $user) {
        //     if ( $user['email'] == 'kris@email.com' )
        //     {
        //         echo $user;
        //     }
        // }
        

        // while($userInfo){
        //     break;
        //     echo $row["PK_id"];
        //     echo $row["firstName"];
        // }

        // $site = '1';

        // $mysites = array('1', '2', '3', '4', '5', '6');
        // foreach($mysites as $mysite) 
        // {
        //     if ( $mysite !== '1' )
        //     {
        //         echo $mysite;
        //     }
        // }
?>