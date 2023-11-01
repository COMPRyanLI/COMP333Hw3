<?php
header('Access-Control-Allow-Origin: *'); // This allows any origin. For security reasons, you might want to specify your domain instead of '*'.
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Credentials: true');
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

require __DIR__ . "/inc/bootstrap.php";
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode( '/', $uri );
if($uri[2]=='user'){
    require PROJECT_ROOT_PATH . "/Controller/Api/UserController.php";
    $objUserController = new UserController();
    $strMethodName = $uri[3] . 'Action';
    $objUserController->{$strMethodName}();

}

?>