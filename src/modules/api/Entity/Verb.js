/* eslint no-underscore-dangle: 0 */  // --> OFF
import Word from './Word'

export default class Verb extends Word {

    constructor(id, ruOptions = null, ru = null, created = null, forms = {}) {
        super(id, ruOptions, ru, created)
        this._forms = Object.assign({
            ichPres: null,
            duPres: null,
            erPres: null,
            ihrPres: null,
            ichPast: null,
            duPast: null,
            ihrPast: null,
            ge: null
        }, forms)
    }

    get forms() {
        return this._forms
    }

    set forms(forms) {
        this._forms = Object.assign(this._forms, forms)
    }

    toObject(propList = ['de', 'ru', 'forms', 'created']) {
        return super.toObject(propList)
    }

    clone() {
        return new Verb(this.id, this.translates, this.translate, null, this.forms);
    }
}