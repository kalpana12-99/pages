import React, { useState } from "react";
import { Container, Logo, LogoutButton } from "../index.js";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);

  const navigate = useNavigate();

  const [toggle, setToggle] = useState(false);

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="py-3 shadow bg-zinc-900 text-white">
      <Container>
        <nav className="flex items-center px-2">
          <div className="mr-4 px-2">
            <Link to="/">
              <Logo />
            </Link>
          </div>

          <ul className="flex items-center ml-auto space-x-1 md:space-x-4 invisible md:visible">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <NavLink
                    to={item.slug}
                    className={({ isActive }) =>
                      `${
                        isActive
                          ? "bg-zinc-100 text-zinc-900 font-semibold"
                          : ""
                      } inline-bock px-4 py-2 duration-200 hover:bg-zinc-100 hover:text-zinc-900 hover:font-semibold rounded-md`
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ) : null
            )}

            {authStatus && (
              <li>
                <LogoutButton className="duration-200 hover:bg-zinc-100 hover:text-zinc-900 hover:font-semibold rounded-md px-6 py-2" />
              </li>
            )}
          </ul>

          {/* hamburger menu */}

          <div className="md:hidden mr-3">
            {!toggle ? (
              <button
                className="text-3xl rotate-90 text-white hover:text-zinc-300 duration-200"
                onClick={() => setToggle(!toggle)}
              >
                |||
              </button>
            ) : (
              <button
                className="text-3xl rotate-90 text-zinc-400"
                onClick={() => setToggle(!toggle)}
              >
                |||
              </button>
            )}
            {toggle ? (
              <div>
                <div>
                  <ul className="fixed top-[63px] right-0 text-white bg-zinc-900 rounded-l pb-4 w-28">
                    {navItems.map((item) =>
                      item.active ? (
                        <li key={item.name}>
                          <button
                            onClick={() => navigate(item.slug)}
                            className="flex justify-center w-full px-4 py-2 duration-200 hover:bg-zinc-700 hover:font-semibold rounded-md"
                          >
                            {item.name}
                          </button>
                        </li>
                      ) : null
                    )}
                    {authStatus && (
                      <li className="w-full flex justify-center hover:bg-zinc-700 px-4 py-2 hover:font-semibold">
                        <LogoutButton />
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            ) : null}
          </div>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
