<?php

    require '../vendor/autoload.php';

    function validateName($name) {
        return preg_match("/[A-Za-z ]/", $name);
    }

    function validateEmail($email) {
        return preg_match("/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i", $email);
    }

    function validatePassword($password) {
        return preg_match("/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&+=.\-_*])([^\s]){8,16}$/", $password);
    }

    function createProfile($fname, $lname, $email) {
        $client = new MongoDB\Client("mongodb://localhost:27017");
        $collection = $client->guviwebapp->users_profile;
        $result = $collection->insertOne( [ 'firstName' => $fname, 'lastName' => $lname, 'email' => $email ] );
        return 1;
    }

    function checkUserExists($conn, $email) {
        $stmt = $conn->prepare("SELECT email FROM `users_cred` WHERE email=?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt->store_result();
        return $stmt->num_rows;
    }

    function createUser($conn, $email, $password) {
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        $stmt = $conn->prepare("INSERT INTO `users_cred` (`email`, `password`) VALUES (?, ?)");
        $stmt->bind_param("ss", $email, $hashed_password);
        return $stmt->execute();
    }

    function addToDB($email, $password, $fname, $lname) {
        $conn = new mysqli("localhost", getenv("MYSQL_USER"), getenv("MYSQL_PASS"), "guviwebapp");
        if ($conn->connect_error) {
            return -2;
        }

        if ( checkUserExists($conn, $email) > 0 ) {
            return -1;
        } else {
            if ( createUser($conn, $email, $password) ) {
                return createProfile($fname, $lname, $email);
            } else {
                return -2;
            } 
        }
        

        $conn->close();
    }

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $fname = $_POST["fname"];
        $lname = $_POST["lname"];
        $email = $_POST["email"];
        $pwd = $_POST["pwd"];
        $cpwd = $_POST["cpwd"];
        if ( validateName($fname) && validateName($lname) && validateEmail($email) 
            && validatePassword($pwd) && $pwd == $cpwd ) {
                echo addToDB($email, $pwd, $fname, $lname);
            } else {
                echo 0;
            }
   }
?>