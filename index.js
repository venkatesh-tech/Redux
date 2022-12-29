const redux = require("redux");
// const createStore = redux.createStore
// store
const createStore = redux.legacy_createStore;

//Action
const CAKE_ORDERED = "CAKE_ORDERED"; // constant
const CAKE_RESTOCKED = "CAKE_RESTOCKED";

function orderCake() {
  // action taker returns object
  return {
    type: CAKE_ORDERED, // type property action
    payload: 1,
  };
}

function restockCake(qty = 1) {
  return {
    type: CAKE_RESTOCKED,
    payload: qty,
  };
}

//Reducer
const initialState = {
  numberOfCakes: 10,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numberOfCakes: state.numberOfCakes - 1,
      };
    case CAKE_RESTOCKED:
      return {
        ...state,
        numberOfCakes: state.numberOfCakes + action.payload,
      };
    default:
      return state;
  }
};

const store = createStore(reducer); //resposnsibility 1
console.log("Initial State", store.getState()); //resposnsibility 2

const unsubscribe = store.subscribe(() =>
  console.log("updated State ", store.getState())
); //resposnsibility 4

store.dispatch(orderCake()); //resposnsibility 3
store.dispatch(orderCake());
store.dispatch(orderCake());

store.dispatch(restockCake(3));

unsubscribe(); //resposnsibility 5
