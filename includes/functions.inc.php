<?php

 function emptyInputSignup($name, $email, $pwd, $pwdrepeat) {
 // $result;
   if (empty($name) || empty($email) || empty($pwd) || empty($pwdrepeat)) {
     $result = true;
   }
   else {
     $result = false;
   }
   return $result;
 }


   function invalidUid($name)
   {
   //$result;
     if (!preg_match("/^[a-zA-z0-9]*$/", $name)) {
       $result = true;
     } else {
       $result = false;
     }
     return $result;
   }


  function uidExists($conn, $name, $email)
   {
    $sql = "SELECT * FROM users WHERE usersId = ? OR usersEmail = ?;";
    $stmt = mysqli_stmt_init($conn);
    if (!mysqli_stmt_prepare($stmt, $sql)) {
     header("location: ../SignUp.html?error=stmtfailed");
     exit();
   }

    mysqli_stmt_bind_param($stmt, "ss", $name, $email);
    mysqli_stmt_execute($stmt);

    $resultData = mysqli_stmt_get_result($stmt);

    if ($row = mysqli_fetch_assoc($resultData)) {
      return $row;
    } else {
      $result = false;
      return $result;
    }
    mysqli_stmt_close($stmt);
  }

  function pwdMatch($pwd, $pwdRepeat) {
    if ($pwd !== $pwdRepeat) {
    $result = true; }
    else {
      $result = false;
    }
    return $result;
    }
  


  function createUser($conn, $name, $email, $pwd)
  {
    $sql = "INSERT INTO users (usersName, usersEmail, usersPwd) VALUES (?, ?, ?);";
    $stmt = mysqli_stmt_init($conn);
    if (!mysqli_stmt_prepare($stmt, $sql)) {
      header("location: ../SignUp.html?error=stmtfailed");
      exit();
    }

    $hashedPwd = password_hash($pwd, PASSWORD_DEFAULT);

    mysqli_stmt_bind_param($stmt, "sss", $name, $email, $hashedPwd);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);
    header("location: ../LogIn.html");
    exit();

 }


 function emptyInputLogin($email, $pwd) {
  // $result;
   if (empty($email) || empty($pwd)) {
     $result = true;
   }
   else {
     $result = false;
   }
   return $result;
 }

function loginUser($conn, $email, $pwd) {
  $uidExists = uidExists($conn, $email, $email);

  if ($uidExists === false) {
    header("location: ../LogIn.html?error=wronglogin");
    exit();
  }

  $pwdHashed = $uidExists["usersPwd"];
  $checkPwd = password_verify($pwd, $pwdHashed);


  if ($checkPwd === false) {
    header("location: ../LogIn.html?error=wronglogin");
    exit(); 
  }

  else if ($checkPwd === true) {
    session_start();
    $_SESSION["userid"] = $uidExists["usersId"];
    $_SESSION["useremail"] = $uidExists["usersEmail"];
    header("location: ../Index.html");
    exit();

  }
}
