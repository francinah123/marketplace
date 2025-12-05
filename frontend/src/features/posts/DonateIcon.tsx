import { FaDollarSign } from "react-icons/fa";

type Props = {
  onClick: () => void;
};

export default function DonateIcon({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1 text-green-600 hover:text-green-700 text-sm font-medium"
    >
      <FaDollarSign />
      Donate
    </button>
  );
}
