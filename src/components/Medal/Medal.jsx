import * as React from 'react';
import rankImages from './rankImages';
import './Medal.css'


export default function Medal({rank, stars}) {

  let imageIndex = 0;
  if (rank > 0 )
  {
    imageIndex = Math.min(1 + (rank-1)*5 + (stars - 1), rankImages.length - 1);
  }

  return (<img src={rankImages[imageIndex]} alt={''}></img>);
}
