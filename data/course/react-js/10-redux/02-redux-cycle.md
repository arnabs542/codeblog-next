---
title: Redux Cycle
type: topic
section: Redux
course: ReactJs
tags:
- react
---
## Redux Cycle

**Action creator -> Action -> dispatch -> Reducers -> State**

- To change state of our app, we call an action creator. It returns an action object.
- Action (action object) has type and payload
- Action is passed to dispatch function which forwards the action to the reducer.
- Reducers process the actions, modies data, and returns some data.
- The new data returned creates a new state object.

<img src="https://redux.js.org/assets/images/one-way-data-flow-04fe46332c1ccb3497ecb04b94e55b97.png"></img>

#### Store
- A store in redux is a assembly of a collection of different reducers and actions creators.
- We can't directly access state properties and modify it.
- We can modify state only by dispatching an action created by action creator.

```js
console.clear();
// Action Creator
const createPolicy = (name, amount) => {
  return {
    type: 'CREATE_POLICY',
    payload: { name, amount }
  }
}
// Action Creator
const deletePolicy = (name) => {
  return {
    type: 'DELETE_POLICY',
    payload: { name }
  }
}
// Action Creator
const createClaim = (name, amount) => {
  return {
    type: 'CREATE_CLAIM',
    payload: { name, amount }
  }
}
// Reducer
const claimsHistory = (oldListOfClaims = [], action) => {
  if(action.type === 'CREATE_CLAIM') {
    return [...oldListOfClaims, action.payload]
  }
  return oldListOfClaims;
}
// Reducer
const accounting = (bagOfMoney = 1000, action) => {
  if(action.type === 'CREATE_CLAIM') {
    return bagOfMoney - action.payload.amount;
  } else if (action.type === 'CREATE_POLICY') {
    return bagOfMoney + action.payload.amount;
  }
  return bagOfMoney;
}
// Reducer
const policies = (listOfPolicies = [], action) => {
  if(action.type === 'CREATE_POLICY') {
    return [...listOfPolicies, action.payload.name];
  } else if (action.type === 'DELETE_POLICY') {
    return listOfPolicies.filter(name => name != action.payload.name);
  }
  return listOfPolicies;
}
// 
const {createStore, combineReducers} = Redux;

const ourDepartments = combineReducers({
  accounting: accounting,
  claimsHistory: claimsHistory,
  policies: policies
});

const store = createStore(ourDepartments);

store.dispatch(createPolicy('Alex', 20));
console.log(store.getState());
store.dispatch(createPolicy('Rishi', 15));
console.log(store.getState());
store.dispatch(createPolicy('Ashish', 10));
console.log(store.getState());
store.dispatch(createClaim('Rishi', 100));
console.log(store.getState());
store.dispatch(deletePolicy('Ashish'));
console.log(store.getState());
```