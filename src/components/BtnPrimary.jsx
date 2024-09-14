// src/components/Button.js
import PropTypes from 'prop-types';
import Link from 'next/link';

const BtnPrimary = ({ children, href, className }) => {
  return (
    <Link href={href} passHref>
      <button
        className={`px-4 py-2 rounded-[10px] text-base bg-black  hover:bg-slate-800 text-white focus:outline-none ${className}`}
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
