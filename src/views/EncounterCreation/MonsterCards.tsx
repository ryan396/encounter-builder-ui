import Monster from "../../types/Monster";
import { useContext } from "react";
import {
  Box,
  Card,
  Button,
  CardContent,
  CardActions,
  Grid,
  Typography,
  TextField,
  IconButton,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { EncounterCreationContext } from "../../context/EncounterCreationContext";
import React from "react";

interface QuantityInputProps {
  monster: Monster;
}

const MonsterCards = () => {
  const { state, dispatch } = useContext(EncounterCreationContext);

  const QuantityInput = ({ monster }: QuantityInputProps) => {
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
                onClick={() =>
                  dispatch({ type: "decrement", payload: monster })
                }
              >
                <RemoveCircleOutlineIcon />
              </IconButton>
            ),
            endAdornment: (
              <IconButton
                color="primary"
                sx={{ mr: "auto" }}
                onClick={() =>
                  dispatch({ type: "increment", payload: monster })
                }
              >
                <AddCircleOutlineIcon />
              </IconButton>
            ),
          }}
        />
      </React.Fragment>
    );
  };
  return (
    <>
      <Grid container spacing={3}>
        {state.encounter.monsters.map((monster: Monster) => {
          return (
            <React.Fragment key={monster.name}>
              <Grid item lg={6} sm={6} xs={12}>
                <Box sx={{ textAlign: "left" }}>
                  <Card>
                    <CardContent>
                      <Grid container>
                        <Grid item xs={8}>
                          <Typography gutterBottom variant="h6" component="div">
                            {monster.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {`Level ${monster.level} ${monster.type} ${monster.role}`}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {`${monster.source} page ${monster.page}`}
                          </Typography>
                        </Grid>
                        <Grid item xs={4} sx={{ mt: "auto", mb: "auto" }}>
                          <QuantityInput monster={monster} />
                        </Grid>
                      </Grid>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        onClick={() =>
                          dispatch({ type: "removeMonster", payload: monster })
                        }
                      >
                        Remove
                      </Button>
                    </CardActions>
                  </Card>
                </Box>
              </Grid>
            </React.Fragment>
          );
        })}
      </Grid>
    </>
  );
};

export default MonsterCards;
