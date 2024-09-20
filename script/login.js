

const Submit = async (e) => {
  e.preventDefault();
  let username_field =  document.getElementById('username');
  let password_field = document.getElementById('password');
  let username = username_field.value;
  let password = password_field.value;
  const response = await fetch('script/login.php', {
    method:'POST',
    headers:{
      'Content-Type':'application/x-www-form-urlencoded'
    },
    body:`username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
  })
  const result = await response.json();
  if (result.status==='success') {
    localStorage.setItem('sap', username);
    localStorage.setItem('userdata', JSON.stringify(result.userdata));
    window.location.href='index.html';
  } else if (result.status==='missing') {
    console.log(result.errorMSG);
  } else if (result.status==='wrongpass'){
    password_field.value = '';
    password_field.placeholder = 'Incorrect password';
    password_field.classList.add('err');
  } else {
    username_field.value = '';
    password_field.value = '';
    username_field.placeholder = 'User not found';
    password_field.placeholder = 'Incorrect Password';
    username_field.classList.add('err');
    password_field.classList.add('err');
  }
}
