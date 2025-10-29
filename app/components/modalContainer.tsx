import { useSelector } from 'react-redux';
import {
  selectModalType,
  selectIsModalOpen,
} from '../../redux/modals/selectors';
import ReUseModal from './reUseModal';
import ModalRegister from './modalRegister';
import ModalLogin from './modalLogin';


export default function ReModalContainer() {
  const isOpen = useSelector(selectIsModalOpen);
  const type = useSelector(selectModalType);

  if (!isOpen) return null;

  return (
    <ReUseModal>
          {type === 'register' && <ModalRegister />}
          {type === 'login' && <ModalLogin />}
     </ReUseModal>
  );
}