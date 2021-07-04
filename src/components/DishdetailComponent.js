import React ,{ Component} from 'react';
import {Card, CardBody,CardText,CardImg,CardTitle} from 'reactstrap';

class DishDetail extends Component{

    constructor(props){
        super(props);
        this.state ={

        }
    }
    renderComments (dishComment) {
        if(dishComment != null){
            const comments = dishComment.map((cmt)=>{
                return(
                    <div className="container">
                    <li key={cmt.id}>{cmt.comment}
                    <br/>
                    --{cmt.author} , {new Intl.DateTimeFormat('en-US',{year:'numeric',month:'short',day:'2-digit'}).format(new Date(Date.parse(cmt.date)))}
                    
                    </li>
                    <br/>
                    </div>

                )
            });
        
        return(
            <>
            <h4>Comments</h4>
                <div>
                {comments}
                    
                </div>

                </>
        )
        }
        else{
            return(<></>)
        }
    }
    render(){
       
            if(this.props.dish!=null){
                return(
                <div className= "container">
                <div className="row">
                <div className ="col-12 col-md-5 ml-1">
                <Card>
                    <CardImg width ="100%" src={this.props.dish.image} alt={this.props.dish.name}/>
                    <CardBody>
                        <CardTitle>{this.props.dish.name}</CardTitle>
                        <CardText>{this.props.dish.description}</CardText>
                    </CardBody>
                </Card>
                </div>
                <div className ="col-12 col-md-5 ml-1">
                    {this.renderComments(this.props.dish.comments)}
                </div>
                </div>
                </div>
              
                )
            }
            else{
                return(<div></div>);
                
            }
        
    }
}

export default DishDetail;