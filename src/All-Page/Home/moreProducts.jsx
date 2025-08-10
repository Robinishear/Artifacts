import React, { useState } from "react";

const moreProducts = [
  {
    id: 1,
    name: "Jewelry Box",
    description: "Beautifully carved wooden box to keep your precious jewelry safe.",
    price: "$85.00",
    image: "https://storage.googleapis.com/a1aa/image/d45b36b0-d797-46ca-973e-2023b40efd83.jpg",
  },
  {
    id: 2,
    name: "Ceramic Mugs Set",
    description: "Set of 4 hand-painted mugs perfect for your morning coffee.",
    price: "$70.00",
    image: "https://storage.googleapis.com/a1aa/image/75a863e8-f3de-47e2-7936-fddf0d9ad468.jpg",
  },
  {
    id: 3,
    name: "Macrame Wall Hanging",
    description: "Elegant macrame wall art to add texture and warmth to your space.",
    price: "$65.00",
    image: "https://storage.googleapis.com/a1aa/image/94deea30-c869-457d-66e6-4c2093507dc5.jpg",
  },
  {
    id: 4,
    name: "Linen Table Runner",
    description: "Hand-dyed linen table runner to enhance your dining experience.",
    price: "$50.00",
    image: "https://storage.googleapis.com/a1aa/image/61d691ac-6e64-4644-234d-1a1ba578886c.jpg",
  },
  {
    id: 5,
    name: "Pottery Bowl",
    description: "Unique hand-thrown bowl perfect for serving or decoration.",
    price: "$40.00",
    image: "https://storage.googleapis.com/a1aa/image/105ffd42-aa2a-4494-7967-75543663d109.jpg",
  },
  {
    id: 6,
    name: "Soy Candles Set",
    description: "Set of 3 eco-friendly scented soy candles for a cozy atmosphere.",
    price: "$35.00",
    image: "https://storage.googleapis.com/a1aa/image/e5c89c3e-e5b2-4c4a-6b11-9147d2486367.jpg",
  },
  {
    id: 7,
    name: "Serving Tray",
    description: "Hand-painted wooden tray perfect for serving or decoration.",
    price: "$55.00",
    image: "https://storage.googleapis.com/a1aa/image/aae386be-bfa7-4837-808a-0abf89a19fd7.jpg",
  },
  {
    id: 8,
    name: "Leather Journal",
    description: "Hand-stitched journal perfect for notes, sketches, or journaling.",
    price: "$65.00",
    image: "https://storage.googleapis.com/a1aa/image/f057d1cb-2cda-4502-b0ac-9f5e99cab47e.jpg",
  },
];

export default function MoreFeaturedProducts() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openModal = (product) => setSelectedProduct(product);
  const closeModal = () => setSelectedProduct(null);

  return (
    <div className=" text-lime-300 font-roboto">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-20">
        <h2 className="text-3xl font-playfair font-bold text-lime-300 mb-10 text-center">
       
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {moreProducts.map((product) => (
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
      </section>

      {/* Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="border-2 rounded-lg shadow-lg max-w-md w-full p-6 relative">
            <button
              className="absolute top-2 right-2 text-lime-300 hover:text-lime-300 text-2xl"
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
