<?php
require_once PROJECT_ROOT_PATH . "/Model/Database.php";

class UserModel extends Database
{
    public function getUsers($limit)
    {
        return $this->select("SELECT * FROM users ORDER BY username ASC LIMIT ?", ["i", $limit]);
    }

    public function createUser($username,$password)
    {
        $result = $this->select("SELECT * FROM users WHERE username = ?", ["s", $username]);
        $num = count($result);
        if ($num === 0) {
        $sql =  "INSERT INTO users (username, password) VALUES (?,?)";
        $stmt = $this->connection->prepare($sql);
        $pass = password_hash($password, PASSWORD_DEFAULT); // Hashing the password
        $stmt->bind_param("ss", $username, $pass);
        $stmt->execute();
        }
    }

    public function checkUser($username, $password)
    {
        $result = $this->select("SELECT * FROM users where username=?", ["s", $username]);
        $num = count($result);
        $hashed_password = $result[0]['password'];
        if ($num > 0 && password_verify($password, $hashed_password)) {
            echo "true";
        } else {
            echo "false";
        }
    }

    public function updateRating($id, $artist, $song, $rating)
    {
        $sql = "UPDATE ratings SET artist = ?, song = ?, rating = ? WHERE id = ?";
        $stmt = $this->connection->prepare($sql);
        $stmt->bind_param("ssii", $artist, $song, $rating, $id);
        $stmt->execute();
    }

    public function deleteRating($id)
    {
        $sql = "DELETE FROM ratings WHERE id = ?";
        $stmt = $this->connection->prepare($sql);
        $stmt->bind_param('i', $id);
        $stmt->execute();
    }

    public function addRating($username, $artist, $song, $rating)
    {
        $result = $this->select("SELECT * FROM ratings WHERE song = ?", ["s", $song]);
        $num = count($result);
        if ($num === 0) {
            $sql = "INSERT INTO ratings (username, artist, song, rating) VALUES (?,?,?,?)";
            $stmt = $this->connection->prepare($sql);
            $stmt->bind_param("sssi", $username, $artist, $song, $rating);
            $stmt->execute();
        }
    }

    public function getRating($limit)
    {
        return $this->select("SELECT * FROM ratings ORDER BY id ASC LIMIT ?", ["i", $limit]);
    }
}
?>
