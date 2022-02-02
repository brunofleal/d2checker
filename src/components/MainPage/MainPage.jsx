import { useState, useEffect } from 'react';
import MedalSelector from '../MedalSelector';
import ResultsTable from '../ResultsTable';
import Team from '../Team';
import './MainPage.css'
import strings from '../../resources/strings/strings';


export default function MainPage() {
  const [radiantMMRs, setRadiantMMRs] = useState([-1, -1, -1, -1, -1]);
  const [direMMRs, setDireMMRs] = useState([-1, -1, -1, -1, -1]);

  function teamMMRCallback({MMRs, name}) {
    if (name === "Radiant") {
      setRadiantMMRs(MMRs);
    } else {
      setDireMMRs(MMRs);
    }
  }

  return (
    <div className='container'>
        <div className='top-header'>
          <h1>{strings.texts.pagetitle}</h1>
          <h4 style={{marginTop:"-20px"}}>{strings.texts.pageDescription}</h4>
        </div>
        <div className='box-container'>
          <div className='vertical-divider'/>
          <Team name="Radiant" teamMMRCallback={teamMMRCallback}></Team>
          <div className='vertical-divider'/>
          <Team name="Dire" teamMMRCallback={teamMMRCallback}></Team>
          <div className='vertical-divider'/>
          <ResultsTable MMRs={{radiant:radiantMMRs, dire:direMMRs}}></ResultsTable>

        </div>
    </div>
  );
}
