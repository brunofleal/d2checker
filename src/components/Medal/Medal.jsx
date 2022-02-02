import * as React from 'react';
import rankImages from './rankImages';
import './Medal.css'
import ranksLogic from '../../service/ranksLogic';


export default function Medal({rank, stars, mmr}) {

  function getImageIndexFromrs(rank, stars) {
    let imageIndex = 0;
    if (rank >=8 )
    {
      imageIndex = rankImages.length -1;
    } else if (rank > 0 )
    {
      imageIndex = Math.min(1 + (rank-1)*5 + (stars - 1), rankImages.length - 1);
    }
    return imageIndex;
  }

  if (mmr) {
    let values = ranksLogic.MMRToRankAndStars(mmr);
    console.log({values, mmr})
    rank = values.rank;
    stars = values.stars;
  }

  let imageIndex = getImageIndexFromrs(rank, stars);

  return (
    <img src={rankImages[imageIndex]} alt={''}></img>
  );
}
