<?php
if (isset($_POST['submit'])) {
  $name = $_POST['name'];
  $lastName = $_POST['lastname'];
  $mailFrom = $_POST['mail'];
  $message = $_POST['message'];

  $mailTo = "au009702@student.reading.ac.uk"
  $headers = "From: ". $mailFrom;
  $txt = "You have received an e-mail from".$name.".\n\n".$message;


  mail($mailTo, $lastName, $txt, $headers);
  header("Location: ContactUs.html?mailsend");
}



