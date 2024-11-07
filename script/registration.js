
const validatePersonalDetails = e => {
  e.preventDefault();
  const firstName = document.getElementById('firstName');
  const lastName = document.getElementById('lastName');
  const number = document.getElementById('number');
  const email = document.getElementById('email');
  const semester = document.getElementById('semester');
  const course = document.getElementById('course');
  const stream = document.getElementById('stream');
  const rollNumber = document.getElementById('rollNumber');
  
  if (isEmpty(firstName) || isEmpty(lastName) || isEmpty(number) || isEmpty(email) || isEmpty(semester) || isEmpty(course) || isEmpty(stream) || isEmpty(rollNumber)) {
    return false;
  }
  const fullName = firstName.value + ' ' + lastName.value;

  const namePattern = /^[a-zA-Z]+$/;
  const numberPattern = /^[0-9]{10}$/;
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const rollNumberPattern = /^[A-Z][0-9]{3}$/;
  
  if (!isValid(firstName, namePattern)) {
    displayError(firstName, "Enter valid name.");
    return false;
  }
  if (!isValid(lastName, namePattern)) {
    displayError(lastName, "Enter valid name.");
    return false;
  }
  if (!isValid(number, numberPattern)) {
    displayError(number, "Enter valid number.");
    return false;
  }
  if (!isValid(email, emailPattern)) {
    displayError(email, "Enter valid email.");
    return false;
  }
  if (semester.value < 0 || semester.value > 12) {
    displayError(semester, "Should be between 1 and 12.");
    return false;
  }
  if (!isValid(rollNumber, rollNumberPattern)) {
    displayError(rollNumber, "Enter valid roll number.");
    return false;
  }

  const newData = {
    "fullName":fullName,
    "number":number.value,
    "email":email.value,
    "semester":semester.value,
    "course":course.value,
    "stream":stream.value,
    "rollNumber":rollNumber.value
  }
  
  localStorage.setItem('newData', JSON.stringify(newData));
  window.location.href='registration.html';
  return true;
}
const isEmpty = (field) => {
  if (field.value=="") {
    displayError(field, "This cannot be empty.");
    return true;
  }
  return false;
}

const isValid = (field, regEx) => {
  return (regEx.test(field.value));
}
const displayError = (field, errorMsg) => {
    field.focus();
    field.value="";
    field.classList.add('err');
    field.placeholder = errorMsg;
}

const validate = async e => {
  e.preventDefault();
  username = document.getElementById('username');
  password = document.getElementById('password');
  repassword = document.getElementById('repassword');
  if (isEmpty(username) || isEmpty(password) || isEmpty(repassword)) {
    return false;
  }
  if (password.value!==repassword.value) {
    displayError(repassword, "Password does not match");
    return false;
  }
  const usernamePattern = /^703222[0-9]{5}$/
  if (!isValid(username, usernamePattern)) {
    displayError(username, "Enter valid SAP id");
    return false;
  }
  
  const personalDetails = JSON.parse(localStorage.getItem('newData'));

  if (!personalDetails) {
    alert('You need to fill your personal details first.');
    window.location.href='personal.html';
    return false;
  }
  console.log(personalDetails);

  const fullnewData = {
    "username":username.value,
    "password":password.value,
    ...personalDetails
  }

  const response = await fetch('script/registration.php', {
    method:'POST',
    headers: {
      "Content-Type":"application/json"
    },
    body:JSON.stringify(fullnewData)
  })

  const result = await response.json();
  if (result.status==='success') {
    alert('Registration succesful.');
    window.location.href='index.html';
  } else if (result.status==='userexists') {
    displayError(username, "User already exists");
  } 
}

const togglePass = (field_id, icon_id) => {
  const passwordField = document.getElementById(field_id);
  const icon = document.getElementById(icon_id);
  const type = passwordField.getAttribute('type')
  if (type === 'password') {
    passwordField.setAttribute('type', 'text');
    icon.classList.remove('fa-eye-slash')
    icon.classList.add('fa-eye')
    
  } else {
    passwordField.setAttribute('type', 'password');
    icon.classList.remove('fa-eye');
    icon.classList.add('fa-eye-slash');
  }
  passwordField.focus();
}