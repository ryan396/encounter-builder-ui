import {
  Grid,
  TextField,
  Hidden,
  Card,
  CardHeader,
  CardContent,
  Typography,
} from "@mui/material";
import { useState, useContext } from "react";
import MonsterTable from "./MonsterTable";
import SearchIcon from "@mui/icons-material/Search";
import { monsters } from "./Monsters";
import Monster from "../../types/Monster";
import MonsterCards from "./MonsterCards";
import { EncounterCreationContext } from "../../context/EncounterCreationContext";
import MobileDrawer from "../../components/MobileDrawer";

const initialState = monsters;

const EncounterCreation = () => {
  const [rows, setRows] = useState<Monster[]>(initialState);
  const { state } = useContext(EncounterCreationContext);

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

  console.log(state);

  return (
    <Grid
      container
      spacing={3}
      padding={3}
      sx={{ display: "flex", justifyContent: "flex-start" }}
    >
      <Grid item lg={6} xs={12}>
        <Card sx={{ textAlign: "left", mb: 3 }}>
          <CardHeader title="Current Encounter" />
          <CardContent>
            <Typography>Party Level:</Typography>
            <Typography>Party Size :</Typography>
          </CardContent>
        </Card>
        <Hidden mdDown>
          <MonsterCards />
        </Hidden>
        <Hidden mdUp>
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
          <MonsterTable monsters={rows} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EncounterCreation;
