<?php
session_start();

// Unset the session variable
if (isset($_SESSION['id'])) {
    unset($_SESSION['id']);
}

// Redirect to the login page
header("Location: https://ppe.launion.gov.ph/log-in.php");

// Output after redirection is set to avoid header issues
exit("Logout Successful");
?>