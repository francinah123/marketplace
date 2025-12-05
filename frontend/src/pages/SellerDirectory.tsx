import { useEffect, useState } from "react";
import { http } from "../services/http";
import SellerCard from "../components/SellerCard";
import SellerLayout from "../components/SellerLayout";

type Seller = {
  id: string;
  name: string;
  bio?: string;
  avatarUrl?: string;
};

export default function SellerDirectory() {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSellers() {
      try {
        const res = await http.get("/sellers"); // ✅ backend route to list all sellers
        setSellers(res.data.sellers);
      } catch (err) {
        console.error("Failed to fetch sellers", err);
      } finally {
        setLoading(false);
      }
    }
    fetchSellers();
  }, []);

  if (loading) return <p className="text-center">Loading sellers...</p>;

  return (
    <SellerLayout title="👩‍💼 Seller Directory">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sellers.map((seller) => (
          <SellerCard
            key={seller.id}
            id={seller.id}
            name={seller.name}
            bio={seller.bio}
            avatarUrl={seller.avatarUrl}
            showLink={true}
          />
        ))}
      </div>
    </SellerLayout>
  );
}

