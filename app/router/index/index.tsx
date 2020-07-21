import '../../assets/app.common.css'
import * as React from "react"
import * as ReactDOM from "react-dom"
import { LightWebCore, RouterActions, StyleTypes, BridgeEvents, SuccessResponse, InitResponse, ErrorResponse } from 'light-web-core'
const config = {
  isHideNav: false,
  statusStyle: StyleTypes.light,
  title: '标题',
  titleColor: '#ffffff',
  navBackgroundColor: '#000000',
  backgroundColor: '#f1f1f1',
  bounces: true,
  showCapsule: true,
}
const appController = new LightWebCore(
  config,
  (res: SuccessResponse<InitResponse>) => {
    console.log(res)
  },
  (err: ErrorResponse) => {
    console.log(err)
  }
)
const App = (): React.ReactElement => {
  return(
    <div>12</div>
  )
}
ReactDOM.render(<App />, document.getElementById("main"))