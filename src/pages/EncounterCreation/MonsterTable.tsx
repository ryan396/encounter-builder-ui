import { useContext, useState } from "react";
import {
  TablePaginationActions,
  StyledTableCell,
  StyledTableRow,
} from "../../components/TableElements";
import {
  IconButton,
  TableFooter,
  TablePagination,
  Paper,
  TableHead,
  TableContainer,
  TableRow,
  TableBody,
  Table,
  TableCell,
} from "@mui/material";
import Monster from "../../types/Monster";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { EncounterCreationContext } from "../../context/EncounterCreationContext";
import { AlertContext } from "../../context/AlertContext";

interface Props {
  monsters: Monster[];
}

const MonsterTable = ({ monsters }: Props) => {
  const { dispatch } = useContext(EncounterCreationContext);
  const { openAlert } = useContext(AlertContext);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - monsters.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper} sx={{ mb: 10 }}>
      <Table aria-label="monster table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Level</StyledTableCell>
            <StyledTableCell align="right">Role</StyledTableCell>
            <StyledTableCell align="right">Size</StyledTableCell>
            <StyledTableCell align="right">Type</StyledTableCell>
            <StyledTableCell align="right">Source</StyledTableCell>
            <StyledTableCell align="right">Page</StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? monsters.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : monsters
          ).map((row) => (
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
              <StyledTableCell align="right">{row.source}</StyledTableCell>
              <StyledTableCell align="right">{row.page}</StyledTableCell>
              <StyledTableCell align="right">
                <IconButton
                  color="primary"
                  aria-label="add monster"
                  component="span"
                  onClick={() => {
                    openAlert("Monster saved to encounter");
                    dispatch({ type: "addMonster", payload: row });
                  }}
                >
                  <AddCircleOutlineIcon />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 71 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={12}
              count={monsters.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default MonsterTable;
