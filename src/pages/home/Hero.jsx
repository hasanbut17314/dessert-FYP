export default function Hero() {
  return (
    <div className="relative md:min-h-screen h-[400px] flex items-center justify-center">
    <video
    style={{
      filter: "brightness(0.5)",
      backdropFilter: "blur(10px)",
    }}
      className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
      autoPlay
      loop
      muted
      src="/Kaspas-Video.mp4"
    />
  </div>
  )
}
