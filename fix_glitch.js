const fs = require("fs");
let content = fs.readFileSync("app/globals.css", "utf8");
content = content.replace(
`/* Base smooth transition for explicit theme switching */
body, main, nav, section, footer, div, span, p, h1, h2, h3, h4, h5, h6, a, button, svg, path {
  transition-property: background-color, border-color, color, fill, stroke;
  transition-duration: 400ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}`,
`/* Base smooth transition for explicit theme switching */
body {
  transition-property: background-color, color;
  transition-duration: 500ms;
  transition-timing-function: ease-in-out;
}`
);
fs.writeFileSync("app/globals.css", content);

