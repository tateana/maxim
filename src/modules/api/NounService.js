import pick from 'lodash.pick';
import upperFirst from 'lodash.upperfirst';
import { from } from 'rxjs/index';
import FireService, { fireDb } from './fireService';
import Noun from './Entity/Noun';

class NounService extends FireService {

    static docToEntity(doc) {
        const data = doc.data();
        return new Noun(data.de, null, data.gender, data.ru)
    }

    static getName() {
        return 'words'
    }

    fetchLike(term, limit = 2) {
        const cleanedTerm = upperFirst(term)
        return from(
            this.collection
                .where("de", ">=", cleanedTerm).limit(limit).get()
                .then((querySnapshot) => querySnapshot.docs.filter(doc => doc.id.startsWith(cleanedTerm)).map(doc => {
                    const data = doc.data();
                    return new Noun(data.de, null, data.gender, data.ru)
                }))
        )
    }

    add(noun) {
        return from(this.collection
            .doc(noun.de)
            .set(pick(noun, ['de', 'ru', 'gender', 'created']))
            .then(() => true)
            // .catch(error => false)
        )
    }
}

export default new NounService(fireDb, 'nouns')