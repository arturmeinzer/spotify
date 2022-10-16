import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";

const AppLink = ({ href, as, children }) => (
    <Link href={href} as={as} passHref>
        <a href="/replace">
            {children}
        </a>
    </Link>
);

AppLink.propTypes = {
    href: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    as: PropTypes.string,
};

AppLink.defaultProps = {
    as: null,
};

export default AppLink;
