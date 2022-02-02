import React, { useState, useEffect } from 'react';
import {Grid} from '@mui/material';
import MedalSelector from '../MedalSelector';
import Medal from '../Medal';

import ranksLogic from '../../service/ranksLogic'

import strings from '../../resources/strings/strings'

export default function Team({name, teamMMRCallback}) {
  const [avgRank, setAvgRank] = useState(0);
  const [avgStars, setAvgStars] = useState(0);
  const [MMRs, setMMRs] = useState([-1, -1, -1, -1, -1]);
  const [avgMMR, setAvgMMR] = useState(-1);

  function updateMMRCallback(mmr, pos) {
    let tempMMRs = [...MMRs];
    pos = Math.max(pos - 1, 0);
    tempMMRs[pos] = mmr;
    setMMRs(tempMMRs);
  }

  function getAvgMMR() {
    let sum = 0;
    let count = 0;
    for (let i = 0; i < MMRs.length; i++) {
      if (MMRs[i] >= 0) {
        sum += MMRs[i];
        count += 1;
      }
    }

    if (count > 0) {
      return sum/count;
    } else {
      return -1;
    }
  }

  useEffect(()=>{
    let mmr = getAvgMMR();
    setAvgMMR(mmr);
    teamMMRCallback({MMRs, name});
  }, [JSON.stringify(MMRs), MMRs]);

  useEffect(() => {

    let values = ranksLogic.MMRToRankAndStars(avgMMR);
    if (values) {
      setAvgRank(values.rank);
      setAvgStars(values.stars);
    }
  }, [avgMMR]);

  return (
    <div style={{display:'flex', float:'left', margin:'10px'}}>
      <Grid container
        direction="column"
        justifyContent="center"
        alignItems="center">
        <h2>{name}</h2>
        <MedalSelector updateMMRCallback={updateMMRCallback} pos={1}></MedalSelector>
        <MedalSelector updateMMRCallback={updateMMRCallback} pos={2}></MedalSelector>
        <MedalSelector updateMMRCallback={updateMMRCallback} pos={3}></MedalSelector>
        <MedalSelector updateMMRCallback={updateMMRCallback} pos={4}></MedalSelector>
        <MedalSelector updateMMRCallback={updateMMRCallback} pos={5}></MedalSelector>
        <hr style={{width:"180px"}}></hr>
        <h3>{strings.texts.avgMMR}: {avgMMR >- 1 ? Math.floor(avgMMR):"?"}</h3>
        <Medal rank={avgRank} stars={avgStars}></Medal>
    </Grid>
  </div>
  );
}
