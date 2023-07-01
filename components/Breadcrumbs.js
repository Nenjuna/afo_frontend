import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { useRouter } from "next/router";

const Breadcrumb = ({ breads }) => {
  const router = useRouter();
  //   console.log(breads);
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          underline="hover"
          color={router.pathname === "/" ? "text.primary" : "inherit"}
          href="/"
        >
          HOME
        </Link>
        {breads?.map((bread) => {
          return (
            <Link
              underline="hover"
              color={bread.isCurrent ? "text.primary" : "inherit"}
              href={bread.href}
              key={bread.href}
            >
              {bread.label.toUpperCase()}
            </Link>
          );
        })}
      </Breadcrumbs>
    </>
  );
};
export default Breadcrumb;
