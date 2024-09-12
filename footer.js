const loadFooter = () => {
  fetch('footer.html')
  .then(response => response.text())
  .then(data => {
    document.querySelector('footer').innerHTML = data;
  })
  .catch(err => console.log(err));
}
window.addEventListener('load', loadFooter);