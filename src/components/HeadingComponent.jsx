import React from 'react';
import { Button } from 'flowbite-react';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router';

const HeadingComponent = ({ heading = "Heading", btnText, btnLink }) => {
  const navigate = useNavigate();

  return (
    <div className=" flex items-center justify-between">
      <div className="flex gap-2 items-center">
        <Button
          size="xs"
          pill
          color="purple"
          onClick={() => navigate(-1)}
          className='hover:bg-violet-700'
        >
          <HiOutlineArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-violet-800 font-bold text-lg border-b border-violet-300">
          {heading}
        </h2>
      </div>

      {btnText && btnLink && (
        <Link to={btnLink}>
          <Button size="sm" color="purple" className="hover:bg-violet-700">
            {btnText}
          </Button>
        </Link>
      )}
    </div>
  );
};

export default HeadingComponent;
