<?php
    session_start();

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

    if($_GET['action'] == "search") {
        // SQL query to search for users with firstnames matching the user's search input (LIKE is the keyword to do searches)
        $sql = "SELECT * FROM userInfo WHERE email LIKE('%" . $_GET['value'] . "%')";                

        // If the user did not input anything
        if(empty($_GET['value'])) {
            // Create an array and return it as json
            $array['status'] = "error";
            $array['errorCode'] = "Missing input";
            echo json_encode($array);
            exit;            
        }

        // Check if the SQL call was a success
        if($result = $mySQL->query($sql)) {
            // Make sure the SQL returned at least one row as a result
            if(mysqli_num_rows($result) > 0) {
                // Create an array to store the SQL result
                $results = [];
                while($row = $result->fetch_assoc()) {
                    // Save every row from the result as a new array index
                    $results[] = $row;
                }

                // Create an array and return it as json                
                $array['status'] = "success";
                $array['data'] = $results;
                echo json_encode($array);
                exit;
            } else {
                // Create an array and return it as json (if no results were returned)               
                $array['status'] = "error";
                $array['errorCode'] = "No results";
                echo json_encode($array);
                exit;
            }
        } else {
            // Create an array and return it as json (if the SQL call failed)               
            $array['status'] = "error";
            $array['errorCode'] = "Wrong query";
            echo json_encode($array);
        }
    }
?>