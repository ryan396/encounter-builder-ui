import { Grid, Typography } from "@mui/material";
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
      <button onClick={handlePrint}>Print this out!</button>
      {state.myEncounterList.map((encounter: Monster[], i) => {
        return (
          <Grid item xs={12} lg={6} key={i}>
            <Typography>Encounter {i + 1}</Typography>
            <EncounterTable monsters={encounter} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default EncounterList;
