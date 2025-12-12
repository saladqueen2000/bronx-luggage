import React from "react";
import { useLocation, Link as RouterLink } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import "../global.css";

export default function MUIBreadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div className="breadcrumb-wrapper">
      <Breadcrumbs aria-label="breadcrumb" separator="›">
        <Link component={RouterLink} underline="hover" color="inherit" to="/">
          Home
        </Link>

        {pathnames.map((name, index) => {
          const routeTo = "/" + pathnames.slice(0, index + 1).join("/");
          const isLast = index === pathnames.length - 1;

          return isLast ? (
            <Typography
              key={routeTo}
              color="text.primary"
              sx={{ textTransform: "capitalize" }}
            >
              {decodeURIComponent(name)}
            </Typography>
          ) : (
            <Link
              key={routeTo}
              component={RouterLink}
              underline="hover"
              color="inherit"
              to={routeTo}
              sx={{ textTransform: "capitalize" }}
            >
              {decodeURIComponent(name)}
            </Link>
          );
        })}
      </Breadcrumbs>
    </div>
  );
}
