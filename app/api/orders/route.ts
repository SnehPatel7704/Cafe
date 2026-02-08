import { NextResponse } from 'next/server';
import { getOrders, addOrder } from '@/lib/store';
import { Order } from '@/lib/types';

export async function GET() {
  const orders = getOrders();
  // Sort by newest first
  const sortedOrders = orders.sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return NextResponse.json(sortedOrders);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerName, items, total } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    const newOrder: Order = {
      id: Date.now().toString(), // Simple ID
      customerName: customerName || 'Guest',
      items,
      total,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    addOrder(newOrder);

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
