
<?php

$username = $_POST['username'];
$password = $_POST['password'];
if (isset($username) && isset($password)) {
  $json_data = file_get_contents('../data/data.json');
  $data = json_decode($json_data, true);
  if (array_key_exists($username, $data)) {
    $stored_pass = $data[$username]['password'];
    if (password_verify($password, $stored_pass)) {
      echo json_encode(['status' => 'success', 'userdata' => $data[$username]]);
    } else {
      echo json_encode(['status' => 'wrongpass']);
    }
  } else {
    echo json_encode(['status' => 'error']);
  }
} else {
  echo json_encode(['status' => 'missing', 'errorMSG'=>'username and/or password missing']);
}

?>
