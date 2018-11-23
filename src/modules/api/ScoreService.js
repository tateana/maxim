
import FireService, { fireDb } from './fireService';
import Score, { SpellScore } from './Entity/Score';

class ScoreService extends FireService {

    static docToEntity(doc) {
        const data = doc.data();
        return new Score(doc.id, data.count, super.fbDateToDate(data.viewed))
    }
}

export default new ScoreService(fireDb, 'users/guest/articles')


class SpellScoreService extends FireService {

    static docToEntity(doc) {
        const data = doc.data();
        return new SpellScore(doc.id, data.count, super.fbDateToDate(data.viewed))
    }
}

export const spellScoreService = new SpellScoreService(fireDb, 'users/guest/spelling')
