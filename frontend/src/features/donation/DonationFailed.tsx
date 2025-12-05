import { Link, useLocation } from "react-router-dom";

export default function DonationFailed() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  // PayGate can redirect back with query params like postId, amount, status
  const postId = params.get("postId");
  const amount = params.get("amount");
  const status = params.get("status"); // e.g. "DECLINED" or "CANCELLED"

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          ❌ Donation Failed
        </h1>
        <p className="text-gray-700 mb-2">
          Unfortunately, your donation could not be processed.
        </p>

        {amount && (
          <p className="text-gray-600 mb-2">
            Attempted donation: <span className="font-semibold">R {amount}</span>
          </p>
        )}

        {status && (
          <p className="text-sm text-gray-500 mb-4">
            Transaction status: {status}
          </p>
        )}

        {postId && (
          <Link
            to={`/posts/${postId}`}
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
          >
            Back to Post
          </Link>
        )}

        {!postId && (
          <Link
            to="/posts"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
          >
            Browse Posts
          </Link>
        )}
      </div>
    </div>
  );
}
