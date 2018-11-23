import { ajax as rxjsAjax } from 'rxjs/ajax';
import { map } from 'rxjs/operators';
import Noun from './Entity/Noun'
import Verb from './Entity/Verb'
import Word from './Entity/Word'



class YandexService {
    static def = {
        "text": "Busch", "pos": "noun", "gen": "m", "tr": [
            { "text": "куст", "pos": "noun", "gen": "м", "syn": [{ "text": "кустарник", "pos": "noun", "gen": "м" }], "mean": [{ "text": "Strauch" }] },
            { "text": "заросли", "pos": "noun", "mean": [{ "text": "Gestrüpp" }] },
            { "text": "лесок", "pos": "noun", "gen": "м" },
            { "text": "букет", "pos": "noun", "gen": "м" },
            { "text": "роща", "pos": "noun", "gen": "ж" }]
    }

    constructor(ajax) {
        this.ajax = ajax;
    }

    // findTest() {
    //     const { text, gen, tr } = YandexService.def

    //     return from([new Noun(text, tr.map(meta => meta.text), gen)])
    // }

    find(query) {
        const headers = {
            'Accept': "application/json"
            // 'app_id': "3566db7d",
            // 'app_key': "1168bdb378f7f221abc002ff1583aa19"
        }

        const request = {
            url: `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=dict.1.1.20180926T194142Z.46b4cac46d431a3d.ff488fe6f7f1f009f845614c8e31596af7823735&lang=de-ru&text=${query}`,
            method: 'GET',
            headers,
            crossDomain: true,
            withCredentials: false
        }

        console.log(request)

        return this.ajax(request).pipe(
            map(response => {
                if (response.status === 200) {
                    if (!response.response || !response.response.def) {
                        throw new Error('No Yandex Result')
                    }

                    if (response.response.def.length === 0) {
                        return false
                    }

                    const { text, gen, tr, pos } = response.response.def[0]
                    if (pos === 'noun') {
                        return new Noun(text, tr.map(meta => meta.text), gen)
                    }

                    if (pos === 'verb') {
                        return new Verb(text, tr.map(meta => meta.text))
                    }

                    return new Word(text, tr.map(meta => meta.text))
                }

                throw new Error('Yandex Response Status is not 200')
            })
        );
    }
}

export default new YandexService(rxjsAjax)