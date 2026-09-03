export type CandleSize = {
  label: string; // "XS"  "S"  "M"  "L"
  heightCm: number; // 9, 15, 20, 27
  price: number; // Euro z.B. 4.5
};

export type Product = {
  id: number;
  name: string;
  description: string;
  sizes: CandleSize[];
};
