import DisplayProducts from "@/Components/DisplayProducts/DisplayProducts";

export const metadata = {
  title: "All Products | El-Shehawy Store",
  description: "Browse our huge collection of premium electronics, including laptops, gaming gear, and accessories. Experience high performance and quality.",
};

export default function Products() {
  return (
    <>
      {/* All Products Section */}

      <DisplayProducts />
    </>
  );
}
