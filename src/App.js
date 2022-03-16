import HeaderWebsite from "./Component/HeaderWebsite";
import 'antd/dist/antd.css'
import {Layout} from "antd";
import SiderWebsite from "./Component/SiderWebsite";
import ContentWebsite from "./Component/ContentWebsite";
import {Redirect, Route, Switch} from "react-router-dom";
import Order from "./Component/Order";
import Product from "./Component/Product";
import EditableTable from "./Component/EditableTable";

const App = () => {
    return (
        <Layout>
            <HeaderWebsite/>
            <Layout>
                <SiderWebsite/>
                <ContentWebsite>
                    <Switch>
                        <Route  path='/' exact>
                           <Redirect to={'/customer'}/>
                        </Route>
                        <Route  path='/customer'>
                            <EditableTable/>
                        </Route>
                        <Route path='/order'>
                            <Order/>
                        </Route>
                        <Route path='/product'>
                            <Product/>
                        </Route>
                    </Switch>
                </ContentWebsite>
            </Layout>
        </Layout>
    )
}
export default App;