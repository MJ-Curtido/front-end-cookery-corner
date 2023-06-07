import { Container, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CSS from './SearchBar.module.css';

export default function SearchBar({ onSearch }) {
    const handleChange = (event) => {
        onSearch(event.target.value);
    };

    return (
        <Container maxWidth="lg" className={CSS.container}>
            <TextField
                color="secondary"
                className={CSS.searchBar}
                id="search"
                type="search"
                label="Search"
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
