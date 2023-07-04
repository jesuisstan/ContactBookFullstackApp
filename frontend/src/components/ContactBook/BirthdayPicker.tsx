/*
The component uses the 'LocalizationProvider' to configure the date picker's localization settings. 
It uses the AdapterDayjs to integrate dayjs as the date library.
*/

import { useEffect, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import * as MUI from '../../styles/MUIstyles';

const divStyle = {
  border: '1px solid',
  borderRadius: '8px',
  ':hover': {
    border: '1px solid #a1a9c3'
  }
};

const BirthdayPicker = () => {
  const [birthday, setBirthday] = useState<Dayjs | null>(dayjs());

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div style={divStyle}>
        <DatePicker
          value={birthday}
          onChange={(newValue) => setBirthday(newValue)}
          format="MMM DD, YYYY"
          slotProps={{
            textField: {
              placeholder: 'Birthday',
              variant: 'standard',
              InputProps: {
                readOnly: true,
                disableUnderline: true,
                style: MUI.slotPropsForData
              }
            }
          }}
        />
      </div>
    </LocalizationProvider>
  );
};

export default BirthdayPicker;
