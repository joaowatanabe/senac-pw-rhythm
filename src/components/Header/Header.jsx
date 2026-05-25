import { NavLink } from "react-router-dom";
import logo from "../../assets/logo/logo.png";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0a]/95 backdrop-blur-xl h-20">
      <div className="container relative flex items-center justify-center h-20">
        <NavLink to="/" className="absolute left-0 flex items-center">
          <img src={logo} alt="RHYTHM" className="h-30 w-auto" />
        </NavLink>

        <nav className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 bg-zinc-900/80 border border-white/10 rounded-full p-14 shadow-lg">
          {[
            { to: "/", label: "HOME", end: true },
            { to: "/inclusion", label: "ADD" },
            { to: "/search", label: "PESQUISA" },
          ].map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `px-10 py-10 rounded-full text-base font-bold tracking-wide transition-all duration-300 ${
                  isActive
                    ? "bg-green-500 text-black shadow-md"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
