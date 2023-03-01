import React, { useState } from 'react';

import { download } from '../assets';
import { downloadImage } from '../utils';

const Card = ({ _id, name, prompt, photo }) => {
  const [showPhotoPopup, setShowPhotoPopup] = useState(false);

  const handlePhotoClick = () => {
    setShowPhotoPopup(true);
  };

  const handlePopupClose = () => {
    setShowPhotoPopup(false);
  };

  return (
    <div className="rounded-xl group relative shadow-card hover:shadow-cardhover card">
      <img
        className="w-full h-auto object-cover rounded-xl cursor-pointer"
        src={photo}
        alt={prompt}
        onClick={handlePhotoClick}
      />
      {showPhotoPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={handlePopupClose}
          />
          <img
            className="max-h-full max-w-full object-contain w-5/6 h-5/6"
            src={photo}
            alt={prompt}
          />
   
        </div>
      )}
      <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md">
        <p className="text-white text-sm overflow-y-auto prompt">{prompt}</p>

        <div className="mt-5 flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold">{name[0]}</div>
            <p className="text-white text-sm">{name}</p>
          </div>

          <button type="button" onClick={() => downloadImage(_id, photo)} className="outline-none bg-transparent border-none mt-2">
            <img src={download} alt="download" className="w-6 h-6 object-contain invert animate-bounce" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;



