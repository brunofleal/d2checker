import React, { useState, useEffect } from 'react';
import strings from '../../resources/strings/strings';

import WarningIcon from '@mui/icons-material/Warning';
import Tooltip from '@mui/material/Tooltip';

export default function WarningTooltip({reason}) {
  const [text, setText] = useState('*');
  console.log(reason)
  console.log(strings)

  useEffect(()=>{
    switch(reason) {
      case "IMMORTAL_REQUIREMENT":
        setText(strings.texts.tooltipsTexts.immortal);
        break;
      case "MMR_DIFFERENCE_UNCERTAIN":
        setText(strings.texts.tooltipsTexts.unsureMMRDiff);
        break;
      case "MMR_DIFFERENCE":
        setText(strings.texts.tooltipsTexts.sureMMRDiff);
        break;
      default:
        setText("?");
    }
  }, [reason])


  let toolTipColor = reason == "MMR_DIFFERENCE_UNCERTAIN"?"yellow":"red";

  return (
    <div>
      <Tooltip title={text} placement="right-start" arrow>
      <WarningIcon sx={{ color: toolTipColor, marginLeft: "10px" }} />
    </Tooltip>
  </div>
  );
}
