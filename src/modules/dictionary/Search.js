import React, { Component } from "react";
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';


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

    handleInputClear = () => {
        this.setState({ value: '' });
    };

    handleSearchClick = (event) => {
        event.preventDefault();
        if (this.state.value) {
            this.props.onSearch(this.state.value)
        }
    };

    handleKeyPress = (event) => {
        if (event.key === 'Delete') {
            this.setState({ value: '' });
        }
    }

    render() {

        return (
            <form onSubmit={this.handleSearchClick}>
                <TextField
                    id="outlined-search"
                    label="Search Word"
                    type="text"
                    margin="normal"
                    value={this.state.value}
                    onChange={this.handleInputChange}
                    variant="outlined"
                    fullWidth
                    onKeyDown={this.handleKeyPress}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                {this.state.value !== '' ? <IconButton aria-label="Clear Input" onClick={this.handleInputClear} ><ClearIcon /></IconButton> : null}
                                <IconButton aria-label="Find Word" onClick={this.handleSearchClick} ><SearchIcon /></IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </form>
        );
    }
}

export default Search; 