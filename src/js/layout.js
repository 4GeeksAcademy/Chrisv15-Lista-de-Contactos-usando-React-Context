import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import {Home} from "./views/home";
import AddContact from "./views/addContact";
import Contact from "./views/contact";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

const Layout = () => {
  const basename = process.env.BASENAME || "";

  return (
      <div>
        <BrowserRouter basename={basename}>
          <ScrollToTop>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add-contact" element={<AddContact />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<h1>Not found!</h1>} />
            </Routes>
          </ScrollToTop>
        </BrowserRouter>
      </div>
  );
};

export default injectContext(Layout);