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
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Page from '../../components/Page';
import Button from '../../components/Button';
import { Noun, Score } from '../api'
import { saveEntities } from './actions'


class DictionaryForm extends Component {
    constructor(props) {
        super(props);

        const noun = props.task.word
        this.state = {
            origin: noun.origin,
            gender: noun.gender,
            translate: noun.translate,
            hasArticleScore: Boolean(props.task.articleScore),
            hasSpellScore: Boolean(props.task.spellScore),
            saveValue: 'Update',
            toSaveNoun: noun.isWritable,
            toSaveArticleScore: false,
            toSaveSpellScore: false,
            isWritable: noun.isWritable,
            translates: noun.translates
        };
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value, toSaveNoun: true, saveValue: 'Update' });
    };

    handleLearningChange = event => {
        this.setState({ [`has${event.target.name}`]: event.target.checked, [`toSave${event.target.name}`]: true, saveValue: 'Update' });
    };

    handleSaveClick = () => {
        const toSave = []
        if (this.state.toSaveNoun) {
            const { origin, gender, translate } = this.state
            const noun = new Noun(origin, null, gender, translate)
            noun.doModified()
            toSave.push(noun)
        }

        if (this.state.toSaveArticleScore) {
            const score = new Score(this.state.origin);
            score.doModified()
            toSave.push(score)
        }

        this.props.saveEntities(toSave)
        this.setState({ saveValue: 'Updated', toSaveNoun: false, toSaveArticleScore: false, toSaveSpellScore: false, isWritable: false })
    }

    render() {
        const { gender, translate, saveValue, isWritable, hasArticleScore, hasSpellScore, toSaveNoun, toSaveArticleScore, toSaveSpellScore, origin, translates } = this.state
        return (
            <Page>
                <Grid container spacing={24} alignItems='center'>
                    <Grid item xs={12} md={2}>
                        <FormControl fullWidth margin="normal" disabled={!isWritable}>
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
                            defaultValue={origin}
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
                                disabled={!isWritable}
                                onChange={this.handleChange}
                                inputProps={{
                                    name: 'translate',
                                    id: 'translate',
                                }}>
                                {translates.map((translateOption) => <MenuItem key={translateOption} value={translateOption}>{translateOption}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container justify="space-between">
                    <FormControl component="fieldset" margin='normal'>
                        <FormGroup row>
                            <FormControlLabel control={<Checkbox checked={hasArticleScore} onChange={this.handleLearningChange} name='ArticleScore' color="default" />} label="learn articles" />
                            <FormControlLabel control={<Checkbox checked={hasSpellScore} onChange={this.handleLearningChange} name='SpellScore' color="default" />} label="learn spelling" />
                        </FormGroup>
                    </FormControl>
                    <FormControl margin='normal'>
                        <Button variant="contained" color="primary" onClick={this.handleSaveClick} disabled={!(toSaveNoun || toSaveArticleScore || toSaveSpellScore)}>{saveValue}</Button>
                    </FormControl>
                </Grid>
            </Page>
        );
    }
}


DictionaryForm.propTypes = {
    task: PropTypes.shape({
        articleScore: PropTypes.instanceOf(Score),
        spellScore: PropTypes.instanceOf(Score),
        word: PropTypes.instanceOf(Noun).isRequired
    }).isRequired,
    saveEntities: PropTypes.func.isRequired
};

export default connect(null, { saveEntities })(DictionaryForm); 
