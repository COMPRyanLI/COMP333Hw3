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
            $userModel - > createUser($postData);
        }
       
}
}
?>