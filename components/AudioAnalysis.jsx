import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { PROP_TYPES_ANALYSIS } from "../constants/propTypes";
import AudioAnalysisItem from "./AudioAnalysisItem";
import { secondsToMinutes } from "../utils/TimeConverter";

const translateKey = (key) => {
    switch (key) {
    case 0: return "C";
    case 1: return "C#";
    case 2: return "D";
    case 3: return "D#";
    case 4: return "E";
    case 5: return "F";
    case 6: return "F#";
    case 7: return "G";
    case 8: return "G#";
    case 9: return "A";
    case 10: return "A#";
    case 11: return "B";
    default: return "";
    }
};

const AudioAnalysis = ({ audioAnalysis }) => (
    <Box
        sx={{
            display: "grid",
            gap: "1px",
            gridTemplateColumns: {
                xs: "repeat(2, 1fr)",
                sm: "repeat(4, 1fr)",
                md: "repeat(6, 1fr)",
            },
        }}
    >
        <AudioAnalysisItem title="Duration" value={secondsToMinutes(audioAnalysis.track.duration)} />
        <AudioAnalysisItem title="Fade In (End)" value={secondsToMinutes(audioAnalysis.track.end_of_fade_in)} />
        <AudioAnalysisItem title="Fade Out (Start)" value={secondsToMinutes(audioAnalysis.track.start_of_fade_out)} />
        <AudioAnalysisItem title="Time Signature" value={audioAnalysis.track.time_signature} />
        <AudioAnalysisItem title="Key" value={translateKey(audioAnalysis.track.key)} />
        <AudioAnalysisItem title="Modality" value={audioAnalysis.track.mode === 1 ? "Major" : "Minor"} />
        <AudioAnalysisItem title="Tempo (BMP)" value={Math.round(audioAnalysis.track.tempo)} />
        <AudioAnalysisItem title="Bars" value={audioAnalysis.bars.length} />
        <AudioAnalysisItem title="Beats" value={audioAnalysis.beats.length} />
        <AudioAnalysisItem title="Sections" value={audioAnalysis.sections.length} />
        <AudioAnalysisItem title="Segments" value={audioAnalysis.segments.length} />
        <AudioAnalysisItem title="Tatums" value={audioAnalysis.tatums.length} />
    </Box>
);

AudioAnalysis.propTypes = {
    audioAnalysis: PropTypes.shape({
        track: PropTypes.shape({
            duration: PropTypes.number,
            key: PropTypes.number,
            tempo: PropTypes.number,
            time_signature: PropTypes.number,
            mode: PropTypes.number,
            end_of_fade_in: PropTypes.number,
            start_of_fade_out: PropTypes.number,
        }),
        bars: PropTypes.arrayOf(PROP_TYPES_ANALYSIS),
        beats: PropTypes.arrayOf(PROP_TYPES_ANALYSIS),
        sections: PropTypes.arrayOf(PROP_TYPES_ANALYSIS),
        segments: PropTypes.arrayOf(PROP_TYPES_ANALYSIS),
        tatums: PropTypes.arrayOf(PROP_TYPES_ANALYSIS),
    }).isRequired,
};

export default AudioAnalysis;
