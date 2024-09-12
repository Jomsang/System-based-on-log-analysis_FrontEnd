import React,{useEffect,useState} from 'react';
import styles from './ModelImage.module.css'
import axios from 'axios';
// import { insertLike } from './api'; // api.js 파일의 함수 import



// const img = [
//   'https://static.hyundailivart.co.kr/upload_mall/goods/P200161208/GM43130402_img.jpg/dims/resize/x610/optimize',
//   'https://static.hyundailivart.co.kr/upload_mall/goods/P200161208/GM43130403_img.jpg/dims/resize/x610/optimize',
//   'https://static.hyundailivart.co.kr/upload_mall/goods/P200161208/GM43130404_img.jpg/dims/resize/x610/optimize',
//   'https://static.hyundailivart.co.kr/upload_mall/goods/P200161208/GM43130405_img.jpg/dims/resize/x610/optimize'
// ]

const ModelImage = ({product}) => {
  const [mainImage, setMainImage] = useState();
  const[posts, setPosts] = useState([]);


  return (
    <div className={styles.container}>
        <div className={styles.modelImage}>
            {/* {img.map((img,index) => 
              <img 
              src ={img} 
              key = {index}
              onClick={() => setMainImage({img})}
              /> 
            )} */}
        </div>
        <div className={styles.modelMainImg}>
            <img src={product.imagePath} alt={product.imageName} ></img>
            {/* <span className={styles.bestSeller}>Best Seller</span> */}
        </div>
    </div>
  );
};

export default ModelImage;