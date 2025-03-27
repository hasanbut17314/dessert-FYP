import { MapPin } from "lucide-react";

// const locations = [
//   { id: 1, city: "Lahore", lat: 31.5497, lng: 974.3436 },
//   { id: 2, city: "Karachi", lat: 24.8607, lng: 67.0011 },
//   { id: 3, city: "Islamabad", lat: 33.6844, lng: 73.0479 },
//   { id: 4, city: "Faisalabad", lat: 31.4180, lng: 73.0790 },
// ];

export default function ContactHero() {
  return (
    <section className="relative h-screen w-full bg-black flex items-center justify-center">
      {/* Map Image (Replace with an actual Map API if needed) */}
      <img
        src="/pakistan-map.png"
        alt="Pakistan Map"
        className="absolute inset-0 w-full h-[80%] mt-20 object-contain opacity-50"
      />
      
      {/* Location Markers */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* {locations.map((loc) => (
          <div key={loc.id} className="absolute text-center text-white" style={{ top: `${loc.lat}%`, left: `${loc.lng}%` }}>
            <MapPin className="text-red-500 w-6 h-6" />
            <p className="text-sm font-semibold">{loc.city}</p>
          </div>
        ))} */}
      </div>

      <h1 className="absolute top-10 text-white text-4xl md:text-6xl font-bold">Our Locations in Pakistan</h1>
    </section>
  );
}
