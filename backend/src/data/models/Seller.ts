export type Seller = {
  id: string;
  name: string;
  bio: string;
  avatarUrl?: string;
};

export const sellers: Seller[] = [
  {
    id: "seller1",
    name: "Francinah’s Fashion Hub",
    bio: "Trendy fashion and lifestyle products",
    avatarUrl: "/avatars/seller1.png"
  },
  {
    id: "seller2",
    name: "TechHub Electronics",
    bio: "Latest gadgets and electronics",
    avatarUrl: "/avatars/seller2.png"
  },
  {
    id: "seller3",
    name: "Home & Living",
    bio: "Furniture, decor, and kitchen essentials",
    avatarUrl: "/avatars/seller3.png"
  }
];

