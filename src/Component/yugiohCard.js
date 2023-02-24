import {useState} from 'react'
import {Button, Card,Collapse,ListGroup} from 'react-bootstrap'




const YugiohCard = (props)=>{
    let [open, setOpen] = useState(false);
   
    return(
        <Card style={{ width: '18rem' }} className='col-4 cardEl m-5' >
            <Card.Header className=''>
                <Card.Title>{props.name}</Card.Title>

            </Card.Header>
                <Card.Img variant="top"  src={props.img}onClick={()=>setOpen(!open)} />
            <Card.Body>
                <Collapse in={open} >
                    <Card.Text className='' >
                        {props.desc}
                    </Card.Text>
                </Collapse>
                <Button className='  rounded-circle btn-primary' size='sm' onClick={()=>props.add({...props})}>+</Button>
            </Card.Body>
                <ListGroup>
                    {props.atk&&<ListGroup.Item>ATK:{props.atk}</ListGroup.Item>}
                    {props.def&&<ListGroup.Item>DEF:{props.def}</ListGroup.Item>}
                </ListGroup>
        </Card>

    )
}
export default YugiohCard