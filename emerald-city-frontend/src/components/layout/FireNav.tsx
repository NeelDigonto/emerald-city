import { List, styled } from "@mui/material";
import React from "react";

const FireNavImpl = styled(List)<{ component?: React.ElementType }>({
  "& .MuiListItemButton-root": {
    paddingLeft: 24,
    paddingRight: 24,
  },
  "& .MuiListItemIcon-root": {
    minWidth: 0,
    marginRight: 16,
  },
  "& .MuiSvgIcon-root": {
    fontSize: 20,
  },
});

const FireNav = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  return <FireNavImpl>{children}</FireNavImpl>;
};

export default FireNav;
