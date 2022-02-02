import { useState, useEffect } from 'react';
import MedalSelector from '../MedalSelector';
import ResultsTable from '../ResultsTable';
import Team from '../Team';
import './MainPage.css'


export default function MainPage() {
  return (
    <div className='container'>
        <div className='top-header'>
          <h1>Medal Calculator</h1>   
        </div>
        <div className='box-container'>
          <div className='vertical-divider'/>
          <Team name="Radiant"></Team>
          <div className='vertical-divider'/>
          <Team name="Dire"></Team>
          <div className='vertical-divider'/>
          <ResultsTable></ResultsTable>
        </div>
        
    </div>
  );
}
