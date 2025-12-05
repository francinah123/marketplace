import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ErrorBoundary } from "./components";
import { Toaster } from "react-hot-toast";
import "./index.css";
import { useParams } from "react-router-dom";


// Donation pages
import DonationSuccess from "./features/donation/DonationSuccess";
import DonationFailed from "./features/donation/DonationFailed";

import MarketplaceHome from "./features/marketplace/MarketplaceHome";
import PostList from "./features/posts/PostList";
import WalletDashboard from "./features/wallet/WalletDashboard";
import Messenger from "./features/messenger/Messenger";
import StoreDashboard from "./features/store/StoreDashboard";
import Cart from "./features/cart/Cart";
import DonationCampaigns from "./features/donation/DonationCampaigns";
import ReviewList from "./features/reviews/ReviewList";
import TransactionSummary from "./features/transactions/TransactionSummary";
import AdminDashboard from "./features/admin/AdminDashboard";
import SuperAdminDashboard from "./features/admin/SuperAdminDashboard";
import ProductDetail from "./features/product/ProductDetail";
import SellWizard from "./features/sell/SellWizard";

// ✅ Navigation bar
function Nav() {
  return (
    <nav
      style={{
        display: "flex",
        gap: "12px",
        padding: "12px",
        borderBottom: "1px solid #eee",
      }}
    >
      <Link to="/">Home</Link>
      <Link to="/marketplace">Marketplace</Link>
      <Link to="/posts">Posts</Link>
      <Link to="/wallet">Wallet</Link>
      <Link to="/messages">Messenger</Link>
      <Link to="/store">My Store</Link>
      <Link to="/sell">Sell</Link>
      <Link to="/cart">Cart</Link>
      <Link to="/donations">Donations</Link>
      <Link to="/reviews">Reviews</Link>
      <Link to="/transactions">Transactions</Link>
      <Link to="/admin">Admin</Link>
      <Link to="/superadmin">Super Admin</Link>
    </nav>
  );
}

function Home() {
  return <div>Home Page</div>;
}

// ✅ Main App with routes
function App() {
  return (
    <>
      <Nav />
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/marketplace" element={<MarketplaceHome />} />
          <Route path="/posts" element={<PostList />} />
          <Route path="/wallet" element={<WalletDashboard />} />
          <Route path="/messages" element={<Messenger />} />
          <Route path="/store" element={<StoreDashboard />} />
          <Route path="/sell" element={<SellWizard />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/donations" element={<DonationCampaigns />} />
          <Route path="/reviews" element={<ReviewList productId={""} />} />
          <Route path="/transactions" element={<TransactionSummary />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/superadmin" element={<SuperAdminDashboard />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/reviews/:productId" element={<ReviewListWrapper />} />

          {/* Donation routes */}
          <Route path="/donation-success" element={<DonationSuccess />} />
          <Route path="/donation-failed" element={<DonationFailed />} />
        </Routes>
      </ErrorBoundary>
    </>
  );
}

// ✅ Render App inside BrowserRouter
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster position="top-right" />
    </BrowserRouter>
  </React.StrictMode>
);
function ReviewListWrapper() {
  const { productId } = useParams<{ productId: string }>();
  return <ReviewList productId={productId!} />;
}