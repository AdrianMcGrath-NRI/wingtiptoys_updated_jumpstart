import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { productsApi } from '../api/products';
import { categoriesApi } from '../api/categories';
import { useState } from 'react';
import { useCart } from '../contexts/CartContext';

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>();
  const { addToCart } = useCart();

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: categoriesApi.getAll,
  });

  const { data: products, isLoading } = useQuery({
    queryKey: ['products', selectedCategory],
    queryFn: () => productsApi.getAll(selectedCategory),
  });

  const handleAddToCart = async (productId: number) => {
    try {
      await addToCart(productId, 1);
      alert('Product added to cart!');
    } catch (error) {
      alert('Failed to add product to cart');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Products</h1>

        {/* Category filter */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Category
          </label>
          <select
            value={selectedCategory || ''}
            onChange={(e) => setSelectedCategory(e.target.value ? Number(e.target.value) : undefined)}
            className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Categories</option>
            {categories?.map((category) => (
              <option key={category.categoryId} value={category.categoryId}>
                {category.categoryName}
              </option>
            ))}
          </select>
        </div>

        {/* Products grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products?.map((product) => (
              <div key={product.productId} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-w-1 aspect-h-1 bg-gray-200 flex items-center justify-center">
                  {product.imagePath ? (
                    <img
                      src={product.imagePath}
                      alt={product.productName}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="text-gray-400">No image</div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {product.productName}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {product.description || 'No description available'}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-blue-600">
                      ${product.unitPrice?.toFixed(2) || '0.00'}
                    </span>
                    <div className="flex gap-2">
                      <Link
                        to={`/products/${product.productId}`}
                        className="px-4 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Details
                      </Link>
                      <button
                        onClick={() => handleAddToCart(product.productId)}
                        className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && products?.length === 0 && (
          <div className="text-center py-12 text-gray-600">
            No products found in this category.
          </div>
        )}
      </div>
    </div>
  );
}
