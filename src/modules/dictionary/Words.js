import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import _map from 'lodash.map'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Page from '../../components/Page';
import { Noun, Score } from '../api'



function Words(props) {
    const { dictionary } = props
    let index = 0;
    return (
        <Page>
            <Typography variant="title">
                New Nouns
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>N</TableCell>
                        <TableCell>Noun</TableCell>
                        <TableCell>Translate</TableCell>
                        <TableCell >Article Score</TableCell>
                        <TableCell>Last learning</TableCell>
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
                            <TableCell numeric>{articleScore ? articleScore.count : '-'}</TableCell>
                            <TableCell>{articleScore ? articleScore.humanViewed : '-'}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Page>
    );
}

Words.propTypes = {
    dictionary: PropTypes.objectOf(PropTypes.shape({
        articleScore: PropTypes.instanceOf(Score),
        noun: PropTypes.instanceOf(Noun)
    }).isRequired, ).isRequired
};

const mapStateToProps = (({ dictionary }) => ({ dictionary }))

export default connect(mapStateToProps)(Words);
