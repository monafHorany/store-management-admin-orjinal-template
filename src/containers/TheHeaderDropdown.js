import React from "react";
import {
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

const TheHeaderDropdown = () => {
  return (
    <CDropdown className="m-1 btn-group" direction="down">
      <CDropdownToggle color="success">Success</CDropdownToggle>
      <CDropdownMenu>
        <CDropdownItem>Header</CDropdownItem>
        <CDropdownItem>Action Disabled</CDropdownItem>
        <CDropdownItem>Action</CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem>Another Action</CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdown;
