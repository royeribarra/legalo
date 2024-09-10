// src/components/Button.js
import PropTypes from 'prop-types';
import Link from 'next/link';

const BtnPrimary = ({ children, href, className }) => {
  return (
    <Link href={href} passHref>
      <button
        className={`px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none ${className}`}
      >
        {children}
      </button>
    </Link>
  );
};

BtnPrimary.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
  className: PropTypes.string,
};

BtnPrimary.defaultProps = {
  className: '',
};

export default BtnPrimary;
