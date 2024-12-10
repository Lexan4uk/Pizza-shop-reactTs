import { atom } from 'recoil';

export const isAuthorisedState = atom({
  key: 'isAuthorisedState',
  default: false,
});
export const isUserFetchingState = atom({
  key: 'isUserFetchingState',
  default: false
})