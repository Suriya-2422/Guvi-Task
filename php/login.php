<?php
    function validateEmail($email) {
        return preg_match("/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i", $email);
    }

    function validatePassword($password) {
        return preg_match("/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&+=.\-_*])([^\s]){8,16}$/", $password);
    }

    function verifyUser($email, $password) {
        $conn = new mysqli("localhost", getenv("MYSQL_USER"), getenv("MYSQL_PASS"), "guviwebapp");
        if ($conn->connect_error) {
            return -2;
        }

        $stmt = $conn->prepare("SELECT password FROM `users_cred` WHERE email=?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt -> store_result();
        $stmt -> bind_result($hashed_password);
        $stmt -> fetch();

        if ( $stmt->num_rows > 0 ) {
            if ( password_verify($password, $hashed_password) ) {
                echo 1;
            } else {
                echo 0;
            }
        } else {
            echo 0;
        }

        $conn->close();
    }

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $email = $_POST["email"];
        $pwd = $_POST["pwd"];
        if ( validateEmail($email) && validatePassword($pwd) ) {
            verifyUser($email, $pwd);
        } else {
            echo 0;
        }
    }
?>