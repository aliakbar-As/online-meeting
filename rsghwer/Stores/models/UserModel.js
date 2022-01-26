import { types, applySnapshot, getSnapshot } from 'mobx-state-tree';


export const UserModel = types.model('UserModel', {

    fullName: types.optional(types.string, ''),
    mobileNumber: types.maybeNull(types.string),
    stockholderType: types.optional(types.string, ''),
    exchangeCode: types.optional(types.string, ''),
    nationalCode: types.optional(types.string, ''),
    registrationNo: types.optional(types.string, ''),


});
