import React from 'react'
import ReactDOM from 'react-dom'
import App from 'Src/App'

// 局部热更新（防止一次小改动就导致整个页面进行刷新）
if (module && module.hot) {
  module.hot.accept()
}

ReactDOM.render(
  <App name='2125' age={20} />, 
  document.querySelector('#root')
)
