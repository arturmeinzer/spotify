import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import SpotifyDataFetcher from "../utils/SpotifyDataFetcher";
import Loader from "../components/shared/Loader";

export default (WrappedComponent) => (props) => {
    const shouldCheck = useRef(true);
    const redirecting = useRef(false);
    const [isAuth, setIsAuth] = useState(null);
    const router = useRouter();

    useEffect(() => {
        if (shouldCheck.current) {
            shouldCheck.current = false;
            const dataFetcher = new SpotifyDataFetcher();
            const newIsAuth = dataFetcher.hasLocalAccessToken();
            setIsAuth(newIsAuth);

            if (!newIsAuth) {
                redirecting.current = true;
                router.push("/");
            }
        }
    }, [router]);

    if (isAuth && !redirecting.current) {
        return <WrappedComponent {...props} />;
    }

    return <Loader />;
};
