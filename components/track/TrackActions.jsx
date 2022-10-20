import React, { useContext } from "react";
import PropTypes from "prop-types";
import Stack from "@mui/material/Stack";
import MenuContext from "../../context/MenuContext";

const TrackActions = ({ actions }) => {
    const contextMenuItems = useContext(MenuContext);
    const allActions = [
        ...contextMenuItems,
        ...actions,
    ];

    return (
        <Stack flexDirection="row" justifyContent="flex-end">
            { allActions }
        </Stack>
    );
};

TrackActions.propTypes = {
    actions: PropTypes.arrayOf(PropTypes.node),
};

TrackActions.defaultProps = {
    actions: [],
};

export default TrackActions;
