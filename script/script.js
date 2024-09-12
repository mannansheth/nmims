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

