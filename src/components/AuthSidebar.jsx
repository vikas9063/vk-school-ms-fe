import {
  Sidebar,
  SidebarItem,
  SidebarItems,
  SidebarItemGroup,
  SidebarCollapse,
} from "flowbite-react";

import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiCog,
} from "react-icons/hi";

import { Link, useLocation } from "react-router";
import React from "react";
import { SiHtmlacademy } from "react-icons/si";

// Icon lookup table
const icons = {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiCog,
};

// Sample sidebar data
const sidebarData = [
  {
    type: "item",
    label: "Dashboard",
    icon: "HiChartPie",
    href: "/auth/dashboard",
  },
  {
    type: "collapse",
    label: "General Settings",
    icon: "HiCog",
    link: "/auth/general-settings",
    children: [
      { label: "Institute Profile", href: "institute-profile" },
      { label: "Sales", href: "sales" },
      { label: "Refunds", href: "refunds" },
      { label: "Shipping", href: "shipping" },
    ],
  },
  {
    type: "item",
    label: "Inbox",
    icon: "HiCog",
    href: "/auth/inbox",
  },
  {
    type: "item",
    label: "Users",
    icon: "HiUser",
    href: "/auth/users",
  },
  {
    type: "item",
    label: "Products",
    icon: "HiShoppingBag",
    href: "/auth/products",
  },
  {
    type: "item",
    label: "Sign In",
    icon: "HiArrowSmRight",
    href: "/auth/signin",
  },
  {
    type: "item",
    label: "Sign Up",
    icon: "HiTable",
    href: "/auth/signup",
  },
];

// Utility function for joining paths safely
const joinPaths = (base, path) =>
  `${base.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;

export default function AuthSidebar() {
  const location = useLocation();

  return (
    <div className="bg-transparent">
      <div className="logo py-5 flex items-center gap-2 justify-center">
          <SiHtmlacademy size={25} className="text-white"/> <p className="text-2xl font-bold text-violet-50">School Arc</p>
      </div>
      <Sidebar aria-label="Sidebar with multi-level dropdown example" className="w-full">
        <SidebarItems>
          <SidebarItemGroup>
            {sidebarData.map((item) => {
              const Icon = icons[item.icon];

              if (item.type === "item") {
                const isActive = location.pathname === item.href;

                return (
                  <SidebarItem
                    key={item.label}
                    icon={Icon}
                    as={Link}
                    to={item.href}
                    className={`text-sm  ${isActive ? "bg-surface text-violet-700 hover:text-white" : ""}`}
                  >
                    {item.label}
                  </SidebarItem>
                );
              }

              if (item.type === "collapse") {
                const CollapseIcon = icons[item.icon];

                const isChildActive = item.children.some((child) =>
                  location.pathname === joinPaths(item.link, child.href)
                );

                return (
                  <SidebarCollapse
                    key={item.label}
                    icon={CollapseIcon}
                    label={item.label}
                    open={isChildActive} // auto-open if any child is active
                    className="text-sm"

                  >
                    {item.children.map((child) => {
                      const fullPath = joinPaths(item.link, child.href);
                      const isActive = location.pathname === fullPath;

                      return (
                        <SidebarItem
                          key={child.label}
                          as={Link}
                          to={fullPath}
                          className={`text-sm text-white ${isActive ? "bg-surface text-violet-700 hover:text-white" : ""}`}

                        >
                          {child.label}
                        </SidebarItem>
                      );
                    })}
                  </SidebarCollapse>
                );
              }

              return null;
            })}
          </SidebarItemGroup>
        </SidebarItems>
      </Sidebar>
    </div>
  );
}
