export async function generateMetadata({ params }) {
  // We need to await params in Next.js 14+ when generating metadata
  const { id } = await params;
  
  try {
    const res = await fetch(`https://electronics-store-api-two.vercel.app/api/products/${id}`);
    if (!res.ok) return { title: "Product Not Found | El-Shehawy Store" };
    
    const data = await res.json();
    const product = data.product;

    return {
      title: `${product?.title || "Product"} | El-Shehawy Store`,
      description: product?.description || "Get the best performance out of this premium electronic equipment.",
      openGraph: {
        images: [product?.imageUrl || product?.image || ""],
      },
    };
  } catch (error) {
    return {
      title: "Product Details | El-Shehawy Store",
      description: "Premium electronics and tech gear.",
    };
  }
}

export default function ProductDetailsLayout({ children }) {
  return <>{children}</>;
}
