import { NavLink } from "react-router-dom";
import logo from "../../assets/logo/logo.png";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#0a0a0a]/95 backdrop-blur-xl">
      <div className="container relative flex items-center justify-center h-16">
        <NavLink to="/" className="absolute left-0 flex items-center">
          <img src={logo} alt="RHYTHM" className="h-24 w-auto" />
        </NavLink>

        <nav className="flex items-center gap-1 bg-zinc-800/60 border border-white/[0.12] rounded-full px-1.5 py-1 shadow-lg">
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
                `px-5 py-1.5 rounded-full text-xs font-bold tracking-widest transition-all duration-200 ${
                  isActive
                    ? "bg-[var(--color-primary)] text-black shadow-[0_0_10px_rgba(5,220,120,0.4)]"
                    : "text-zinc-400 hover:text-white hover:bg-white/8"
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
