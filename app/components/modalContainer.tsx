import { useSelector } from 'react-redux';
import {
  selectModalType,
  selectIsModalOpen,
} from '../../redux/modals/selectors';
import ReUseModal from './reUseModal';


import ModalForgotPassword from './modalForgotPassword';


export default function ReModalContainer() {
  const isOpen = useSelector(selectIsModalOpen);
  const type = useSelector(selectModalType);

  if (!isOpen) return null;

  return (
    <ReUseModal>
      {type === "forgot" && <ModalForgotPassword/>}
     </ReUseModal>
  );
}