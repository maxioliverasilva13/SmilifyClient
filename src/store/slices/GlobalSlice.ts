import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

const initialState: any = {
  userInfo: null,
  loading: false,
  loginError: false,
};

export const GlobalSlice = createSlice({
  name: "GlobalSlice",
  initialState,
  reducers: {
    setUserInfo(state, { payload }) {
      state.userInfo = payload;
    },
    setLoading(state, { payload }) {
      state.loading = payload;
    },
    setLoginError(state, { payload }) {
      state.loginError = payload;
    },
  },
  extraReducers: {},
});

export const useGlobalActions = () => {
  const dispatch = useDispatch();

  const handleSetUserInfo = (userInfo: any) => {
    dispatch(GlobalSlice.actions.setUserInfo(userInfo));
  };

  const handleChangeLoading = (val: boolean) => {
    dispatch(GlobalSlice.actions.setLoading(val));
  };

  const handleChangeLoginError = (val: boolean) => {
    dispatch(GlobalSlice.actions.setLoginError(val));
  };

  return {
    handleChangeLoading,
    handleChangeLoginError,
    handleSetUserInfo,
  };
};

export default GlobalSlice.reducer;
