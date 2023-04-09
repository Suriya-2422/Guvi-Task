<?php

    require '../vendor/autoload.php';

    function sessionExists($redis, $sessid) {
        $cmdSet = $redis->createCommand('exists', array($sessid));
        return $redis->executeCommand($cmdSet);
    }

    function deleteSession($redis, $sessid) {
        $cmdSet = $redis->createCommand('del', array($sessid));
        return $redis->executeCommand($cmdSet);
    }

    function logout($sessid) {
        $redis = new Predis\Client();
        if ( sessionExists($redis, $sessid) ) {
            return deleteSession($redis, $sessid);
        } else {
            return 1;
        }
    }

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $sessid = $_POST["id"];
        $logout = $_POST["logout"];
        if ( $logout == 1 ) {
            echo logout($sessid);
        }
        /* if ( validateEmail($email) && validatePassword($pwd) ) {
            verifyUser($email, $pwd);
        } else {
            echo 0;
        } */
    }
?>