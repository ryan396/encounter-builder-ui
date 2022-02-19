import { Button, Grid, Typography } from "@mui/material";
import { useContext, useRef } from "react";
import { EncounterCreationContext } from "../../context/EncounterCreationContext";
import Monster from "../../types/Monster";
import EncounterTable from "./EncounterTable";
import { useReactToPrint } from "react-to-print";

const EncounterList = () => {
  const { state, dispatch } = useContext(EncounterCreationContext);
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
    >
      <Button variant="outlined" onClick={handlePrint}>
        Print!
      </Button>
      {state.myEncounterList.map((encounter: any, i) => {
        return (
          <Grid item xs={12} lg={6} key={i}>
            <Typography>Encounter {i + 1}</Typography>
            <Typography>Party Level: {encounter.partySize}</Typography>
            <EncounterTable monsters={encounter.monsters} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default EncounterList;
