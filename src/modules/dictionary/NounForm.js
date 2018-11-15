import React, { Component } from "react";
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import ArrowIcon from '@material-ui/icons/ArrowRightAlt';
import { connect } from 'react-redux'
import Hidden from "@material-ui/core/Hidden";
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Page from '../../components/Page';
import Button from '../../components/Button';
import { dbService, Noun, Score } from '../api'
import { saveWord } from './actions'


class NounForm extends Component {
    constructor(props) {
        super(props);

        const { noun } = props
        this.state = {
            gender: noun.gender,
            translate: noun.translate,
            learning: null,
            loading: false
        };
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSaveNoun = () => {
        const { noun } = this.props;
        noun.translate = this.state.translate
        noun.gender = this.state.gender
        this.props.saveWord(noun)
        // dbService.addNoun(noun)
        // this.handleSaveScore()
    };

    handleSaveScore = () => {
        dbService.addArticleScore(new Score(this.props.noun.origin)).subscribe({
            next: () => {
                this.props.onSaved(this.props.noun)
            }
        });
    }

    render() {
        const { gender, translate, loading } = this.state
        const { noun } = this.props
        console.log(noun.isWritable)
        return (
            <Page>
                <Grid container spacing={24} alignItems='center'>
                    <Grid item xs={12} md={2}>
                        <FormControl fullWidth margin="normal" disabled={!noun.isWritable}>
                            <Select
                                value={gender}
                                onChange={this.handleChange}
                                inputProps={{
                                    name: 'gender',
                                    id: 'gender',
                                }}>
                                <MenuItem value='m'>der</MenuItem>
                                <MenuItem value='f'>die</MenuItem>
                                <MenuItem value='n'>das</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            disabled
                            id="origin"
                            defaultValue={noun.origin}
                            margin="normal"
                            fullWidth />
                    </Grid>
                    <Hidden smDown>
                        <Grid item md={1} >
                            <ArrowIcon />
                        </Grid>
                    </Hidden>
                    <Grid item xs={12} md={5}>
                        <FormControl fullWidth margin="normal">
                            <Select
                                value={translate}
                                disabled={!noun.isWritable}
                                onChange={this.handleChange}
                                inputProps={{
                                    name: 'translate',
                                    id: 'translate',
                                }}>
                                {noun.translates.map((word) => <MenuItem key={word} value={word}>{word}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container justify="space-between">
                    <FormControl component="fieldset" margin='normal'>
                        <FormGroup row>
                            <FormControlLabel control={<Checkbox checked={!noun.isWritable} onChange={this.handleChange} name='learning' value="article" color="default" />} label="learn articles" />
                            <FormControlLabel control={<Checkbox checked={!noun.isWritable} onChange={this.handleChange} name='learning' value="spelling" color="default" />} label="learn spelling" />
                        </FormGroup>
                    </FormControl>
                    <FormControl margin='normal'>
                        {
                            noun.isWritable
                                ? <Button variant="contained" color="primary" loading={loading} onClick={this.handleSaveNoun}>Save in the dictionary and learn later</Button>
                                : <Button variant="contained" color="primary" loading={loading} onClick={this.handleSaveScore}>Learn later </Button>
                        }
                    </FormControl>
                </Grid>
            </Page>
        );
    }
}

NounForm.propTypes = {
    noun: PropTypes.instanceOf(Noun).isRequired,
    saveWord: PropTypes.func.isRequired

};

export default connect(null, { saveWord })(NounForm); 
