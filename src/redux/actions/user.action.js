import { createAction } from "@reduxjs/toolkit";
import { REQUEST, USER_ACTION } from "../constants";

export const loginAction = createAction(REQUEST(USER_ACTION.LOGIN));
export const logoutAction = createAction(REQUEST(USER_ACTION.LOGOUT));
export const registerAction = createAction(REQUEST(USER_ACTION.REGISTER));
export const getUserInfoAction = createAction(
  REQUEST(USER_ACTION.GET_USER_INFO)
);
export const getUserListAction = createAction(
  REQUEST(USER_ACTION.GET_USER_LIST)
);

export const editUserProfileAction = createAction(
  REQUEST(USER_ACTION.EDIT_USER_PROFILE)
);
export const editUserListAction = createAction(REQUEST(USER_ACTION.EDIT_USER));
