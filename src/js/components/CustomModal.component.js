import React from "react";
import {connect} from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


const CustomModal = props =>{
  const closeModal = () => {
      props.dispatch({
        type:"MODAL_TOGGLE"
      })
  }
    return(
        <Modal isOpen={props.isOpenModal} toggle={props.modalToggle}  style={{
          maxWidth:"100vw"
        }}>
          <ModalHeader toggle={props.modalToggle}>
            <Button onClick={closeModal} color="danger">close</Button>
          </ModalHeader>
          <ModalBody>
            {
                props.modalContent
            }
          </ModalBody>
          <ModalFooter>
            <Button  color="secondary" onClick={closeModal}>Cancel</Button>
          </ModalFooter>
      </Modal>
    )
}
const mapStateToProps = store =>{
    return{
        isOpenModal:store.main.isOpenModal,
        modalContent:store.main.modalContent
    }
}
export default connect(mapStateToProps)(CustomModal)