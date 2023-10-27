<?php
require __DIR__ . "/inc/bootstrap.php";
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
header('Access-Control-Allow-Origin:*');
$uri = explode( '/', $uri );
if($uri[2]=='user'){
    require PROJECT_ROOT_PATH . "/Controller/Api/UserController.php";
    $objUserController = new UserController();
    $strMethodName = $uri[3] . 'Action';
    $objUserController->{$strMethodName}();

}

?>