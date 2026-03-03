const fs = require("fs");
const files = [
  "app/components/Hero.tsx",
  "app/components/HomeWebsites.tsx",
  "app/components/Navbar.tsx",
  "app/components/WebsitesSection.tsx"
];
files.forEach(f => {
  let content = fs.readFileSync(f, "utf8");
  content = content.replaceAll(
    `<span className="absolute inset-0 -z-10 bg-purple-600 dark:bg-fuchsia-600 [clip-path:polygon(0_0,0_0,-30%_100%,-30%_100%)] group-hover/btn:[clip-path:polygon(0_0,130%_0,100%_100%,-30%_100%)] transition-[clip-path] duration-500 ease-[0.19,1,0.22,1]"></span>`,
    `<span className="absolute top-0 left-[-20%] w-[140%] h-full -z-10 bg-purple-600 dark:bg-fuchsia-600 -translate-x-full skew-x-[-30deg] group-hover/btn:translate-x-0 transition-transform duration-500 ease-[0.19,1,0.22,1]"></span>`
  );
  content = content.replaceAll(
    `<span className="absolute inset-0 -z-10 bg-purple-600 dark:bg-fuchsia-600 [clip-path:polygon(0_0,0_0,-30%_100%,-30%_100%)] group-hover:[clip-path:polygon(0_0,130%_0,100%_100%,-30%_100%)] transition-[clip-path] duration-500 ease-[0.19,1,0.22,1]"></span>`,
    `<span className="absolute top-0 left-[-20%] w-[140%] h-full -z-10 bg-purple-600 dark:bg-fuchsia-600 -translate-x-full skew-x-[-30deg] group-hover:translate-x-0 transition-transform duration-500 ease-[0.19,1,0.22,1]"></span>`
  );
  fs.writeFileSync(f, content);
});
