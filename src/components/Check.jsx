import React from 'react';
import { useSelector } from 'react-redux';

const Check = ({ data = [], heading }) => {
  const imageURL = useSelector((state) => state.filmaData.imageURL);

  return (
    <>
      <div className="container mx-auto my-10">
        <h2 className="text-xl lg:text-2xl font-bold mb-5 text-white capitalize">
          {heading}
        </h2>
        <div
          className="flex gap-4 overflow-x-scroll scroll-smooth scrollbar-hide"
          style={{
            whiteSpace: 'nowrap', // Ensures no wrapping of items
          }}
        >
          {data.map((d, index) => (
            <div
              key={index}
              className="h-full w-[250px] flex-shrink-0" // Prevent shrinking
            >
              <img
                src={imageURL + d?.poster_path}
                alt=""
                className="h-full w-full object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Check;
