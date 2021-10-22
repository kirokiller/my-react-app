import "./App.css";
import { Layout, Menu } from "antd";
import { routes } from "./routes";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,
} from "react-router-dom";
const { Header, Content, Footer } = Layout;

const menuData = [
  { name: "主页", url: "/" },
  { name: "关于", url: "/about" },
];

function RouteWithSubRoutes(route: any) {
  return (
    <Route
      path={route.path}
      render={(props) => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}

const Home = withRouter((props) => {
  return (
    <Layout className="layout">
      <Header>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
          {menuData.map((menu, index) => {
            return (
              <Menu.Item key={index}>
                <Link to={menu.url}>{menu.name}</Link>
              </Menu.Item>
            );
          })}
        </Menu>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <div className="site-layout-content">
          <Switch>
            {routes.map((route, i) => (
              <RouteWithSubRoutes key={i} {...route} />
            ))}
          </Switch>
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>just do some funny tests</Footer>
    </Layout>
  );
});

function App() {
  return (
    <Router>
      <Home />
    </Router>
  );
}

export default App;
