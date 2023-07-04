import { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';


const NameModifier = () => {
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [load, setLoad] = useState(false);
  const [buttonText, setButtonText] = useState('Submit');

  const handleTextInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (newValue.match(/^[A-Za-z0-9_-]*$/)) {
      setText(newValue);
      setError('');
    } else {
      setError('Allowed: A-Z _ a-z - 0-9');
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (text) {
      setLoad(true);
      console.log('XXXXXXXXXXXX');
      setLoad(false);
      setButtonText('Done ✔️');
    }
    setText('');
    setError('');
    setTimeout(() => setButtonText('Submit'), 442);
  };

  return (
    <div>
      <form style={{ marginTop: '10px' }} onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <FormControl>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <FormLabel sx={{ color: 'black' }}>3 - 10 characters:</FormLabel>
            </Box>
            <div >
              <TextField
                autoFocus
                required
                value={text}
                inputProps={{
                  minLength: 3,
                  maxLength: 10
                }}
                helperText={error} // error message
                error={!!error} // set to true to change the border/helperText color to red
                onChange={handleTextInput}
              />
            </div>
          </FormControl>
          <div >
            <LoadingButton
              type="submit"
              loading={load}
              startIcon={<SaveIcon />}
              variant="contained"
              color="inherit"
              sx={{ minWidth: 142, borderRadius: '90px' }}
            >
              {buttonText}
            </LoadingButton>
          </div>
        </Stack>
      </form>
    </div>
  );
};

export default NameModifier;
