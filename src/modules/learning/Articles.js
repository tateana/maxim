import React, { Component } from "react";

import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux'

import Page from '../../components/Page';
import ArticleQuestion from './ArticleQuestion'
import Button from '../../components/Button';
import { load } from './actions'

class Articles extends Component {

    componentDidMount() {
        // this.props.loadArticles();
    }

    handleLoadClick = () => {
        this.props.load();
    }

    render() {
        if (this.props.tasks.length === 0) {
            return (
                <Page>
                    <Typography key='score' component='span' variant="headline" color="primary">Your score: <b>{this.props.totalScore}</b></Typography>
                    <Button variant="contained" color="primary" onClick={this.handleLoadClick} >Start learning</Button>
                </Page>
            );
        }

        return (
            <Page>
                <Typography key='score' component='span' variant="headline" color="primary">Your score: <b>{this.props.totalScore}</b></Typography>
                <Typography key='left' component='span' variant="subheading" >left <b>{this.props.tasks.length}</b> questions</Typography>
                <ArticleQuestion />
            </Page>
        );
    }
}

const mapStateToProps = state => ({
    tasks: state.articleTasks,
    totalScore: state.articleTotalScore
})


export default connect(mapStateToProps, { load })(Articles); 