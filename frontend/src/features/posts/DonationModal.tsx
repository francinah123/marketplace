import React from "react";

interface DonationModalProps {
  postId: string;
  onClose: () => void;
}

const DonationModal: React.FC<DonationModalProps> = ({ postId, onClose }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "2rem",
          borderRadius: "8px",
          maxWidth: "400px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <h2>Donate to Post</h2>
        <p>Post ID: {postId}</p>

        {/* Placeholder donation form */}
        <input
          type="number"
          placeholder="Enter amount"
          style={{ width: "100%", marginBottom: "1rem" }}
        />
        <button style={{ marginRight: "1rem" }}>Donate</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default DonationModal;
