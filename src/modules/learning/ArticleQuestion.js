import React, { Component } from "react";
import _map from 'lodash.map'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { Noun } from '../api'
import Button from '../../components/Button';
import { answer } from './actions'

class ArticleQuestion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedAnswer: null
        };
    }

    getAnswerState(selectedAnswer) {
        if (!this.state.selectedAnswer) {
            return 'none'
        }

        if (selectedAnswer === this.props.task.noun.gender) {
            return 'success'
        }

        if (selectedAnswer === this.state.selectedAnswer) {
            return 'error'
        }

        return 'none'
    }

    handleAnswerSelected = (event) => {
        this.setState({ selectedAnswer: event.currentTarget.value });
    }

    handleNextClick = () => {
        this.props.answer(this.props.task.score, this.state.selectedAnswer === this.props.task.noun.gender)
        this.setState({ selectedAnswer: null });
    }

    render() {
        const { noun } = this.props.task
        const { selectedAnswer } = this.state
        return (
            <React.Fragment>
                <Grid container alignItems='center'>
                    <Grid item xs={6} sm={4} md={3}>
                        {_map(Noun.genders,
                            (article, gender) => <ListItem key={gender}>
                                <Button variant="contained" value={gender} id={gender} onClick={this.handleAnswerSelected} disabled={!!this.state.selectedAnswer} state={this.getAnswerState(gender)} >{article} </Button>
                            </ListItem>)}
                    </Grid>
                    <Grid item xs={6} sm={8} md={7}>
                        <Typography variant="headline">{noun.origin} </Typography>
                        <Typography variant="caption"> {noun.translate} </Typography>
                    </Grid>
                </Grid>
                {
                    selectedAnswer &&
                    <Grid container justify="flex-end">
                        <Button variant="contained" color="primary" onClick={this.handleNextClick} >Next</Button>
                    </Grid>
                }
            </React.Fragment>
        );
    }
}

ArticleQuestion.propTypes = {
    task: PropTypes.shape({
        score: PropTypes.instanceOf(Object),
        noun: PropTypes.instanceOf(Object)
    }).isRequired,
    answer: PropTypes.func.isRequired
};

const mapStateToProps = ({ articleTasks, dictionary }) => {
    const taskId = articleTasks[0]
    return { task: { score: dictionary[taskId].articleScore, noun: dictionary[taskId].word } }
}

export default connect(mapStateToProps, { answer })(ArticleQuestion); 
