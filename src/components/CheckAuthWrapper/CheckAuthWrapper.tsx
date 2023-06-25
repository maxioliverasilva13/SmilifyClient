import { useRouter } from "next/router";
import { useEffect } from "react";
import useGlobal from "src/hooks/useGlobal";
import { useCurrentUserQuery } from "src/store/services/UserService";
import appRoutes from "src/utils/appRoutes";
import { getToken } from "src/utils/prepareHeaders";
import GlobalSpinner from "../Spinner/GlobalSpinner";

interface props {
    children: any;
}

const CheckAuthWrapper = ({children}: props) => {

    const { push, pathname } = useRouter();
    const { data: userInfoData, isLoading, isError } = useCurrentUserQuery({});
    const { handleSetUserInfo, userInfo, loading } = useGlobal();

    const isInPublicPath = pathname === appRoutes.login() || pathname === appRoutes.register();

    const handleCheckUserTokenAndInfo = () => {
        const token = getToken();
        if (!token && !isInPublicPath) {
            push(appRoutes.login());
        }
        if (userInfoData) {
            handleSetUserInfo(userInfoData);
        }
    }

    useEffect(() => {
        if (!isLoading && !userInfo) {
            handleCheckUserTokenAndInfo();
        }
    }, [isLoading, userInfo]);

    useEffect(() => {
        if (userInfoData && isInPublicPath) {
            push(appRoutes.index())
        }
    }, [userInfoData])

    useEffect(() => {
        if (isError && !loading && !isInPublicPath) {
            push(appRoutes.login())
            
        }
    }, [isError, loading])

    if (((isError && !isInPublicPath))) {
        return <GlobalSpinner />
    }

    return <>
        {isLoading || loading && <GlobalSpinner />}
        {children}
    </>;
}


export default CheckAuthWrapper;