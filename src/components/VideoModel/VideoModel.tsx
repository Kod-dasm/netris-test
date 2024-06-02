import { useRef, useState, useCallback } from 'react'
import { iconPlay, iconPause } from '../../assets'
import './VideoModel.scss'

type ActionsEvent = 'Paused' | 'Played' | 'Changed time'

interface Event {
  action: ActionsEvent
  value: number
}

interface ActionsEventObject {
  PAUSED: ActionsEvent
  PLAYED: ActionsEvent
  CHANGED_TIME: ActionsEvent
}

interface LinkInterval {
  action: 'Played'
  link: number
}

const ACTIONS_EVENT: ActionsEventObject = {
  PAUSED: 'Paused',
  PLAYED: 'Played',
  CHANGED_TIME: 'Changed time'
}

export const VideoModel = () => {
  const [isPlay, setPlay] = useState(false)
  const [time, setTime] = useState('0')
  const [listEvents, setListEvents] = useState<Event[]>([])
  const [stackInterval, setStackInterval] = useState<LinkInterval[]>([])
  
  const ref = useRef<HTMLVideoElement>(null)

  const clearStackInterval = useCallback(() => {
    stackInterval.map(interval => clearInterval(interval.link))
    setStackInterval([])
  }, [stackInterval])

  const handleChangePlay = useCallback(() => {
    const video = ref?.current

    if (video) {
      const currentTime = video.currentTime
      
      
      if (isPlay) {
        video.pause()
        setListEvents(prevState => [...prevState, { action: ACTIONS_EVENT.PAUSED, value: currentTime}])
        clearStackInterval()
      }
      else {
        video.play()
        setListEvents(prevState => [...prevState, { action: ACTIONS_EVENT.PLAYED, value: currentTime}])

        const interval = setInterval(() => {
          setTime(prevState => {
            if (Number(prevState) > video.duration) {
              clearInterval(interval)
              setPlay(false)
              return '0'
            }

            return String(Number(prevState) + 1)
          })
        }, 1000)
        setStackInterval(prevState => [...prevState, { link: interval, action: 'Played' }])
      }
      setPlay(!isPlay)
    }
  }, [clearStackInterval, isPlay])

  const handleChangeTime = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const video = ref?.current
    const currentTime = e.target.value

    if (video) {
      video.currentTime = Number(currentTime)
      setTime(currentTime)
      setListEvents(prevState => [...prevState, { action: ACTIONS_EVENT.CHANGED_TIME, value: Number(currentTime)}])
    }
  }, [])

  return (
    <div className='video'>
      <video
        ref={ref}
        poster="https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217"
        src='https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
        className='video__window'
        onClick={handleChangePlay}
      >
      </video>
      <div className="video__controls">
        <input className="ideo-controls__timeline" type="range" value={time}  min='0' max={ref?.current?.duration ?? 0} onChange={handleChangeTime}></input>
        <img className="video-controls__icon" src={isPlay ? iconPause : iconPlay} onClick={handleChangePlay} />
      </div>
      <div>
        {listEvents?.map(event =>
          <p key={event.action + event.value}>{event.action} - {event.value}</p>
        )}
      </div>
    </div>
  )
}