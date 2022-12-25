import { useRecorder, useSource } from 'src/hooks'

const Recorder = () => {
  const { isActive } = useSource()
  const recorder = useRecorder()

  return (
    <div className='flex flex-col items-center'>
      <h2 className='text-xl font-bold'>Recorder</h2>
      <div className='flex justify-center space-x-4'>
        <button disabled={!isActive || recorder.isRecording} onClick={recorder.startRecording}>
          Start
        </button>
        <button disabled={!isActive || !recorder.isRecording} onClick={recorder.stopRecording}>
          Stop
        </button>
      </div>
    </div>
  )
}

export default Recorder
