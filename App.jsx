import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import CryptoPrices from "./components/CryptoPrices";
import Favorites from "./components/Favorites";

function App() {
  const queryClient = useQueryClient();

  const favoriteMutation = useMutation({
    mutationFn: async (coin) => {
      await new Promise((resolve) =>
        setTimeout(resolve, 500)
      );

      const oldFavorites =
        queryClient.getQueryData(["favorites"]) ?? [];

      const alreadyExists = oldFavorites.some(
        (item) => item.id === coin.id
      );

      if (alreadyExists) {
        return oldFavorites;
      }

      const updatedFavorites = [
        ...oldFavorites,
        coin,
      ];

      queryClient.setQueryData(
        ["favorites"], updatedFavorites);

      return updatedFavorites;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["favorites"],
      });
    },
  });

  return (
    <div>
      <h1>Crypto Tracker</h1>

      <CryptoPrices
        onFavorite={(coin) =>
          favoriteMutation.mutate(coin)
        }
      />

      {favoriteMutation.isPending && (
        <p>Saving favorite...</p>
      )}

      {favoriteMutation.isError && (
        <p>Could not save favorite.</p>
      )}

      <Favorites />
    </div>
  );
}

export default App;