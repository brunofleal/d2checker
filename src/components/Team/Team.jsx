import { useState, useEffect } from 'react';
import {Grid} from '@mui/material';
import MedalSelector from '../MedalSelector';
import Medal from '../Medal';

export default function Team({name}) {
  const [avgRank, setAvgRank] = useState(0);
  const [avgStars, setStars] = useState(0)


  return (
    <div style={{display:'flex', float:'left', margin:'10px'}}>
      <Grid container
        direction="column"
        justifyContent="center"
        alignItems="center">
          <h2>{name}</h2>
        <MedalSelector></MedalSelector>
        <MedalSelector></MedalSelector>
        <MedalSelector></MedalSelector>
        <MedalSelector></MedalSelector>
        <MedalSelector></MedalSelector>
        <hr style={{width:"180px"}}></hr>
        <h3>Avg.</h3>
        <Medal rank={avgRank} stars={avgStars}/>

    </Grid>
  </div>
  );
}
