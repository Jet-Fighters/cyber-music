import React from 'react'
import style from './app.scss'

interface IProps {
  name: string
  age: number
}

function App(props: IProps) {
  const { name, age } = props
  console.log('1111dddd111111111111')
  return (
    <div className={style.app}>
      <span>{`H1 ${name}, ${age} ykddd old.`}</span>
    </div>
  )
}

export default App
