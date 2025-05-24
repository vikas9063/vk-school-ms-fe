import React from 'react';
import { Button } from 'flowbite-react';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router';

const HeadingComponent = ({ heading = "Heading", btnText, btnLink }) => {
  const navigate = useNavigate();

  return (
    <div className="my-5 flex items-center justify-between">
      <div className="flex gap-2 items-center">
        <Button
          size="xs"
          pill
          outline
          color="purple"
          onClick={() => navigate(-1)} 
          className='cursor-pointer'
        >
          <HiOutlineArrowLeft className="h-4 w-4" />
        </Button>
        <p className="text-violet-800 font-bold text-lg border-b">
          {heading} :
        </p>
      </div>

      {btnText && btnLink && (
        <Link to={btnLink}>
          <Button size="sm" color="purple" className="cursor-pointer">
            {btnText}
          </Button>
        </Link>
      )}
    </div>
  );
};

export default HeadingComponent;
