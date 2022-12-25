import toWav from 'audiobuffer-to-wav'

export const webmBlobToWavBlob = async (blob: Blob) => {
  const audioContext = new AudioContext()
  const arrayBuffer = await blob.arrayBuffer()
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)
  const wav = toWav(audioBuffer)

  return new Blob([wav])
}
