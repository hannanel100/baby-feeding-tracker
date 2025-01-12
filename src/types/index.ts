export interface Baby {
  id: number;
  name: string;
}

export interface Feeding {
  id: number;
  babyId: number;
  type: "bottle" | "breast";
  amount?: number;
  duration?: number;
  time: string;
}

export interface FeedingInput {
  babyId: string;
  type: "bottle" | "breast";
  amount: string;
  duration: string;
  time: string;
}
