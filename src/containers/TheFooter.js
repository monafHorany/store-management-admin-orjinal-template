import React from "react";
import { CFooter } from "@coreui/react";

const TheFooter = () => {
  return (
    <CFooter
      fixed={true}
      style={{
        backgroundColor: "#4D4D4D",
        color: "#FFFFFF",
      }}
    >
      <div>
        <a
          style={{ textDecoration: "none" }}
          href="https://coreui.io"
          target="_blank"
          rel="noopener noreferrer"
        >
          CoreUI
        </a>
        <span className="ml-1">&copy; 2020 creativeLabs.</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Powered by</span>
        <a
          style={{ textDecoration: "none" }}
          href="https://custom-software-nextjs.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          ŞAHİN HORANY
        </a>
      </div>
    </CFooter>
  );
};

export default React.memo(TheFooter);
