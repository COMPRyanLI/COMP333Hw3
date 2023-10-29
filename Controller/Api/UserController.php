<?php
class UserController extends BaseController
{
    /** 
* "/user/list" Endpoint - Get list of users 
*/
    public function createAction()
    {
       
        $requestMethod = $_SERVER["REQUEST_METHOD"];
   
        if (strtoupper($requestMethod) == 'POST'){
            $postData = json_decode(file_get_contents('php://inputs'),true);
            // Instantiate a UserModel to create a new user
            $userModel =  new UserModel();
            $userModel -> createUser($postData);

        }
       
}
     public function checkAction(){
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        if (strtoupper($requestMethod) == 'GET'){
            $postData = json_decode(file_get_contents('php://inputs'),true);
            // Instantiate a UserModel to check login
            $userModel =  new UserModel();
            $userModel -> checkUser($postData);
        } 

     }

     public function deleteAction(){
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        if (strtoupper($requestMethod) == 'DELETE'){
            $postData = json_decode(file_get_contents('php://inputs'),true);
            // Instantiate a UserModel to delete a rating
            $userModel =  new UserModel();
            $userModel -> deleteRating($postData);
        } 

     }
     public function updateAction(){
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        if (strtoupper($requestMethod) == 'PUT'){
            $postData = json_decode(file_get_contents('php://inputs'),true);
            // Instantiate a UserModel to update a rating
            $userModel =  new UserModel();
            $userModel -> updateRating($postData);
     }
}
     public function addAction(){
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        if (strtoupper($requestMethod) == 'POST'){
            $postData = json_decode(file_get_contents('php://inputs'),true);
            // Instantiate a UserModel to create a new rating
            $userModel =  new UserModel();
            $userModel -> addRating($postData);
        } 


     }

}
?>