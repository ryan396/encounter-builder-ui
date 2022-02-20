import { Button, Grid, Paper, Typography } from "@mui/material";
import { useContext, useRef } from "react";
import { EncounterCreationContext } from "../../context/EncounterCreationContext";
import EncounterTable from "./EncounterTable";
import { useReactToPrint } from "react-to-print";
import { calculateChallengeRating } from "../../context/ChallengeRating";
import "./EncounterListStyles.css";
import { Encounter } from "../../context/Types";

const EncounterList = () => {
  const { state } = useContext(EncounterCreationContext);
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      ref={componentRef}
      spacing={1}
    >
      <Button variant="outlined" onClick={handlePrint}>
        Print!
      </Button>
      {state.myEncounterList.map((encounter: Encounter, i) => {
        return (
          <Grid item xs={12} lg={6} key={i}>
            <Grid container component={Paper}>
              <Typography className="Typography">Encounter {i + 1}</Typography>
              <Typography className="Typography">
                Party Size: {encounter.partySize}
              </Typography>
              <Typography className="Typography">
                Party Level: {encounter.partyLevel}
              </Typography>
              <Typography className="Typography">
                CR:{" "}
                {calculateChallengeRating(
                  encounter.monsters,
                  encounter.partyLevel,
                  encounter.partySize
                )}
              </Typography>
            </Grid>
            <EncounterTable monsters={encounter.monsters} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default EncounterList;
