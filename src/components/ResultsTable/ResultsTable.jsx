import { Button, Box, ButtonGroup } from '@mui/material';
import React, { useState, useEffect } from 'react';
import ranksLogic from '../../service/ranksLogic'



export default function ResultsTable({MMRs}) {
    console.log(MMRs)
    const [disparitiesRadiant, setDisparitiesRadiant] = useState([]);
    const [disparitiesDire, setDisparitiesDire] = useState([]);


    function compileListOfDisparities(MMRList) {
        console.log("compile")
        let disps = [];
        for (let i = 0; i < 5; i++) {
            for (let j = i; j < 5; j++) {
                if (i === j) {
                    continue;
                }

                let result = ranksLogic.getMMRDisparity(MMRList[i], MMRList[j]);
                if (result.hasDisparity) {
                    disps.push(result);
                }
            }
        }

        return disps;
    }

    useEffect(()=> {
        setDisparitiesRadiant(compileListOfDisparities(MMRs.radiant));
        setDisparitiesDire(compileListOfDisparities(MMRs.dire));
    }, [MMRs])

    useEffect(()=> {
        console.log({disparitiesDire})
        console.log({disparitiesRadiant})
    }, [disparitiesDire, disparitiesRadiant])


    return(
        <div style={{margin:'10px'}}>
            <h2>{MMRs.radiant.join('|')}</h2>
            <h2>{MMRs.dire.join('|')}</h2>
        </div>
    );

};

function Disparity({mmr1, mmr2}) {

}