import React from 'react';
import styles from './ModelList.module.css';
import GradeIcon from '@mui/icons-material/Grade';
import FavoriteIcon from '@mui/icons-material/Favorite';

function Model({ product }) {
  const handleClick = (redirectUrl) => {
    window.location.href = redirectUrl;
  };

  return (
    <div className={styles.defModel}>
      <div className={styles.imgContainer} style={{backgroundImage: `url(${product.imageUrl})`}} onClick={() => handleClick(product.href)}>
        {/* <img src={product.imageUrl} alt={product.name} className={styles.overImg} onClick={() => handleClick(product.href)} /> */}
        <FavoriteIcon className={styles.overImg} fontSize='large'></FavoriteIcon>
      </div>
      <div className={styles.prdName}>{product.name}</div>
      <div className={styles.prdPrice}>{product.price}</div>
      <div className={styles.starBox}>
        {Array.from({ length: 5 }, (_, index) => {
            const starIndex = index + 1;
            return (
            <GradeIcon
                key={starIndex}
                className={starIndex <= product.grade ? styles.filled : styles.unfilled}
            />
            );
        })}
      </div>
    </div>
  );
}

export default Model;