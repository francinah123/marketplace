import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import ProductCard from "../product/ProductCard";

type Product = {
  id: string;
  name: string;
  description?: string;
  price: number;
  currency?: string;
  imageUrl?: string;
  rating?: number;
  storeName?: string;
};

type Props = {
  products: Product[];
  hasMore: boolean;
  loadMore: () => void;
};

export default function ProductGrid({ products, hasMore, loadMore }: Props) {
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasMore) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1.0 }
    );
    if (observerRef.current) observer.observe(observerRef.current);
    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [hasMore, loadMore]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
      {products.map((product) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
      {hasMore && <div ref={observerRef} className="col-span-full h-10" />}
    </div>
  );
}
