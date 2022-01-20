import { styled, TableCell, tableCellClasses } from "@mui/material";

const StyledTableCell = styled(TableCell)(({}) => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export default StyledTableCell;
