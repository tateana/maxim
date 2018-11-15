
import { of } from 'rxjs/index';
import store from "./store";


import NounService from './modules/api/NounService'
import YandexService from './modules/api/yandexService'
import ArticleService from './modules/api/ScoreService'

import { Noun, Score } from './modules/api'
import { actions } from "./modules/dictionary"


describe('dictionary flow dispatches the correct action and payload', () => {

    let triggeredActions = []
    const testSpec = [];
    let i = 0;

    store.attachReducers({
        testReducer: (state = null, action) => {
            triggeredActions.push(action)
            return state
        }
    })

    afterEach(() => {
        console.log(testSpec[i += 1].description, triggeredActions)
    });

    describe('Find Item', () => {
        NounService.fetchExact = jest.fn();
        YandexService.find = jest.fn();
        ArticleService.fetchExact = jest.fn();

        beforeEach(() => {
            triggeredActions = []
            NounService.fetchExact.mockClear()
            ArticleService.fetchExact.mockClear()
            YandexService.find.mockClear()
        })

        testSpec[1] = test('word and its score are found in database', () => {
            const noun = new Noun('Busch', null, 'm', 'куст')
            NounService.fetchExact.mockReturnValue(of(noun))
            const score = new Score('Busch', 2)
            ArticleService.fetchExact.mockReturnValue(of(score))

            store.dispatch(actions.findItem('busch'));
            expect(NounService.fetchExact).toHaveBeenCalledTimes(1);
            expect(ArticleService.fetchExact).toHaveBeenCalledTimes(1);
            expect(YandexService.find).not.toHaveBeenCalled();
            expect(triggeredActions).toMatchSnapshot();
        });

        testSpec[2] = test('word is not found in any source', () => {
            NounService.fetchExact.mockReturnValue(of(null))
            YandexService.find.mockReturnValue(of(false))

            store.dispatch(actions.findItem('Buch'));

            expect(NounService.fetchExact).toHaveBeenCalledTimes(1);
            expect(YandexService.find).toHaveBeenCalledTimes(1);
            expect(ArticleService.fetchExact).not.toHaveBeenCalled();
            expect(triggeredActions).toMatchSnapshot();
        });

        testSpec[3] = test('word is found in Yandex', () => {
            const noun = new Noun('Fenster', ['окно'], 'n')
            NounService.fetchExact.mockReturnValue(of(null))
            YandexService.find.mockReturnValue(of(noun))

            store.dispatch(actions.findItem('fenster'));

            expect(NounService.fetchExact).toHaveBeenCalledTimes(1);
            expect(YandexService.find).toHaveBeenCalledTimes(1);
            expect(ArticleService.fetchExact).not.toHaveBeenCalled();
            expect(triggeredActions).toMatchSnapshot();
        });
    });

    describe('Save Dict Items flow dispatches the correct action and payload', () => {
        NounService.add = jest.fn();
        ArticleService.add = jest.fn();

        beforeEach(() => {
            triggeredActions = []
            NounService.add.mockClear()
            ArticleService.add.mockClear()
        })

        testSpec[4] = test('items saved successfully', () => {
            // const noun = new Noun('Busch', null, 'm', 'куст')
            // NounService.fetchExact.mockReturnValue(of(noun))
            const score = new Score('Busch', 2)
            score.doModified()
            ArticleService.add.mockReturnValue(of(score))

            store.dispatch(actions.saveItems([score]));
            // expect(ArticleService.add).toHaveBeenCalledTimes(1);
            expect(triggeredActions).toMatchSnapshot();
        });
    });


});