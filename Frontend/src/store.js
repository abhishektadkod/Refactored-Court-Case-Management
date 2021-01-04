import { createStore } from 'redux'

import userReducer from './Reducers/rootReducers'

function saveto(state)
{
const User=JSON.stringify(state)
localStorage.setItem('state',User)
}

function loadfrom()
{
const User=localStorage.getItem('state')
if(User===null) return undefined
return JSON.parse(User)
}

const persist=loadfrom()

const store = createStore(userReducer,persist)

store.subscribe(()=>saveto(store.getState()))

export default store
