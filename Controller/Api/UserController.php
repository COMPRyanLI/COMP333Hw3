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
            $postData = json_decode(file_get_contents('php://input'),true);
            $username = $postData['username'];
            $password = $postData['password'];
            // Instantiate a UserModel to create a new user
            $userModel =  new UserModel();
            $userModel -> createUser($username,$password);

        }
       
}
     public function checkAction(){
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        if (strtoupper($requestMethod) == 'POST'){
            $postData = json_decode(file_get_contents('php://input'),true);
            $username = $postData['username'];
            $password = $postData['password'];
            // Instantiate a UserModel to check login
            $userModel =  new UserModel();
            $userModel -> checkUser($username,$password);
        } 

     }

     public function deleteAction(){
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        if (strtoupper($requestMethod) == 'POST'){
            $postData = json_decode(file_get_contents('php://input'),true);
            $id = $postData['id'];
            // Instantiate a UserModel to delete a rating
            $userModel =  new UserModel();
            $userModel -> deleteRating($id);
        } 

     }
     public function updateAction(){
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        if (strtoupper($requestMethod) == 'POST'){
            $postData = json_decode(file_get_contents('php://input'),true);
            $id = $postData['id'];
            $song = $postData['song'];
            $rating = $postData['rating'];
            $artist = $postData['artist'];
            // Instantiate a UserModel to update a rating
            $userModel =  new UserModel();
            $userModel -> updateRating($artist,$song,$rating,$id);
     }
}
     public function addAction(){
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        if (strtoupper($requestMethod) == 'POST'){
            $postData = json_decode(file_get_contents('php://input'),true);
            $username = $postData['username'];
            $artist = $postData['artist'];
            $song = $postData['song'];
            $rating = $postData['rating'];
            // Instantiate a UserModel to create a new rating
            $userModel =  new UserModel();
            $userModel -> addRating($username,$artist,$song,$rating);
        } 


     }
     public function viewAction(){
        $strErrorDesc = '';
         $requestMethod = $_SERVER["REQUEST_METHOD"];
         $arrQueryStringParams = $this->getQueryStringParams();
         if (strtoupper($requestMethod) == 'GET') {
             try {
                 $userModel = new UserModel();
                 $intLimit = 20;
                 if (isset($arrQueryStringParams['limit']) && $arrQueryStringParams['limit']) {
                     $intLimit = $arrQueryStringParams['limit'];
                 }
                 $arrUsers = $userModel->getRating($intLimit);
                 $responseData = json_encode($arrUsers);
             } catch (Error $e) {
                 $strErrorDesc = $e->getMessage().'Something went wrong! Please contact support.';
                 $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
             }
         } else {
             $strErrorDesc = 'Method not supported';
             $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
         }
         // send output 
         if (!$strErrorDesc) {
             $this->sendOutput(
                 $responseData,
                 array('Content-Type: application/json', 'HTTP/1.1 200 OK')
             );
         } else {
             $this->sendOutput(json_encode(array('error' => $strErrorDesc)), 
                 array('Content-Type: application/json', $strErrorHeader)
             );
         }
     }

    }
   


?>