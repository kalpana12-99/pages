import React from "react";
import { Link } from "react-router-dom";
import Logo from "../logo/Logo";

const Footer = () => {
  return (
    <section className="mt-10 text-white w-screen">
      <div className="z-10 fixed bottom-0 mx-auto w-screen bg-zinc-900 px-6 py-2 h-14">
        <div className="h-full flex flex-wrap">
          <div className="h-full w-full">
            <div className="flex h-full justify-around items-center">
              <div>
                <Logo />
              </div>
              <div>
                <p className="text-sm md:text-md">
                  Made with ❤️ by{" "}
                  <Link
                    to="https://www.linkedin.com/in/kalpana-muduli-697b09255/"
                    className="text-yellow-500 hover:text-blue-500 duration-200"
                  >
                    @kalpana
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
