import React from "react";
import { TheContent, TheSidebar, TheHeader } from "./index";
import TheFooter from "./TheFooter";

const TheLayout = () => {
  return (
    <div className="c-app c-default-layout">
      <TheSidebar style={{ fontFamily: '"Courier New", Courier, monospace' }} />
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-body">
          <TheContent />
        </div>
        <TheFooter />
      </div>
    </div>
  );
};

export default TheLayout;
