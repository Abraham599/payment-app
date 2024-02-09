import { atom } from "recoil";

export const userDataAtom = atom({
    key:'userDataAtom',
    default:{
        username:'',
        password:'',
        firstName:'',
        lastName:'',
        token:'',
    }
})

export const successAtom = atom({
    key:'successAtom',
    default:''
})