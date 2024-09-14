import Link from 'next/link';

const BtnSecondary = ({ children, href, className }) => {
  return (
    <Link href={href} passHref>
      <button
        className={`px-4 py-2 rounded-[10px] text-black bg-white  hover:bg-gray-100 focus:outline-none ${className}`}
      >
        {children}
      </button>
    </Link>
  );
};

export default BtnSecondary;
