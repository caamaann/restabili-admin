import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import SLUGS from 'resources/slugs';
import LoadingComponent from 'components/loading';

const Dashboard = lazy(() => import('./dashboard'));
const ArticlesManagement = lazy(() => import('./management-articles'));
const CreateArticle = lazy(() => import('./create-article'));
const UsersManagement = lazy(() => import('./management-users'));

function PrivateRoutes() {
    return (
        <Suspense fallback={<LoadingComponent loading />}>
            <Switch>
                <Route exact path={SLUGS.dashboard} component={Dashboard} />
                <Route exact path={SLUGS.managementUsers} component={UsersManagement} />
                <Route exact path={SLUGS.managementChannel} render={() => <div>Channel Management</div>} />
                <Route exact path={SLUGS.managementArticles}  component={ArticlesManagement} />
                <Route exact path={SLUGS.createArticle}  component={CreateArticle} />
                <Route exact path={SLUGS.settings} render={() => <div>settings</div>} />
                <Redirect to={SLUGS.dashboard} />
            </Switch>
        </Suspense>
    );
}

export default PrivateRoutes;
