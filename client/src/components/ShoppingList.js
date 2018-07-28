import React, {Component} from 'react';
import {
  Button,
  Container,
  ListGroup,
  ListGroupItem
} from 'reactstrap';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemAction';

import PropTypes from 'prop-types';

class ShoppingList extends Component {
  componentDidMount(){
    this.props.getItems();
  }

  onDeleteClick = (id) => {
    this.props.deleteItem(id);
  }

  render(){
    const { items } = this.props.item;
    return(
      <Container>
        <ListGroup style={{marginTop:20}}>
          <TransitionGroup className="shopping-list">
          {items.map(({ _id, name }) => (
            <CSSTransition key={_id} timeout={500} classNames="fade">
              <ListGroupItem>
                <Button
                  className="remove-btn"
                  color="danger"
                  style={{marginRight:15}}
                  size="md"
                  onClick = {this.onDeleteClick.bind(this, _id)}
                >
                  &times;
                </Button>
                {name}
              </ListGroupItem>
            </CSSTransition>
          ))}
          </TransitionGroup>
        </ListGroup>

      </Container>
    );
  }
}

ShoppingList.PropTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  item: state.item
});

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);
