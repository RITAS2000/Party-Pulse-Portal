import { useSelector } from 'react-redux';
import {
  selectModalType,
  selectIsModalOpen,
  selectModalData,
} from '../../redux/modals/selectors';
import ReUseModal from './reUseModal';


import ModalForgotPassword from './modalForgotPassword';
import ModalDeleteChar from './modalDeleteChar';
import ModalDeleteClan from './modalDeleteClan';


export default function ReModalContainer() {
  const isOpen = useSelector(selectIsModalOpen);
  const type = useSelector(selectModalType);
  const data = useSelector(selectModalData)

  if (!isOpen) return null;

  return (
    <ReUseModal>
      {type === "forgot" && <ModalForgotPassword />}
      {type === "deleteChar" && <ModalDeleteChar charId={data} />}
      {type === "deleteClan" && <ModalDeleteClan clanId={data} />}
     </ReUseModal>
  );
}