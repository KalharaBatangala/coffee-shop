import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import React from "react";
import { Great_Vibes } from "next/font/google";

const greatVibes = Great_Vibes({
  weight: "400", // Great Vibes only has one weight
  subsets: ["latin"],
});


const HomePage = () => {
  return (
    <div className="relative w-full h-full min-h-screen overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/assets/coffee-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Optional dark overlay for readability */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/40 -z-10"></div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-8 pt-24 -mt-2">
      <h1
        className={`${greatVibes.className} text-5xl font-bold italic mb-6 text-center 
        bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-300 bg-clip-text text-transparent 
        drop-shadow-lg leading-[1.4]`}
      >
        Royal Coffee
      </h1>


  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 -mt-6">
    {products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
</div>

    </div>
  );
};

export default HomePage;
