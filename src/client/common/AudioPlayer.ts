const cachedAudio = new Map<string, HTMLAudioElement>()

function stop(audio?: HTMLAudioElement): void {
  if (audio) {
    audio.pause()
    audio.currentTime = 0
  }
}

export function playAudio(src: string, onStop?: () => void): Promise<void> {
  const audio = cachedAudio.get(src) || new Audio(src)
  cachedAudio.set(src, audio)
  if (onStop) {
    audio.addEventListener('ended', onStop)
    audio.addEventListener('pause', onStop)
  }
  return audio.play()
}

export function stopAudio(src: string) {
  const audio = cachedAudio.get(src)
  stop(audio)
}

export function stopAnyPlayingAudio() {
  for (const audio of cachedAudio.values()) {
    stop(audio)
  }
}

export function anyAudioPlaying(): boolean {
  for (const audio of cachedAudio.values()) {
    if (!audio.paused) {
      return true
    }
  }
  return false
}

export function deleteAudio(src: string) {
  cachedAudio.delete(src)
}
