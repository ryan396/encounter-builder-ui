import {
  Paper,
  TableHead,
  TableContainer,
  TableRow,
  TableBody,
  Table,
  Hidden,
} from "@mui/material";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../components/TableElements";
import Monster from "../../types/Monster";

interface Props {
  monsters: Monster[];
}

const EncounterTable = ({ monsters }: Props) => {
  return (
    <TableContainer component={Paper} sx={{ mb: 5 }}>
      <Table aria-label="monster table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Level</StyledTableCell>
            <StyledTableCell align="right">Role</StyledTableCell>
            <StyledTableCell align="right">Size</StyledTableCell>
            <StyledTableCell align="right">Type</StyledTableCell>
            <Hidden smDown>
              <StyledTableCell align="right">Source</StyledTableCell>
              <StyledTableCell align="right">Page</StyledTableCell>
            </Hidden>
          </TableRow>
        </TableHead>
        <TableBody>
          {monsters.map((row) => (
            <StyledTableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.level}</StyledTableCell>
              <StyledTableCell align="right">{row.role}</StyledTableCell>
              <StyledTableCell align="right">{row.size}</StyledTableCell>
              <StyledTableCell align="right">{row.type}</StyledTableCell>
              <Hidden smDown>
                <StyledTableCell align="right">{row.source}</StyledTableCell>
                <StyledTableCell align="right">{row.page}</StyledTableCell>
              </Hidden>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EncounterTable;
