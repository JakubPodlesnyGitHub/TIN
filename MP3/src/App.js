import React from "react";

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';

import Header from './components/fragments/Header';
import Navigation from './components/fragments/Navigation';
import Footer from './components/fragments/Footer';

import MainContent from './components/content/MainContent';

import ClientsList from "./components/content/Client/List/ClientsList";
import ClientDetails from "./components/content/Client/Details/ClientDetails";
import ClientForm from "./components/content/Client/Form/ClientForm";
import DeleteClient from "./components/content/Client/Form/DeleteClient";

import OrderList from "./components/content/Order/List/OrderList";
import OrderDetails from "./components/content/Order/Details/OrderDetails";
import OrderForm from "./components/content/Order/Form/OrderForm";
import DeleteOrder from "./components/content/Order/Form/DeleteOrder";

import MovieForm from "./components/content/Movie/Form/MovieForm";
import MovieDetails from "./components/content/Movie/Details/MovieDetails";
import MovieList from "./components/content/Movie/List/MovieList";
import DeleteMovie from "./components/content/Movie/Form/DeleteMovie";

import StoreList from "./components/content/Store/List/StoreList";
import StoreDetails from "./components/content/Store/Details/StoreDetails";
import StoreForm from "./components/content/Store/Form/StoreForm";
import DeleteStore from "./components/content/Store/Form/DeleteStore";

import GroupList from "./components/content/Group/List/GroupList";
import GroupDetails from "./components/content/Group/Details/GroupDetails";
import GroupForm from "./components/content/Group/Form/GroupForm";
import DeleteGroup from "./components/content/Group/Form/DeleteGroup";

import MembershipList from "./components/content/Membership/List/MembershipList";
import MembershipDetails from "./components/content/Membership/Details/MembershipDetails";
import MembershipForm from "./components/content/Membership/Form/MembershipForm";
import DeleteMembership from "./components/content/Membership/Form/DeleteMembership";
import PasswordForm from "./components/content/Client/Form/PasswordForm";

function App() {
    return (
        <Router>
            <div>
                <Header/>
                <Navigation/>
                <Switch>
                    <Route exact path="/" component={MainContent }/>

                    <Route exact path="/clients" component={ClientsList}/>
                    <Route exact path="/clients/details/:clientId" component={ClientDetails}/>
                    <Route exact path="/clients/add" component={ClientForm}/>
                    <Route exact path="/clients/edit/:clientId" component={ClientForm}/>
                    <Route exact path="/clients/delete/:clientId" component={DeleteClient}/>
                    <Route exact path="/clients/editPassword/:clientId" component={PasswordForm}/>

                    <Route exact path="/orders" component={OrderList}/>
                    <Route exact path="/orders/details/:orderId" component={OrderDetails}/>
                    <Route exact path="/orders/add" component={OrderForm}/>
                    <Route exact path="/orders/edit/:orderId" component={OrderForm}/>
                    <Route exact path="/orders/delete/:orderId" component={DeleteOrder}/>

                    <Route exact path="/movies" component={MovieList}/>
                    <Route exact path="/movies/details/:movieId" component={MovieDetails}/>
                    <Route exact path="/movies/add" component={MovieForm}/>
                    <Route exact path="/movies/edit/:movieId" component={MovieForm}/>
                    <Route exact path="/movies/delete/:movieId" component={DeleteMovie}/>

                    <Route exact path="/store" component={StoreList}/>
                    <Route exact path="/store/details/:storeId" component={StoreDetails}/>
                    <Route exact path="/store/add" component={StoreForm}/>
                    <Route exact path="/store/edit/:storeId" component={StoreForm}/>
                    <Route exact path="/store/delete/:storeId" component={DeleteStore}/>

                    <Route exact path="/groups" component={GroupList}/>
                    <Route exact path="/groups/details/:groupId" component={GroupDetails}/>
                    <Route exact path="/groups/add" component={GroupForm}/>
                    <Route exact path="/groups/edit/:groupId" component={GroupForm}/>
                    <Route exact path="/groups/delete/:groupId" component={DeleteGroup}/>

                    <Route exact path="/memberships" component={MembershipList}/>
                    <Route exact path="/memberships/details/:membershipId" component={MembershipDetails}/>
                    <Route exact path="/memberships/add" component={MembershipForm}/>
                    <Route exact path="/memberships/edit/:membershipId" component={MembershipForm}/>
                    <Route exact path="/memberships/delete/:membershipId" component={DeleteMembership}/>

                </Switch>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;
