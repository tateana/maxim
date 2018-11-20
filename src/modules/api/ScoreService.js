
import FireService, { fireDb } from './fireService';
import Score from './Entity/Score';

class ScoreService extends FireService {

    static docToEntity(doc) {
        const data = doc.data();
        return new Score(doc.id, data.count, super.fbDateToDate(data.viewed))
    }

    static getName() {
        return 'articles'
    }
}

export default new ScoreService(fireDb, 'users/guest/articles')