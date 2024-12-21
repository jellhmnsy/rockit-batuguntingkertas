import React from 'react';

// Card weapper dengan props
const Card = ({ children, title, variant = 'default' }) => {
  const cardStyles = {
    default: 'bg-white shadow-md rounded-lg p-4',
    // dark: 'bg-gray-800 border border-gray-700',
    feetured: 'bg-blue-50 shadow-lg rounded-lg p-4 border-2 border-blue-200',
    compact: 'bg-white shadow-sm rounded p-2',
  };

  return (
    <div className={cardStyles[variant]}>
      {title && <h2 className="text-lg font-semibold mb-2">{title}</h2>}
      {children}
    </div>
  );
};

const Product = ({ name, price, description, inStock, discountPercentage = 0, onAddTocart }) => {
  const discountedPrice = price * (1 - discountPercentage / 100);

  return (
    <Card variant={discountPercentage > 0 ? 'feetured' : 'default'} title={name}>
      <div className="space-y-2">
        {discountPercentage > 0 && ( <div className="text-green-600 font-bold">{discountPercentage}% OFF!</div>)}
          <div className="flex items-center gap-2">
            {discountPercentage > 0 ? (
              <>
                <span className="line-through text-gray-400">${price}</span>
                <span className="font-bold">${discountedPrice.toFixed(2)}</span>
              </>
            ) : (
              <span className="font-bold">${price}</span>
            )}
          </div>
          <p className="text-gray-630">{description}</p>

          <button onClick={onAddTocart} disabled={!inStock} className={`px-4 py-2 rounded ${inStock ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-300 cursor-not-allowed'}`}>
            {inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
    </Card>
  );
};

const ProductList = () => {
  const handleAddToCart = (productName) => {
    alert(`Product added ${productName} to cart`);
  };

  return (
    <div className="space-y-4">
      <Product
        name="True Wireless Earbuds"
        price={9.99}
        description="Noise Cancelation, 40h Battery, Bluetooth 5.2"
        inStock={true}
        features={['Noise Cancelation', '40h Battery', 'Bluetooth 5.2']}
        discountPercentage={10}
        onAddTocart={handleAddToCart}
      />

      <Product
        name="Wireless Headphones"
        price={19.99}
        description="Noise Cancelation, 40h Battery, Bluetooth 5.2"
        inStock={false}
        features={['Noise Cancelation', '40h Battery', 'Bluetooth 5.2']}
        discountPercentage={0}
        onAddTocart={handleAddToCart}
      />

      <Card variant="compact">
        <p className="text-sm text-gray-500">Free shipping on orders over $50</p>
      </Card>
    </div>
  );
};

export default ProductList;
