const toggleSidebar = () => {
  const sidebar = document.getElementById('sidebar'); 
  if (sidebar.style.width==="40vw") {
    sidebar.style.width="0";
  } else {
    sidebar.style.width="40vw";
  }
}
setTimeout(() => {
  const query_button = document.getElementById('query');
  query_button.style.visibility="visible"; 
}, 3000)
setTimeout(() => {
  localStorage.clear();
  console.log("clearing due to timeout");
  
}, 100000);


const togglePass = () => {
  const passwordField = document.getElementById('password');
  const icon = document.getElementById('togglePassIcon');
  const togglePass = document.getElementById('togglePass');
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