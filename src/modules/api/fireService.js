import firebase from 'firebase/app';
import "firebase/firestore";
import pick from 'lodash.pick';
import upperFirst from 'lodash.upperfirst';
import { from } from 'rxjs/index';
import Noun from './Noun';

const config = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: "maxim-6366b.firebaseapp.com",
    databaseURL: "https://maxim-6366b.firebaseio.com",
    projectId: "maxim-6366b",
    storageBucket: "maxim-6366b.appspot.com",
    messagingSenderId: "174473215042"
};

firebase.initializeApp(config);
const fireDb = firebase.firestore();
fireDb.settings({ timestampsInSnapshots: true })


class FireService {

    static COLLECTION_NOUNS = 'nouns'

    static COLLECTION_ARTICLES = 'users/guest/articles'

    constructor(db) {
        this.db = db;
        this.collections = {};
    }

    getCollection(name) {
        if (!this.collections[name]) {
            this.collections[name] = this.db.collection(name)
        }

        return this.collections[name]
    }

    fetchNounLike(term, limit = 2) {
        const cleanedTerm = upperFirst(term)
        return from(
            this.getCollection(FireService.COLLECTION_NOUNS)
                .where("de", ">=", cleanedTerm).limit(limit).get()
                .then((querySnapshot) => querySnapshot.docs.filter(doc => doc.id.startsWith(cleanedTerm)).map(doc => {
                    const data = doc.data();
                    return new Noun(data.de, null, data.gender, data.ru)
                }))
        )
    }

    fetchNounExact(noun) {
        return from(
            this.getCollection(FireService.COLLECTION_NOUNS).doc(upperFirst(noun)).get()
                .then((doc) => {
                    if (doc.exists) {
                        const data = doc.data();
                        return new Noun(data.de, null, data.gender, data.ru)
                    }

                    return null;
                })
        )
    }

    addNoun(noun) {
        return from(this.getCollection(FireService.COLLECTION_NOUNS)
            .doc(noun.de)
            .set(pick(noun, ['de', 'ru', 'gender', 'created']))
            .then(() => true)
            .catch(error => false)
        )
    }

    addArticleScore(score) {
        return from(this.getCollection(FireService.COLLECTION_ARTICLES)
            .doc(score.word)
            .set(pick(score, ['count', 'viewed']))
            .then(() => true)
            .catch(error => false)
        )
    }
}

export default new FireService(fireDb)