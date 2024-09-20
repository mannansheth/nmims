<?php
  $json_data = file_get_contents('../data/data.json');
  $data = json_decode($json_data, true);

  $userDetails = json_decode(file_get_contents('php://input'), true);

  $username = $userDetails['username'];
  if (array_key_exists($username, $data)) {
    echo json_encode(['status'=>'userexists']);
    exit;
  }

  $hashed_password = password_hash($userDetails['password'], PASSWORD_BCRYPT);
  $userImageURL = 'images/'. $username . '.jfif';
  $defaultImageURL = 'images/profile.png';

  if (file_exists($userImageURL)) {
    $imageURL = $userImageURL;
  } else {
    $imageURL = $defaultImageURL;
  }
  $data[$username] = [
    'password'=>$hashed_password,
    'fullName'=>$userDetails['fullName'],
    'number'=>$userDetails['number'],
    'email'=>$userDetails['email'],
    'semester'=>$userDetails['semester'],
    'course'=>$userDetails['course'],
    'stream'=>$userDetails['stream'],
    'rollNumber'=>$userDetails['rollNumber'],
    'imageURL'=> $imageURL
  ];

  file_put_contents('../data/data.json', json_encode($data, JSON_PRETTY_PRINT));

  echo json_encode(['status' => 'success']);

