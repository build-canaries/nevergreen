const playing = new Map<string, HTMLAudioElement>()

export function playAudio(src: string, onStop?: () => void): Promise<void> {
  const audio = playing.get(src) || new Audio(src)
  playing.set(src, audio)
  if (onStop) {
    audio.addEventListener('ended', onStop)
    audio.addEventListener('pause', onStop)
  }
  return audio.play()
}

export function stopAudio(src: string) {
  const audio = playing.get(src)
  if (audio) {
    audio.pause()
    audio.currentTime = 0
  }
}

export function anyAudioPlaying(): boolean {
  for (const audio of playing.values()) {
    if (!audio.paused) {
      return true
    }
  }
  return false
}

export function deleteAudio(src: string) {
  playing.delete(src)
}
