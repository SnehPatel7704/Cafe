import { MENU_ITEMS } from "@/lib/data";
import MenuItemCard from "@/components/MenuItemCard";
import { Category } from "@/lib/types";

export default function CustomerMenu() {
  const categories: Category[] = ['coffee', 'food', 'dessert'];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-12">
        <section className="text-center">
          <h1 className="text-3xl font-bold text-stone-800 mb-2">Our Menu</h1>
          <p className="text-stone-600">Freshly brewed coffee and delicious snacks</p>
        </section>

        {categories.map((category) => {
          const items = MENU_ITEMS.filter((item) => item.category === category);
          if (items.length === 0) return null;

          return (
            <section key={category} className="scroll-mt-20" id={category}>
              <h2 className="text-2xl font-bold text-stone-800 mb-6 capitalize border-b border-stone-200 pb-2">
                {category}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item) => (
                  <MenuItemCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
