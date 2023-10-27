<?php
require_once PROJECT_ROOT_PATH . "/Model/Database.php";
class UserModel extends Database
{   
    public function createUser($userData){ // registration function
        $sql = "INSERT INTO users (username, password) VALUES(?,?) ";
        $userData[1]= password_hash($userData[1],  PASSWORD_DEFAULT); 
        executeStatement( $sql , ["ss",$userData]);
    }





    public function getUsers($user)
    {
        return $this->select("SELECT * FROM users WHERE username = ?", ["s", $user]);
    }
}
?>