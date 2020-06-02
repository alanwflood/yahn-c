import React from "react";
import { NavLink } from "react-router-dom";

type NavItemProps = {
  to: string;
  children: React.ReactNode;
};
function NavItem({ to, children }: NavItemProps): React.ReactElement {
  return (
    <li className="mr-6">
      <NavLink activeClassName="underline" className="hover:underline" exact to={to}>
        {children}
      </NavLink>
    </li>
  );
}

export function Header(): React.ReactElement {
  return (
    <header className="py-4 px-2 bg-blue-300 shadow-md">
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
