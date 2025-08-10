import React, { useState } from "react";

const productsWithImage = [
  {
    id: 1,
    name: "Wooden Spoon Set",
    description: "Set of 3 hand-painted wooden spoons perfect for cooking and serving.",
    price: "$30.00",
    image: "https://storage.googleapis.com/a1aa/image/f057d1cb-2cda-4502-b0ac-9f5e99cab47e.jpg",
  },
  {
    id: 2,
    name: "Cotton Throw Blanket",
    description: "Soft and cozy handwoven cotton blanket for your living room or bedroom.",
    price: "$90.00",
    image: "https://storage.googleapis.com/a1aa/image/aae386be-bfa7-4837-808a-0abf89a19fd7.jpg",
  },
  {
    id: 3,
    name: "Ceramic Pitcher",
    description: "Handmade ceramic pitcher perfect for serving beverages or as decor.",
    price: "$65.00",
    image: "https://storage.googleapis.com/a1aa/image/e5c89c3e-e5b2-4c4a-6b11-9147d2486367.jpg",
  },
  {
    id: 4,
    name: "Woven Rattan Chair",
    description: "Stylish and comfortable rattan chair handcrafted by skilled artisans.",
    price: "$180.00",
    image: "https://storage.googleapis.com/a1aa/image/105ffd42-aa2a-4494-7967-75543663d109.jpg",
  },
];

export default function AdditionalProductsWithImage() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openModal = (product) => setSelectedProduct(product);
  const closeModal = () => setSelectedProduct(null);

  return (
    <div className=" text-lime-300 font-roboto">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-20">
        <h2 className="text-3xl font-playfair font-bold text-lime-300 mb-10 text-center">
       
        </h2>

        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
          {/* Left Image */}
          <div className="w-full lg:w-1/3 rounded-lg overflow-hidden shadow-lg">
            <img
              src="https://storage.googleapis.com/a1aa/image/d2b31067-c428-470f-2c65-b7b5a66ca1db.jpg"
              alt="Artisan crafting a beautiful handmade wooden product with hand tools in a warm workshop"
              className="w-full h-auto object-cover object-center"
            />
          </div>
          
          {/* Products Grid */}
          <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {productsWithImage.map((product) => (
              <article
                key={product.id}
                className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover object-center"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-lime-300 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-lime-300 mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lime-300 font-bold text-lg">
                      {product.price}
                    </span>
                    <button
                      aria-label={`Add ${product.name} to cart`}
                      onClick={() => openModal(product)}
                      className="text-white bg-gray-900 px-4 py-2 rounded hover:bg-gray-800 transition"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="border-2 rounded-lg shadow-lg max-w-md w-full p-6 relative">
            {/* <button
              className="absolute top-2 right-2 text-gray-600 hover:text-lime-300 text-2xl"
              onClick={closeModal}
              aria-label="Close modal"
            >
              &times;
            </button> */}
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-lime-300 text-2xl"
              onClick={closeModal}
              aria-label="Close modal"
            >
              &times;
            </button>

            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <h3 className="text-2xl font-bold text-lime-300 mb-2">
              {selectedProduct.name}
            </h3>
            <p className="text-lime-300 mb-4">{selectedProduct.description}</p>
            <span className="text-lime-300 font-bold text-lg">
              {selectedProduct.price}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
