import React,{Component}  from 'react';
import {Card, CardBody,CardText,CardImg,CardTitle,BreadcrumbItem,Breadcrumb, Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control, Errors, LocalForm} from 'react-redux-form';
import { Col, Label, Modal,ModalBody,ModalHeader, Row } from 'reactstrap';


const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component{
    constructor(props){
        super(props);

        this.state ={
            isModalOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this);
    }
   toggleModal(){
    this.setState({isModalOpen : ! this.state.isModalOpen});
   };

   handleSubmit(values){

    alert("Current state: "+ JSON.stringify(values));   
    }

    render(){
        return(
            <>
            <div className="container">
            <Row>
            <Button onClick ={this.toggleModal} outline type="submit" ><i className="fas fa-pencil-alt"></i>Submit Comment</Button>
            </Row>
            </div>
     
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                <LocalForm onSubmit={(values)=>{this.handleSubmit(values)}}>
                    <Row className="form-group">
                        <Col>
                        <Label htmlFor="rating">Rating</Label>
                        <Control.select model=".rating" id ="rating" name="rating" className="form-control">
                        <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                        </Control.select>
                        
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <Label htmlFor="author">Your Name</Label>
                        <Control.text model=".author" id="author" name="author" placeholde="YourName"  className="form-control"
                        validators={{minLength :minLength(3), maxLength: maxLength(15)}}/>
                        <Errors
                                className="text-danger"
                                model=".author" show="touched" 
                                messages ={
                                    {
                                        
                                        minLength : 'Must be greater than 2 characters',
                                        maxLength : 'Must be 15 characters or less'
                                    }
                                }
                            />
                            
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <Label htmlFor="comment">Comment</Label>
                        <Control.textarea model=".comment" rows="6" id="comment" name="comment"  className="form-control"/>
                        </Col>
                   </Row>
                 <Row >
                   <Col >
                    <Button type="submit" className="bg-primary ">Submit</Button>
                    </Col>
                    </Row>
                 
                </LocalForm>
                </ModalBody>
                
            </Modal>
            </>
        );
    }
}
function RenderDish({dish}){
    if(dish != null){
        return(
            <Card>
            <CardImg width ="100%" src={dish.image} alt={dish.name}/>
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
        )
    }
    else{
        return(<></>);
    }
}

function RenderComments({comments}){
    if(comments!=null){
       const commentList = comments.map((cmt) =>{
           return(
        <div>
        <li key={cmt.dishId} >{cmt.comment}
                <br/>
                --{cmt.author} , {new Intl.DateTimeFormat('en-US',{year:'numeric',month:'short',day:'2-digit'}).format(new Date(Date.parse(cmt.date)))}
                
                </li>
                <br/>
                
        </div>
           )
            });

       return(
           <>
           <div >
               <h4>Comments</h4>
               {commentList}
               <CommentForm/>
           </div>
           
       </>
       )
    }
    else{
        return(<div></div>)
    }
}
const DishDetail = (props)=>{
    if(props.dish!=null){
    return(
    <div className="container">
        <div className="row">
                    <Breadcrumb>
            
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                </div>
        <div className="row">
            <div className="col-12 col-md-5 ml-1">
            <RenderDish dish = {props.dish}/>
            </div>
            <div className="col-12 col-md-5 ml-1">
            <RenderComments comments= {props.comments}/>
           
            </div>
           
        </div>
        

    </div>
    )
    }
    else{
      return  (<></>)
    }
}
export default DishDetail;
            

 