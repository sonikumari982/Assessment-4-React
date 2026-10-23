import { useQuery } from "@tanstack/react-query";

const fetchCryptoPrices = async () => {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,dogecoin&vs_currencies=usd"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch crypto prices");
  }

  return response.json();
};

function CryptoPrices({ onFavorite }) {
  const {
    data,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["cryptoPrices"],
    queryFn: fetchCryptoPrices,
    refetchInterval: 10000,
  });

  if (isPending) {
    return <p>Loading crypto prices...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  const coins = [
    { id: "bitcoin", name: "Bitcoin" },
    { id: "ethereum", name: "Ethereum" },
    { id: "dogecoin", name: "Dogecoin" },
  ];

  return (
    <div>
      <h2>Cryptocurrency Prices</h2>

      {coins.map((coin) => (
        <div key={coin.id}>
          <h3>{coin.name}</h3>

          <p>
            Price: $
            {data[coin.id]?.usd ?? "Unavailable"}
          </p>

          <button onClick={() => onFavorite(coin)}>
            Add to Favorites
          </button>
        </div>
      ))}

      <p>Prices refresh every 10 seconds.</p>
    </div>
  );
}

export default CryptoPrices;