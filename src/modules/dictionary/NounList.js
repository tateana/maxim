import React from "react";
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Page from '../../components/Page';
import { Noun } from '../api'


function NounList(props) {
    const { nouns } = props

    return (
        <Page>
            <Typography variant="title">
                New Nouns
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Noun</TableCell>
                        <TableCell>Translate</TableCell>
                        <TableCell>Score</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {nouns.map(noun => (
                        <TableRow key={noun.origin}>
                            <TableCell component="th" scope="row">
                                {noun.origin}
                            </TableCell>
                            <TableCell>{noun.translate}</TableCell>
                            <TableCell numeric>0</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Page>
    );
}

NounList.propTypes = {
    nouns: PropTypes.arrayOf(PropTypes.instanceOf(Noun)).isRequired
};

export default NounList;