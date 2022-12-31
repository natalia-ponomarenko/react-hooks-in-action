import React, { Suspense } from 'react';
import { useQuery } from 'react-query';
import PropTypes from 'prop-types';

export default function Avatar({ src, alt, fallbackSrc }) {
  return (
    <div className="user-avatar">
      <Suspense fallback={<img src={fallbackSrc} alt="Fallback Avatar" />}>
        <Img src={src} alt={alt} />
      </Suspense>
    </div>
  );
}

function Img({ src, alt }) {
  const { data: imgObject } = useQuery(
    src,
    () =>
      new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.src = src;
      }),
    { suspense: true }
  );
  return <img src={imgObject.src} alt={alt} />;
}

Avatar.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  fallbackSrc: PropTypes.string.isRequired,
}

Img.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
}


