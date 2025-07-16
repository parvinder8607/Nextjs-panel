import { User, Product, Contact } from '@/types'

export let users: User[] = [
    { id: 1, name: "Alice", email: "alice@example.com", role: "admin" },
  ];
  
  export let products: Product[] = [
    { id: 1, name: "Laptop", price: 999 }
  ];

  export let contacts: Contact[] = [
    { id: 1, name: "John Doe", email: "john@example.com", mobile: "1234567890", message: "Hello, world!" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", mobile: "9876543210", message: "Hi there!" },
  ];