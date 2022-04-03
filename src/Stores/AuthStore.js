import { types, applySnapshot } from 'mobx-state-tree';
import Axios from 'axios';
import { Logger, request } from '../Utils';
import { UserModel } from './models';

const authStore = types.model('authStore', {
    loading: types.optional(types.boolean, false),
    phoneNumber: types.maybeNull(types.string),
    errMessage: types.maybeNull(types.string),

    roleId: types.maybeNull(types.number),
}).actions((self) => {
    return {
        async loginUser(phoneNumber) {
            this.setPhoneNumber(phoneNumber);
            this.changeLoading(true);

            return new Promise(async (resolve, reject) => {
                Axios.post('http://om-api-test.hiweb.ir/api/User/Login', {
                    mobileNo: phoneNumber
                }).then(({ data }) => {

                    Logger(data, 'Login');

                    if (data.hasError) {
                        this.setErrorMessage(data.error);
                        resolve(false);
                        return;
                    };

                    resolve(true);
                    this.changeLoading(false);
                }).catch(err => {
                    console.log('error', err);
                    this.changeLoading(false);
                });
            }).catch(error => console.warn(error));
        },

        async onLoginRole(code) {
            return new Promise(async (resolve, reject) => {
                Axios.post('http://om-api-test.hiweb.ir/api/User/Login/Verification', {
                    mobileNo: self.phoneNumber,
                    verificationCode: code,
                }).then(res => {
                    const data = res.data;
                    Logger(data, 'Verification');

                    if (data.hasError) {
                        this.setErrorMessage(data.error);
                        resolve(false);
                        return;
                    };
                    localStorage.setItem('@token', data.data.token);

                    resolve(data.data.active ? 'registered' : 'none');

                    this.setRoleId(data.data.userRoles);

                }).catch(error => {
                    console.log('errr', error)
                });
            }).catch(error => console.warn(error));

        },


        async registerUser(name, nCode, bCode) {
            // this.fillUserModel({
            //     ...self.userModel,
            //     fullName: name,
            //     stockholderType: 1,
            //     exchangeCode: bCode,
            //     nationalCode: nCode,
            //     registrationNo: ""
            // });
            return new Promise(async (resolve, reject) => {

                request.post('/User/User/Register', {
                    fullName: name,
                    mobileNumber: self.phoneNumber,
                    stockholderType: 1,
                    exchangeCode: bCode,
                    nationalCode: nCode,
                    registrationNo: null
                }, {}, false).then(res => {
                    const data = res.data;
                    Logger(data, 'register');
                    if (data.hasError) {
                        this.setErrorMessage(data.error);
                        resolve(false);
                        return;
                    };
                    resolve(true);
                }).catch(err => {
                    console.log('erroe', err);
                    resolve(false);
                });
            }).catch(erro => console.log('erro', erro));
        },


        setRoleId(data) {
            if (data.length !== 2) {
                self.roleId = data[0].roleId;
            } else {
                self.roleId = 3;
            }
        },
        setPhoneNumber(phone) {
            self.phoneNumber = phone;
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

export const AuthStore = authStore.create();
