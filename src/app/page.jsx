import { Suspense } from "react";
import Hero from "@/Components/Hero/Hero";
import CategorySection from "@/Components/Home/CategorySection";
import CategorySkeleton from "@/Components/Home/CategorySkeleton";
import { SectionDivider } from "@/Components/Home/SectionDivider";
import { FaMicrochip, FaMemory, FaHdd, FaDesktop, FaMouse, FaKeyboard, FaLaptopCode, FaHeadphones } from "react-icons/fa";

export default function Home() {
  return (
    <main className="bg-slate-950">
      {/* Hero Section */}
      <Hero />

      {/* Featured Categories Container */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-4">
        
        {/* Core Components */}
        <Suspense fallback={<CategorySkeleton />}>
          <CategorySection category="cpu" />
        </Suspense>
        
        <SectionDivider icon={FaMicrochip} title="Graphics Processing" />
        <Suspense fallback={<CategorySkeleton />}>
          <CategorySection category="gpu" />
        </Suspense>
        
        <SectionDivider icon={FaMemory} title="System Memory" />
        <Suspense fallback={<CategorySkeleton />}>
          <CategorySection category="ram" />
        </Suspense>
        
        <SectionDivider icon={FaHdd} title="Storage Solutions" />
        <Suspense fallback={<CategorySkeleton />}>
          <CategorySection category="storage" />
        </Suspense>
        
        <SectionDivider icon={FaDesktop} title="Displays & Monitors" />
        <Suspense fallback={<CategorySkeleton />}>
          <CategorySection category="screen" />
        </Suspense>

        <div className="my-20">
          <SectionDivider icon={FaLaptopCode} title="Peripherals & More" />
        </div>

        {/* Peripherals & Accessories */}
        <Suspense fallback={<CategorySkeleton />}>
          <CategorySection category="mouse" />
        </Suspense>
        
        <SectionDivider icon={FaKeyboard} title="Keyboards" />
        <Suspense fallback={<CategorySkeleton />}>
          <CategorySection category="keyboard" />
        </Suspense>
        
        <SectionDivider icon={FaLaptopCode} title="Laptops & Systems" />
        <Suspense fallback={<CategorySkeleton />}>
          <CategorySection category="laptops" />
        </Suspense>
        
        <SectionDivider icon={FaHeadphones} title="Accessories" />
        <Suspense fallback={<CategorySkeleton />}>
          <CategorySection category="accessories" />
        </Suspense>

      </div>
    </main>
  );
}

