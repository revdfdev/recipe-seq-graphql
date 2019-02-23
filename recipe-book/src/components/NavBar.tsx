import * as React from "react";
import { NavLink } from "react-router-dom";
import SignOut from "./auth/SignOut";


const NavBarAuth = ({ session }: {session: any}) => (
  <>
    <ul>
      <li>
        <NavLink to="/" exact>Home</NavLink>
      </li>
      <li>
        <NavLink to="/search">Search</NavLink>
      </li>
      <li>
        <NavLink to="/search/add">Add Recipe</NavLink>
      </li>
      <li>
        <NavLink to="/profile">Add Recipe</NavLink>
      </li>
      <li>
        <SignOut />
      </li>
    </ul>
    <h4>Welcome, <strong>{session.getCurrentUser.username}</strong></h4>
  </>
)

const NavBarUnAuth = () => (
  <ul>
    <li>

    </li>
    <li>

    </li>
    <li>

    </li>
    <li>
      
    </li>
  </ul>
)