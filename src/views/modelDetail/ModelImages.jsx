import React, { useState } from 'react';
import styles from './ModelDetail.module.css'; 

const ModelImages = () => {
  const [mainImage, setMainImage] = useState('image1.jpg');

  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageColumn}>
        <img src="https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQ9Xm86m8rfAOiOT0uSVIau6MWG6p7cDBVhEYmHz5aOmyeBUIutcwW3DUQFL4Pe4tnFhpwP7ubgYM9PPS8EJoYnZ0pYxj-7VM78k9iS9up2qnF3oX2N92Kt_W16GtiOO5AyBi_cgg&usqp=CAc" alt="Thumbnail 1" onClick={() => handleThumbnailClick('image1.jpg')} />
        <img src="https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQ9Xm86m8rfAOiOT0uSVIau6MWG6p7cDBVhEYmHz5aOmyeBUIutcwW3DUQFL4Pe4tnFhpwP7ubgYM9PPS8EJoYnZ0pYxj-7VM78k9iS9up2qnF3oX2N92Kt_W16GtiOO5AyBi_cgg&usqp=CAc" alt="Thumbnail 2" onClick={() => handleThumbnailClick('image2.jpg')} />
        <img src="https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQ9Xm86m8rfAOiOT0uSVIau6MWG6p7cDBVhEYmHz5aOmyeBUIutcwW3DUQFL4Pe4tnFhpwP7ubgYM9PPS8EJoYnZ0pYxj-7VM78k9iS9up2qnF3oX2N92Kt_W16GtiOO5AyBi_cgg&usqp=CAc" alt="Thumbnail 3" onClick={() => handleThumbnailClick('image3.jpg')} />
        <img src="https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQ9Xm86m8rfAOiOT0uSVIau6MWG6p7cDBVhEYmHz5aOmyeBUIutcwW3DUQFL4Pe4tnFhpwP7ubgYM9PPS8EJoYnZ0pYxj-7VM78k9iS9up2qnF3oX2N92Kt_W16GtiOO5AyBi_cgg&usqp=CAc" alt="Thumbnail 4" onClick={() => handleThumbnailClick('image4.jpg')} />
      </div>
      <div>
        <img src="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRv4_DnCahgWm1PJt5hpdZLksFCMgsiMwTIEPg4KIlucDOTl7QcSYykNBxVRaIAk2RDaup8Ru2IyrifJqkx46a6eDw-iqSK1lqXCxuGR1tq0hOrf8OMaf9W4g&usqp=CAc" alt="Main Product" className={styles.mainImage} />
      </div>
    </div>
  );
}

export default ModelImages;
