import { Route } from 'react-router';

export default function renderRoutes(routes_config, user) {
  return routes_config.map((item) => (
    <Route key={item.path} {...item} component={item.component(user)} />
  ));
}
