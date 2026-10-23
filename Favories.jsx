import { useQuery } from "@tanstack/react-query";

function Favorites() {
  const { data: favorites = [], isPending, isError } = useQuery({
    queryKey: ["favorites"],
    queryFn: async () => [],
    staleTime: Infinity,
  });

  if (isPending) {
    return <p>Loading favorites...</p>;
  }

  if (isError) {
    return <p>Failed to load favorites.</p>;
  }

  return (
    <div>
      <h2>My Favorite Coins</h2>

      {favorites.length === 0 ? (
        <p>No favorite coins yet.</p>
      ) : (
        <ul>
          {favorites.map((coin) => (
            <li key={coin.id}>{coin.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Favorites;