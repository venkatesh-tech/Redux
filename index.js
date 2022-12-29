const redux = require("redux");
// const createStore = redux.createStore
// store
const createStore = redux.legacy_createStore;
const bindActionCreators = redux.bindActionCreators;

//Action
const CAKE_ORDERED = "CAKE_ORDERED"; // constant
const CAKE_RESTOCKED = "CAKE_RESTOCKED";
const ICECREAM_ORDERED = "ICECREAM_ORDERED"; // constant
const ICECREAM_RESTOCKED = "ICECREAM_RESTOCKED";

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

function orderIcecream(qty = 1) {
  return {
    type: ICECREAM_ORDERED,
    payload: qty,
  };
}

function restockIcecream(qty = 1) {
  return {
    type: ICECREAM_RESTOCKED,
    payload: qty,
  };
}

//Reducer
const initialState = {
  numberOfCakes: 10,
  numberOfIcecreams: 20,
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
    case ICECREAM_ORDERED:
      return {
        ...state,
        numberOfIcecreams: state.numberOfIcecreams - action.payload,
      };
    case ICECREAM_RESTOCKED:
      return {
        ...state,
        numberOfIcecreams: state.numberOfIcecreams + action.payload,
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

// store.dispatch(orderCake()); //resposnsibility 3
// store.dispatch(orderCake());
// store.dispatch(orderCake());

// store.dispatch(restockCake(3));

const actions = bindActionCreators(
  { orderCake, restockCake, orderIcecream, restockIcecream },
  store.dispatch
);
actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.restockCake(3);

actions.orderIcecream(2);
actions.restockIcecream(2);

unsubscribe(); //resposnsibility 5
