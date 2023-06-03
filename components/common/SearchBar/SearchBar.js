import { Container, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import CSS from './SearchBar.module.css';

export default function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <Container maxWidth="lg" className={CSS.container}>
            <TextField
                className={CSS.searchBar}
                id="search"
                type="search"
                label="Search"
                value={searchTerm}
                onChange={handleChange}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />
        </Container>
    );
}
//TODO: esto está por terminar