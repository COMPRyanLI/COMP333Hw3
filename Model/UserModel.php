<?php
require_once PROJECT_ROOT_PATH . "/Model/Database.php";
class UserModel extends Database
{   
    public function createUser($userData){ // registration function
        $sql = "INSERT INTO users (username, password) VALUES(?,?) ";
        $userData[1]= password_hash($userData[1],  PASSWORD_DEFAULT); 
        executeStatement( $sql , ["ss",$userData]);
    }

    public function checkUser($userData){
        $user = . $userData[0];
        $password = $userData[1];
        $result = select("SELECT * FROM users WHERE username = ?", ["s", $user]);
        $num = mysqli_num_rows($result);
        $row = mysqli_fetch_assoc($result);
        $hashed_password = $row["password"];

       if ($num > 0 && password_verify($password, $hashed_password)) {
          return true;
    }
    else{
        return false;
    }

}



    public function getUsers($user)
    {
        return $this->select("SELECT * FROM users WHERE username = ?", ["s", $user]);
    }
}
?>