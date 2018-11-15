import firebase from 'firebase/app';
import "firebase/firestore";
import upperFirst from 'lodash.upperfirst';
import { from } from 'rxjs/index';


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

export { fireDb }

export default class FireService {

    constructor(db, collectionName) {
        this.db = db;
        this.collection = this.db.collection(collectionName);
    }

    static docToEntity(doc) {
        throw new Error(`You have to implement convertion of ${typeof (doc)}  to an Entity`);
    }

    fetchAll(limit = 10) {
        return from(
            this.collection
                .limit(limit).get()
                .then((querySnapshot) => querySnapshot.docs.map(doc => this.constructor.docToEntity(doc)))
        )
    }

    fetchExact(id) {
        console.log('BADD')
        return from(
            this.collection.doc(upperFirst(id)).get()
                .then((doc) => {
                    if (doc.exists) {
                        return this.constructor.docToEntity(doc)
                    }

                    return null;
                })
        )
    }
}