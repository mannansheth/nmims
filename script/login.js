
const fetchData = () => {
  return fetch('data/data.json')
  .then(response => response.json())
  .catch(err => console.log(err));
}
const Submit = (e) => {
  e.preventDefault();
  validate();
}

const validate = () => {
  let username_field =  document.getElementById('username');
  let password_field = document.getElementById('password');
  let username = username_field.value;
  let password = password_field.value;
  fetchData().then(data => {
    if (data.hasOwnProperty(username)) {
      if (data[username]["password"] === password) {
        localStorage.setItem('sap', username)
        localStorage.setItem('userdata', JSON.stringify(data[username]));
        
        console.log(data[username]["fullName"]);
        
        window.location.href='index.html';        
      } else {
        password_field.value = '';
        password_field.placeholder = 'Incorrect Password';
        password_field.classList.add('err');
      }
    } else {
        username_field.value = '';
        username_field.placeholder = 'User not found';
        username_field.classList.add('err');
        password_field.value = '';
        password_field.placeholder = 'Incorrect Password';
        password_field.classList.add('err');
    }
  })
}
