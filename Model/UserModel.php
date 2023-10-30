<?php
require_once PROJECT_ROOT_PATH . "/Model/Database.php";
class UserModel extends Database
{   
    public function createUser($username,$password){ // registration function model
        $sql = "INSERT INTO users (username, password) VALUES(?,?) ";
        $hashed_password= password_hash($password,  PASSWORD_DEFAULT); 
        $stmt = $this->connection->prepare($sql);
        $stmt->bind_param("ss", $username, $hashedPassword);
        $stmt->execute();  
    }

    public function checkUser($username,$password){ // user model function for login.php
        $result = select("SELECT * FROM users WHERE username = ?", ["s", $username]);
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
    
    public function updateRating($id,$artist,$song,$rating){ // user model function for update
        $sql = "UPDATE ratings SET artist = ?, song = ?, rating = ? WHERE id = ?" ;
        $stmt = $this->connection->prepare($sql);
        $stmt->bind_param("ssii",$artist,$song,$rating,$id);
        $stmt->execute();        

    }
    
    public function deleteRating($id){ // user model function for delete
        $sql = "DELETE FROM ratings WHERE id = ?";
        $stmt = $this->connection->prepare($sql);
        $stmt->bind_param('i', $id);
        $stmt->execute();



    
}

    public function addRating($username,$artist,$song,$rating){ // user model function for addsong
        $sql1 = "SELECT * FROM ratings WHERE song = ? ";
        $result = select($sql1, ["s",$song]);
        $num = mysqli_num_rows($result);
        if ($num === 0){
            $sql = "INSERT INTO ratings (username, artist, song, rating) VALUES (?,?,?,?)";
            $stmt = $this->connection->prepare($sql);
            $stmt->bind_param("sssi",$username,$artist,$song,$rating);
            $stmt->execute();
        }

    }

    public function getRating($limit) // user model function for view
    {
        return $this->select("SELECT * FROM ratings ORDER BY id ASC LIMIT ?", ["i", $limit]);
    }
}
?>