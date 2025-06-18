"use client";

import { usePathname } from "next/navigation";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { GoHeartFill } from "react-icons/go";

import { useLanguage } from "@/app/contexts/LanguageContext";

const supportedLanguages = [
  { code: "en-US", name: "English", short: "EN" },
  { code: "ar-EG", name: "Arabic", short: "AR" },
  { code: "fr-FR", name: "French", short: "FR" },
  { code: "zh-CN", name: "Chinese", short: "ZH" },
];

function NavbarComponent() {
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();

  const currentLang =
    supportedLanguages.find((lang) => lang.code === language) ||
    supportedLanguages[0];

  return (
    <Navbar expand="lg" className="bg-[#FFE353] fw-bold shadow-sm px-2">
      <Container fluid>
        <Navbar.Brand href="/" className="font-semibold">
          Movie App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="align-items-center gap-3">
            <NavDropdown
              title={currentLang.short}
              id="language-switcher-dropdown"
            >
              {supportedLanguages.map((lang) => (
                <NavDropdown.Item
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  active={lang.code === language}
                >
                  {lang.name}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
            <Nav.Link
              href="/WishList"
              className="d-flex align-items-center gap-2"
              active={pathname === "/WishList"}
            >
              <GoHeartFill size={24} />
              <span>WatchList</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
