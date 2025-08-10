import React, { useState } from "react";

const products = [
  {
    id: 1,
    name: "Handwoven Basket",
    description: "Natural fiber basket perfect for storage or decoration.",
    price: "$45.00",
    image:
      "https://storage.googleapis.com/a1aa/image/5b2041d8-4e0f-462f-0a90-84b497b3f4b2.jpg",
  },
  {
    id: 2,
    name: "Ceramic Vase",
    description: "Hand-painted ceramic vase to brighten any room.",
    price: "$60.00",
    image:
      "https://storage.googleapis.com/a1aa/image/245b18cc-614b-4a15-35d4-d24d5fc7d12d.jpg",
  },
  {
    id: 3,
    name: "Leather Wallet",
    description: "Durable and stylish wallet crafted from genuine leather.",
    price: "$75.00",
    image:
      "https://storage.googleapis.com/a1aa/image/d1099427-d02c-4076-eda0-4d0020791ba4.jpg",
  },
  {
    id: 4,
    name: "Wool Scarf",
    description: "Cozy wool scarf perfect for chilly days.",
    price: "$55.00",
    image:
      "https://storage.googleapis.com/a1aa/image/1c92d07c-5bcd-4f77-49c0-f328ed03a749.jpg",
  },
];

const blogPosts = [
  {
    id: 1,
    title: "5 Tips for Caring Handmade Products",
    description:
      "Learn how to maintain and preserve the beauty of your handmade items with these simple tips.",
    image:
      "https://storage.googleapis.com/a1aa/image/456a7713-29fa-4894-28b0-a8977f599610.jpg",
  },
  {
    id: 2,
    title: "Artisan Spotlight: Meet Maria",
    description:
      "Discover the story behind Maria’s beautiful ceramic creations and her passion for art.",
    image:
      "https://storage.googleapis.com/a1aa/image/3357eecc-04ee-4fe7-013c-cf6e69e1757a.jpg",
  },
  {
    id: 3,
    title: "Sustainable Materials We Use",
    description:
      "Learn about the eco-friendly materials that make our products both beautiful and sustainable.",
    image:
      "https://storage.googleapis.com/a1aa/image/89977284-20a5-4d88-7036-2a56bac5e293.jpg",
  },
];

export default function HandartWebsite() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openModal = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className=" text-lime-300 font-roboto">
      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <h2 className="text-3xl font-bold font-playfair text-lime-300 mb-10 text-center">
          Featured Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
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

      {/* About Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="https://storage.googleapis.com/a1aa/image/9262dd53-43cd-4f47-7cc8-cfac4450869d.jpg"
              alt="Artisan crafting"
              className="rounded-lg shadow-lg w-full object-cover object-center"
            />
          </div>
          <div>
            <h2 className="text-3xl font-playfair font-bold text-lime-300 mb-6">
              Our Story
            </h2>
            <p className="text-lime-300 mb-6 leading-relaxed">
              At Handart, we believe in the beauty of handmade craftsmanship.
              Our artisans pour their heart and soul into every product,
              ensuring quality and uniqueness. We source sustainable materials
              and support local communities to bring you authentic artisanal
              goods.
            </p>
            <a
              href="#"
              className="inline-block bg-gray-900 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-gray-800 transition"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <h2 className="text-3xl font-playfair font-bold text-lime-300 mb-10 text-center">
          Latest from Our Blog
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover object-center"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-lime-300 mb-2">
                  {post.title}
                </h3>
                <p className="text-lime-300 mb-4 text-sm">
                  {post.description}
                </p>
                <a
                  href="#"
                  className="text-lime-300 font-semibold hover:underline"
                >
                  Read More →
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="border-2 rounded-lg shadow-lg max-w-md w-full p-6 relative">
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-lime-300 hover:text-lime-300 text-2xl"
              onClick={closeModal}
            >
              &times;
            </button>

            {/* Product Details */}
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
