import { createContext } from 'react';
import { AuthStore } from './AuthStore';


export const stores = {
    AuthStore,
};


export default createContext(stores);
