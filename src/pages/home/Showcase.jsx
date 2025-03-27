export default function Showcase() {
    return (
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-[#BA4374] mb-8">
            A Sweet Escape
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Interior Image */}
            <div className="overflow-hidden rounded-xl">
              <img
                src="/interior.jpg"
                alt="Kaspa's Interior"
                className="w-full h-[350px] object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
  
            {/* Counter Image */}
            <div className="overflow-hidden rounded-xl">
              <img
                src="/counter.jpg"
                alt="Kaspa's Counter"
                className="w-full h-[350px] object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
  