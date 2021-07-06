import { Component } from 'react';

import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import {DISHES} from '../shared/dishes';
import {COMMENTS} from '../shared/comments';
import {PROMOTIONS} from '../shared/promotions';
import {LEADERS} from '../shared/leaders';
import Contact from './ContactUsComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import {Switch,Route,Redirect} from 'react-router-dom';

class Main extends Component{
constructor(props){
super(props);
this.state = {
  dishes: DISHES,
  comments: COMMENTS,
  promotion : PROMOTIONS,
  leaders :LEADERS,
  selectedDish :null
}
}

  render(){
    const HomePage = ()=>{
      return(
        <Home dish={this.state.dishes.filter((dish)=> dish.featured===true)[0]}
          promotion={this.state.promotion.filter((promo)=> promo.featured===true)[0]}
          leader={this.state.leaders.filter((leader)=> leader.featured===true)[0]}/>
      )
    }
    const DishWithId = ({match}) => {
      return(
          <DishDetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
            comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />
      );
    };
    return(
      <>
        <Header/>
        <Switch>
          <Route path="/home" component={HomePage}/>
          <Route exact path="/menu" component={()=><Menu dishes={this.state.dishes}/>}/>
          <Route exact path="/contactus" component={Contact}/>
          <Route exact path="/aboutus" component ={()=><About leaders={this.state.leaders}/>}/>
          <Route path="/menu/:dishId" component={DishWithId}/>
          <Redirect to="/home"/>
        </Switch>
        <Footer/>
      </>
 

    )
  }
}

export default Main;
