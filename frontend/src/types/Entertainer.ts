export interface Entertainer {
  entertainerId: number;
  entStageName?: string;
  entSsn?: string;
  entStreetAddress?: string;
  entCity?: string;
  entState?: string;
  entZipCode?: string;
  entPhoneNumber?: string;
  entWebPage?: string;
  entEmailAddress?: string;
  dateEntered?: string;
}

export interface EntertainerStats {
  entertainerId: number;
  entStageName: string;
  bookings: number;
  lastBooking: string | null;
}
