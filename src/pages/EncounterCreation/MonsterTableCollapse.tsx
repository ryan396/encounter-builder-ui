import Monster from "../../types/Monster";
import {
  Box,
  Card,
  Button,
  CardContent,
  CardActions,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";

interface Props {
  monsters: Monster[];
}
const MonsterTableCollapse = ({ monsters }: Props) => {
  return (
    <>
      <Grid container spacing={3}>
        {monsters.map((monster: Monster) => {
          return (
            <React.Fragment key={monster.name}>
              <Grid item xs={12}>
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
                      </Grid>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Add</Button>
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

export default MonsterTableCollapse;
