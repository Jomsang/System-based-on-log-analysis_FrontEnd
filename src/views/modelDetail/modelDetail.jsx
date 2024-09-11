import React,{useEffect,useState} from 'react';
import { useParams } from 'react-router-dom';
import BreadCrumb from './BreadCrumb';
import ModelImages from './ModelImage';
// import ModelInfo from './ModelInfo';
import styles from './ModelDetail.module.css'; 
import ProductInfo from './ProductInfo';
import RelatedModel from './RelatedModel';
import axios from 'axios';


const ModelDetail = () => {
  const { mdlCd } = useParams();
  const[product, setProduct] = useState([]);
  useEffect(() => {
    if(mdlCd) {
      axios
        .get(`http://localhost:8080/modelDetail/${mdlCd}`)
        .then(response => {
          setProduct(response.data);
          console.log(response.data);	
        })
        .catch(error => {
          console.error('Error fetching product info:', error);
        })
      }
    },[mdlCd]);
  return (
    
    <div className={styles.modelDetail}>
      <BreadCrumb product={product}/>
      <div className={styles.modelContent}>
        <ModelImages product={product}/>
        <ProductInfo product={product}/>
      </div>
      <div>
        <RelatedModel />
      </div>
    </div>
    // <div>
    //   {posts.map(post=>(
    //     <li>{post.mdlCd}</li>
    //   ))}
    // </div>
  );
}

export default ModelDetail;