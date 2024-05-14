import axios from "axios";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFavourites from "@/hooks/useFavourites";
import { useCallback, useMemo } from "react";

interface FavouriteButtonProps {
  movieId: string;
}

const FavoriteButton: React.FC<FavouriteButtonProps> = ({ movieId }) => {
  const { mutate: mutateFavorites } = useFavourites();
  const { data: currentUser, mutate } = useCurrentUser();

  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(movieId);
  }, [currentUser, movieId]);

  const toggleFavourites = useCallback(async () => {
    let response;

    if (isFavorite) {
      response = await axios.delete("/api/favorite", { data: { movieId } });
    } else {
      response = await axios.post("/api/favorite", { movieId });
    }

    const updatedFavoriteIds = response?.data?.favoriteIds;

    mutate({
      ...currentUser,
      favoriteIds: updatedFavoriteIds,
    });
    mutateFavorites();
  }, [movieId, isFavorite, currentUser, mutate, mutateFavorites]);

  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

  return (
    <div
      onClick={toggleFavourites}
      className="
    cursor-pointer 
    group/item 
    w-6 h-6 lg:w-10 
    lg:h-10 border-white 
    border-2 rounded-full 
    flex justify-center 
    items-center transition
     hover:border-neutral-300
    "
    >
      I<Icon size={22} className="text-white" />
    </div>
  );
};

export default FavoriteButton;
