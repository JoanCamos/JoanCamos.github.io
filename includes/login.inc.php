<?php

if (isset($_POST["submit"])) {
  $email = $_POST["email"];
  $pwd = $_POST["pwd"];

  require_once 'dbh.inc.php';
  require_once 'functions.inc.php';


    if (emptyInputLogin($email, $pwd) !== false) {

    echo '<script type="text/javascript">';
    echo ' alert("Error Missing Input Values")';
    echo '</script>';
      exit();
    }


  loginUser($conn, $email, $pwd);
}
else {
  header("location: ../logIn.html");
  exit();
}