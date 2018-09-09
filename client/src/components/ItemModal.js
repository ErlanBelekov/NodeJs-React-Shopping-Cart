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
    return(
      <div>
        <Button
          color="dark"
          style={{margin:20}}
          onClick={this.toggle}
        >
          Add Item
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>
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
                  style={{marginHorizontal:20,marginTop:20}}
                  block
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
  item: state.item
})

export default connect(mapStateToProps, {addItem})(ItemModal);
