import { FC } from "react";

interface SpotifySectionProps<T> {
  title: string;
  items: T[];
  itemComponent: FC<T>;
}

function SpotifySection<T extends { id: string }>({
  title,
  items,
  itemComponent: Item,
}: SpotifySectionProps<T>) {
  return (
    <section className="rounded-md bg-zinc-900 text-white p-3">
      <h2 className="text-2xl font-bold px-3 mb-2">{title}</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <Item key={item.id} {...item} />
        ))}
      </ul>
    </section>
  );
}
export default SpotifySection;
