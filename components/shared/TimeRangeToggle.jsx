import React from "react";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import PropTypes from "prop-types";
import {
    TIME_RANGE_LONG_TERM,
    TIME_RANGE_MEDIUM_TERM,
    TIME_RANGE_SHORT_TERM,
} from "../../constants/timeRange";

const TimeRangeToggle = ({ timeRange, onChange }) => (
    <ToggleButtonGroup
        color="primary"
        exclusive
        value={timeRange}
        onChange={(event, newTimeRange) => onChange(newTimeRange)}
    >
        <ToggleButton value={TIME_RANGE_LONG_TERM}>All Time</ToggleButton>
        <ToggleButton value={TIME_RANGE_MEDIUM_TERM}>Last 6 Months</ToggleButton>
        <ToggleButton value={TIME_RANGE_SHORT_TERM}>Last 4 Weeks</ToggleButton>
    </ToggleButtonGroup>
);

TimeRangeToggle.propTypes = {
    timeRange: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default TimeRangeToggle;
