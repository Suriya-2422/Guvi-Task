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

    function getEmail($sessid) {
        $redis = new Predis\Client();
        return $redis->get($sessid);
    }

    function getData($sessid) {
        $email = getEmail($sessid);
        $client = new MongoDB\Client("mongodb://localhost:27017");
        $collection = $client->guviwebapp->users_profile;
        $record = $collection->find( [ 'email' => $email ] );  
        echo json_encode(iterator_to_array($record));
    }

    function updateProfile($sessid, $data) {
        $email = getEmail($sessid);
        $dt = json_decode($data);
        $dt->email = $email;
        $client = new MongoDB\Client("mongodb://localhost:27017");
        $collection = $client->guviwebapp->users_profile;
        $collection->findOneAndReplace([ "email" => $email ], 
                    $dt);
        echo 1;
    }

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $sessid = $_POST["id"];

        if ( isset($_POST["logout"]) && $_POST["logout"] == 1 ) {
            echo logout($sessid);
        } else if ( isset($_POST["getinfo"]) && $_POST["getinfo"] == 1 ) {
            getData($sessid);
        } else if ( isset($_POST["update"]) && $_POST["update"] == 1 ) {
            $data = $_POST["data"];
            updateProfile($sessid, $data);
        }
    }
?>