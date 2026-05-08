import { useEffect, useState } from 'react';
import axios from 'axios';
import MenuCard from '@/components/MenuCard';
import Cart from '@/components/Cart';

export default function Menu() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/menu`);
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching menu:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (item: any) => {
    const existingItem = cart.find(c => c.id === item.id);
    if (existingItem) {
      setCart(cart.map(c => c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-light p-4">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-primary">🍗 Menu</h1>
          <button
            onClick={() => setShowCart(!showCart)}
            className="bg-primary text-white px-4 py-2 rounded-lg relative"
          >
            Cart ({cart.length})
          </button>
        </header>

        {showCart ? (
          <Cart items={cart} setCart={setCart} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map(item => (
              <MenuCard key={item.id} item={item} onAddToCart={addToCart} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
