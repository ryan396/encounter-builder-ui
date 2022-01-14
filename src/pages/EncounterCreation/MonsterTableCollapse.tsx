import Monster from "../../types/Monster";
import {
  Box,
  Card,
  IconButton,
  CardContent,
  CardActions,
  Grid,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { EncounterCreationContext } from "../../context/EncounterCreationContext";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

interface Props {
  monsters: Monster[];
}
const MonsterTableCollapse = ({ monsters }: Props) => {
  const { dispatch } = useContext(EncounterCreationContext);
  return (
    <>
      <Grid container spacing={3} sx={{ mb: 10 }}>
        {monsters.map((monster: Monster) => {
          return (
            <React.Fragment key={monster.name}>
              <Grid item xs={12}>
                <Box sx={{ textAlign: "left" }}>
                  <Card>
                    <CardContent>
                      <Grid container>
                        <Grid item xs={11}>
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
                        <Grid item xs={1}>
                          <IconButton
                            color="primary"
                            aria-label="add monster"
                            component="span"
                            onClick={() =>
                              dispatch({ type: "addMonster", payload: monster })
                            }
                          >
                            <AddCircleOutlineIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </CardContent>
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

export default MonsterTableCollapse;
