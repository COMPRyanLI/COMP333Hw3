<?php
require_once PROJECT_ROOT_PATH . "/Model/Database.php";
class UserModel extends Database
{   
    public function createUser($userData){ // registration function model
        $sql = "INSERT INTO users (username, password) VALUES(?,?) ";
        $hashed_password= password_hash($userData['password'],  PASSWORD_DEFAULT); 
        executeStatement($sql, ["ss", $userData['username'], $hashedPassword]);
    }

    public function checkUser($userData){ // user model function for login.php
        $user = $userData['username'];
        $password = $userData['password'];
        $result = select("SELECT * FROM users WHERE username = ?", ["s", $user]);
        $num = mysqli_num_rows($result);
        $row = mysqli_fetch_assoc($result);
        $hashed_password = $row["password"];

       if ($num > 0 && password_verify($password, $hashed_password)) {
        session_start();
        echo('PHPSESSID: ' . session_id($_GET['session_id']));
        $_SESSION['name']   = $user;
        $_SESSION["loggedin"] = true;
        return true;
    }
    else{
        return false;
    }

}
    
    public function updateRating($userData){ // user model function for update
        $sql = "UPDATE ratings SET artist = ?, song = ?, rating = ? WHERE id = ?" ;
        executeStatement( $sql , ["ssii",$userData]);

    }
    
    public function deleteRating($userData){ // user model function for delete
        $sql_query = "SELECT song, artist, rating FROM ratings WHERE id = ?";
        $id = $userData['id'];
        $song = $userData['song'];
        $result = select($sql_query, ["i", $id]);
        $num = mysqli_num_rows($result);
        if ($num === 0){
            $sql = "DELETE FROM ratings WHERE song = ? AND id = ?";
            executeStatement( $sql , ["si",$song,$id]);
    }
}

    public function addRating($userData){ // user model function for addsong
        $sql1 = "SELECT * FROM ratings WHERE song = ? ";
        $song = $userData['song'];
        $username = $userData['username'];
        $rating = $userData['rating'];
        $artist = $userData['artist'];
        $result = select($sql1, ["s",$song]);
        $num = mysqli_num_rows($result);
        if ($num === 0){
            $sql = "INSERT INTO ratings (username, artist, song, rating) VALUES (?,?,?,?)";
            executeStatement( $sql , ["sssi",$username,$artist,$song,$rating]);
        }

    }

    public function getRating($userData) // user model function for view
    {
        $id = $userData['id'];
        return $this->select("SELECT * FROM ratings WHERE id = ?", ["i", $id]);
    }
}
?>