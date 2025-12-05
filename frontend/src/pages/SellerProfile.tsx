import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { http } from "../services/http";
import SellerCard from "../components/SellerCard";
import SellerProductsGrid from "../components/SellerProductsGrid";
import SellerLayout from "../components/SellerLayout";

type Seller = {
  id: string;
  name: string;
  bio: string;
  avatarUrl?: string;
};

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  inventory: number;
  status: "draft" | "active" | "archived";
  publishedAt: string | null;
  images: string[];
  category: string;
  sellerId: string;
  sellerName: string;
};

export default function SellerProfile() {
  const { sellerId } = useParams<{ sellerId: string }>();
  const [seller, setSeller] = useState<Seller | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  async function fetchSellerProducts(pageNum: number, reset = false) {
    try {
      const res = await http.get(
        `/products?page=${pageNum}&limit=9&sellerId=${sellerId}`
      );

      if (reset) {
        setProducts(res.data.products);
      } else {
        setProducts((prev) => [...prev, ...res.data.products]);
      }

      setHasMore(pageNum < res.data.totalPages);
    } catch (err) {
      console.error("Failed to fetch seller products", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function fetchSellerInfo() {
      try {
        const res = await http.get(`/sellers/${sellerId}`);
        setSeller(res.data.seller);
      } catch (err) {
        console.error("Failed to fetch seller info", err);
      }
    }

    setLoading(true);
    setPage(1);
    fetchSellerInfo();
    fetchSellerProducts(1, true);
  }, [sellerId]);

  if (loading) return <p className="text-center">Loading seller profile...</p>;
  if (!seller) return <p className="text-center text-red-600">Seller not found.</p>;

  return (
    <SellerLayout
      title={`${seller.name}’s Profile`}
      sidebar={
        <SellerCard
          id={seller.id}
          name={seller.name}
          bio={seller.bio}
          avatarUrl={seller.avatarUrl}
          showLink={false}
        />
      }
    >
      <h3 className="mb-4 text-xl font-semibold">Products</h3>
      <SellerProductsGrid products={products} />

      {hasMore && (
        <div className="mt-6 text-center">
          <button
            onClick={() => {
              const nextPage = page + 1;
              setPage(nextPage);
              fetchSellerProducts(nextPage);
            }}
            className="rounded bg-primary px-5 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Load More
          </button>
        </div>
      )}
    </SellerLayout>
  );
}
