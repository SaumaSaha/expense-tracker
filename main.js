const { createApp } = require("./src/app");

const main = () => {
  const app = createApp();
  const port = 8000;

  app.listen(port, () => console.log("App listening on port:", port));
};

main();
