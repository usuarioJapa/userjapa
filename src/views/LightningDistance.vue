<template>
  <div class="flex flex-col mt-5">
    <div class="text-center">
      <h2 class="font-medium text-lg md:text-xl lg:text-2xl">Lightning Distance Calculator</h2>
      <p class="mt-2 text-sm lg:text-xl">Click on the button when you see the flash and click again when you hear the thunder</p>
    </div>
    <div class="flex-1 flex flex-col items-center py-5">
      <form @submit.prevent="setMessage(value)">
        <input
          class="bg-gray-200 w-40 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          type="number"
          step=".01"
          min="0"
          @keydown="type"
          v-model="seconds"
          required
        />
        <button
          class="shadow bg-gray-500 ml-2 hover:bg-gray-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          type="submit"
          name="submit-seconds"
          :disabled="!dirty || !value"
        >
          Calculate
        </button>
      </form>
      <button
        class="h-48 w-48 my-5 flex justify-center items-center bg-gray-500 rounded-full focus:outline-none text-white font-bold"
        @click="click"
      >
        {{ !started ? 'Flash' : 'Thunder'}}
      </button>
      <p class="text-center"><span v-html="message"></span></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LightningDistance',
  data () {
    return {
      started: false,
      interval: null,
      start: 0,
      end: 0,
      message: '',
      dirty: false,
      value: 0
    }
  },
  computed: {
    seconds: {
      get () {
        if (!this.dirty) {
          if (!this.start || !this.end) return 0

          return (this.end - this.start) / 1000
        } else {
          return this.value
        }
      },
      set (value) {
        this.value = value
      }
    }
  },
  methods: {
    click () {
      if (this.dirty) {
        this.dirty = false
        this.value = 0
      }

      if (!this.started) {
        this.end = 0
        this.message = ''
        this.started = true
        this.start = Date.now()

        this.interval = setInterval(() => {
          this.end = Date.now()
        }, 10)
      } else {
        if (this.interval) {
          clearInterval(this.interval)
          this.interval = null
        }

        this.setMessage(this.seconds)

        this.started = false
      }
    },
    type () {
      this.dirty = true
      this.started = false
      this.start = 0
      this.end = 0
      if (this.interval) {
        clearInterval(this.interval)
        this.interval = null
      }
    },
    setMessage (seconds) {
      this.message = `The lightning is <strong>${(seconds * 343).toFixed(0)} meters</strong> (or <strong>${((seconds * 343) / 1000).toFixed(2)} kilometers</strong>) away from you`
    }
  }
}
</script>
