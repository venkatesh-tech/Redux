const redux = require("redux");
// const createStore = redux.createStore
// store
const createStore = redux.legacy_createStore;

//Action
const CAKE_ORDERED = "CAKE_ORDERED"; // constant

function orderCake() {
  // action taker returns object
  return {
    type: CAKE_ORDERED, // type property action
    quantity: 1,
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

unsubscribe(); //resposnsibility 5
