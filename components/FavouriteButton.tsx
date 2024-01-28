import axios from 'axios';
import { AiOutlinePlus } from 'react-icons/ai';
import useCurrentUser from '@/hooks/useCurrentUser';
import useFavourites from '@/hooks/useFavourites';
import { useCallback, useMemo } from 'react';



interface FavouriteButtonProps {
   movieId: string 
}

const FavouriteButton : React.FC<FavouriteButtonProps> = ({movieId}) => {
    const {mutate: mutateFavourites} = useFavourites();
    const { data: currentUser, mutate } = useCurrentUser();


    const isFavorite = useMemo(() => {
        const list = currentUser?.favoriteIds || [];
    
        return list.includes(movieId);
      }, [currentUser, movieId]);
    
      const toggleFavourites = useCallback(async () => {
        let response;
    
        if (isFavorite) {
          response = await axios.delete('/api/favourite', { data: { movieId } });
        } else {
          response = await axios.post('/api/favourite', { movieId });
        }
    
        const updatedFavoriteIds = response?.data?.favoriteIds;
    
        mutate({ 
          ...currentUser, 
          favoriteIds: updatedFavoriteIds,
        });
        mutateFavourites();
      }, [movieId, isFavorite, currentUser, mutate, mutateFavourites]);
 return (
    <div 
    onClick={toggleFavourites}
    className='
    cursor-pointer 
    group/item 
    w-6 h-6 lg:w-10 
    lg:h-10 border-white 
    border-2 rounded-full 
    flex justify-center 
    items-center transition
     hover:border-neutral-300
    '> 
 <AiOutlinePlus className='text-white group-hover/item:text-neutral-300 w-4 lg:w-6'/>
    </div>
 )
} 

export default FavouriteButton; 