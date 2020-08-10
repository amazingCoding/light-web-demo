import '../../assets/app.common.css'
import *  as style from './css.css'
import * as React from "react"
import * as ReactDOM from "react-dom"
import { LightWebCore, ThemeTypes, SuccessResponse, InitResponse, ErrorResponse } from 'light-web-core'
import { Router } from '../../compoment'
const config = {
  isHideNav: false,
  statusStyle: ThemeTypes.light,
  title: '详情页',
  titleColor: '#FFFFFF',
  navBackgroundColor: '#000000',
  backgroundColor: '#f1f1f1',
  bounces: true,
  showCapsule: true,
}
const appController = new LightWebCore(
  config,
  (res: SuccessResponse<InitResponse>) => {
    console.log('=== 初始化 成功回调 ===')
    console.log(res)
    console.log('======');
    ReactDOM.render(<Router nextPageName='about' appController={appController} />, document.getElementById("main"))
  },
  (err: ErrorResponse) => {
    console.log(err)
  }
)

