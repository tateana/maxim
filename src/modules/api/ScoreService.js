import pick from 'lodash.pick';
import { from } from 'rxjs/index';
import FireService, { fireDb } from './fireService';
import Score from './Score';

class ScoreService extends FireService {

    static docToEntity(doc) {
        const data = doc.data();
        return new Score(doc.id, data.count, new Date(data.viewed.seconds * 1000))
    }

    static getName() {
        return 'articles'
    }

    add(score) {
        return from(this.collection
            .doc(score.id)
            .set(pick(score, ['count', 'viewed']))
            .then(() => true)
            // .catch(error => false)
        )
    }
}

export default new ScoreService(fireDb, 'users/guest/articles')