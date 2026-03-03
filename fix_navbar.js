const fs = require("fs");
let content = fs.readFileSync("app/components/Navbar.tsx", "utf8");
const toggleFunc = `  const toggleTheme = (e: React.MouseEvent) => {
    const isDark = theme === "dark";
    const nextTheme = isDark ? "light" : "dark";

    // @ts-ignore: View Transition API might not be fully typed in older TS
    if (!document.startViewTransition) {
      setTheme(nextTheme);
      return;
    }

    const x = e.clientX;
    const y = e.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    // @ts-ignore
    const transition = document.startViewTransition(() => {
      setTheme(nextTheme);
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        [
          { clipPath: \`circle(0px at \${x}px \${y}px)\` },
          { clipPath: \`circle(\${endRadius}px at \${x}px \${y}px)\` },
        ],
        {
          duration: 500,
          easing: "ease-out",
          pseudoElement: isDark
            ? "::view-transition-old(root)"
            : "::view-transition-new(root)",
        }
      );
    });
  };

  useEffect(() => {`;
content = content.replace("  useEffect(() => {", toggleFunc);
content = content.replace("onClick={() => setTheme(theme === \"dark\" ? \"light\" : \"dark\")}", "onClick={toggleTheme}");
fs.writeFileSync("app/components/Navbar.tsx", content);

