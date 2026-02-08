import fs from 'fs';
import path from 'path';
import { Order } from './types';

const DATA_FILE = path.join(process.cwd(), 'data', 'orders.json');

// Ensure data directory exists
if (!fs.existsSync(path.dirname(DATA_FILE))) {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
}

// Initialize file if not exists
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

export function getOrders(): Order[] {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading orders:', error);
    return [];
  }
}

export function addOrder(order: Order): void {
  const orders = getOrders();
  orders.push(order);
  fs.writeFileSync(DATA_FILE, JSON.stringify(orders, null, 2));
}

export function updateOrder(orderId: string, updates: Partial<Order>): void {
  const orders = getOrders();
  const index = orders.findIndex((o) => o.id === orderId);
  if (index !== -1) {
    orders[index] = { ...orders[index], ...updates };
    fs.writeFileSync(DATA_FILE, JSON.stringify(orders, null, 2));
  }
}
