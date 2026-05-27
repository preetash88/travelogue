import HeroSlider from "./components/hero/HeroSlider";
import Navbar from "./components/navbar/Navbar";
import SmoothScroll from "./components/ui/SmoothScroll";

function App() {
  return (
      <SmoothScroll>
        <main className="relative min-h-screen bg-[#050816] text-white">
          <Navbar />

          <HeroSlider />
        </main>
      </SmoothScroll>
  );
}

export default App;