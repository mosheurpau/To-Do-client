import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

function CustomLink({ children, to, ...props }) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <div>
      <Link
        style={{
          paddingBottom: "0px",
          margin: "10px",
          textTransform: "uppercase",
          color: match ? "#EB7700" : "black",
          textDecoration: "none",
          borderBottom: match ? "2px solid #EB7700" : "none",
        }}
        to={to}
        {...props}
      >
        {children}
      </Link>
    </div>
  );
}

export default CustomLink;
