import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import Dashboard from '../dashboard/Dashboard';
import CreateProfile from '../profile-form/CreateProfile';
import EditProfile from '../profile-form/EditProfile';
import MyGithub from '../profile-form/MyGithub';
import MyPosts from '../profile-form/MyPosts';
import MyJobs from '../profile-form/MyJobs';
import Settings from '../profile-form/Settings';
import AllUsers from '../UserProfiles/AllUsers';
import UserProfileAbout from '../UserProfiles/UserProfileAbout';
import UserProfileGithub from '../UserProfiles/UserProfileGithub';
import UserProfileJobs from '../UserProfiles/UserProfileJobs'
import UserProfilePosts from '../UserProfiles/UserProfilePosts'
import AllJobs from '../job/AllJobs';
import Job from '../job/JobPage';
import AllPosts from '../post/AllPosts';
// import PortfolioPage from '../portfolio/PortfolioPage';
import NotFound from '../layout/NotFound';
import PrivateRoute from '../routing/PrivateRoute';
import ImageUpload from '../fileuploader/ImageUpload';

const Routes = () => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/' component={Login} />
        <PrivateRoute exact path='/profiles' component={AllUsers} />
        <PrivateRoute exact path='/posts' component={AllPosts} />
        {/* <Route exact path='/portfolio/:id' component={PortfolioPage} />*/}
        <PrivateRoute exact path='/user/:id' component={UserProfileAbout} />
        <PrivateRoute exact path='/user/:id/github' component={UserProfileGithub} />
        <PrivateRoute exact path='/user/:id/posts' component={UserProfilePosts} />
        <PrivateRoute exact path='/user/:id/jobs' component={UserProfileJobs} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/dashboard/github' component={MyGithub} />
        <PrivateRoute exact path='/create-profile' component={CreateProfile} />
        <PrivateRoute
          exact
          path='/dashboard/edit-profile'
          component={EditProfile}
        />
        <PrivateRoute exact path='/profilephoto' component={ImageUpload} />
        <PrivateRoute exact path='/jobs' component={AllJobs} />
        <PrivateRoute exact path='/dashboard/my-jobs' component={MyJobs} />
        <PrivateRoute exact path='/dashboard/my-posts' component={MyPosts} />
        <PrivateRoute exact path='/dashboard/my-jobs' component={MyJobs} />
        <PrivateRoute exact path='/dashboard/settings' component={Settings} />
        <PrivateRoute exact path='/job/:id' component={Job} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
