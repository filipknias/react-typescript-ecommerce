import { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import commerce from '../lib/commerce';
import { Product as ProductType } from '@chec/commerce.js/types/product';
import ProductButton from '../components/Product/ProductButton';

const stripHtml = (html: string): string => {
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};

const Product: FC = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<ProductType|null>(null);
  const [fetchingProduct, setFetchingProduct] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;
      setFetchingProduct(true);
      const data = await commerce.products.retrieve(productId);
      setProduct(data);
      setFetchingProduct(false);
    };
    fetchProduct();
  }, []);

  return (
    <div className="h-full my-10 lg:my-0 flex flex-col gap-16">
      {fetchingProduct ? (
        <div className="flex flex-col items-center justify-center gap-2 h-full">
          <div className="lds-dual-ring"></div>
        </div>
      ) : (
        <>
          {product !== null && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <img 
                src={product.image ? product.image.url : ""} 
                alt={product.name} 
                className="w-72 h-72 lg:w-96 lg:h-96 mx-auto object-contain select-none flex-1" 
              />
              <div className="flex-1 flex flex-col items-start justify-between gap-10">
                <div className="flex flex-col gap-8 lg:gap-5">
                  <h1 className="font-medium text-2xl lg:text-3xl">{product.name}</h1>
                  <div className="flex flex-col gap-3">
                    <h4 className="font-medium text-xl">Description</h4>
                    <p className="font-light text-lg break-all">{stripHtml(product.description)}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <ProductButton productId={product.id} quantity={quantity} />
                  <input 
                    type="number"
                    className="bg-gray-200 bg-opacity-20 w-14 text-center text-lg border-2 border-gray-300 rounded-sm focus:border-blue-300 outline-none"
                    min="1"
                    required
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                  />
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Product;