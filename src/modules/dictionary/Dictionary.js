import React, { Component } from "react";
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import Page from '../../components/Page';
import DictionaryForm from './DictionaryForm'
import Search from './Search';
import { findItem } from './actions'


class Dictionary extends Component {

    handleSearch = (term) => {
        this.props.findItem(term)
    };


    render() {

        const { dictItem, error } = this.props
        let searchResult = null

        if (dictItem) {
            searchResult = <DictionaryForm key={dictItem.word.id} task={dictItem} />
        }

        if (dictItem === false) {
            searchResult = <Page>nothing found {error}</Page>
        }

        return (
            <div>
                <Search value="" onSearch={this.handleSearch} />
                {searchResult}
            </div>
        );
    }
}

Dictionary.defaultProps = {
    dictItem: null,
    error: false
}

Dictionary.propTypes = {
    dictItem: PropTypes.instanceOf(Object),
    findItem: PropTypes.func.isRequired,
    error: PropTypes.oneOf([false, PropTypes.string])
};

const mapStateToProps = ({ dictionary, dictionaryWord }) => ({ dictItem: dictionaryWord ? dictionary[dictionaryWord] : dictionaryWord })

export default connect(mapStateToProps, { findItem })(Dictionary); 
