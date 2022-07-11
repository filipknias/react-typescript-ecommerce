import { FC, useState, useEffect } from 'react';
import commerce from '../lib/commerce';
import { Product } from '@chec/commerce.js/types/product';
import ProductCard from '../components/Product/ProductCard';

const Home: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [fetchingProducts, setFetchingProducts] = useState<boolean>(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setFetchingProducts(true);
      const { data } = await commerce.products.list();
      setProducts(data);
      setFetchingProducts(false);
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col gap-10 h-full">
      {fetchingProducts ? (
        <div className="flex flex-col items-center justify-center gap-2 h-full">
          <div className="lds-dual-ring"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10 sm:gap-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Home;