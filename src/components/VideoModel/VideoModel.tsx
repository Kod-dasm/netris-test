import './VideoModel.scss'

export const VideoModel = () => {

  return (
    <video
      controls
      poster="https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217"
      src='https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
      className='video'
    >
    </video>
  )
}