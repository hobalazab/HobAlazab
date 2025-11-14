const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");

// 🔹 تابع پاک کردن ورودی‌ها
function clearFormInputs(formSelector) {
  const form = document.querySelector(formSelector);
  if (!form) return;
  const inputs = form.querySelectorAll("input[type='text'], input[type='email'], input[type='password']");
  inputs.forEach(input => input.value = "");
}

// 🔹 وقتی روی "Signup" کلیک شد
signupBtn.onclick = () => {
  loginForm.style.marginLeft = "-50%";
  loginText.style.marginLeft = "-50%";

  // صبر کن تا انیمیشن تموم شه بعد پاک کن
  setTimeout(() => {
    clearFormInputs(".form-inner form.login");
  }, 400); // ← این زمان با مدت انیمیشن CSS هماهنگه
};

// 🔹 وقتی روی "Login" کلیک شد
loginBtn.onclick = () => {
  loginForm.style.marginLeft = "0%";
  loginText.style.marginLeft = "0%";

  // صبر کن تا انیمیشن تموم شه بعد پاک کن
  setTimeout(() => {
    clearFormInputs(".form-inner form.signup");
  }, 400);
};

// 🔹 وقتی روی لینک "Signup now" کلیک شد
signupLink.onclick = (e) => {
  e.preventDefault();
  signupBtn.click();
};
