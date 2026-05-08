interface MenuCardProps {
  item: any;
  onAddToCart: (item: any) => void;
}

export default function MenuCard({ item, onAddToCart }: MenuCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden fade-in">
      <div className="bg-gray-300 h-40 flex items-center justify-center">
        <span className="text-4xl">{item.emoji || '🍗'}</span>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-800 mb-2">{item.name}</h3>
        <p className="text-gray-600 text-sm mb-3">{item.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-primary">₦{item.price}</span>
          <button
            onClick={() => onAddToCart(item)}
            className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
