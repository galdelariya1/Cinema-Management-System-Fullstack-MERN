
import {Route, Switch} from 'react-router-dom'

import LogInPageComp from './Opening/LogInPage'
import NewUserComp from './Opening/NewUser'
import MainPageComp from './Opening/MainPage'

const HeaderComp = () =>
{

  return (
    <div className = "app-container">

      <h1 className = "main-header"> Movies - Subscription Web Site </h1>

      <Switch>
          <Route exact path="/" component={LogInPageComp} />
          <Route path="/NewUser" component={NewUserComp} />
          <Route path="/MainPage" component={MainPageComp} />
      </Switch>

    </div>
  );
}

export default HeaderComp;
