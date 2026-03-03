const fs = require("fs");
let content = fs.readFileSync("app/globals.css", "utf8");
content += `\n
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}
::view-transition-old(root) {
  z-index: 1;
}
::view-transition-new(root) {
  z-index: 2;
}
.dark::view-transition-old(root) {
  z-index: 2;
}
.dark::view-transition-new(root) {
  z-index: 1;
}
`;
fs.writeFileSync("app/globals.css", content);

