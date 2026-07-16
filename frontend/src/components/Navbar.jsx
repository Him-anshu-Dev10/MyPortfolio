import { useState, useEffect } from "react";
import { useLenis } from "lenis/react";

export default function Navbar() {
  const [active, setActive] = useState("");
  const lenis = useLenis();

  useEffect(() => {
    const handleScrollEvent = () => {
      const sections = ["home", "about", "skills", "experience", "education", "projects", "contact"];
      let currentSection = "";
      
      // Get the current scroll position with an offset for the navbar
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            currentSection = section;
            break;
          }
        }
      }
      
      if (currentSection) {
        setActive(currentSection);
      }
    };

    window.addEventListener("scroll", handleScrollEvent);
    // Call once on mount to set initial state
    handleScrollEvent();

    return () => window.removeEventListener("scroll", handleScrollEvent);
  }, []);

  const handleScroll = (e, id) => {
    e.preventDefault();
    setActive(id);
    const element = document.getElementById(id);
    if (element) {
      if (lenis) {
        lenis.scrollTo(`#${id}`, { offset: -80 });
      } else {
        // Fallback if lenis is not ready
        const y = element.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
      window.history.pushState(null, "", `#${id}`);
    }
  };

  const navItems = [
    { name: "ABOUT", id: "about" },
    { name: "SKILLS", id: "skills" },
    { name: "EXPERIENCE", id: "experience" },
    { name: "EDUCATION", id: "education" },
    { name: "PROJECTS", id: "projects" },
    { name: "CONTACT", id: "contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] bg-black/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 cursor-pointer">
            <a 
              href="#home" 
              onClick={(e) => handleScroll(e, 'home')}
              className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500 block"
            >
              HIMANSHU
            </a>
          </div>
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleScroll(e, item.id)}
                className={`relative group text-sm font-medium transition-colors uppercase ${
                  active === item.id ? "text-pink-500" : "text-white hover:text-pink-500"
                }`}
              >
                {item.name}
                <span
                  className={`absolute -bottom-1 left-0 w-full h-[2px] bg-pink-500 transition-transform duration-300 origin-left ${
                    active === item.id ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                ></span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
