import { Component } from 'react';

import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Contact from './ContactUsComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import {Switch,Route,Redirect,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {addComment} from '../redux/ActionCreators';



const mapStatetoProps = state =>{
 return{
   dishes :state.dishes,
   leaders :state.leaders,
   comments: state.comments,
   promotions :state.promotions
 } 
}
const mapDispatchToProps = dispatch => ({
  addComment : (dishId, rating, author, comment) => dispatch (addComment(dishId, rating, author, comment))
});
class Main extends Component{

  render(){
    const HomePage = ()=>{
      return(
        <Home dish={this.props.dishes.filter((dish)=> dish.featured===true)[0]}
          promotion={this.props.promotions.filter((promo)=> promo.featured===true)[0]}
          leader={this.props.leaders.filter((leader)=> leader.featured===true)[0]}/>
      )
    }
    const DishWithId = ({match}) => {
      return(
          <DishDetail dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
            comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
            addComment = {this.props.addComment} />
      );
    };
    return(
      <>
        <Header/>
        <Switch>
          <Route path="/home" component={HomePage}/>
          <Route exact path="/menu" component={()=><Menu dishes={this.props.dishes}/>}/>
          <Route exact path="/contactus" component={Contact}/>
          <Route exact path="/aboutus" component ={()=><About leaders={this.props.leaders}/>}/>
          <Route path="/menu/:dishId" component={DishWithId}/>
          <Redirect to="/home"/>
        </Switch>
        <Footer/>
      </>
 

    )
  }
}

export default withRouter(connect(mapStatetoProps,mapDispatchToProps)(Main));
