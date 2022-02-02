import { Icon, Box, Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import ranksLogic from '../../service/ranksLogic'
import Medal from '../Medal';
import './ResultsTable.css';

import WarningIcon from '@mui/icons-material/Warning';
import imgOk from '../../resources/misc/success/1.jpg'
import imgNotOk from '../../resources/misc/fail/1.jpg'

import strings from '../../resources/strings/strings'


export default function ResultsTable({MMRs}) {
    console.log(MMRs)
    const [disparitiesRadiant, setDisparitiesRadiant] = useState([]);
    const [disparitiesDire, setDisparitiesDire] = useState([]);


    function compileListOfDisparities(MMRList) {
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
        <div className='results-container'>

        { disparitiesRadiant.length > 0  ?
            <React.Fragment>
                <DisparityList list={disparitiesRadiant} name={"Radiant"}></DisparityList>
                <div className='vertical-divider-res'/>
            </React.Fragment>
        : null }

        { disparitiesDire.length > 0  ?
            <React.Fragment>
                <DisparityList list={disparitiesDire} name={"Dire"}></DisparityList>
                <div className='vertical-divider-res'/>
            </React.Fragment>

        : null }

        <div className='status-image'>
            <img src={disparitiesDire.length || disparitiesRadiant.length > 0 ?imgNotOk:imgOk} alt={''}></img>
        </div>

        </div>
    );

};

function DisparityList({list, name}) {

    return (
    <div style={{display:'flex', float:'left'}}>
    <Grid container
        direction="column"
        justifyContent="center"
        alignItems="center">
        <h2>{strings.texts.problems} {name}</h2>
        <Box style={{width:"210px"}}>
            {list.map((element) =>{
                return (
                <div style={{display:'flex', alignItems: "center", justifyContent: "center"}}>
                    <Medal mmr={element.mmr1}></Medal>
                    <Medal mmr={element.mmr2}></Medal>
                    <WarningIcon sx={{ color: "red", marginLeft: "10px" }}></WarningIcon>
                </div>
                )
            })}
        </Box>
    </Grid>
    </div>
    );

}