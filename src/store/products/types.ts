// This file holds our state type, as well as any other types related to this Redux store.

// Response object for GET /products
export interface Product {
  Id: number;
  Name: string;
  Code: string;
  ImagePath: string;
  Price: number;
  CategoryId: Category;
}

export enum Category {
  Men = 1,
  Women,
  Kids,
  Accessories
}


// Use `enum`s for better autocompletion of action type names. These will
// be compiled away leaving only the final value in your compiled code.
//
// Define however naming conventions you'd like for your action types, but
// personally, I use the `@@context/ACTION_TYPE` convention, to follow the convention
// of Redux's `@@INIT` action.
export enum ProductsActionTypes {
  FETCH_REQUEST = '@@products/FETCH_REQUEST',
  FETCH_SUCCESS = '@@products/FETCH_SUCCESS',
  FETCH_ERROR = '@@products/FETCH_ERROR',
  SELECT_HERO = '@@products/SELECT_HERO',
  SELECTED = '@@products/SELECTED'
}

// Declare state types with `readonly` modifier to get compile time immutability.
// https://github.com/piotrwitek/react-redux-typescript-guide#state-with-type-level-immutability
export interface ProductsState {
  readonly loading: boolean
  readonly data: Product[]
  readonly errors?: string
}
