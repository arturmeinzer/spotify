import PropTypes from "prop-types";

// eslint-disable-next-line import/prefer-default-export
export const PROP_TYPE_ARTIST = PropTypes.shape({
    href: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.shape({
        height: PropTypes.number,
        width: PropTypes.number,
        url: PropTypes.string,
    })),
    name: PropTypes.string,
    id: PropTypes.string,
    genres: PropTypes.arrayOf(PropTypes.string),
    followers: PropTypes.shape({
        href: PropTypes.string,
        total: PropTypes.number,
    }),
    popularity: PropTypes.number,
});
