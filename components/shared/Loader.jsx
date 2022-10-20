import React from "react";
import { Audio } from "react-loader-spinner";
import CenterContainer from "../UI/CenterContainer";

const Loader = () => (
    <CenterContainer>
        <Audio
            height={80}
            width={80}
            radius={9}
            color="green"
            ariaLabel="loading"
        />
    </CenterContainer>
);

export default Loader;
