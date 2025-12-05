import { motion, AnimatePresence } from "framer-motion";
import ProductSkeleton from "./ProductSkeleton";

type Props = {
  count?: number;
  show?: boolean; // control visibility
};

export default function ProductSkeletonGrid({ count = 8, show = true }: Props) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {Array.from({ length: count }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ProductSkeleton />
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
