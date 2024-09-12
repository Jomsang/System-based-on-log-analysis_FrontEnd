import React, { useState, useEffect } from 'react';
import styles from './ModelList.module.css';
import ViewModel from './model';
import { getModelList } from 'apis/modelListApi';

const ModelList = () => {
  const [livartModel, setLivartModel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLivartModel = async () => {
      try {
        // API 호출
        const response = await getModelList();
        
        // 성공 시 livartModel에 데이터 저장
        setLivartModel(response);
      } catch (err) {
        setError(err);
        console.error("API 통신 중 오류 발생:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLivartModel();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={styles.container}>
        <div className={styles.productList}>
        {livartModel.map(product => (
          <ViewModel key={product.modelCode} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ModelList;