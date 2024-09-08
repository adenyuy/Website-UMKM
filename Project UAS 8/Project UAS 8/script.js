//Swiper JS 
var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });


const correctUsername = 'admin';
    const correctPassword = 'admin1234';

    function login() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const message = document.getElementById('message');
        const loginForm = document.getElementById('loginForm');
        const content = document.getElementById('content');

        if (username === correctUsername && password === correctPassword) {
            message.textContent = 'Login successful!';
            message.style.color = 'green';
            loginForm.style.display = 'none';
            content.style.display = 'block';
        } else {
            message.textContent = 'Invalid username or password.';
            message.style.color = 'red';
        }
    }

    function saveContent() {
            const editableText = document.getElementById('editableText').value;
            alert('Content saved: ' + editableText);
    }

let popup = document.getElementById("popup");

function openPopup(){
  popup.classList.add("open-popup");
}
function closePopup(){
  popup.classList.remove("open-popup");
}