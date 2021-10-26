declare global {
  interface Window {
    YT: any
    onYouTubeIframeAPIReady: any
  }
}

export interface YoutubePlayerInterface {
  loadVideoById(videoId: string, startSeconds: number, suggestedQuality: string): void

  playVideo(): void
  pauseVideo(): void
  stopVideo(): void
  seekTo(seconds: number, allowSeekAhead: boolean): void
  clearVideo(): void
  nextVideo(): void
  previousVideo(): void
  playVideoAt(index: number): void

  mute(): void
  unMute(): void
  isMuted(): boolean
  setVolume(valume: number): void
  getVolume(): number

  getPlayerState(): number
  getCurrentTime(): number
  getDuration(): number
  getVideoUrl(): string
  getVideoEmbedCode(): string

  addEventListener(event: string, listener: string): void
  removeEventListener(event: string, listener: string): void

  getIframe(): Object
  destroy(): void
}

export const EmptyYoutubePlayer: YoutubePlayerInterface = {
  loadVideoById: () => null,
  playVideo: () => null,
  pauseVideo: () => null,
  stopVideo: () => null,
  seekTo: () => null,
  clearVideo: () => null,
  nextVideo: () => null,
  previousVideo: () => null,
  playVideoAt: () => null,
  mute: () => null,
  unMute: () => null,
  isMuted: () => false,
  setVolume: () => null,
  getVolume: () => 0,
  getPlayerState: () => -1,
  getCurrentTime: () => 0,
  getDuration: () => 0,
  getVideoUrl: () => '',
  getVideoEmbedCode: () => '',
  addEventListener: () => null,
  removeEventListener: () => null,
  getIframe: () => ({}),
  destroy: () => null,
}