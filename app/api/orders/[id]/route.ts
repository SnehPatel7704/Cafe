import { NextResponse } from 'next/server';
import { updateOrder, getOrders } from '@/lib/store';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    // Validate status
    const validStatuses = ['pending', 'preparing', 'ready', 'completed'];
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    // Check if order exists
    const orders = getOrders();
    const orderExists = orders.some(o => o.id === id);
    if (!orderExists) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    updateOrder(id, { status });

    return NextResponse.json({ success: true, id, status });
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}
