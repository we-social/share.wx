// 无法使用document.write 会报错
// http://stackoverflow.com/questions/39279301/asynchronously-loaded-external-script-unless-it-is-explicitly-opened
export default function loadStats () {
  if (process.env.NODE_ENV === 'production') {
    const script = document.createElement('script')
    script.src = '/tongji.js'
    script.async = true
    document.body.appendChild(script)
  }
}
