let data

if (process.env.NODE_ENV === 'production') {
  data = {
    apiUrl: 'http://fritx.me:8099'
  }
} else {
  data = {
    apiUrl: 'http://localhost:8099'
  }
}

export default data
