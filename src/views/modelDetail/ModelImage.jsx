import React,{useState} from 'react';
import styles from './ModelImage.module.css'



const img = [
  'https://static.hyundailivart.co.kr/upload_mall/goods/P200161208/GM43130402_img.jpg/dims/resize/x610/optimize',
  'https://static.hyundailivart.co.kr/upload_mall/goods/P200161208/GM43130403_img.jpg/dims/resize/x610/optimize',
  'https://static.hyundailivart.co.kr/upload_mall/goods/P200161208/GM43130404_img.jpg/dims/resize/x610/optimize',
  'https://static.hyundailivart.co.kr/upload_mall/goods/P200161208/GM43130405_img.jpg/dims/resize/x610/optimize'
]

const ModelImage = () => {
  const [mainImage, setMainImage] = useState(img[0]);


  return (
    <div className={styles.container}>
        <div className={styles.modelImage}>
            {img.map((img,index) => 
              <img 
              src ={img} 
              key = {index}
              onClick={() => setMainImage(img)}
              /> 
            )}
        </div>
        <div className={styles.modelMainImg}>
            <img src={mainImage} alt='' ></img>
            <span className={styles.bestSeller}>Best Seller</span>
        </div>
    </div>
  );
};

export default ModelImage;