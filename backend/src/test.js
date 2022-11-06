const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const { window } = new JSDOM(`
<!DOCTYPE html>
<iframe
id="identity"
frameborder="0"
src="https://identity.deso.org/embed"
style="
  height: 100vh;
  width: 100vw;
  display: none;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
"
></iframe>
`);

window.setInterval(() => null, 1000);

window.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("message", (event) => {
    console.log(event);
    if (event.data.service) {
      console.log(event.data);
    }
    if (event.data.method === "initialize") {
      event.source.postMessage(
        // respond to initialize message
        {
          id: event.data.id,
          service: "identity",
          payload: {},
        },
        "https://identity.deso.org"
      );
    }
  });
});
