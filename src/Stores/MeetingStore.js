import { types, applySnapshot } from 'mobx-state-tree';
import { Logger, request } from '../Utils';
import { SingleMetting, SingleSurveyList, SingleDuty } from './models/SingleModels';



const meetingStore = types.model('meetingStore', {
    loading: types.optional(types.boolean, false),
    errMessage: types.maybeNull(types.string),

    data: types.optional(types.array(SingleMetting), []),




    meetingType: types.maybeNull(types.number),
    holderCompanyId: types.maybeNull(types.string),
    title: types.maybeNull(types.string),
    holdingDatetime: types.optional(types.string, "2022-01-18T07:51:16.952Z"),
    endDatetime: types.optional(types.string, "2022-01-18T07:51:16.952Z"),
    meetingStatus: types.optional(types.number, 1),
    description: types.maybeNull(types.string),
    meetingDuties: types.optional(types.array(SingleDuty), []),

}).actions((self) => {
    return {
        async fetchData(clear = false, id) {
            return new Promise(async (resolve, reject) => {

                if (clear) this.resetList();

                request.get(`/Meeting/Meetings`, {
                    params: {
                        meetingStatus: id,
                        count: 50,
                        skip: 0,
                        orderBy: 'title'
                    }
                }).then(({ data }) => {
                    Logger(data, 'meetings');

                    if (data.hasError) {
                        resolve(false);
                        this.setErrorMessage(data.data.exception);
                        return;
                    };
                    this.fillData(data.data.list);
                    resolve(data.data.list);
                }).catch(err => {
                    console.log('meeting err', err);
                    resolve(false);
                });
            });

        },
        getCompanyCode() {
            return new Promise(async (resolve, reject) => {
                request.get(`/Company`, {
                    params: {
                        count: 50,
                        skip: 0,
                        orderBy: 'title',
                        title: '',
                        tickerSymbol: '',
                    }
                }).then(({ data }) => {
                    Logger(data, 'Company');
                    resolve(data.data.list);

                }).catch(err => {
                    console.log('Company', err);
                    resolve(false);
                });
            });
        },
        getStockholder() {
            return new Promise(async (resolve, reject) => {
                request.get(`/Stockholder`, {
                    params: {
                        count: 50,
                        skip: 0,
                        orderBy: 'title',
                        title: '',
                    }
                }).then(({ data }) => {
                    Logger(data, 'Stockholder');
                    resolve(data.data.list);

                }).catch(err => {
                    console.log('Company', err);
                    resolve(false);
                });
            });
        },



        uploadFiles(type, data) {
            return new Promise(async (resolve, reject) => {
                request.post(`/File/UploadFiles`, data, {
                    params: {
                        sectionType: type
                    }
                }, false, {})
                    .then(({ data }) => {
                        Logger(data, 'UploadFile');
                        resolve(data.data.value);

                    }).catch(err => {
                        console.log('Company', err);
                        resolve(false);
                    });
            });

        },

        addMeeting(files) {

            return new Promise(async (resolve, reject) => {
                request.post(`/Meeting/Add`, {
                    meetingType: self.meetingType,
                    holderCompanyId: self.holderCompanyId,
                    title: self.title,
                    holdingDatetime: self.holdingDatetime,
                    endDatetime: self.endDatetime,
                    meetingStatus: 1,
                    description: self.description,
                    meetingDocuments: files,
                    meetingUserDuties: self.meetingDuties,
                }, false, {})
                    .then(({ data }) => {
                        Logger(data, 'Meeting/Add');

                        resolve();

                    }).catch(err => {
                        console.log('Company', err);
                        resolve(false);
                    });
            });

        },

        fillData(data) {
            if (data.length === 0) {
                return false;
            };
            Array.prototype.push.apply(self.data, data.map(item => item));
        },

        fillDuties(data, companyId, title, des, meetingType) {
            Array.prototype.push.apply(self.meetingDuties, data.map(item => item));

            self.title = title;
            self.description = des;
            self.holderCompanyId = companyId;
            self.meetingType = meetingType;

        },

        setMeetingDate(sDate, eDate) {
            self.holdingDatetime = sDate;
            self.endDatetime = eDate;
        },
        resetList() {
            self.data = [];
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

export const MeetingStore = meetingStore.create();




const meetingProfileStore = types.model('meetingProfileStore', {
    loading: types.optional(types.boolean, false),
    errMessage: types.maybeNull(types.string),

    meetingDetails: SingleMetting,

    meetingId: types.maybeNull(types.string),

    surveyList: types.optional(types.array(SingleSurveyList), []),
    surveyId: types.maybeNull(types.string),

}).actions((self) => {
    return {
        async getMeetingDetails(id) {
            return new Promise(async (resolve, reject) => {
                request.get(`/Meeting/${id}`)
                    .then(({ data }) => {
                        Logger(data, 'meeting details');

                        if (!data.hasError) {
                            this.setMettingDetails(data.data)
                            resolve(data.isSuccess);
                        };
                    }).catch(err => {
                        console.log('details err', err);
                        resolve(false);
                    });
            });

        },

        async getAttendanceMeeting() {
            return new Promise(async (resolve, reject) => {
                request.get(`/Meeting/${self.meetingId}/AttendanceMeeting`)
                    .then(({ data }) => {
                        Logger(data, 'AttendanceMeeting');
                        if (!data.hasError) {
                            resolve(data.data);
                        };

                    }).catch(err => {
                        console.log('AttendanceMeeting err', err);
                        resolve(false);
                    });
            });
        },


        async leaveMeeting() {
            return new Promise(async (resolve, reject) => {
                request.get(`/Meeting/${self.meetingId}/LeaveMeeting`)
                    .then(({ data }) => {
                        Logger(data, 'LeaveMeeting');
                        if (!data.hasError) {
                            resolve(data.data);
                        };

                    }).catch(err => {
                        console.log('LeaveMeeting err', err);
                        resolve(false);
                    });
            });
        },


        async getSurvey(clear = false, surveyType) {

            return new Promise(async (resolve, reject) => {
                if (clear) this.resetList();

                request.get('/Survey/Surveys', {
                    params: {
                        count: 50,
                        orderBy: 'surveyType',
                        skip: 0,
                        surveyType: surveyType,
                        meetingId: self.meetingId,
                    }
                })
                    .then(({ data }) => {
                        Logger(data, 'Surveys');

                        if (data.hasError) {
                            resolve(false);
                            this.setErrorMessage(data.data.exception);
                            return;
                        };
                        if (surveyType === 2) {
                            this.fillSurveyList(data.data.list);
                            resolve(true);
                        } else {
                            resolve(data.data.list);
                        }
                    }).catch(err => {
                        console.log('surveyType err', err);
                        resolve(false);
                    });
            });
        },


        async getQuestionSurvey() {
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

        async checkExist() {
            return new Promise(async (resolve, reject) => {
                request.get(`/SurveyQuestionAnswer/CheckExist`, {
                    params: {
                        surveyId: self.surveyId,
                    }
                })
                    .then(({ data }) => {
                        Logger(data, 'CheckExist');
                        resolve(data.data.value);
                    }).catch(err => {
                        resolve(false);
                        console.log('CheckExist error', err);
                    });
            });
        },


        async addAnswers(answers) {
            return new Promise(async (resolve, reject) => {
                request.post(`/SurveyQuestionAnswer/Adds`, answers)
                    .then(({ data }) => {
                        Logger(data, 'Adds');
                        resolve(data.data.isSuccess);
                    }).catch(err => {
                        resolve(false);
                        console.log('CheckExist error', err);
                    });
            });
        },

        resetList() {
            self.skip = 0;
            self.surveyList = [];
        },

        setSurveyId(id) {
            self.surveyId = id;
        },

        fillSurveyList(data) {
            if (data.length === 0) {
                return false;
            };
            Array.prototype.push.apply(self.surveyList, data.map(item => item));
        },

        setMettingId(id) {
            self.meetingId = id;
        },

        setMettingDetails(details) {
            self.meetingDetails = details;
        },

        setErrorMessage(message) {
            self.errMessage = message;
        },
        changeLoading(value) {
            return self.loading = value;
        },
    };
});

export const MeetingProfileStore = meetingProfileStore.create({
    meetingDetails: SingleMetting.create(),
});
