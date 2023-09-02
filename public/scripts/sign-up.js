const submitSignUpForm = () => {
  const name = document.querySelector("#name-text-box").value;
  const password = document.querySelector("#password-text-box").value;

  const request = {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ name, password }),
  };

  fetch("/sign-up", request).then((res) => {
    if (res.status === 201) {
      location.replace(res.headers.location);
      return;
    }
    alert("Username Already Exists");
  });
};

const main = () => {
  const signUpForm = document.querySelector("#sign-up-form");

  signUpForm.onsubmit = (event) => {
    event.preventDefault();

    submitSignUpForm();
  };
};

window.onload = main;
