import React from "react";

import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";

const Navigation = () => {
  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand>Sticky Notes</NavbarBrand>
      <Nav className="mr-auto">
        <NavItem>
          <NavLink href="/">Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/Notes">Notes</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/login">Login</NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default Navigation;
