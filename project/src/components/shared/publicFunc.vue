<script>
// export
export default {
  data () {
    return {
      collapseState: ''
    }
  },
  // methods
  methods: {
    // convertImgToBase64
    convertImgToBase64 (url, callback, outputFormat) {
      var img = new Image()
      img.crossOrigin = 'Anonymous'
      img.onload = function () {
        var canvas = document.createElement('CANVAS')
        var ctx = canvas.getContext('2d')
        canvas.height = this.height
        canvas.width = this.width
        ctx.drawImage(this, 0, 0)
        var dataURL = canvas.toDataURL(outputFormat || 'image/png')
        callback(dataURL)
        canvas = null
      }
      img.src = url
    },
    // simulate a delay
    simulateDelay (delay) {
      return new Promise(resolve => {
        setTimeout(() => {
          return resolve(true)
        }, delay)
      })
    },
    // toggleCollapse
    toggleCollapse () {
      if (this.collapseState === '') {
        this.collapseState = 'bg-white inset-shadow'
      } else {
        this.collapseState = ''
      }
    },
    // minutes into hours and minutes
    convertMinuite2TimeDuration (data) {
      let minutes = data % 60
      let hours = (data - minutes) / 60
      let result = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
      return result
    },
    // Returns if a value is a string
    isString (value) {
      return typeof value === 'string' || value instanceof String
    },
    // Returns if a value is really a number
    isNumber (value) {
      return typeof value === 'number' && isFinite(value)
    },
    // Returns if a value is an array
    isArray (value) {
      return value && typeof value === 'object' && value.constructor === Array
    },
    // Returns if a value is a function
    isFunction (value) {
      return typeof value === 'function'
    },
    // Returns if a value is an object
    isObject (value) {
      return value && typeof value === 'object' && value.constructor === Object
    },
    // Returns if a value is null
    isNull (value) {
      return value === null
    },
    // Returns if a value is undefined
    isUndefined (value) {
      return typeof value === 'undefined'
    },
    // Returns if a value is a boolean
    isBoolean (value) {
      return typeof value === 'boolean'
    },
    // Returns if a value is a regexp
    isRegExp (value) {
      return value && typeof value === 'object' && value.constructor === RegExp
    },
    // Returns if value is an error object
    isError (value) {
      return value instanceof Error && typeof value.message !== 'undefined'
    },
    // Returns if value is a date object
    isDate (value) {
      return value instanceof Date
    },
    // Returns if a Symbol
    isSymbol (value) {
      return typeof value === 'symbol'
    },
    // getContent
    getContent (group, locale) {
      return new Promise(resolve => {
        let vm = this
        let result = []
        vm.$database.collection('contents')
          .where('group', '==', group)
          .where('locale', '==', locale)
          .get()
          .then(function (contents) {
            contents.forEach(function (content) {
              result.push({
                code: content.data().code,
                body: content.data().body
              })
            })
            return resolve(result)
          })
      })
    }
  }
}
</script>
