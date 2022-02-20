import { Monster } from "../../context/Types";
import { useContext } from "react";
import {
  Box,
  Card,
  Button,
  CardContent,
  CardActions,
  Grid,
  Typography,
} from "@mui/material";
import { EncounterCreationContext } from "../../context/EncounterCreationContext";
import React from "react";
import { QuantityInput } from "./QuantityInput";

const MonsterCards = () => {
  const { state, dispatch } = useContext(EncounterCreationContext);

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
