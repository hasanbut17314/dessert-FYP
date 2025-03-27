import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router";
import WafflePic from "../../assets/menu/waffles.png";
import SundaePic from "../../assets/menu/sundae.png";
import MilkshakePic from "../../assets/menu/milkshake.png";
import CakePic from "../../assets/menu/cakes.png";
import GalletoPic from "../../assets/menu/galleto.png";

const menuItems = [
  { id: 1, name: "Waffles", image: WafflePic },
  { id: 2, name: "Sundaes", image: SundaePic },
  { id: 3, name: "Galletos", image: GalletoPic },
  { id: 4, name: "Milkshakes", image: MilkshakePic },
  { id: 5, name: "Cakes and Puddings", image: CakePic },
];

export default function MenuSection() {
  const [isMobile, setIsMobile] = useState(false);
  
  // Improved mobile detection with proper resize listener
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Check initially
    checkMobile();
    
    // Add resize listener
    window.addEventListener("resize", checkMobile);
    
    // Clean up
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  
  const itemsPerSlide = isMobile ? 1 : 3;
  const [index, setIndex] = useState(0);

  const prevSlide = () => {
    setIndex((prev) => {
      if (prev === 0) return menuItems.length - itemsPerSlide;
      return prev - 1;
    });
  };

  const nextSlide = () => {
    setIndex((prev) => {
      if (prev >= menuItems.length - itemsPerSlide) return 0;
      return prev + 1;
    });
  };

  // Calculate slider width percentage based on items per slide
  const slideWidth = 100 / itemsPerSlide;
  
  return (
    <section className="py-8 md:py-16 bg-[#E5E5E5] text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-[#BA4374] mb-4 md:mb-6">Our Signature Desserts</h2>

      {/* Slider Container */}
      <div className="relative w-[90%] md:w-[80%] mx-auto overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${index * slideWidth}%)` }}
        >
          {menuItems.map((item) => (
            <div 
              key={item.id} 
              className="w-full" 
              style={{ flex: `0 0 ${slideWidth}%` }}
            >
              <div className="px-4 md:px-12 flex flex-col items-center">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full max-w-xs h-auto object-contain rounded-xl"
                />
                <h3 className="mt-4 text-xl md:text-2xl font-semibold">{item.name}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-1 md:p-2 rounded-full shadow-lg"
          aria-label="Previous slide"
        >
          <ChevronLeft size={isMobile ? 24 : 30} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-1 md:p-2 rounded-full shadow-lg"
          aria-label="Next slide"
        >
          <ChevronRight size={isMobile ? 24 : 30} />
        </button>
      </div>

      {/* Slide Indicators for Mobile */}
      {isMobile && (
        <div className="flex justify-center mt-4 gap-2">
          {menuItems.map((_, i) => (
            <button
              key={i}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-6 bg-[#BA4374]" : "w-2 bg-gray-300"
              }`}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* View Menu Button */}
      <div className="mt-6">
        <Link to="/menu">
          <button className="bg-[#BA4374] hover:bg-[#a02f5b] text-white px-5 py-2 md:px-6 md:py-3 rounded-lg text-base md:text-lg font-semibold">
            View Menu
          </button>
        </Link>
      </div>
    </section>
  );
}





// import { useEffect, useState } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { Link } from "react-router";
// import WafflePic from "../../assets/menu/waffles.png";
// import SundaePic from "../../assets/menu/sundae.png";
// import MilkshakePic from "../../assets/menu/milkshake.png";
// import CakePic from "../../assets/menu/cakes.png";
// import GalletoPic from "../../assets/menu/galleto.png";

// const menuItems = [
//   { id: 1, name: "Waffles", image: WafflePic },
//   { id: 2, name: "Sundaes", image: SundaePic },
//   { id: 3, name: "Galletos", image: GalletoPic },
//   { id: 4, name: "Milkshakes", image: MilkshakePic },
//   { id: 5, name: "Cakes and Puddings", image: CakePic },
// ];

// export default function MenuSection() {

//   const [isMobile, setIsMobile] = useState(false);
//   useEffect(() => {
//     setIsMobile(window.innerWidth <= 400);
//   }, [ isMobile ]);
//   const [index, setIndex] = useState(0);
//   const itemsPerSlide = isMobile ? 1 : 3;

//   const prevSlide = () => {
//     setIndex((prev) => (prev === 0 ? menuItems.length - itemsPerSlide : prev - 1));
//   };

//   const nextSlide = () => {
//     setIndex((prev) => (prev >= menuItems.length - itemsPerSlide ? 0 : prev + 1));
//   };

//   return (
//     <section className="py-16 bg-[#E5E5E5] text-center">
//       <h2 className="text-4xl font-bold text-[#BA4374] mb-6">Our Signature Desserts</h2>

//       {/* Slider Container */}
//       <div className="relative w-[80%] mx-auto overflow-hidden">
//         <div
//           className="flex transition-transform duration-500 items-center justify-between ease-in-out"
//           style={{ transform: `translateX(-${index * (100 / itemsPerSlide)}%)` }}
//         >
//           {menuItems.map((item) => (
//             <div key={item.id} className="w-1/3 flex-shrink-0  flex-col px-12">
//               <img src={item.image} alt={item.name} className="w-full h-auto object-contain rounded-xl" />
//               <h3 className="mt-4 text-2xl font-semibold">{item.name}</h3>
//             </div>
//           ))}
//         </div>

//         {/* Navigation Buttons */}
//         <button
//           onClick={prevSlide}
//           className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
//         >
//           <ChevronLeft size={30} />
//         </button>
//         <button
//           onClick={nextSlide}
//           className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
//         >
//           <ChevronRight size={30} />
//         </button>
//       </div>

//       {/* View Menu Button */}
//       <div className="mt-6">
//         <Link to="/menu">
//           <button className="bg-[#BA4374] hover:bg-[#a02f5b] text-white px-6 py-3 rounded-lg text-lg font-semibold">
//             View Menu
//           </button>
//         </Link>
//       </div>
//     </section>
//   );
// }