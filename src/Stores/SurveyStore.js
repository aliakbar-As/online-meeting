import { types, applySnapshot } from 'mobx-state-tree';
import { Logger, request } from '../Utils';
import { SingleFile } from './models/SingleModels';



const surveyStore = types.model('surveyStore', {

    meetingId: types.maybeNull(types.string),
    surveyType: types.maybeNull(types.number),
    title: types.maybeNull(types.string),
    surveyStatus: types.maybeNull(types.number),

    startDatetime: types.maybeNull(types.string),
    endDatetime: types.maybeNull(types.string),

    description: types.maybeNull(types.string),
    isActive: types.optional(types.boolean, false),

    surveyAttachments: types.optional(types.array(SingleFile), []),


    surveyId: types.maybeNull(types.string),

}).actions((self) => {
    return {
        async addElection(question) {

            return new Promise(async (resolve, reject) => {
                request.post(`/Survey/Add`, {
                    meetingId: self.meetingId,
                    surveyType: self.surveyType,
                    title: self.title,
                    surveyStatus: self.surveyStatus,
                    startDatetime: self.startDatetime,
                    endDatetime: self.endDatetime,
                    surveyAttachments: self.surveyAttachments,
                    description: self.description,
                    isActive: self.isActive,
                    surveyQuestions: question
                })
                    .then(({ data }) => {
                        Logger(data, 'Add Survey');
                        resolve(data.data.isSuccess);
                    }).catch(err => {
                        resolve(false);
                        console.log('CheckExist error', err);
                    });
            });
        },

        setData(meetingId, surveyType, title, surveyStatus, startDatetime, endDatetime, description) {

            self.meetingId = meetingId;
            self.surveyType = surveyType;
            self.title = title;
            self.surveyStatus = surveyStatus;

            self.startDatetime = startDatetime;
            self.endDatetime = endDatetime;

            self.description = description;


        },

        surveyFiles(files) {

            const convertedFiles = files.map(item => {
                const element = {
                    title: item.title,
                    description: `file ${item.title}`,
                    fileUrl: item.fileUri,
                };

                return element;
            });

            self.surveyAttachments = convertedFiles;
        },

        getSurveyInfo() {
            return new Promise(async (resolve, reject) => {
                request.get(`/Survey/SurveyInfo/${self.surveyId}`)
                    .then(({ data }) => {
                        Logger(data, 'SurveyInfo');
                        resolve(data.data);
                    }).catch(err => {
                        resolve(false);
                        console.log('CheckExist error', err);
                    });
            });
        },

        getSurveyQuestions() {
            return new Promise(async (resolve, reject) => {
                request.get(`/Survey/${self.surveyId}/SurveyQuestions`)
                    .then(({ data }) => {
                        Logger(data, 'SurveyQuestions');
                        resolve(data.data);
                    }).catch(err => {
                        resolve(false);
                        console.log('SurveyQuestions error', err);
                    });
            });
        },

        putSurveyInfo(data) {
            return new Promise(async (resolve, reject) => {
                request.put(`/Survey/UpdateSurveyInfo`, data)
                    .then(({ data }) => {
                        Logger(data, 'UpdateSuveyInfo');
                        resolve(data.data);
                    }).catch(err => {
                        resolve(false);
                        console.log('CheckExist error', err);
                    });
            });
        },

        putSurveyQuestion(data) {
            return new Promise(async (resolve, reject) => {
                request.put(`/SurveyQuestion/UpdateSurveyQuestions`, data)
                    .then(({ data }) => {
                        Logger(data, 'UpdateSurveyQuestions');
                        resolve(data.data.isSuccess);
                    }).catch(err => {
                        resolve(false);
                        console.log('UpdateSurveyQuestions error', err);
                    });
            });
        },

        setActive(data) {
            let convertedData = data === 'true' ? true : false;

            self.isActive = convertedData;
        },

        setSurveyId(id) {
            self.surveyId = id;
        },

        resetSurveyInfo() {
            self.meetingId = null;
            self.surveyType = null;
            self.title = null;
            self.surveyStatus = null;

            self.startDatetime = null;
            self.endDatetime = null;

            self.surveyAttachments = [];
            self.description = null;
            self.isActive = false;
        },

        setErrorMessage(message) {
            self.errMessage = message;
        },
        changeLoading(value) {
            self.loading = value;
        },
        fillUserModel(data) {
            applySnapshot(self.userModel, data);
        },
    };
});

export const SurveyStore = surveyStore.create();
