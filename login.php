
<!DOCTYPE HTML>
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="application/x-www-form-urlencoded"/>
<meta name="description" content="The login page">
<link rel="stylesheet" type="text/css" href="style.css" />
  <title>Login page</title>
</head>




<body>
  
  
<?php
   session_start();
  // end the current session and unset all session variables
  if (isset($_SESSION["loggedin"])) {
    // If the user is already logged in, redirect to index.php
    $_SESSION = array();
    session_destroy();
  }
  
  $servername = "localhost";
  $username = "root";
  $password = "";
  $dbname = "music_db";

  $db = mysqli_connect($servername, $username, $password, $dbname);

  if (mysqli_connect_errno()) {
   echo "Failed to connect to MySQL: "
    . mysqli_connect_error();
  }
   
  if(isset($_REQUEST["login"])){
    // Variables for the output and the web form below.

    
    $user = $_REQUEST['userid'];
    $pass = $_REQUEST['password'];
    //$pass= password_hash($pass, PASSWORD_DEFAULT);
    // password_verify($pass, $hashed_password)

    // The following is the core part of this script where we connect PHP
    // and SQL.
    // Check that the user entered data in the form.
    if(!empty($user) && !empty($pass)){
      // If so, prepare SQL query with the data to query the database.
      $sql = "SELECT * FROM users WHERE username = ?";
      // Construct a prepared statement.
      $stmt = mysqli_prepare($db, $sql);

      // Bind the values for username and password that the user entered to the
      // statement AS STRINGS (that is what "ss" means). In other words, the
      // user input is strictly interpreted by the server as data and not as
      // porgram code part of the SQL statement.
        mysqli_stmt_bind_param($stmt, "s", $user);
      // Run the prepared statement.
        mysqli_stmt_execute($stmt);
       $result = mysqli_stmt_get_result($stmt);
       $num = mysqli_num_rows($result);
       
      
       $row = mysqli_fetch_assoc($result);
       $hashed_password = $row["password"];
       

       if ($num > 0 && password_verify($pass, $hashed_password)) {
          echo "Login Success";
          session_start();
          echo 'Welcome to page #1<br />';
          echo('PHPSESSID: ' . session_id($_GET['session_id']));


// Set session variables.
// The "loggedin" session variable is used here to keep track if a user
// is logged in.
          $_SESSION['name']   = $user;
          $_SESSION["loggedin"] = true;

// Call index page
         if($_SESSION["loggedin"]){
            header("Location: index.php");
            }

           } else {
            echo "Wrong User id or password";
          }
          
         }
        else{
          echo "You have blank fields.";
        } 
         
        }
  // Close SQL connection.

?>

  <div id="form">
    <h1>Welcome to Music DB!</h1>
    <h3>Login</h3>
    <p>Please fill in your credentials to begin</p>
    <form name="form" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>" method="POST">
      <p>
        <label> USER NAME: </label>
        <input type="text" id="user" name="userid" />
      </p>

      <p>
        <label> PASSWORD: </label>
        <input type="text" id="pass" name="password" />
      </p>

      <p>
        <input type="submit" id="button" name = "login" value="Login" />
      </p>
      
      
    </form>
  </div>
  <p>Don't have an account? <a href = "Registration.php">Sign up now?</a> </p>

  
</body>

</html>