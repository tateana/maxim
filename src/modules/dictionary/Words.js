import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import _map from 'lodash.map'
import _orderBy from 'lodash.orderby'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import Page from '../../components/Page';
import { Noun, Score } from '../api'


class Words extends Component {

    constructor(props) {
        super(props)

        this.state = {
            orderBy: 'id',
            orderDirection: 'asc'
        }
    }

    handleSort = (event) => {
        const orderBy = event.target.dataset.sortfield;
        this.setState(prewState => ({
            orderDirection: prewState.orderDirection === 'asc' ? 'desc' : 'asc',
            orderBy
        }))
    }

    render() {
        const { orderBy, orderDirection } = this.state
        const dictionary = _orderBy(this.props.dictionary, [({ articleScore }) => articleScore ? articleScore[orderBy] : null], [orderDirection])
        let index = 0;
        return (
            <Page>
                <Typography variant="title">
                    New Nouns
            </Typography>
                <Table padding="none">
                    <TableHead>
                        <TableRow>
                            <TableCell>N</TableCell>
                            <TableCell>Noun</TableCell>
                            <TableCell>Translate</TableCell>
                            <TableCell sortDirection={orderBy === 'count' ? orderDirection : false}>
                                <TableSortLabel active={orderBy === 'count'} data-sortfield="count" direction={orderDirection} onClick={this.handleSort}                             >
                                    Article Score
                                </TableSortLabel>
                            </TableCell>
                            <Hidden xsDown>
                                <TableCell sortDirection={orderBy === 'viewed' ? orderDirection : false}>
                                    <TableSortLabel active={orderBy === 'viewed'} data-sortfield="viewed" direction={orderDirection} onClick={this.handleSort}                             >
                                        Last learning
                                </TableSortLabel>
                                </TableCell>
                            </Hidden>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {_map(dictionary, ({ word, articleScore }) => (
                            <TableRow key={word.id}>
                                <TableCell>{index++}</TableCell>
                                <TableCell component="th" scope="row">
                                    {word.literalGender} {word.origin}
                                </TableCell>
                                <TableCell>{word.translate}</TableCell>
                                <TableCell >{articleScore ? articleScore.count : '-'}</TableCell>
                                <Hidden xsDown>
                                    <TableCell>{articleScore ? articleScore.humanViewed : '-'}</TableCell>
                                </Hidden>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Page>
        );
    }
}



Words.propTypes = {
    dictionary: PropTypes.objectOf(PropTypes.shape({
        articleScore: PropTypes.instanceOf(Score),
        noun: PropTypes.instanceOf(Noun)
    }).isRequired, ).isRequired
};

const mapStateToProps = (({ dictionary }) => ({ dictionary }))

export default connect(mapStateToProps)(Words);
