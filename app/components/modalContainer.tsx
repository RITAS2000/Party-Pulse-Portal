import { useSelector } from 'react-redux';
import {
  selectModalType,
  selectIsModalOpen,
} from '../../redux/modals/selectors';
import ReUseModal from './reUseModal';
import ModalRegister from './modalRegister';


export default function ReModalContainer() {
  const isOpen = useSelector(selectIsModalOpen);
  const type = useSelector(selectModalType);

    console.log('Modal type:', type);
  if (!isOpen) return null;

  return (
    <ReUseModal>
      {type === 'register' && <ModalRegister/>}
     </ReUseModal>
  );
}