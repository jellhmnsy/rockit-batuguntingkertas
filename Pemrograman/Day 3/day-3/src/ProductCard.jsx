import React from "react";

const ProductCard = () => {
    // Sample product data, biasanya dari API, tapi kita buat statis dulu
    const product = {
        name: "True Wireless Earbuds",
        price: 9.99,
        inStock: false,
        features: ["Noise Cancelation", "40h Battery", "Bluetooth 5.2"],
        image: "https://via.placeholder.com/150",
    };

    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg p-4">
            {/* Pemanggilan Variable */}
            <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
    
            {/* Pemanggilan variable menggunakan ${} */}
            <p className="text-gray-700 mb-2">Price: ${product.price.toFixed(2)}</p>
    
            {/* Penggunaan style inline */}
            <p className="text-sm" style={{backgroundColor: product.inStock ? "green" : "red"}}>Status: {product.inStock ? "In Stock" : "Out of Stock"}</p>
    
            {/* Contoh list rendering */}
            <ul className="mt-4">
                {product.features.map((feature, index) => (
                    <li key={index} className="text-gray-600">
                        {feature}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductCard;

