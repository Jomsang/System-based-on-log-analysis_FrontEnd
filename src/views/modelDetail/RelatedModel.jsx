import React from 'react';
// import ViewModel from './model';
import styles from './RelatedModel.module.css';
import AddShoppingCart from '@mui/icons-material/AddShoppingCart';


const RelatedModel = ({relatePrd}) => {
  const formatNumber = (value) => {
    return new Intl.NumberFormat('ko-KR').format(value);
  };
  const handleClick = (redirectUrl) => {
    window.location.href = redirectUrl;
  };
  return (
     <div className={styles.container}>
        <h1 style={{marginBottom:'20px'}}>관련 상품 </h1>
        <div className={styles.relatedModelList}>
        {relatePrd.map(product => (
           <div key={product.modelCode} className ={styles.Model}>
           <img src={product.imagePath} alt={product.modelName} style={{ marginRight:'50px', width: '300px', height:'70%'}} onClick={() => handleClick("/modelDetail/"+product.modelCode)} />
           <h2 style={{fontSize:'25px'}}>{product.modelName}</h2>
           <p style={{fontSize:'90%'}}>{product.modelDetail}</p>
           <div className={styles.descSection}>
             <span className={styles.currentPrice}>{formatNumber(product.cost)}</span>
             {/* <span className={styles.originalPrice}>$42</span> */}
             <AddShoppingCart fontSize='medium' sx={{ ml: 24 }}></AddShoppingCart>
           </div>
         </div>
        ))}
     </div>
   </div>
  );
};

export default RelatedModel;