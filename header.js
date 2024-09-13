const loadHeader = () => {
  fetch('header.html')
  .then(response => response.text())
  .then(data => {
    document.querySelector('header').innerHTML = data;
    
    updateUserInfo();
  })
  .catch(err => console.log(err));
}
window.addEventListener('load', loadHeader);


const logOut = () => {
  localStorage.clear();
  console.log('clearing');
  location.reload();
}

const toggleUserInfo = (element, msg) => {
  if (element.classList.contains('show')) {
    element.classList.remove('show');
  } else {
    element.classList.add('show');
    console.log(msg);
    console.log(element.classList);
    
  }
}

const updateUserInfo = () => {
  const user_info = document.getElementById('user-info');
  const profile_info = document.getElementById('profile-info');
  const profile_info_sidebar = document.getElementById('profile-info-sidebar');
  const sap = localStorage.getItem('sap');
  const user_info_sidebar = document.getElementById('user-info-sidebar');
  if (sap) {
    const stored_data = localStorage.getItem('userdata');
    const parsed_user_data = JSON.parse(stored_data);
    console.log(parsed_user_data);
    user_info.classList.add('profile-div');
    user_info.addEventListener('click', () => toggleUserInfo(profile_info, 'hello1'));
    user_info_sidebar.addEventListener('click', () => toggleUserInfo(profile_info_sidebar, 'hello2'));

    user_info.innerHTML = `<img class="icon" src="${parsed_user_data.imageURL || 'images/profile.png'}"></img>
    <div class="name-sap">
      <h3 class="user-name">${parsed_user_data.fullName}</h3>
      <h3 class="user-sap">${sap}</h3>
    </div>`
    user_info_sidebar.classList.add('profile-div-sidebar')
    user_info_sidebar.innerHTML = `<img class="icon" src="${parsed_user_data.imageURL || 'images/profile.png'}"></img>
    <div class="name-sap">
      <h3 class="user-name">${parsed_user_data.fullName}</h3>
      <h3 class="user-sap">${sap}</h3>
    </div>`
    profile_info.innerHTML = `<a href="">${parsed_user_data.rollNo} </a>
  <a href="">${parsed_user_data.email} </a>
  <a href>${parsed_user_data.number} </a>
  <a href="">Profile</a>
  <a href="">Change Password</a>
  <a href="" id="logout">Logout</a>`;
    profile_info_sidebar.innerHTML = `<a href="">${parsed_user_data.rollNo} </a>
  <a href="">${parsed_user_data.email} </a>
  <a href>${parsed_user_data.number} </a>
  <a href="">Profile</a>
  <a href="">Change Password</a>
  <a href="" id="logout">Logout</a>`;
  document.getElementById('logout').addEventListener('click', logOut);
  } else {
    user_info.innerHTML = `<a href="login.html" class="login">
    <button class="login-btn">
      <p>LOGIN</p>
    </button>
  </a>`
    user_info_sidebar.innerHTML = `<a href="login.html" class="login">
    <button class="login-btn">
      <p>LOGIN</p>
    </button>
  </a>`
  }
}
