import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="footer bg-[#0d181d]  px-10 py-16 mt-20 text-paragraph poppins border-b border-green border-dashed">
        <aside className="pl-8 md:pl-0">
          <h1 className="text-white font-bold text-3xl">
            Deal<span className="text-green">Mart</span>
          </h1>
          <p className="text-xs lg:text-sm">
            <span className="text-green  font-bold">SH</span> Industries
            Ltd.
            <br />
            Providing reliable tech since 1992
          </p>
        </aside>
        <div className="grid grid-cols-2 md:grid-cols-4 *:flex *:flex-col justify-between w-full pl-8 md:pl-0">
          <div className="space-y-2">
            <h6 className="text-green lg:text-xl font-bold">Services</h6>
            <a className="text-xs lg:text-sm link link-hover hover:text-green duration-500">
              Branding
            </a>
            <a className="text-xs lg:text-sm link link-hover hover:text-green duration-500">
              Design
            </a>
            <a className="link text-xs lg:text-sm link-hover hover:text-green duration-500">
              Marketing
            </a>
            <a className="link link-hover hover:text-green duration-500">
              Advertisement
            </a>
          </div>
          <div className="space-y-2">
            <h6 className="text-green lg:text-xl font-bold">Company</h6>
            <a className="text-xs lg:text-sm link link-hover hover:text-green duration-500">
              About us
            </a>
            <a className="text-xs lg:text-sm link link-hover hover:text-green duration-500">
              Contact
            </a>
            <a className="link text-xs lg:text-sm link-hover hover:text-green duration-500">
              Jobs
            </a>
            <a className="link text-xs lg:text-sm link-hover hover:text-green duration-500">
              Press kit
            </a>
          </div>
          <div className="space-y-2">
            <h6 className="text-green lg:text-xl font-bold">About</h6>
            <a className="text-xs lg:text-sm link link-hover hover:text-green duration-500">
              About Us
            </a>
            <a className="text-xs lg:text-sm link link-hover hover:text-green duration-500">
              Our Blog
            </a>
            <a className="link text-xs lg:text-sm link-hover hover:text-green duration-500">
              New Destination
            </a>
          </div>
          <div className="space-y-2">
            <h6 className="text-green lg:text-xl font-bold">Legal</h6>
            <a className="text-xs lg:text-sm link link-hover hover:text-green duration-500">
              Terms of use
            </a>
            <a className="text-xs lg:text-sm link link-hover hover:text-green duration-500">
              Privacy policy
            </a>
            <a className="link text-xs lg:text-sm link-hover hover:text-green duration-500">
              Cookie policy
            </a>
          </div>
        </div>
      </footer>
      <footer className="footer footer-center text-paragraph p-4 bg-[#0d181d] poppins">
        <aside>
          <p className="text-xs lg:text-xm">
            Copyright © {new Date().getFullYear()} - All right reserved by{" "}
            <span className="text-green  font-bold">SH </span>
            Industries Ltd
          </p>
        </aside>
      </footer>
    </>
  );
};

export default Footer;
