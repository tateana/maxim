import { createStore } from 'redux'
import rootReducer from './modules/reducers'


const store = createStore(rootReducer)

export default store