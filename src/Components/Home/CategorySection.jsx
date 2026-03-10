import DynamicMarquee from "@/Components/DynamicMarquee/DynamicMarquee";

// Helper function to fetch products for a category
async function fetchCategory(category) {
  try {
    const res = await fetch(`https://electronics-store-api-two.vercel.app/api/products/category/${category}`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data.results) ? data.results : Array.isArray(data.products) ? data.products : [];
  } catch (error) {
    console.error(`Error fetching ${category}:`, error);
    return [];
  }
}

export default async function CategorySection({ category }) {
  const products = await fetchCategory(category);
  
  // Don't render if no products found to avoid empty sections
  if (!products || products.length === 0) return null;

  return <DynamicMarquee category={category} initialProducts={products} />;
}
