import React, { Suspense, lazy } from "react";
import { HashRouter, Route, Switch, Link } from 'react-router-dom';
import Loading from "@components/Loading";
import { loadable } from "@services/common";
import "./App.css";
import Menu from "@components/Menu";
import Header from "@components/Header";
import JSOM from "@services/jsom";
import Caml from "@services/caml";
import Config from "@config";
import { T } from "@services/translation";
import Error from "@components/ErrorBoundary/Error";

// fabric react icon initial
import { initializeIcons } from "office-ui-fabric-react/lib/Icons";
import ErrorBoundary from "@components/ErrorBoundary";
initializeIcons("../assets/fonts/uifabric/");
import Home from './pages/home'

window.isLoaded = true;
export interface Info {
    userInfo: any;
    user: User;
    isShow: boolean;
    message?: string;
}
interface User {
    Title: string;
    ID: string;
}
interface IAppState {
    info: any
}
export class App extends React.Component<{}, IAppState> {
    private menus = {}
    constructor(props) {
        super(props);
        this.state = {
            info: undefined
        }
        this.menus = [{
            links: [
                {
                    name: T("首页"),
                    url: '#/',
                    icon: 'Home',
                    key: 'home'
                }
            ]
        }]
    }
    render() {
        return (
            <ErrorBoundary>
                <HashRouter>
                    <div className="app" >
                        {/* 去除导航就只能通过链接进入对应的route */}
                        <Header info={this.state.info}></Header>
                        <Menu
                            menus={(this.menus) as any}
                        />
                        <div className="sr-app-content">
                            <Suspense fallback={<Loading />}  >
                                <ErrorBoundary>
                                    <Switch>
                                        <Route exact path="/" component={Home} ></Route>
                                        {/* <Route path="/listCRUD" component={ListCRUD}  ></Route> */}
                                        <Route render={() => <Error errorMessage={"页面错误，请返回"}/>} />
                                    </Switch>
                                </ErrorBoundary>
                            </Suspense>
                        </div>
                    </div>
                </HashRouter>
            </ErrorBoundary>)
    }

    componentDidMount() {
        this.onInitial()
    }

    /**
     * 初始化页面
     */
    async onInitial() {
        let info: Info = {
            user: undefined,
            userInfo: undefined,
            message: "",
            isShow: false,
        };
        try {
            let userInfo = await this.getUserInfo();
            info = await this.getSiteUserInfo(userInfo);
            console.log(info)
            this.setState({
                info
            });
        }
        catch (e) {
            console.log(e + "初始化失败");
            info.message = e + "初始化失败";
        }
    }

    /**
     * 获取当前用户
     */
    async getUserInfo() {
        try {
            let info = await JSOM.create("", "").getCurrentUser();
            let user = {
                Title: info.data.get_title(),
                ID: info.data.get_id()
            }
            return {
                user
            }
        }
        catch (e) {
            throw ("get UserInfo error")
        }
    }

    /**
     * 获取用户信息
     * @param data 
     */
    async getSiteUserInfo(data) {
        try { 
            let result = await JSOM.create("", "").getSiteUserInfo(Caml.Express().And("Eq", "ID", "Text", data.user.ID).End());
            if (result.data.data.length > 0) {
                data["userInfo"] = result.data.data[0];
                if (result.data.data[0].Picture) {
                    data["userInfo"].PicUrl = result.data.data[0].Picture.get_url();
                }
                else {
                    data["userInfo"].PicUrl = Config.File.Img.Path + "/sr-personal-photo.png";
                }
            }
            return data;
        }
        catch (e) {
            throw ("getSiteUserInfo error");
        }
    }
}
export default App;
