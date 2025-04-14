import { useNavigate } from "react-router"

export default function About() {
  const Navigate = useNavigate()
      return (
        <div style={{ lineHeight: "1.6" }}>
          <section 
          className="p-2 md:p-6"
          style={{ marginBottom: "60px" }}>
            <h2 style={{ fontSize: "2rem", marginBottom: "10px" }}>Our Story</h2>
            <p>
            At our dessert spot, we’re all about turning sweet dreams into reality.
Whether you're craving something new or want to relive your favorite childhood indulgence, we’ve got it all under one roof — from creamy Italian gelatos and loaded waffles to irresistible crepes, dreamy shakes, refreshing smoothies, and over-the-top sundaes.
It’s a full-blown dessert party for your taste buds (yes, dessert discos are real around here).

Our mission? To create unforgettable moments where friends and families come together, share delicious desserts, and make lasting memories. And of course, we’re always serving it up with a generous scoop of top-notch customer service — because here, every bite should feel special.

Without desserts, let’s face it — we’d totally melt. 🍨            </p>
            <br/>
            <p>
            We started this journey with one simple goal: to spread joy, one dessert at a time.
Our parlours are a celebration of everything sweet — offering a wide selection of freshly made, high-quality treats for dessert lovers of all ages. From small-batch artisan gelato to creative collabs with your favorite candy brands, we’re here to serve up happiness on every plate.

At our core, we’re not just about desserts — we’re about moments. Sweet, shared, and unforgettable.
            </p>
          </section>

          <div className="bg-[#BA4374] w-full flex flex-col md:flex-row items-center gap-4 py-8 justify-between px-6">
            <h1 className="text-2xl md:text-5xl font-bold text-white text-center capitalize">try our delicious gelatos today!
            </h1>
            <button 
            onClick={() => Navigate("/menu")}
            className="bg-[#4CB2C3] text-white cursor-pointer px-8 py-3 text-xl rounded-full">See Menu</button>
          </div>
    
          <section style={{ marginBottom: "60px", }}
          className="p-2 md:p-6"
          >
            <h2 style={{ fontSize: "2rem", marginBottom: "10px" }}>Our Mission</h2>
            <p>
              We aim to create delightful dessert experiences using the finest ingredients. 
              Whether it's a scoop of ice cream or a slice of cake, we believe every treat 
              should bring a smile. Our focus is on quality, sustainability, and innovation.
            </p>
          </section>
    
        </div>    
  )
}
