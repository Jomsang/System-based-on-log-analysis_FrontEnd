import React from 'react';
import Breadcrumb from './BreadCrumb';
import ModelImages from './ModelImages';
import ModelInfo from './ModelInfo';
import styles from './ModelDetail.module.css'; 

const ModelDetail = () => {
  return (
    <div className={styles.modelDetail}>
      {/* <h3>model Detail page</h3> */}
      <Breadcrumb />
      <div className={styles.modelContent}>
        <ModelImages />
        <ModelInfo />
      </div>
    </div>
  );
}

export default ModelDetail;