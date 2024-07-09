import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Image,
  Button,
} from "@nextui-org/react";

export const PrincipalPage = () => {
  return (
    <>
      <Navbar shouldHideOnScroll>
        <NavbarBrand>
          <Image
            width={300}
            alt="NextUI hero Image"
            src="https://via.placeholder.com/300"
          />
          <p className="font-bold text-inherit">Crossref</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="/">
              Inicio
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="/CargarXML" aria-current="page">
              Cargar XML
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Sobre nosotros
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end"></NavbarContent>
      </Navbar>

      <h1>Bienvenido a Crossref</h1>
    </>
  );
};
