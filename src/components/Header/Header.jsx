import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(255,255,255,0.08)] bg-[rgba(10,10,15,0.85)] backdrop-blur-lg">
      <div className="container flex items-center justify-between py-4">
        <svg
          width="36"
          height="36"
          viewBox="0 0 40 40"
          fill="none"
          aria-label="RHYTHM logo"
        >
          <rect
            x="4"
            y="20"
            width="5"
            height="16"
            rx="2"
            fill="var(--color-primary)"
          />
          <rect
            x="12"
            y="10"
            width="5"
            height="26"
            rx="2"
            fill="var(--color-primary)"
          />
          <rect
            x="20"
            y="4"
            width="5"
            height="32"
            rx="2"
            fill="var(--color-purple)"
          />
          <rect
            x="28"
            y="14"
            width="5"
            height="18"
            rx="2"
            fill="var(--color-primary)"
          />
        </svg>
        <span
          className=" text-2xl font-bold tracking-tight"
          style={{
            background:
              "linear-gradient(90deg, var(--color-primary), var(--color-purple))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          RHYTHM
        </span>
      </div>

      <nav className="flex gap-2">
        {[
          { to: "/", label: "Home", end: true },
          { to: "/inclusion", label: "Inclusão" },
          { to: "/search", label: "Pesquisa" },
        ].map(({ to, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `px-4 py-2 rounded-md text-sm font-medium transition-all duration-150 ${
                isActive
                  ? "bg-[rgba(0,212,255,0.12)] text-primary font-semibold"
                  : "text-text-muted hover:text-text hover:bg-surface-2"
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
