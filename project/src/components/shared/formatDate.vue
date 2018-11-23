<script>
import { date } from 'quasar'
export default {
  methods: {
    FormatDate (_date, _fmt) {
      let result = date.formatDate(_date, _fmt)
      return result
    }
  }
}
</script>
