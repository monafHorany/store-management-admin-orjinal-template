import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { CHeader, CHeaderNav, CSubheader, CToggler } from "@coreui/react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

const TheHeader = () => {
  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.changeState.sidebarShow);

  const productsList = useSelector((state) => state.productList);
  const { products } = productsList;

  const toggleSidebar = () => {
    const val = [true, "responsive"].includes(sidebarShow)
      ? false
      : "responsive";
    dispatch({ type: "set", sidebarShow: val });
  };

  const toggleSidebarMobile = () => {
    const val = [false, "responsive"].includes(sidebarShow)
      ? true
      : "responsive";
    dispatch({ type: "set", sidebarShow: val });
  };
  const options = ["Option 1", "Option 2"];

  return (
    <CHeader withSubheader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />
      <CHeaderNav className="d-md-down-none m-auto w-75">
        <Autocomplete
          size="small"
          autoComplete
          className="w-100"
          getOptionLabel={(option) => option.product_en_name}
          clearOnBlur={true}
          clearOnEscape={true}
          // freeSolo
          id="free-solo-demo"
          disableClearable
          onChange={(event, value, reason) => console.log(event, value, reason)}
          onClick={() => console.log("sdfsdf")}
          // onClick={() => alert("asdasd")}
          // onKeyDown={(e) => e.charCode === 13 && alert("asdasd")}
          options={products}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search input"
              margin="normal"
              variant="outlined"
            />
          )}
        />
      </CHeaderNav>
    </CHeader>
  );
};

export default TheHeader;
