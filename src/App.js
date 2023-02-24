
import {Nav,Navbar,Container,NavDropdown,Form,Button,Card,ListGroup, Collapse} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import YugiohCard from './Component/yugiohCard';
import DeckOffcanvas from './Component/Deck';

function App() {
 
  
  let [query, setQuery] = useState('')
  let [cards, setCards] = useState([])
  const [show, setShow] = useState(false);
  let [deck, setDeck] = useState([])
  
  const handleShow = () => setShow(!show);


  useEffect(()=>{
     axios.get('https://db.ygoprodeck.com/api/v7/cardinfo.php')
     .then(res=>setCards(cards=res.data.data))
     getCards()

     

    

  },[])
  const addCard = (card)=>{
    
    if(deck.filter(name=>name.name ===card.name).length < 3){
      deck.push(card)
      localStorage.setItem('deck',JSON.stringify(deck))

    }else{
      alert('error')
    }
  }

  const getCards = ()=>{
    if(!localStorage.deck) return
    setDeck(deck=JSON.parse(localStorage.deck))
  }
  const clearDeck = ()=>{
    localStorage.clear()
    console.log('clear')
    setDeck(deck=[])
  }

  const filteredCards =  cards.filter(card=>card.name.toLowerCase().includes(query.toLowerCase()))
  return (
    <div className="App bg-dark">
      <Navbar className='fixed-top t' bg="black" expand="lg">
      <Container fluid={true}>
        <Navbar.Brand className='text-light' href="#">YugiohCardDB</Navbar.Brand>
        <Navbar.Toggle className='bg-light' aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
        <Button onClick={handleShow}>DECK</Button>
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={query}
              onChange={(e)=>{setQuery(query=e.target.value)}}
            />
           
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      <div  className='d-flex flex-row flex-wrap justify-content-around align-content-center m-5 p-5'>
      {filteredCards.splice(0,99).map(card=>{
        return(
          <YugiohCard key={card.id} name={card.name} atk={card.atk} def={card.def} img={card.card_images[0].image_url } desc={card.desc} add={addCard}/>
  
        )
      })}
      </div>
      <DeckOffcanvas hide={handleShow} state={show} deck={deck} clear={clearDeck} get={getCards}/>
    </div>
  );
}

export default App;
