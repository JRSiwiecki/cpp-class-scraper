import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function Links() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsOpen(open);
  };

  const navigationLinks = [
    { label: "🏠 Home", to: "/" },
    { label: "📝 Course Recommender", to: "/course-recommender" },
    { label: "🏆 Top Courses", to: "/top-courses" },
    { label: "❓ About", to: "/about" },
  ];

  const sideList = () => (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {navigationLinks.map((link, index) => (
          <ListItem button key={index} component={Link} to={link.to}>
            <ListItemText primary={link.label} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <header>
      <nav className="link-container">
        <MenuIcon
          className="menu-icon"
          fontSize="large"
          onClick={toggleDrawer(true)}
        />
        <Drawer
          anchor="left"
          open={isOpen}
          onClose={toggleDrawer(false)}
          ModalProps={{ keepMounted: true }}
        >
          {sideList()}
        </Drawer>
      </nav>
    </header>
  );
}
