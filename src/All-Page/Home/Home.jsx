import React from 'react';

import HomeSlaider from './HomeSlaider';
import HomeTree from './HomeTree';
import MoreFeaturedProducts from './moreProducts';
import AdditionalProductsWithImage from './productsWithImage';


const Home = () => {
  return (
    <div>
      <HomeSlaider/>
      <HomeTree/>
      <MoreFeaturedProducts />
      <AdditionalProductsWithImage />
  
    </div>
  );
};

export default Home;