import ProductGrid from "../features/marketplace/ProductGrid";
import { Product } from "../features/product/types";

type Props = {
  sellerName: string;
  products: Product[];
};

export default function SellerSection({ sellerName, products }: Props) {
  return (
    <div className="mb-10">
      <h3 className="text-xl font-semibold mb-4">{sellerName}</h3>
      <ProductGrid products={products} />
    </div>
  );
}
