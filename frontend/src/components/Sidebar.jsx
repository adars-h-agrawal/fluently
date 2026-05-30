import { Link, useLocation } from "react-router-dom";
import useAuthUser from "../hooks/useAuthUser.js";
import {
  ActivityIcon,
  BellIcon,
  BookOpenIcon,
  BrainIcon,
  CompassIcon,
  MessageCircleIcon,
  PhoneIcon,
  SettingsIcon,
  ShipWheelIcon,
  SparklesIcon,
  TargetIcon,
} from "lucide-react";

const NAV_ITEMS = [
  { to: "/discover", label: "Discover", icon: CompassIcon },
  { to: "/messages", label: "Messages", icon: MessageCircleIcon },
  { to: "/calls", label: "Calls", icon: PhoneIcon },
  { to: "/coach", label: "AI Coach", icon: BrainIcon },
  { to: "/vocabulary", label: "Vocabulary", icon: BookOpenIcon },
  { to: "/practice", label: "Practice", icon: TargetIcon },
  { to: "/activity", label: "Activity", icon: ActivityIcon },
  { to: "/notifications", label: "Requests", icon: BellIcon },
  { to: "/settings", label: "Settings", icon: SettingsIcon },
];

const Sidebar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();

  return (
    <aside className="hidden lg:flex w-[17rem] flex-col glass-sidebar m-3 mr-0 rounded-2xl h-[calc(100vh-1.5rem)] sticky top-3 shrink-0">
      <div className="p-5 border-b border-white/8">
        <Link to="/discover" className="flex items-center gap-3 group">
          <div className="p-2 rounded-xl bg-primary/15 border border-primary/25 group-hover:shadow-[0_0_24px_hsl(var(--p)/0.25)] transition-shadow">
            <ShipWheelIcon className="size-6 text-primary" />
          </div>
          <div>
            <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary via-sky-400 to-secondary">
              Fluently
            </span>
            <p className="text-[10px] uppercase tracking-widest text-base-content/45">AI Language</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => {
          const isActive =
            location.pathname === to ||
            (to === "/messages" && location.pathname.startsWith("/chat"));

          return (
            <Link
              key={to}
              to={to}
              className={`nav-item ${isActive ? "nav-item-active" : "nav-item-inactive"}`}
            >
              <Icon
                className={`size-[18px] shrink-0 ${isActive ? "text-primary" : "opacity-60"}`}
              />
              <span>{label}</span>
              {to === "/coach" && (
                <SparklesIcon className="size-3 ml-auto text-primary/70" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-white/8">
        <div className="flex items-center gap-3 glass-card p-3 rounded-xl">
          <div className="avatar">
            <div className="w-10 rounded-full ring-2 ring-primary/30">
              <img src={authUser?.profilePic} alt="" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate">{authUser?.fullName}</p>
            <p className="text-xs text-success flex items-center gap-1">
              <span className="size-1.5 rounded-full bg-success animate-pulse" />
              Learning {authUser?.learningLanguage || "—"}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
