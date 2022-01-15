import {
  Grid,
  TextField,
  Hidden,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { useState, useContext } from "react";
import MonsterTable from "./MonsterTable";
import SearchIcon from "@mui/icons-material/Search";
import { monsters } from "./Monsters";
import Monster from "../../types/Monster";
import MonsterCards from "./MonsterCards";
import { EncounterCreationContext } from "../../context/EncounterCreationContext";
import MobileDrawer from "../../components/MobileDrawer";
import MonsterTableCollapse from "./MonsterTableCollapse";
import { AlertContext } from "../../context/AlertContext";

const initialState = monsters;

const EncounterCreation = () => {
  const [rows, setRows] = useState<Monster[]>(initialState);
  const { state, dispatch } = useContext(EncounterCreationContext);
  const { openAlert } = useContext(AlertContext);

  const requestSearch = (searchedVal: string) => {
    if (searchedVal) {
      const filteredRows = rows.filter((row) => {
        return row.name.toLowerCase().includes(searchedVal.toLowerCase());
      });
      setRows([...filteredRows]);
    } else {
      setRows([...initialState]);
    }
  };

  return (
    <Grid
      container
      spacing={3}
      padding={3}
      sx={{ display: "flex", justifyContent: "flex-start" }}
    >
      <Grid item lg={6} xs={12}>
        <Card sx={{ textAlign: "left", mb: 3 }}>
          <CardContent>
            <Typography>Party Level:</Typography>
            <Typography>Party Size :</Typography>
          </CardContent>
          <CardActions>
            <Button
              onClick={() => {
                dispatch({ type: "reset" });
                openAlert("Encounter reset");
              }}
            >
              Reset
            </Button>
            <Button
              onClick={() => {
                // dispatch({ type: "reset" });
                openAlert("Encounter saved");
              }}
            >
              Save
            </Button>
          </CardActions>
        </Card>
        <Hidden lgDown>
          <MonsterCards />
        </Hidden>
        <Hidden lgUp>
          <MobileDrawer message={`Encounter Size: ${state.encounter.length}`}>
            <MonsterCards />
          </MobileDrawer>
        </Hidden>
      </Grid>
      <Grid item lg={6} xs={12}>
        <Grid container>
          <TextField
            sx={{ mb: 2 }}
            placeholder="search by name..."
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 2, color: "gray" }} />,
            }}
            onChange={(e) => requestSearch(e.target.value)}
          />
          <Hidden smDown>
            <MonsterTable monsters={rows} />
          </Hidden>
          <Hidden smUp>
            <MonsterTableCollapse monsters={rows} />
          </Hidden>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EncounterCreation;
