import { VideoModel } from '../components'
import './App.scss'

export const App = () => {

  return (
    <div className='app'>
      <div className='app__title'>
        <h2 className='app__title--gray'>
          Netris Test
        </h2>
        <h1>
          BIG BUCK BUNNY
        </h1>
      </div>
      <VideoModel />
    </div>
  )
}