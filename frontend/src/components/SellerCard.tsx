import { Link } from "react-router-dom";

type Props = {
  id: string;
  name: string;
  bio?: string;
  avatarUrl?: string;
  showLink?: boolean; // toggle profile link
};

export default function SellerCard({ id, name, bio, avatarUrl, showLink = true }: Props) {
  return (
    <div className="rounded border p-4 shadow hover:shadow-lg transition">
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={name}
          className="mb-4 h-20 w-20 rounded-full object-cover"
        />
      ) : (
        <div className="mb-4 h-20 w-20 rounded-full bg-gray-300" />
      )}
      <h3 className="text-lg font-semibold">{name}</h3>
      {bio && <p className="text-sm text-gray-600">{bio}</p>}
      {showLink && (
        <Link
          to={`/sellers/${id}`}
          className="mt-3 inline-block text-blue-600 hover:underline"
        >
          View Profile →
        </Link>
      )}
    </div>
  );
}
