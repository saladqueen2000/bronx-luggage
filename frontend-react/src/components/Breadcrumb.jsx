import React from "react";
import { useLocation, Link } from "react-router-dom";
import "../global.css";

export default function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div className="breadcrumb">
      <Link to="/">Home</Link>

      {pathnames.map((name, index) => {
        const routeTo = "/" + pathnames.slice(0, index + 1).join("/");
        const isLast = index === pathnames.length - 1;

        return (
          <span key={routeTo}>
            <span className="sep">›</span>

            {isLast ? (
              <span className="current">{decodeURIComponent(name)}</span>
            ) : (
              <Link to={routeTo}>{decodeURIComponent(name)}</Link>
            )}
          </span>
        );
      })}
    </div>
  );
}
