import React, {Component} from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { connect } from 'react-redux';
import {addItem} from '../actions/itemAction';
import {callToToggleModal} from './AppNavbar';  // Get this function for reference in Modal tag

import store from '../store';

class ItemModal extends Component {
  state = {
    modal: false,
    name: ''
  };
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  onSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      name: this.state.name
    };
    // Add item via add item action
    this.props.addItem(newItem);
    // CLose the Modal
    this.toggle();
  }
  render(){
    const modal = this.props.modal.modal_is_open;
    return(
      <div>
        <Modal
          isOpen={modal}
          toggle={callToToggleModal}
        >
          <ModalHeader toggle={callToToggleModal}>
            Add To Shopping List
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="item">Item</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Add Shopping Item"
                  onChange={this.onChange}
                />
                <Button
                  color="dark"
                  style={{marginHorizontal:10,marginTop:10}}
                  block
                  onClick={this.onSubmit}
                >
                  Add Item
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  item: state.item,
  modal: state.modal
})

export default connect(mapStateToProps, {addItem})(ItemModal);
