import { useEffect } from 'react';
import { RequestStatus } from '../services/api';
import { getToken } from '../services/token';
import { useAppDispatch } from '../store/hooks/useAppDispatch';
import { useAppSelector } from '../store/hooks/useAppSelector';
import { favoritesSelectors, favoritesActions } from '../store/slices/favorites/favorites-slice';

export const useFavoriteCount = () => {
  const dispatch = useAppDispatch();
  const favoritesStatus = useAppSelector(favoritesSelectors.favoriteStatus);
  const count = useAppSelector(favoritesSelectors.favorites).length;
  const token = getToken();

  useEffect(() => {
    if (favoritesStatus === RequestStatus.Idle && token) {
      dispatch(favoritesActions.fetchFavorites());
    }
  }, [dispatch, favoritesStatus, token]);

  return count;
};
