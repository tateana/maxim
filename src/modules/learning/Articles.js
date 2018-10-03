import React, { Component } from "react";

import sample from 'lodash.sample'

import Typography from '@material-ui/core/Typography';
import { dbService } from '../api'

import Page from '../../components/Page';
import ArticleQuestion from './ArticleQuestion'

class Articles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scores: {},
            nouns: [],
            totalScore: 0
        };
    }

    componentDidMount() {
        dbService.fetchNouns(10)
            .subscribe({
                next: (nouns) => this.setState({ nouns }),
                error: error => this.setState({ newNoun: false, error }),
                complete: () => console.log('done'),
            });
    }

    handleScoreChange = (score) => {
        this.setState(prevState => ({
            scores: Object.assign(prevState.scores, { [score.word]: score }),
            totalScore: prevState.totalScore + (score.count > 0 ? score.count : -1),
            nouns: prevState.nouns.filter(noun => noun.origin !== score.word)
        }));
    };


    render() {
        if (this.state.nouns.length === 0) {
            return ([
                <Typography key='a'>Your score: {this.state.totalScore}</Typography>,
                <Page key='b'>Please wait</Page>
            ]);
        }

        const noun = sample(this.state.nouns)
        return ([
            <Typography key='a' >Your score: {this.state.totalScore}</Typography>,
            <ArticleQuestion key='b' noun={noun} onScoreChange={this.handleScoreChange} currentScore={this.state.scores[noun.origin]} />
        ]);
    }
}

export default Articles; 