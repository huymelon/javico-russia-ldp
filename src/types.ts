export interface Job {
  id: string;
  title: string;
  salary: string;
  location: string;
  category: string;
  duration: string;
  description: string;
  imageUrl: string;
  requirements: string[];
  benefits: string[];
  isHot?: boolean;
}

export interface Lead {
  id?: string;
  name: string;
  phone: string;
  birthYear: string;
  province: string;
  jobInterest: string;
  status: 'pending' | 'contacted' | 'completed';
  createdAt: number;
}

export interface UserProfile {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  role: 'user' | 'admin';
  createdAt: number;
}
