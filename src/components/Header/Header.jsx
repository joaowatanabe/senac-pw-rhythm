import { NavLink } from "react-router-dom";
import logo from "../../assets/logo/logo.png";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0a]/95 backdrop-blur-xl">
      <div className="container relative flex items-center justify-center h-20">
        <NavLink to="/" className="absolute left-0 flex items-center">
          <img src={logo} alt="RHYTHM" className="h-30 w-auto" />
        </NavLink>

        <nav className="flex items-center gap-1 bg-white/[0.05] border border-white/[0.08] rounded-full px-2 py-2">
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
                `px-10 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all duration-200 ${
                  isActive
                    ? "bg-[var(--color-primary)] text-black"
                    : "text-[var(--color-text-muted)] hover:text-white"
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
