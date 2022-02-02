import { Button, Box, ButtonGroup } from '@mui/material';
import React, { useState, useEffect } from 'react';




export default function ResultsTable({radiantMMRs, direMMRs}) {

    return(
        <div style={{margin:'10px'}}>
            <h1>Radiant avg. MMR</h1>
            <h1>Dire avg. MMR</h1>
        </div>
    );
    
};