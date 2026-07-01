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