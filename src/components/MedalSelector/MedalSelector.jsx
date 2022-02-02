import { Button, Box, ButtonGroup } from '@mui/material';
import React, { useState, useEffect } from 'react';

import Medal from '../Medal';
import ranksLogic from '../../service/ranksLogic';


export default function MedalSelector({updateMMRCallback, pos}) {
    let [rank, setRank] = useState(0);
    let [stars, setStars] = useState(0);
    let [lastChange, setLastChange] = useState([0, 0]);
    let [MMR, setMMR] = useState(0);

    useEffect(() => {
        const updateRank = (rankChange, starChange) => {
            let newRank = rank + rankChange;
            let newStars = stars + starChange;

            if (newStars > 5) {
                newStars = newStars - 5;
                newRank += 1;
            } else if (newStars < 1) {
                newStars = 5;
                newRank -= 1;
            }

            if (newRank >= 8) {
                newRank = 8;
                newStars = 1;
            }

            if (newRank < 1) {
                newRank = 0;
            }

            let mmr = ranksLogic.rankAndStarsToMMR(newRank, newStars);
            updateMMRCallback(mmr, pos);
            setMMR(mmr);

            setRank(newRank);
            setStars(newStars);
        }
        updateRank(lastChange[0], lastChange[1])
    }, [lastChange]);


    const handleClick = (change) => {
        setLastChange(change);
    }

    return (
        <Box>
            <ButtonGroup size="small" aria-label="small button group"  orientation="vertical">
                <Button color="error" onClick={() => {handleClick([0, -1])}}>-★</Button>
                <Button color="error" onClick={() => {handleClick([-1, 0])}}>-🥇</Button>
            </ButtonGroup>
            <Medal rank={rank} stars={stars}></Medal>
            <ButtonGroup size="small" aria-label="small button group"  orientation="vertical">
                <Button onClick={() => {handleClick([0, 1])}}>+★</Button>
                <Button onClick={() => {handleClick([1, 0])}}>+🏅</Button>
            </ButtonGroup>
        </Box>

    );
}