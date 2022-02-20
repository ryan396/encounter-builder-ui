import { TextField, IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import React, { useContext } from "react";
import { Monster } from "../../context/Types";
import { EncounterCreationContext } from "../../context/EncounterCreationContext";

interface QuantityInputProps {
  monster: Monster;
}

export const QuantityInput = ({ monster }: QuantityInputProps) => {
  const { dispatch } = useContext(EncounterCreationContext);
  return (
    <React.Fragment>
      <TextField
        variant="standard"
        defaultValue={monster.quantity}
        inputProps={{
          min: 0,
          sx: { textAlign: "center" },
        }}
        InputProps={{
          disableUnderline: true,
          startAdornment: (
            <IconButton
              color="secondary"
              onClick={() => dispatch({ type: "decrement", payload: monster })}
            >
              <RemoveCircleOutlineIcon />
            </IconButton>
          ),
          endAdornment: (
            <IconButton
              color="primary"
              sx={{ mr: "auto" }}
              onClick={() => dispatch({ type: "increment", payload: monster })}
            >
              <AddCircleOutlineIcon />
            </IconButton>
          ),
        }}
      />
    </React.Fragment>
  );
};
