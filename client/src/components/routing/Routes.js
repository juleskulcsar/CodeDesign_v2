import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import Dashboard from '../dashboard/Dashboard';
import CreateProfile from '../profile-form/CreateProfile';
import EditProfile from '../profile-form/EditProfile';
// import AddExperience from '../profile-form/AddExperience';
// import AddEducation from '../profile-form/AddEducation';
// import MyPosts from '../profile-form/MyPosts';
// import MyPortfolios from '../profile-form/MyPortfolios';
// import Profiles from '../profiles/Profiles';
// import DesignerProfiles from '../profiles/DesignerProfiles';
// import Profile from '../profile/Profile';
// import Posts from '../posts/Posts';
// import Post from '../post/Post';
// import Portfolios from '../portfolio/Portfolios';
// import PortfolioPage from '../portfolio/PortfolioPage';
import NotFound from '../layout/NotFound';
import PrivateRoute from '../routing/PrivateRoute';
import ImageUpload from '../fileuploader/ImageUpload';
// import PortfolioUpload from '../portfolioUpload/PortfolioUpload';

const Routes = () => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/' component={Login} />
        {/* <Route exact path='/profiles' component={Profiles} />
        <Route exact path='/portfolios' component={Portfolios} />
        <Route exact path='/portfolio/:id' component={PortfolioPage} />
        <Route exact path='/designer-profiles' component={DesignerProfiles} />
        <Route exact path='/user/:id' component={Profile} /> */}
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/create-profile' component={CreateProfile} />
        <PrivateRoute
          exact
          path='/dashboard/edit-profile'
          component={EditProfile}
        />
        <PrivateRoute exact path='/profilephoto' component={ImageUpload} />
        {/* <PrivateRoute exact path='/posts' component={Posts} /> */}
        {/* <PrivateRoute exact path='/dashboard/myposts' component={MyPosts} />
        <PrivateRoute exact path='/dashboard/myjobs' component={MyPortfolios} /> */}
        {/* <PrivateRoute exact path='/posts/:id' component={Post} />
        <PrivateRoute
          exact
          path='/portfolio-upload'
          component={PortfolioUpload}
        /> */}
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
