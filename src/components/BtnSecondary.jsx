import PropTypes from 'prop-types';
import Link from 'next/link';

const BtnSecondary = ({ children, href, className }) => {
  return (
    <Link href={href} passHref>
      <button
        className={`px-4 py-2 rounded-[10px] text-black bg-white  hover:bg-gray-100 text-white focus:outline-none ${className}`}
      >
        {children}
      </button>
    </Link>
  );
};

BtnSecondary.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
  className: PropTypes.string,
};

BtnSecondary.defaultProps = {
  className: '',
};

export default BtnSecondary;
