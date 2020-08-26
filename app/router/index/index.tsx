import '../../assets/app.common.css'
import *  as style from './css.css'
import * as React from "react"
import * as ReactDOM from "react-dom"
import { LightWebCore, ThemeTypes, ThemeConfig, BridgeEvents, SuccessResponse, InitResponse, ErrorResponse, PageConfig } from 'light-web-core'
import { Router, App, EventComponent, Other } from '../../compoment'
console.log(__DEV__);

const config: PageConfig = {
  isHideNav: false,
  statusStyle: ThemeTypes.dark,
  title: '标题标题标题标题标题标题标题标题标题标题',
  titleColor: '#000000',
  navBackgroundColor: '#ffffff',
  backgroundColor: '#f1f1f1',
  bounces: true,
  showCapsule: true,
  theme: ThemeConfig.auto,
}
interface MainProp {
  appController: LightWebCore
}
const Main = ({ appController }: MainProp) => {
  return (
    <div>
      <App appController={appController} pageConfig={config} />
      <Router nextPageName='detail' appController={appController} />
      <Other appController={appController} />
      <EventComponent appController={appController} />
    </div>
  )
}
const appController = new LightWebCore(
  config,
  (res: SuccessResponse<InitResponse>) => {
    console.log('=== 初始化 成功回调 ===')
    console.log(res)
    console.log('======');
    ReactDOM.render(<Main appController={appController} />, document.getElementById("main"))
  },
  (err: ErrorResponse) => {
    console.log(err)
  }
)

