import { types } from 'mobx-state-tree';


export const meetingDocuments = types.model({
    title: types.maybeNull(types.string),
    fileUri: types.maybeNull(types.string),
    documentType: types.maybeNull(types.number),
});


export const meetingUserDuties = types.model({
    dutyId: types.maybeNull(types.number),
    dutyTitle: types.maybeNull(types.string),
    id: types.maybeNull(types.string),
    meetingId: types.maybeNull(types.string),
    stockholderName: types.maybeNull(types.string),
    userId: types.maybeNull(types.string),
});

export const SingleMetting = types.model({
    ceoTitle: types.maybeNull(types.string),
    industryGroupTitle: types.maybeNull(types.string),
    stockMarketTitle: types.maybeNull(types.string),

    meetingDocuments: types.optional(types.array(meetingDocuments), []),
    meetingUserDuties: types.optional(types.array(meetingUserDuties), []),

    baseVolume: types.maybeNull(types.number),
    dutyId: types.maybeNull(types.number),
    dutyTitle: types.maybeNull(types.string),
    userId: types.maybeNull(types.string),
    stockholderName: types.maybeNull(types.string),
    meetingId: types.maybeNull(types.string),
    companyImageUrl: types.maybeNull(types.string),
    companyDescription: types.maybeNull(types.string),
    holderCompanyTitle: types.maybeNull(types.string),
    holdingDatetime: types.maybeNull(types.string),
    endDatetime: types.maybeNull(types.string),
    id: types.maybeNull(types.string),
    meetingStatus: types.maybeNull(types.number),
    meetingType: types.maybeNull(types.number),
    tickerSymbol: types.maybeNull(types.string),
    title: types.maybeNull(types.string),
    description: types.maybeNull(types.string),


    countOfPresent: types.maybeNull(types.number),
    percentagAttendance: types.maybeNull(types.number),

});



export const SingleSurveyList = types.model({
    description: types.maybeNull(types.string),
    endDatetime: types.maybeNull(types.string),
    meetingTitle: types.maybeNull(types.string),
    startDatetime: types.maybeNull(types.string),
    surveyId: types.maybeNull(types.string),
    title: types.maybeNull(types.string),

    surveyStatus: types.maybeNull(types.number),
    surveyType: types.maybeNull(types.number),

});


export const SingleDuty = types.model({
    userId: types.maybeNull(types.string),
    dutyId: types.maybeNull(types.number),
});