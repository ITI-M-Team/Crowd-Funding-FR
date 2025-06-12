import React from 'react';

const ImageSliderComponent = ({ images }) => {
  return (
    <div className="w-full overflow-x-auto whitespace-nowrap">
      {images.map((img, index) => (
        <img
          key={index}
          src={img.image}
          alt={`Project ${index}`}
          className="inline-block w-64 h-40 object-cover rounded-xl mr-2"
        />
      ))}
    </div>
  );
};

export default ImageSliderComponent;