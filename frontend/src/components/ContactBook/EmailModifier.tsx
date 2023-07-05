import { Dispatch, SetStateAction, useState } from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const EmailModifier = ({
  name,
  setName,
  nameType
}: {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  nameType: string;
}) => {
  const [error, setError] = useState('');

  const handleTextInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (newValue.match(/^[A-Za-z0-9_-]*$/)) {
      setName(newValue);
      setError('');
    } else {
      setError('Allowed: A-Z _ a-z - 0-9');
    }
  };

  return (
    <div>
      <FormControl>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/*<FormLabel sx={{ color: 'black' }}>1 - 20 characters:</FormLabel>*/}
        </Box>
        <div>
          <TextField
            placeholder={nameType}
            autoFocus
            required
            value={name}
            inputProps={{
              maxLength: 42
            }}
            helperText={error} // error message
            error={!!error} // set to true to change the border/helperText color to red
            onChange={handleTextInput}
          />
        </div>
      </FormControl>
    </div>
  );
};

export default EmailModifier;
