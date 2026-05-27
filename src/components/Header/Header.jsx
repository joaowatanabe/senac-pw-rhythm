import { NavLink } from "react-router-dom";
import logo from "../../assets/logo/logo.png";

const NAV_ITEMS = [
  { to: "/", label: "Início", end: true },
  { to: "/inclusion", label: "Adicionar música" },
  { to: "/my-songs", label: "Minhas músicas" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#0a0a0a]">
      <div className="container flex items-center justify-between h-16">
        <NavLink to="/" className="flex items-center">
          <img src={logo} alt="RHYTHM" className="h-24 w-auto" />
        </NavLink>

        <nav className="flex items-center gap-4">
          {NAV_ITEMS.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                isActive
                  ? "relative px-4 py-5 text-[13px] font-medium tracking-wide text-white after:absolute after:bottom-0 after:left-4 after:right-4 after:h-[2px] after:rounded-t after:bg-[#05dc78]"
                  : "relative px-4 py-5 text-[13px] font-medium tracking-wide text-zinc-500 hover:text-zinc-200 transition-colors duration-150"
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
