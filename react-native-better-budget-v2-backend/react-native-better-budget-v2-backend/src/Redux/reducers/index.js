import Auth from './Auth'
import Config from './Config'
import { combineReducers } from 'redux'
import App from './App'

export default combineReducers({
    Auth: Auth,
    App: App,
    Config: Config
});
