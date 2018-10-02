import React, { Component } from "react";
import { mergeMap } from 'rxjs/operators';
import { of } from 'rxjs/index';

import dictService, { dbService, Noun } from '../api'

import Page from '../../components/Page';
import NounForm from './NounForm'
import Search from './Search';
import NounList from './NounList';


class Dictionary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newNoun: new Noun('Test', null, 'm', 'TestRu'),
            savedNouns: [new Noun('Test1', null, 'm', 'TestRu1')]
        };
    }

    handleSearch = (term) => {
        const observable = dbService.fetchNounExact(term)
        observable.pipe(
            mergeMap(noun => {
                if (noun) {
                    return of(noun)
                }
                return dictService.find(term)
            })
        ).subscribe({
            next: (noun) => this.setState({ newNoun: noun }),
            error: error => this.setState({ newNoun: false, error }),
            complete: () => console.log('done'),
        });
    };

    handleSaving = (noun) => {
        this.setState(prevState => ({
            savedNouns: prevState.savedNouns.concat([noun]),
            newNoun: null
        }));
    };

    render() {
        const { newNoun, error } = this.state
        let searchResult = null
        if (newNoun) {
            searchResult = <NounForm key={newNoun.origin} noun={newNoun} onSaved={this.handleSaving} />
        }

        if (newNoun === false) {
            searchResult = <Page>nothing found {error}</Page>
        }

        return (
            <div>
                <Search value="" onSearch={this.handleSearch} />
                {searchResult}
                {this.state.savedNouns.length > 0 && <NounList nouns={this.state.savedNouns} />}
            </div>
        );
    }
}

export default Dictionary; 