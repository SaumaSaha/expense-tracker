const createSignOutElement = () => {
  const signOutElement = document.createElement("li");
  const anchor = document.createElement("a");

  anchor.href = "/sign-out";
  anchor.innerText = "Sign Out";
  anchor.classList.add("auth-link");

  signOutElement.append(anchor);

  return signOutElement;
};

const createMessageElement = (name) => {
  const messageElement = document.createElement("li");
  messageElement.innerText = `Welcome ${name}`;

  return messageElement;
};

const showUserName = (name) => {
  const authSection = document.querySelector("#auth-section");
  authSection.replaceChildren();

  const messageElement = createMessageElement(name);
  const signOutElement = createSignOutElement();

  authSection.append(messageElement, signOutElement);
};

const main = () => {
  fetch("/validate-username").then((res) => {
    if (res.status === 200) {
      res.json().then(({ name }) => showUserName(name));
    }
  });
};

window.onload = main;
