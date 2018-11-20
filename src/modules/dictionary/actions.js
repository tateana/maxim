export const DICTIONARY_LOAD = "DICTIONARY_LOAD"
export const DICTIONARY_LOADED = "DICTIONARY_LOADED"

export const DICTIONARY_UPDATE = "DICTIONARY_UPDATE"
export const DICTIONARY_UPDATED = "DICTIONARY_UPDATED"

export const DICTIONARY_SYNC = "DICTIONARY_SYNC"
export const DICTIONARY_SYNCED = "DICTIONARY_SYNCED"

export const DICTIONARY_ITEM_FIND = "DICTIONARY_ITEM_FIND"
export const DICTIONARY_ITEM_FOUND = "DICTIONARY_ITEM_FOUND"

export const DICTIONARY_ITEMS_SAVE = "DICTIONARY_ITEMS_SAVE"
export const DICTIONARY_ITEMS_SAVED = "DICTIONARY_ITEMS_SAVED"

export const DICTIONARY_CLEAR = "DICTIONARY_CLEAR"

export function load() {
    return {
        type: DICTIONARY_LOAD
    }
}

export function clear() {
    return {
        type: DICTIONARY_CLEAR
    }
}

export function updateEntity(entity) {
    return {
        type: DICTIONARY_UPDATE,
        payload: entity,
    }
}

export function saveEntities(items) {
    return {
        type: DICTIONARY_ITEMS_SAVE,
        payload: items
    }
}

export function sync() {
    return {
        type: DICTIONARY_SYNC
    }
}

export function findItem(term) {
    return {
        type: DICTIONARY_ITEM_FIND,
        payload: term
    }
}