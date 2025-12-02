import { Link } from "react-router-dom";

type ProductCardProps = {
  id: string;
  title: string;
  price: number;
  imageUrl?: string;
  rating?: number;
  storeName?: string;
};

export default function ProductCard(props: ProductCardProps) {
  return (
    <Link to={`/product/${props.id}`} style={{ textDecoration: "none", color: "inherit" }}>
      <div style={{ border: "1px solid #ddd", borderRadius: 8, padding: 12 }}>
        <img
          src={props.imageUrl || "https://via.placeholder.com/300x200"}
          alt={props.title}
          style={{ width: "100%", borderRadius: 6, marginBottom: 8 }}
        />
        <div style={{ fontWeight: 600 }}>{props.title}</div>
        <div>R {props.price.toFixed(2)}</div>
        {props.rating !== undefined && <div>Rating: {props.rating}/5</div>}
        {props.storeName && <div style={{ color: "#666" }}>{props.storeName}</div>}
      </div>
    </Link>
  );
}
