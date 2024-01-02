import { useEffect, useState } from "react";
import Logo from "../../assets/LOGO-PURPLE.png";
import { Calendar, Moon, Sun } from "lucide-react";

const Navbar = () => {
  const [theme, setTheme] = useState("");
  const element = document.documentElement;
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const handleThemeChange = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    console.log('Saved theme from localStorage:', savedTheme);
  
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    console.log('System prefers dark theme:', prefersDark);
  
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);

  useEffect(() => {
    if (theme === "light") {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  }, [theme]);
  return (
    <nav className="flex items-center justify-between px-[70px] py-[40px] bg-white dark:bg-slate-900 dark:text-slate-900">
      <div className="flex items-center gap-6">
        <a href="/">
          <img className="w-[200px] h-[44.66px]" src={Logo} alt="" />
        </a>
        <div className="flex items-center py-[12px] px-[16px] bg-white rounded-[10px] border border-zinc-200">
          <Calendar className="mr-4" />
          <span>{currentDate}</span>
        </div>
      </div>
      <button
        onClick={handleThemeChange}
        className="py-[12px] px-[10px] bg-white rounded-[10px] border border-zinc-100"
      >
        {theme === "light" ? <Moon /> : <Sun />}
      </button>
    </nav>
  );
};

export default Navbar;
