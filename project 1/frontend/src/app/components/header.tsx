"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import classNames from "classnames";

// Menu principal com submenus
const menuItems = [
  {
    label: "About",
    submenu: [
      { label: "Example", href: "#" },
      { label: "Example", href: "#" },
      { label: "Example", href: "#" },
    ],
  },
  {
    label: "Products",
    submenu: [
      { label: "Example", href: "#" },
      { label: "Example", href: "#" },
      { label: "Example", href: "#" },
    ],
  },
  {
    label: "Contact",
    submenu: [
      { label: "Example", href: "#" },
      { label: "Example", href: "#" },
    ],
  },
];


