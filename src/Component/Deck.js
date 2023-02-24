import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { ListGroup,Figure } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrash} from '@fortawesome/free-solid-svg-icons'


function DeckOffcanvas(props) {
  const [show, setShow] = useState(props.open);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const deleteCard = (e)=>{
    let cardIndex = e.target.closest('[data-index]').dataset.index
    let deck = JSON.parse(localStorage.deck)
    deck.splice(cardIndex,1)
    localStorage.setItem('deck',JSON.stringify(deck))
    props.get()
    
  }



  return (
    <>
      <Offcanvas  show={props.state} onHide={props.hide} >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className='deck-title'>DECK</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <ListGroup>
                {props.deck.map((card,value)=>{
                    return (<ListGroup.Item className=' d-flex justify-content-around'>
          
                      {card.name}
                      <span>
                       <img src={card.img} style={{height:'35px',width:'30px'}}></img>
                      </span>
                      <span onClick={deleteCard} data-index={value}>
                        <FontAwesomeIcon className='text-danger'  icon={faTrash}/>
                      </span>
                      </ListGroup.Item>)
                })}
            </ListGroup>
            <Button onClick={props.clear}>Clear deck</Button>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default DeckOffcanvas