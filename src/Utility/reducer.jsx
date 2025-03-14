import { Type } from "./action.type";

export const initialState = {
  basket: [],
  user:null
};

export const reducer = (state, action) => {
  switch (action.type) {
    // ✅ Add Item to Cart (or Increase Quantity)
    case Type.ADD_TO_BASKET: {
      const existingItem = state.basket.find(
        (item) => item.id === action.item.id
      );

      let updatedBasket;

      if (!existingItem) {
        updatedBasket = [...state.basket, { ...action.item, amount: 1 }];
      } else {
        updatedBasket = state.basket.map((item) =>
          item.id === action.item.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }

      return {
        ...state,
        basket: updatedBasket,
      };
    }

    //  Remove Item from Cart
    case Type.REMOVE_FROM_BASKET: {
      return {
        ...state,
        basket: state.basket.filter((item) => item.id !== action.id),
      };
    }

    //  Increase Quantity
    case Type.INCREMENT_ITEM: {
      return {
        ...state,
        basket: state.basket.map((item) =>
          item.id === action.id ? { ...item, amount: item.amount + 1 } : item
        ),
      };
    }

    //  Decrease Quantity (Remove if `amount === 1`)
    case Type.DECREMENT_ITEM: {
      return {
        ...state,
        basket: state.basket
          .map((item) =>
            item.id === action.id ? { ...item, amount: item.amount - 1 } : item
          )
          .filter((item) => item.amount > 0), // Remove item if amount reaches 0
      };
    }

    case Type.SET_USER:
      return{
        ...state,
        user:action.user
      }
    default:
      return state;
  }
};
