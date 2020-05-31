import React from "react";
import { Link } from "react-router-dom";

type NavItemProps = {
  to: string;
  children: React.ReactNode;
};
function NavItem({ to, children }: NavItemProps): React.ReactElement {
  return (
    <li className="mr-6">
      <Link to={to}>{children}</Link>
    </li>
  );
}

export function Header(): React.ReactElement {
  return (
    <header className="py-4 px-2 mb-3 bg-blue-300">
      <nav>
        <ul className="flex">
          <NavItem to="/">Top</NavItem>
          <NavItem to="/new">New</NavItem>
          <NavItem to="/best">Best</NavItem>
          <NavItem to="/ask">Ask</NavItem>
          <NavItem to="/job">Jobs</NavItem>
          <NavItem to="/show">Show</NavItem>
        </ul>
      </nav>
    </header>
  );
}
