import React from 'react';

function Model({ product }) {
  const handleClick = (redirectUrl) => {
    window.location.href = redirectUrl;
  };

  return (
    <div style={{ border: '1px solid #ccc', margin: '10px', padding: '10px', width: '200px' }}>
      <img src={product.imageUrl} alt={product.name} style={{ width: '100%' }} onClick={() => handleClick(product.href)} />
      <h2>{product.name}</h2>
      <p>{product.price}</p>
      <p>{product.description}</p>
    </div>
  );
}

export default Model;