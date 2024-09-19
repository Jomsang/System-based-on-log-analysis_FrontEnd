import React, { useState, useEffect } from 'react';
import styles from './ModelList.module.css';
import ViewModel from './model';
import { getModelList, getSearchModel } from 'apis/modelListApi';
import { useLocation } from 'react-router-dom';

const ModelList = ({logOn}) => {
  const [livartModel, setLivartModel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  // 쿼리 파라미터 파싱
  const params = new URLSearchParams(location.search);
  const searchKeyword = params.get('searchKeyword');


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

  const searchLivartModel = async (searchKeyword) => {
    try {
      // HEADER에서 가구 검색 시 API 호출
      const response = await getSearchModel(searchKeyword);
      // 성공 시 livartModel에 데이터 저장
      setLivartModel(response);
    } catch (err) {
      setError(err);
      console.error("API 통신 중 오류 발생:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('ModelList - logOn', logOn);
    if (searchKeyword) {
      console.log('useEffect - searchKeyword', searchKeyword);
      searchLivartModel(searchKeyword);
    } else {
      fetchLivartModel();
    }
  }, [searchKeyword]);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={styles.container}>
      {livartModel.length !== 0?
        <div className={styles.productList}>
          {livartModel.map(product => (
            <ViewModel key={product.modelCode} product={product} logOn={logOn} />
          ))}
        </div>
        :
        <div className={styles.emptyProductList}>
          <h1>찾고자 하는 상품이 없습니다..&#128514;</h1>
        </div>
      }

    </div>
  );
};

export default ModelList;