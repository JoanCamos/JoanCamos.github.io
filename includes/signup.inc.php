<?php

if (isset($_POST["submit"])) {



  $name = $_POST["name"];
  $email = $_POST["email"];
  $pwd = $_POST["pwd"];
  $pwdRepeat = $_POST["pwdrepeat"];


  require_once 'dbh.inc.php';
  require_once 'functions.inc.php';

  if (emptyInputSignup($name, $email, $pwd, $pwdRepeat) !== false) {

    echo '<script type="text/javascript">';
    echo ' alert("Error Missing Input Values")';
    echo '</script>';
    exit();
    }

  // if (invalidEmail($email) !== false) {

     //header("location: ../SignUp.html?error=invalidemail");
   //  exit();
 //  }

    if (invalidUid($name) !== false) {
    echo '<script type="text/javascript">';
    echo ' alert("Error Invalid Name")';
    echo '</script>';
    exit();
      }

    if (pwdMatch($pwd, $pwdRepeat) !== false) {
    echo '<script type="text/javascript">';
    echo ' alert("Error Passwords Do Not Match")';
    echo '</script>'; 
      exit();
    }


   if (uidExists($conn, $name, $email) !== false) {
    echo '<script type="text/javascript">';
    echo ' alert("Error Name or Email taken")';
    echo '</script>';
     exit();
   }



  createUser($conn, $name, $email, $pwd);

 } else {
  header("location: ../SignUp.html");
   exit();

}