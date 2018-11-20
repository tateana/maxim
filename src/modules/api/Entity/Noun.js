/* eslint no-underscore-dangle: 0 */  // --> OFF
import Word from './Word'

export default class Noun extends Word {

    static genders = {
        'm': 'der',
        'f': 'die',
        'n': 'das'
    }

    constructor(id, ruOptions = null, gender, ru = null, created = null) {
        super(id, ruOptions, ru, created)
        this._gender = gender
    }

    get gender() {
        return this._gender
    }

    get literalGender() {
        return Noun.genders[this._gender]
    }

    set gender(value) {
        this._gender = value
    }
}