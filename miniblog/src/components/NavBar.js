import React from "react";
import { NavLink } from "react-router-dom";
import { useAuthValue } from "../context/AuthContext"; //Hook para pegar o valor
import { useAuthentication } from "../hooks/useAuthentication";

import styles from "./NavBar.module.css";

const NavBar = () => {
  const { user } = useAuthValue();

  return (
    <nav className={styles.navbar}>
      <NavLink to="/" className={styles.brand}>
        Mini<span>Blog</span>
      </NavLink>
      <ul className={styles.links_list}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Home
          </NavLink>
        </li>
        {/* PÁGINAS SEM  O USUÁRIO */}
        {!user && (
          <>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/register"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Register
              </NavLink>
            </li>
          </>
        )}
        {/*PÁGINAS COM USUÁRIO*/}
        {user && (
          <>
            <li>
              <NavLink
                to="/post/create"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Novo post
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Dashboard
              </NavLink>
            </li>
          </>
        )}
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Sobre
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
