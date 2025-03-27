export default function Newsletter() {
    return (
      <section className="bg-gray-100 flex flex-col md:flex-row items-center py-6">

        <img src="/cards.png" className="w-1/2" alt="" />

        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800">Stay Updated</h2>
          <p className="text-gray-600 mt-2">Sign up for exclusive deals and sweet updates.</p>
          <div className="mt-6 flex justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 w-64 border border-gray-300 rounded-l-md focus:outline-none"
            />
            <button className="bg-[#BA4374] text-white px-6 py-2 rounded-r-md hover:bg-[#9a355e]">
              Sign Up
            </button>
          </div>
        </div>
      </section>
    );
  }
  