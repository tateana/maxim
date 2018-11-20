
import { of } from 'rxjs/index';
import store from "./store";
import { Noun, Score } from './modules/api'
import { actions } from "./modules/dictionary"
import NounService from './modules/api/NounService'
import YandexService from './modules/api/yandexService'
import ArticleService from './modules/api/ScoreService'

ArticleService.db = null;
ArticleService.collection = null
NounService.db = null;
NounService.collection = null
NounService.fetchExact = jest.fn();
YandexService.find = jest.fn();
ArticleService.fetchExact = jest.fn();
NounService.add = jest.fn();
ArticleService.add = jest.fn();

const today = new Date('2018-11-20T18:53:31.633Z')

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
        beforeEach(() => {
            store.dispatch(actions.clear());
            triggeredActions = []
            NounService.fetchExact.mockClear()
            ArticleService.fetchExact.mockClear()
            YandexService.find.mockClear()
        })

        testSpec[1] = it('word and its score are found in database', () => {
            const noun = new Noun('Busch', null, 'm', 'куст', today)
            NounService.fetchExact.mockReturnValue(of(noun))
            const score = new Score('Busch', 2)
            ArticleService.fetchExact.mockReturnValue(of(score))

            store.dispatch(actions.findItem('busch'));
            expect(NounService.fetchExact).toHaveBeenCalledTimes(1);
            expect(ArticleService.fetchExact).toHaveBeenCalledTimes(1);
            expect(YandexService.find).not.toHaveBeenCalled();
            expect(triggeredActions).toMatchSnapshot();
        });

        testSpec[2] = it('word is not found in any source', () => {
            NounService.fetchExact.mockReturnValue(of(null))
            YandexService.find.mockReturnValue(of(false))

            store.dispatch(actions.findItem('Buch'));

            expect(NounService.fetchExact).toHaveBeenCalledTimes(1);
            expect(YandexService.find).toHaveBeenCalledTimes(1);
            expect(ArticleService.fetchExact).not.toHaveBeenCalled();
            expect(triggeredActions).toMatchSnapshot();
        });

        testSpec[3] = it('word is found in Yandex', () => {
            const noun = new Noun('Fenster', ['окно'], 'n', null, today)
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


        beforeEach(() => {
            store.dispatch(actions.clear());
            triggeredActions = []
            NounService.add.mockClear()
            ArticleService.add.mockClear()
        })

        testSpec[4] = it('score saved successfully', () => {
            const noun = new Noun('Busch', null, 'm', 'куст', today)
            const score = new Score('Busch', 2)
            score.doModified()
            ArticleService.add.mockReturnValue(of(score))

            store.dispatch(actions.saveEntities([noun, score]));
            expect(ArticleService.add).toHaveBeenCalledTimes(1);
            expect(NounService.add).not.toHaveBeenCalled();
            expect(triggeredActions).toMatchSnapshot();
        });

        testSpec[5] = it('noun saved successfully', () => {
            const noun = new Noun('Tisch', null, 'm', 'стол', today)
            noun.doModified()
            const score = new Score('Tisch', 5)
            NounService.add.mockReturnValue(of(noun))

            store.dispatch(actions.saveEntities([noun, score]));
            expect(NounService.add).toHaveBeenCalledTimes(1);
            expect(ArticleService.add).not.toHaveBeenCalled();
            expect(triggeredActions).toMatchSnapshot();
        });

        testSpec[6] = it('noun and score are saved successfully', () => {
            const noun = new Noun('Tisch', null, 'm', 'стол', today)
            noun.doModified()
            const score = new Score('Tisch', 5)
            score.doModified()
            NounService.add.mockReturnValue(of(noun))
            ArticleService.add.mockReturnValue(of(score))

            store.dispatch(actions.saveEntities([noun, score]));
            expect(NounService.add).toHaveBeenCalledTimes(1);
            expect(ArticleService.add).toHaveBeenCalledTimes(1);
            expect(triggeredActions).toMatchSnapshot();
        });
    });
});