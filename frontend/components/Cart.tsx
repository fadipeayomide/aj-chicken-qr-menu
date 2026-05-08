import axios from 'axios';
import { useState } from 'react';

interface CartProps {
  items: any[];
  setCart: (items: any[]) => void;
}

export default function Cart({ items, setCart }: CartProps) {
  const [loading, setLoading] = useState(false);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const removeItem = (id: string) => {
    setCart(items.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
    } else {
      setCart(items.map(item => item.id === id ? { ...item, quantity } : item));
    }
  };

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, {
        items,
        total,
      });
      alert('Order placed successfully!');
      setCart([]);
    } catch (error) {
      alert('Error placing order');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return <div className="text-center py-8">Cart is empty</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
        
        <div className="space-y-4 mb-6">
          {items.map(item => (
            <div key={item.id} className="flex justify-between items-center border-b pb-4">
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-gray-600">₦{item.price}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  -
                </button>
                <span className="px-4">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  +
                </button>
                <button
                  onClick={() => removeItem(item.id)}
                  className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <div className="flex justify-between text-lg font-bold">
            <span>Total:</span>
            <span className="text-primary">₦{total}</span>
          </div>
        </div>
        
        <button
          onClick={handleCheckout}
          disabled={loading}
          className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Checkout'}
        </button>
      </div>
    </div>
  );
}
