import { Price } from './price-list/price';

export interface State {
    p_sum: number;
    q_sum: number;
    priceList: {
        items: Price[];
    }
}
export const initialState = {
    p_sum:0,
    q_sum:0,
    priceList: {
        items:[]
    }
  };
