export default function WhyChooseUs() {
    const features = [
      { icon: "🍰", title: "Freshly Made Desserts", description: "Every bite is crafted with love and freshness." },
      { icon: "🎨", title: "Luxurious Ambience", description: "Dine in a stylish, cozy, and vibrant setting." },
      { icon: "🚀", title: "Fast Service", description: "Delicious treats, served quickly with a smile." },
      { icon: "❤️", title: "Loved by Dessert Lovers", description: "Thousands of happy customers every day." },
    ];
  
    return (
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-[#BA4374] mb-8">Why Choose Us?</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="p-6 border border-gray-700 rounded-xl hover:bg-gray-800 transition duration-300">
                <div className="text-5xl">{feature.icon}</div>
                <h3 className="mt-4 text-xl font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm opacity-80">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  