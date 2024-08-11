import React from 'react';
import ViewModel from './model';
import styles from './RelatedModel.module.css';


const RelatedModel = () => {
    const relatedModelList =[
        {
            id: 1,
            name: '리바트 침대',
            price: '431000',
            description: '쓸데없이 비싼 리바트 침대입니다.',
            imageUrl: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQ9Xm86m8rfAOiOT0uSVIau6MWG6p7cDBVhEYmHz5aOmyeBUIutcwW3DUQFL4Pe4tnFhpwP7ubgYM9PPS8EJoYnZ0pYxj-7VM78k9iS9up2qnF3oX2N92Kt_W16GtiOO5AyBi_cgg&usqp=CAc',
            href: 'https://www.hyundailivart.co.kr/p/P200093495?la_gc=TR10200705877&la_src=sa&la_cnfg=7332966&gad_source=1&gclid=Cj0KCQjwwae1BhC_ARIsAK4JfrzLcNXCLgn53NBMycxhjTD8Gz34lJVi-58C15e5Rui2Gtn_Qgr4SOoaAr0gEALw_wcB'
          },
          {
            id: 2,
            name: '리바트 소파',
            price: '808000',
            description: '침대보다 더 비싼 리바트 소파 등장!',
            imageUrl: 'data:image/webp;base64,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',
            href: 'https://www.hyundailivart.co.kr/p/P200183507?la_gc=TR10200705877&la_src=sa&la_cnfg=7332966&gad_source=1&gclid=Cj0KCQjwwae1BhC_ARIsAK4JfrxDJqkB6_WWX-oJQLcMmjqhIn5z9XDxCM22P24FMxZjGKU0joa07V8aAraxEALw_wcB'
          },
          {
            id: 3,
            name: '리바트 리클라이너 소파',
            price: '1764100',
            description: '이거 살거면 다른 소파를 사겠다! 거의 200만원!!',
            imageUrl: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRv4_DnCahgWm1PJt5hpdZLksFCMgsiMwTIEPg4KIlucDOTl7QcSYykNBxVRaIAk2RDaup8Ru2IyrifJqkx46a6eDw-iqSK1lqXCxuGR1tq0hOrf8OMaf9W4g&usqp=CAc',
            href: 'https://www.hyundailivart.co.kr/p/P200168513?la_gc=TR10200705877&la_src=sa&la_cnfg=7332966&gad_source=1&gclid=Cj0KCQjwwae1BhC_ARIsAK4JfrxwsUhVCDUI4OFUU0xQQJwXexWWdUHUG-gZGiQ_1yoaIUXnCdDAVzQaAgz_EALw_wcB'
          },
          {
            id: 4,
            name: '리바트 식탁',
            price: '255000',
            description: '효범이가 사주면 좋을 것 같은 식탁',
            imageUrl: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSQMz4vq-Rdc3dW3B_bTnGJBB6YEZsLIfRM8azPmvPffdeemrFpouVywfzClzloFV4QSF2QNkiR3yxHJeY6MaA9cRxpzjRFK0XJlVJCRN8f&usqp=CAc',
            href: 'https://www.hyundailivart.co.kr/p/P100026616?la_gc=TR10200705877&la_src=sa&la_cnfg=7332966&gad_source=1&gclid=Cj0KCQjwwae1BhC_ARIsAK4JfrxiZCfHNwboTnOVhCuwPH82NSvhyo8Zt0wYqUYtDm9-jyDMr2o15LEaAnmNEALw_wcB'
          }
    ]
  return (
     <div className={styles.container}>
        <h1 style={{marginBottom:'20px'}}>Related products</h1>
        <div className={styles.relatedModelList}>
        {relatedModelList.map(product => (
            <ViewModel key={product.id} product={product} />
        ))}
     </div>
   </div>
  );
};

export default RelatedModel;