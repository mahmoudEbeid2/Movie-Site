"use client";

import { usePathname, useRouter } from "next/navigation";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { GoHeartFill } from "react-icons/go";

import { useLanguage } from "@/app/contexts/LanguageContext";
import { useFavorites } from "@/app/contexts/FavoritesContext";

const supportedLanguages = [
  { code: "en-US", name: "English", short: "EN" },
  { code: "ar-EG", name: "Arabic", short: "AR" },
  { code: "fr-FR", name: "French", short: "FR" },
  { code: "zh-CN", name: "Chinese", short: "ZH" },
];

function NavbarComponent() {
  const pathname = usePathname();
  const router = useRouter();
  const { language, setLanguage } = useLanguage();
  const { count } = useFavorites();

  const currentLang =
    supportedLanguages.find((lang) => lang.code === language) ||
    supportedLanguages[0];

  const goToWishList = () => {
    router.push("/WishList");
  };

  const goToHome = () => {
    router.push("/");
  };

  return (
    <Navbar
      style={{ overflow: "hidden" }}
      expand="lg"
      className="bg-[#FFE353] fw-bold shadow-sm px-2 fixed-top"
    >
      <Container fluid>
        <Nav.Link as={"button"} onClick={goToHome} className="font-semibold">
          Movie App
        </Nav.Link>

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
              as="button"
              onClick={goToWishList}
              className={`d-flex align-items-center gap-2 btn btn-link m-0 p-0 text-start ${
                pathname === "/WishList" ? "active" : ""
              }`}
              style={{ background: "none", border: "none" }}
            >
              <GoHeartFill size={24} />
              <span>WatchList</span>
            </Nav.Link>

            <div
              style={{
                minWidth: "20px",
                height: "20px",
                background: "white",
                padding: "0 6px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "12px",
                color: "black",
                fontWeight: "bold",
                borderRadius: "3px",
              }}
            >
              {count}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
