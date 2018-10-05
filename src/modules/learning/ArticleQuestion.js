import React, { Component } from "react";
import _map from 'lodash.map'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import { Score, Noun } from '../api'
import Button from '../../components/Button';

import Page from '../../components/Page';

class ArticleQuestion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedAnswer: null
        };
    }

    getAnswerState(answer) {
        if (!this.state.selectedAnswer) {
            return 'none'
        }

        if (answer === this.props.noun.gender) {
            return 'success'
        }

        if (answer === this.state.selectedAnswer) {
            return 'error'
        }

        return 'none'
    }

    handleAnswerSelected = (event) => {
        this.setState({ selectedAnswer: event.currentTarget.value });
    }

    handleNextClick = () => {
        const score = this.props.currentScore || new Score(this.props.noun.origin, 0)
        if (this.state.selectedAnswer === this.props.noun.gender) {
            score.increment()
        } else {
            score.decrement();
        }
        this.props.onScoreChange(score)
        this.setState({ selectedAnswer: null });
    }

    render() {
        const { noun } = this.props
        const { selectedAnswer } = this.state
        console.log('render ArticleQuestion')
        return (
            <Page>
                <Grid container alignItems='center'>
                    <Grid item xs={4} md={3}>
                        {_map(Noun.genders,
                            (article, gender) => <ListItem key={gender}>
                                <Button variant="contained" value={gender} id={gender} onClick={this.handleAnswerSelected} disabled={!!this.state.selectedAnswer} state={this.getAnswerState(gender)} >{article} </Button>
                            </ListItem>)}
                    </Grid>
                    <Grid item xs={4} md={7}>
                        <Typography variant="headline">{noun.origin} </Typography>
                        <Typography variant="caption"> {noun.translate} </Typography>
                    </Grid>
                </Grid>
                {
                    this.state.selectedAnswer &&
                    <Grid container justify="flex-end">
                        <Button variant="contained" color="primary" onClick={this.handleNextClick} >Next</Button>
                    </Grid>
                }
            </Page>
        );
    }
}

export default ArticleQuestion; 