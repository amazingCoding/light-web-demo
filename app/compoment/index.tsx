import * as React from "react"
import *  as style from './css.css'
import { LightWebCore, ThemeTypes, BridgeEvents, SuccessResponse, InitResponse, ErrorResponse, PageResponse, EventRemove, ThemeConfig, PageConfig } from 'light-web-core'
interface Prop {
  appController: LightWebCore
  nextPageName?: string
}
let showEvent: EventRemove = null
let hideEvent: EventRemove = null
let scenceEvent: EventRemove = null
let activeEvent: EventRemove = null
let backGroundEvent: EventRemove = null
export const EventComponent = ({ appController }: Prop): React.ReactElement => {
  const [event, setEvent] = React.useState<boolean>(true)
  const handleSwitch = () => {
    setEvent(!event)
    if (!event) {
      subEvent()
    }
    else {
      if (hideEvent) hideEvent()
      if (showEvent) showEvent()
      if (scenceEvent) scenceEvent()
      if (activeEvent) activeEvent()
      if (backGroundEvent) backGroundEvent()

    }
  }
  const subEvent = () => {
    hideEvent = appController.sub(BridgeEvents.hide, (res) => {
      console.log('===page hide 事件监听 ===')
      console.log(res)
      console.log('======');
    })
    showEvent = appController.sub(BridgeEvents.show, (res) => {
      console.log('=== page show 事件监听 ===')
      console.log(res)
      console.log('======');
    })
    scenceEvent = appController.sub(BridgeEvents.sceneMode, (res) => {
      console.log('=== sceneMode 事件监听 ===')
      console.log(res)
      console.log('======');
    })
    activeEvent = appController.sub(BridgeEvents.active, (res) => {
      console.log('=== active 事件监听 ===')
      console.log(res)
      console.log('======');
    })
    backGroundEvent = appController.sub(BridgeEvents.backGround, (res) => {
      console.log('=== backGround 事件监听 ===')
      console.log(res)
      console.log('======');
    })
  }
  React.useEffect(() => {
    subEvent()
  }, [])
  return (
    <div className={style.box}>
      <h2 className={style.title}>事件监听</h2>
      <div className={style.line}>
        <div className={style.lineLeft}>监听事件</div>
        <div className={style.lineRight}>
          <input className={style.switch} type="checkbox" checked={event} onChange={handleSwitch} />
        </div>
      </div>
    </div>
  )
}
export const App = ({ appController }: Prop): React.ReactElement => {
  const [hideNav, setHideNav] = React.useState<boolean>(false)
  const [title, setTitle] = React.useState<string>('')
  const [titleColor, setTitleColor] = React.useState<string>('')
  const [navColor, setNavColor] = React.useState<string>('')
  const [bgColor, setBgColor] = React.useState<string>('')
  const [styleType, setStyleType] = React.useState<boolean>(true)
  const [themeConfig, setThemeConfig] = React.useState<ThemeConfig>(appController.themeConfig)


  const handleHideNavEvent = () => {
    setHideNav(!hideNav)
    // 发送到 native 层
    const data = { isHideNav: !hideNav }
    appController.changePageConfig(data, (res: SuccessResponse<PageResponse>) => {
      console.log('=== changePageConfig 回调 ===')
      console.log(res)
      console.log('======');

    }, (err) => { })
  }
  const handleInputTextEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    const index = Number(e.currentTarget.getAttribute('data-index'))
    switch (index) {
      case 0: {
        setTitle(e.target.value)
        break
      }
      case 1: {
        setTitleColor(e.target.value)
        break
      }
      case 2: {
        setNavColor(e.target.value)
        break
      }
      case 3: {
        setBgColor(e.target.value)
        break
      }
    }
  }
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setThemeConfig(Number(e.target.value))
  }
  const handleStyleEvent = () => {
    setStyleType(!styleType)
  }
  const handleBtnEvent = () => {
    const data: PageConfig = {
      statusStyle: !styleType ? ThemeTypes.light : ThemeTypes.dark,
      title,
      titleColor,
      navBackgroundColor: navColor,
      backgroundColor: bgColor,
      theme: themeConfig
    }
    appController.changePageConfig(data, (res: SuccessResponse<PageResponse>) => {
      console.log('=== changePageConfig 回调 ===')
      console.log(res)
      console.log('======');
    }, (err) => { })
  }
  const renderBox = () => {
    return (
      <React.Fragment>
        <div className={style.line}>
          <div className={style.lineLeft}>标题设置</div>
          <div className={style.lineRight}>
            <input type='text' data-index={0} value={title} onChange={handleInputTextEvent} className={style.lineInput} placeholder="标题" />
          </div>
        </div>
        <div className={style.line}>
          <div className={style.lineLeft}>标题颜色</div>
          <div className={style.lineRight}>
            <input type='text' data-index={1} value={titleColor} onChange={handleInputTextEvent} className={style.lineInput} placeholder="标题颜色" />
          </div>
        </div>
        <div className={style.line}>
          <div className={style.lineLeft}>导航栏颜色</div>
          <div className={style.lineRight}>
            <input type='text' data-index={2} value={navColor} onChange={handleInputTextEvent} className={style.lineInput} placeholder="导航栏颜色" />
          </div>
        </div>
        <div className={style.line}>
          <div className={style.lineLeft}>页面背景颜色</div>
          <div className={style.lineRight}>
            <input type='text' data-index={3} value={bgColor} onChange={handleInputTextEvent} className={style.lineInput} placeholder="页面背景颜色" />
          </div>
        </div>
        <div className={style.line}>
          <div className={style.lineLeft}>主题配置</div>
          <div className={style.lineRight}>
            <select value={themeConfig} className={style.lineInput} onChange={handleSelect} >
              <option key={0} value={0}>light</option>
              <option key={1} value={1}>dark</option>
              <option key={2} value={2}>auto</option>
            </select>
          </div>
        </div>
        <div className={style.line}>
          <div className={style.lineLeft}>状态栏样式</div>
          <div className={style.lineRight}>
            <input className={style.selectBox} onChange={handleStyleEvent} checked={styleType} type="checkbox" />
          </div>
        </div>
        <div className={style.line}>
          <div className={style.lineLeft}>橡皮筋特效(IOS)</div>
          <div className={style.lineRight}>
            <input className={style.switch} type="checkbox" disabled />
          </div>
        </div>
        <div className={style.btn} onClick={handleBtnEvent}>确定</div>
        <div className={style.block}></div>
      </React.Fragment>
    )
  }
  return (
    <div className={style.box}>
      <h2 className={style.title}>页面配置</h2>
      <div className={style.line}>
        <div className={style.lineLeft}>是否隐藏导航栏</div>
        <div className={style.lineRight}>
          <input className={style.switch} type="checkbox" checked={hideNav} onChange={handleHideNavEvent} />
        </div>
      </div>
      {hideNav ? null : renderBox()}
    </div>
  )
}
export const Router = ({ appController, nextPageName }: Prop): React.ReactElement => {
  const { maxRouters, currentPos } = appController.routerInfo
  const handleBtnEvent = (e: React.MouseEvent<HTMLDivElement>) => {
    const routerAction = Number(e.currentTarget.getAttribute('data-action'))
    switch (routerAction) {
      case 0: {
        appController.push(
          { name: nextPageName, extra: 'push 额外信息' },
          (res) => {
            console.log('=== push 成功回调 ===')
            console.log(res)
            console.log('======');
          },
          (err) => {
            console.log('=== push 失败回调 ===')
            console.log(err)
            console.log('======');
          }
        )
        break
      }
      case 1: {
        const isToRoot = Number(e.currentTarget.getAttribute('data-root')) === 1
        appController.pop({
          extra: 'pop extra',
          isToRoot
        }, (err) => {
          console.log('=== pop 失败回调 ===')
          console.log(err)
          console.log('======');
        })
        break
      }
      case 2: {
        appController.replace({
          name: 'about',
          extra: 'replace extra',
        }, (err) => {
          console.log('=== replace 失败回调 ===')
          console.log(err)
          console.log('======');
        })
        break
      }
      case 3: {
        appController.setPopExtra(
          { extra: { a: 1, b: 'setPopExtra 额外信息' } },
          (res) => {
            console.log('=== setPopExtra 成功回调 ===')
            console.log(res)
            console.log('======');
          },
          (err) => {
            console.log('=== setPopExtra 失败回调 ===')
            console.log(err)
            console.log('======');
          }
        )
        break
      }
      case 4: {
        appController.restart((err) => {
          console.log('=== restart 失败回调 ===')
          console.log(err)
          console.log('======');
        })
        break
      }
      case 5: {
        appController.pop({
          extra: 'pop extra',
          pos: 1
        }, (err) => {
          console.log('=== pop 失败回调 ===')
          console.log(err)
          console.log('======');
        })
        break
      }
      case 6: {
        appController.replace({
          name: 'index',
          pos: 2,
          extra: 'replace extra',
        }, (err) => {
          console.log('=== replace 失败回调 ===')
          console.log(err)
          console.log('======');
        })
        break
      }
    }
  }
  return (
    <div className={style.box}>
      <h2 className={style.title} onTouchStart={() => {
        console.log(1);
      }}>路由系统</h2>
      <div className={style.line}>
        <div className={style.lineLeft}>最大层级</div>
        <div className={style.lineRight}>{maxRouters}</div>
      </div>
      <div className={style.line}>
        <div className={style.lineLeft}>当前位置</div>
        <div className={style.lineRight}>{currentPos}</div>
      </div>
      <div data-action={0} className={style.btnLine} onClick={handleBtnEvent}>下一页</div>
      <div data-root={0} data-action={1} className={style.btnLine} onClick={handleBtnEvent}>返回上一页</div>
      <div data-action={5} className={style.btnLine} onClick={handleBtnEvent}>pop 到第二位置</div>
      <div data-root={1} data-action={1} className={style.btnLine} onClick={handleBtnEvent}>返回首页</div>
      {
        nextPageName === 'about' ? <div data-action={2} className={style.btnLine} onClick={handleBtnEvent}>替换</div> : ''
      }
      {
        nextPageName === 'about' ? <div data-action={6} className={style.btnLine} onClick={handleBtnEvent}>替换 到第三个位置</div> : ''
      }
      <div className={style.btnLine} data-action={3} onClick={handleBtnEvent}>设置返回参数</div>
      {
        nextPageName === 'about' ? <div className={style.btnLine} data-action={4} onClick={handleBtnEvent}>重启</div> : ''
      }
    </div>
  )
}
export const Other = ({ appController }: Prop): React.ReactElement => {
  const handleBtnEvent = (e: React.MouseEvent<HTMLDivElement>) => {
    const index = Number(e.currentTarget.getAttribute('data-action'))
    switch (index) {
      case 0:
      case 1: {
        appController.vibrate(index === 0,
          (res) => {
            console.log('=== vibrate 成功回调 ===')
            console.log(res)
            console.log('======');
          },
          (err) => {
            console.log('=== vibrate 失败回调 ===')
            console.log(err)
            console.log('======');
          })
        break
      }
      case 3: {
        appController.setClipboard('哈哈哈', (res) => {
          console.log('=== setClipboard 成功回调 ===')
          console.log(res)
          console.log('======');
        },
          (err) => {
            console.log('=== setClipboard 失败回调 ===')
            console.log(err)
            console.log('======');
          })
        break
      }
      case 2: {
        appController.getClipboard((res) => {
          console.log('=== getClipboard 成功回调 ===')
          console.log(res)
          console.log('======');
        },
          (err) => {
            console.log('=== getClipboard 失败回调 ===')
            console.log(err)
            console.log('======');
          })
        break
      }
    }
  }
  return (
    <div className={style.box}>
      <h2 className={style.title} onTouchStart={() => {
        console.log(1);
      }}>其他</h2>
      <div data-action={0} className={style.btnLine} onClick={handleBtnEvent}>长震动</div>
      <div data-action={1} className={style.btnLine} onClick={handleBtnEvent}>短震动</div>
      <div data-action={2} className={style.btnLine} onClick={handleBtnEvent}>读取剪切板内容</div>
      <div data-action={3} className={style.btnLine} onClick={handleBtnEvent}>把内容写到剪切板剪切板内容</div>
    </div>
  )
}