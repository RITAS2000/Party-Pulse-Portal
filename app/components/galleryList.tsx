import { selectAccessToken, selectIsAdmin } from '@/redux/auth/selectors';
import { fetchGallery } from '@/redux/gallery/operation';
import { selectGalleryItems } from '@/redux/gallery/selectors';
import { AppDispatch } from '@/redux/store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GalleryItem } from './galleryListItem';
import axios from 'axios';




export default function GalleryList() {
  const dispatch = useDispatch<AppDispatch>();
  const isAdmin = useSelector(selectIsAdmin);
    const galleryItems = useSelector(selectGalleryItems);
     
        const token = useSelector(selectAccessToken)
    

  useEffect(() => {
    dispatch(fetchGallery());
  }, [dispatch]);
  const filteredGalleryCars = galleryItems.filter(item => {
    if (!item.isApproved && !isAdmin) return false; 
    return true;
  });
    const handleApprove = async (galleryId: string) => {
      await axios.patch(`/party/gallery/${galleryId}`, { isApproved: true }, {
        headers: { Authorization: `Bearer ${token}` } 
      });
      dispatch(fetchGallery());

   
  };
  return (
    <div>
          <h1>галерея персонажей</h1>
          <ul className="flex flex-row flex-wrap gap-7 px-8 py-4">
              {filteredGalleryCars.map(item => (
                  <li key={item._id}><GalleryItem
                   
        item={item}
                      isAdmin={isAdmin}
                  onApprove={handleApprove}/></li>
              ))}
          </ul>
    </div>
  );
}
