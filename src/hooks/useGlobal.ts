import { useSelector } from "react-redux";
import { useGlobalActions } from "src/store/slices/GlobalSlice";

const useGlobal = () => {
  const { userInfo, loading, loginError } = useSelector(
    (state: any) => state.GlobalSlice
  );
  const {
    handleSetUserInfo,
    handleChangeLoading,
    handleChangeLoginError,
  } = useGlobalActions();

  return {
    loginError,
    userInfo,
    loading,
    handleSetUserInfo,
    handleChangeLoading,
    handleChangeLoginError,
  };
};

export default useGlobal;
