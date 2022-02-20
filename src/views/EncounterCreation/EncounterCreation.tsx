import {
  Grid,
  TextField,
  Hidden,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Slider,
} from "@mui/material";
import { useState, useContext } from "react";
import MonsterTable from "./MonsterTable";
import SearchIcon from "@mui/icons-material/Search";
import { monsters } from "./Monsters";
import { Monster } from "../../context/Types";
import MonsterCards from "./MonsterCards";
import { EncounterCreationContext } from "../../context/EncounterCreationContext";
import MobileDrawer from "../../components/MobileDrawer";
import MonsterTableCollapse from "./MonsterTableCollapse";
import { AlertContext } from "../../context/AlertContext";
import { calculateChallengeRating } from "../../context/ChallengeRating";

const initialState = monsters;

const EncounterCreation = () => {
  const [rows, setRows] = useState<Monster[]>(initialState);
  const [partyLevel, setPartyLevel] = useState<number>(1);
  const [partySize, setPartySize] = useState<number>(1);
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

  const handlePartyLevelChange = (
    event: Event,
    newValue: number | number[]
  ) => {
    if (typeof newValue === "number") {
      setPartyLevel(newValue);
    }
  };

  const handlePartySizeChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      setPartySize(newValue);
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
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography gutterBottom>Party Level: {partyLevel}</Typography>
                <Slider
                  value={typeof partyLevel === "number" ? partyLevel : 0}
                  min={1}
                  max={9}
                  onChange={handlePartyLevelChange}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>Party Size: {partySize}</Typography>
                <Slider
                  value={typeof partySize === "number" ? partySize : 0}
                  min={1}
                  max={12}
                  onChange={handlePartySizeChange}
                />
              </Grid>
            </Grid>

            <Typography>
              Challenge Rating:{" "}
              {calculateChallengeRating(
                state.encounter.monsters,
                partyLevel,
                partySize
              )}
            </Typography>
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
                dispatch({
                  type: "saveEncounter",
                  payload: { partySize: partySize, partyLevel: partyLevel },
                });
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
          <MobileDrawer
            message={`Encounter Size: ${state.encounter.monsters.length}`}
          >
            <MonsterCards />
          </MobileDrawer>
        </Hidden>
      </Grid>
      <Grid item lg={6} xs={12}>
        <Grid container>
          <Grid item lg={6} xs={12}>
            <TextField
              sx={{ mb: 2, width: "100%" }}
              placeholder="search by name..."
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 2, color: "gray" }} />,
              }}
              onChange={(e) => requestSearch(e.target.value)}
            />
          </Grid>
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
