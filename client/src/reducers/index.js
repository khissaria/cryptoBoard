import {combineReducers} from 'redux';

import transactions from './transaction';
import auth from './auth';

export default combineReducers({transactions,auth});