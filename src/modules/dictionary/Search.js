import React, { Component } from "react";
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';


class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value
        };
    }

    handleInputChange = (event) => {
        this.setState({ value: event.target.value.trim() });
    };

    handleSearchClick = () => {
        this.props.onSearch(this.state.value)
    };

    render() {

        return (
            <TextField
                id="outlined-search"
                label="Search Word"
                type="search"
                margin="normal"
                value={this.state.value}
                onChange={this.handleInputChange}
                variant="outlined"
                fullWidth

                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="Find Word"
                                onClick={this.handleSearchClick} >
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        );
    }
}

export default Search; 