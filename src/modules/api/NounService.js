import upperFirst from 'lodash.upperfirst';
import { from } from 'rxjs/index';
import FireService, { fireDb } from './fireService';
import Noun from './Entity/Noun';
import Word from './Entity/Word';
import Verb from './Entity/Verb';

class NounService extends FireService {

    static docToEntity(doc) {
        const data = doc.data();
        if (data.gender)
            return new Noun(data.de, null, data.gender, data.ru, super.fbDateToDate(data.created))

        if (data.forms)
            return new Verb(data.de, null, data.ru, super.fbDateToDate(data.created), data.forms)

        return new Word(data.de, null, data.ru, super.fbDateToDate(data.created))
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
}

export default new NounService(fireDb, 'nouns')