let data

if (process.env.NODE_ENV === 'production') {
  data = {
    apiUrl: 'https://fritx.me/mpwx'
  }
} else {
  data = {
    apiUrl: 'http://localhost:8099'
  }
}

export default data
