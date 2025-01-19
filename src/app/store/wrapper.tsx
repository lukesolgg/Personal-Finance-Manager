import { createWrapper } from 'next-redux-wrapper';
import { store } from './index';

const makeStore = () => store;

export const wrapper = createWrapper(makeStore);