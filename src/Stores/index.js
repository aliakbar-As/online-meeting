import { createContext } from 'react';
import { AuthStore } from './AuthStore';
import { MeetingStore, MeetingProfileStore } from './MeetingStore';


export const stores = {
    AuthStore,
    MeetingStore, MeetingProfileStore
};


export default createContext(stores);
