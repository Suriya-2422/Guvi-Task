<?php

    function validateName($name) {
        return preg_match("/[A-Za-z ]/", $name);
    }

    function validateEmail($email) {
        return preg_match("/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i", $email);
    }

    function validatePassword($password) {
        return preg_match("/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&+=.\-_*])([^\s]){8,16}$/", $password);
    }

    function addToDB($email, $password) {
        $conn = new mysqli("localhost", getenv("MYSQL_USER"), getenv("MYSQL_PASS"), "guviwebapp");
        if ($conn->connect_error) {
            return -2;
        }

        $stmt = $conn->prepare("SELECT email FROM `users_cred` WHERE email=?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt->store_result();
        if ( $stmt->num_rows > 0 ) {
            return -1;
        } else {
            $hashed_password = password_hash($password, PASSWORD_DEFAULT);
            $stmt = $conn->prepare("INSERT INTO `users_cred` (`email`, `password`) VALUES (?, ?)");
            $stmt->bind_param("ss", $email, $hashed_password);
            if ( $stmt->execute() ) {
                return 1;
            } else {
                return -5;
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
                $resp = addToDB($email, $pwd);
                echo $resp;
            } else {
                echo 0;
            }
   }
?>