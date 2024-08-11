import React from 'react';
import styles from './ModelImage.module.css'

const ModelImage = () => {
  return (
    <div className={styles.container}>
        <div className={styles.modelImage}>
            <img src="https://static.hyundailivart.co.kr/upload_mall/goods/P200134639/GM43588581_img.jpg/dims/resize/x118/cropcenter/118x118/autorotate/on/optimize" alt="Thumbnail 1" />
            <img src="https://static.hyundailivart.co.kr/upload_mall/goods/P200134639/GM43588581_img.jpg/dims/resize/x118/cropcenter/118x118/autorotate/on/optimize" alt="Thumbnail 2" />
            <img src="https://static.hyundailivart.co.kr/upload_mall/goods/P200134639/GM43588581_img.jpg/dims/resize/x118/cropcenter/118x118/autorotate/on/optimize" alt="Thumbnail 3" />
            <img src="https://static.hyundailivart.co.kr/upload_mall/goods/P200134639/GM43588581_img.jpg/dims/resize/x118/cropcenter/118x118/autorotate/on/optimize" alt="Thumbnail 4" />
        </div>
        <div className={styles.modelMainImg}>
            <img src='https://static.hyundailivart.co.kr/upload_mall/view/V000000005/D100000453/P000000444_S100015194.jpg?20240717095037' alt='' ></img>
            {/* <span className={styles.bestSeller}>Best Seller</span> */}
        </div>
    </div>
  );
};

export default ModelImage;