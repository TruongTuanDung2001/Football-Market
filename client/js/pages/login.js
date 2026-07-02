const login = document.getElementById("loginForm");

const register = document.getElementById("registerForm");

document.getElementById("showRegister").onclick = () => {
  login.classList.add("hidden");

  register.classList.remove("hidden");
};

document.getElementById("showLogin").onclick = () => {
  register.classList.add("hidden");

  login.classList.remove("hidden");
};

// toggle show pass
let passwordInput = document.querySelector('.inputPasswordLogin');
let eyeIcon  = document.querySelector('.toggle-password');

//check length input
passwordInput.addEventListener('input', function(){
  if(passwordInput.value.length > 0){
    eyeIcon.style.opacity = "1";
  }
  else{
    eyeIcon.style.opacity = "0";
  }
});

//show
eyeIcon .addEventListener('click', function(){
  if(passwordInput.type === 'password'){
    passwordInput.type = 'text';
    eyeIcon.classList.replace("fa-eye", "fa-eye-slash");
  }else{
    passwordInput.type = 'password';
    eyeIcon.classList.replace("fa-eye-slash", "fa-eye");
  }
});

console.log(document.querySelector(".toggle-password").style.display);
