import { useSourceInput } from 'src/hooks'
import { Button, Select } from 'src/components/common'

const MediaPlayer = () => {
  const { initSample, initUserMedia, selectedDevice, setSelectedDevice, devices } = useSourceInput()

  return (
    <div className='flex space-x-8 items-center'>
      <div className='flex space-x-3'>
        <Select
          name='Source'
          label='Input Source'
          options={devices?.map((device) => ({ label: device.label, value: device.deviceId }))}
          onChange={(e: any) => setSelectedDevice(devices?.find((device) => device.deviceId === e.target.value))}
          defaultValue={selectedDevice?.deviceId}
        />
        <Button className='w-48' onClick={() => (selectedDevice ? initUserMedia(selectedDevice) : {})}>
          Use Input Device
        </Button>
      </div>

      <span>OR</span>

      <div className='flex flex-col'>
        <Button className='w-48' onClick={initSample}>
          Use Sample
        </Button>
      </div>
    </div>
  )
}

export default MediaPlayer
