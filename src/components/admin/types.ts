export interface Order {
  id: number;
  client_name: string;
  client_phone: string;
  client_email?: string;
  pet_name?: string;
  pet_type: string;
  pet_breed?: string;
  pet_weight?: number;
  pet_special_needs?: string;
  service_type: string;
  pickup_address: string;
  destination_address: string;
  preferred_date: string;
  preferred_time: string;
  additional_services?: string;
  comments?: string;
  estimated_price?: number;
  status: 'new' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  admin_notes?: string;
  cancellation_reason?: string;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: number;
  client_name: string;
  client_email?: string;
  client_phone?: string;
  rating: number;
  title?: string;
  content: string;
  service_type?: string;
  trip_date?: string;
  is_published: boolean;
  is_featured: boolean;
  moderator_notes?: string;
  created_at: string;
  published_at?: string;
  updated_at: string;
}

export interface Passenger {
  id: number;
  pet_name?: string;
  pet_type?: string;
  photo_url: string;
  description?: string;
  is_published: boolean;
  created_at: string;
}