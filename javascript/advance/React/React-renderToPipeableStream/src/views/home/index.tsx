import { lazy, Suspense, ReactElement } from 'react'
import { NavLink } from "react-router-dom"
import logo from './logo.svg'
import './index.css'

const delay = (): Promise<any> => {
  return new Promise(resolve => {
    setTimeout(async () => {
      resolve(await import('./Article'))
    }, 1000 * 5)
  })
}

const Article = lazy(() => delay())

function Home(): ReactElement {

  return (
    <div className="App">
      <Suspense fallback={<>loading......</>}><Article /></Suspense>
      <header className="App-header">
        <p>
          <NavLink to="/music/1" style={{ color: '#fff' }}>跳转 Music</NavLink>
        </p>
      </header>
    </div>
  )
}

export default Home
