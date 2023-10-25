import {combineReducers, createStore,applyMiddleware} from 'redux'
import { getProductDetailReducer, productReducer } from './reducers/productReducer'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { cartReducer } from './reducers/cartReducer'

const reducers = combineReducers({
    getProducts : productReducer,
    getProductDetail : getProductDetailReducer,
    cart : cartReducer
}) 

const middleware = [thunk]

const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;