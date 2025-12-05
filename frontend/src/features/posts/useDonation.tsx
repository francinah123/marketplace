import { useState, useCallback } from "react";
import DonationModal from "./DonationModal";

interface UseDonationResult {
  openDonationModal: () => void;
  DonationUI: React.FC;
}

/**
 * Custom hook to manage donation modal state for a given post.
 * @param postId - The ID of the post being donated to
 */
export function useDonation(postId: string): UseDonationResult {
  const [open, setOpen] = useState(false);

  const openDonationModal = useCallback(() => setOpen(true), []);
  const closeDonationModal = useCallback(() => setOpen(false), []);

  const DonationUI: React.FC = useCallback(
    () => (
      <>
        {open && postId && (
          <DonationModal postId={postId} onClose={closeDonationModal} />
        )}
      </>
    ),
    [open, postId, closeDonationModal]
  );

  return { openDonationModal, DonationUI };
}
