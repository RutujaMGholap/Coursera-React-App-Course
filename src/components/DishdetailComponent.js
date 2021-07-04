import React  from 'react';
import {Card, CardBody,CardText,CardImg,CardTitle} from 'reactstrap';

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
        <li key={cmt.id} >{cmt.comment}
                <br/>
                --{cmt.author} , {new Intl.DateTimeFormat('en-US',{year:'numeric',month:'short',day:'2-digit'}).format(new Date(Date.parse(cmt.date)))}
                
                </li>
                <br/>
        </div>
           )
            });

       return(
           <div>
               <h4>Comments</h4>
               {commentList}
           </div>
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
            <div className="col-12 col-md-5 ml-1">
            <RenderDish dish = {props.dish}/>
            </div>
            <div className="col-12 col-md-5 ml-1">
            <RenderComments comments= {props.dish.comments}/>
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
            

 