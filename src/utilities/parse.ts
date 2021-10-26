export const parseDuration = (value: number) => {
  const minutes = Math.trunc(value / 60);
  const minutesString = `${minutes}`.length === 1 ? `0${minutes}` : `${minutes}`
  const seconds = Math.trunc(value % 60);
  const secondsString = `${seconds}`.length === 1 ? `0${seconds}` : `${seconds}`
  return `${minutesString}:${secondsString}`
}