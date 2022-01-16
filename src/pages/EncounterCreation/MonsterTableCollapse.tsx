import Monster from "../../types/Monster";
import {
  Box,
  Card,
  IconButton,
  CardContent,
  Grid,
  Typography,
  Pagination,
  Stack,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { EncounterCreationContext } from "../../context/EncounterCreationContext";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { AlertContext } from "../../context/AlertContext";

interface Props {
  monsters: Monster[];
}
const MonsterTableCollapse = ({ monsters }: Props) => {
  const { dispatch } = useContext(EncounterCreationContext);
  const { openAlert } = useContext(AlertContext);
  const [shownMonsters, setShownMonsters] = useState<Monster[]>(
    monsters.slice(0, 5)
  );

  const [page, setPage] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    if (value > 1) {
      const currentPage = value;
      setPage(value);
      const startIndex = currentPage * 5 - 5;
      const endIndex = startIndex + 5;
      let newMonsters = [...monsters];
      setShownMonsters(newMonsters.slice(startIndex, endIndex));
    } else {
      setPage(1);
      let newMonsters = [...monsters];
      setShownMonsters(newMonsters.slice(0, 5));
    }
  };

  return (
    <Box>
      <Grid container spacing={3} sx={{ mb: 10 }}>
        {shownMonsters.map((monster: Monster, i) => {
          return (
            <React.Fragment key={i}>
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
                            onClick={() => {
                              openAlert("Monster saved to encounter");
                              dispatch({
                                type: "addMonster",
                                payload: monster,
                              });
                            }}
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
        <Grid item xs={12}>
          <Stack sx={{ alignItems: "center" }}>
            <Pagination
              variant="outlined"
              shape="rounded"
              color="primary"
              page={page}
              count={Math.round(monsters.length / 5)}
              onChange={handleChange}
            />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MonsterTableCollapse;
