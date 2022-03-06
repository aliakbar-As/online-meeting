import { createContext } from 'react';
import { AuthStore } from './AuthStore';
import { MeetingStore, MeetingProfileStore } from './MeetingStore';
import { SurveyStore } from './SurveyStore';


export const stores = {
    AuthStore,
    MeetingStore, MeetingProfileStore,
    SurveyStore
};


export default createContext(stores);
