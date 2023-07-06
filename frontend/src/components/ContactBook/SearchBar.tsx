import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/joy/FormControl';
import SearchIcon from '@mui/icons-material/Search';
import * as colors from '../../styles/bookColors';
import * as utils from '../../utils/contactsHandlers';
import { Contact } from '../../types/Contact';

const SearchBar = ({
  contacts,
  setSearchResult
}: {
  contacts: Contact[];
  setSearchResult: React.Dispatch<React.SetStateAction<Contact[]>>;
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [error, setError] = useState('');

  const handleTextInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    if (newValue.match(/^[A-Za-z]*$/)) {
      setSearchValue(newValue);
      setError('');
    } else {
      setError('Allowed: A-Z a-z');
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (searchValue && !error) {
      setSearchResult(utils.searchContactsByLastName(contacts, searchValue));
    }
  };

  return (
    <div>
      <div style={{ paddingBottom: '50px' }}>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <FormControl>
              <TextField
                id="search-bar"
                required
                label="Find by Lastname"
                variant="standard"
                placeholder="Search..."
                size="small"
                value={searchValue}
                inputProps={{
                  'aria-label': 'search',
                  minLength: 1,
                  maxLength: 20,
                  style: {
                    color: colors.BOOK_BLACK
                  }
                }}
                InputLabelProps={{
                  style: {
                    color: colors.BOOK_BLACK
                  }
                }}
                error={!!error}
                helperText={error}
                onChange={handleTextInput}
              />
            </FormControl>
            <IconButton type="submit" aria-label="search">
              <SearchIcon
                fontSize="medium"
                sx={{
                  color: colors.BOOK_ORANGE,
                  '&:hover': {
                    color: colors.BOOK_BLACK
                  }
                }}
              />
            </IconButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
