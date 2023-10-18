/// <reference types="vite/client" />

interface Phone {
  number: string;
}

interface Contact {
  id: number;
  created_at: string;
  first_name: string;
  last_name: string;
  phones: Phone[];
}
