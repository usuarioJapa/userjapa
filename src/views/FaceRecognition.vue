<template lang="html">
  <div
    ref="view"
    class="flex flex-col justify-start mt-5"
  >
    <div class="text-center">
      <h2 class="font-medium text-lg md:text-xl lg:text-2xl">Face Recognition</h2>
    </div>
    <div class="flex-1 flex flex-col">
      <div class="flex justify-center mt-5">
        <form class="flex" @submit.prevent="getMedia">
          <select
            class="w-64	block appearance-none bg-gray-200 border border-gray-200 text-gray-700 py-2 px-3 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            v-model="mediaDeviceConstraints.video.deviceId"
            required
          >
            <option :value="null" selected>Device</option>
            <option
              v-for="(device, key) in devices.filter(d => d.kind.includes('video'))"
              :key="`device-${key}`"
              :value="device"
            >
              {{ device.label || `Device ${key + 1}` }}
            </option>
          </select>
          <button
            class="shadow bg-blue-500 ml-2 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-2 rounded"
            type="submit"
          >
            Get Video
          </button>
        </form>
      </div>
      <div class="flex justify-center">
        <div
          ref="video-container"
          class="relative"
        >
          <video
            ref="video-player"
            class="mt-2 flex video-container"
            poster="@/assets/image/tensorflow-js.png"
            autoplay
            muted
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as faceapi from 'face-api.js'

export default {
  name: 'FaceRecognition',
  data () {
    return {
      devices: [],
      mediaDeviceConstraints: {
        audio: false,
        video: {
          deviceId: null
        }
      },
      webcamEnabled: false,
      canvas: null,
      displaySize: {},
      predictedAges: []
    }
  },
  methods: {
    async getDevices () {
      try {
        this.devices = await navigator.mediaDevices.enumerateDevices()
      } catch (error) {
        console.warn(error)
      }
    },
    async getMedia () {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(this.mediaDeviceConstraints),
              video  = this.$refs['video-player']

        video.removeEventListener('playing', this.recognizeFace)

        video.srcObject = stream

        video.addEventListener('playing', this.recognizeFace)
      } catch (error) {
        console.warn(error);
      }
    },
    recognizeFace () {
      const video  = this.$refs['video-player']

      if (this.canvas)
        this.$refs['video-container'].removeChild(this.canvas)

      this.canvas = faceapi.createCanvasFromMedia(video),

      this.canvas.classList.add('video-canvas')

      this.$refs['video-container'].appendChild(this.canvas)

      this.displaySize = {
        width: video.clientWidth,
        height: video.clientHeight
      }

      faceapi.matchDimensions(this.canvas, this.displaySize)

      this.predictedAges = []

      if (this.interval)
        clearInterval(this.interval)

      this.interval = setInterval(async () => {
        const detections = await faceapi
                            .detectAllFaces(this.$refs['video-player'], new faceapi.TinyFaceDetectorOptions())
                            .withFaceLandmarks()
                            .withFaceExpressions()
                            .withAgeAndGender()

        const resizedDetections = faceapi.resizeResults(detections, this.displaySize)

        this.canvas.getContext('2d').clearRect(0, 0, this.canvas.width, this.canvas.height)

        faceapi.draw.drawDetections(this.canvas, resizedDetections)
        faceapi.draw.drawFaceLandmarks(this.canvas, resizedDetections)
        faceapi.draw.drawFaceExpressions(this.canvas, resizedDetections)

        const avgAge = this.getAvgAgePrediction(resizedDetections[0].age)

        const bottomRight = {
          x: resizedDetections[0].detection.box.bottomRight.x,
          y: resizedDetections[0].detection.box.bottomRight.y
        }

        new faceapi.draw.DrawTextField([
          `${faceapi.utils.round(avgAge, 0)} year${avgAge > 1 ? '' : 's'} - ${resizedDetections[0].gender}`],
          bottomRight
        ).draw(this.canvas)

      }, 100)
    },
    getAvgAgePrediction (age) {
      this.predictedAges.push(age)

      return this.predictedAges.reduce((total, a) => total + a) / this.predictedAges.length
    }
  },
  beforeMount () {
    this.getDevices()
  },
  async mounted () {
    try {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
        faceapi.nets.faceExpressionNet.loadFromUri('/models'),
        faceapi.nets.ageGenderNet.loadFromUri('/models')
      ])

      this.faceRecognitionAvailable = true
    } catch (error) {
      console.warn(error)
    }
  }
}
</script>

<style lang="scss" scoped>
.video-container {
  max-height: 75%;
}
</style>

<style media="screen">
.video-canvas {
  top: 0;
  left: 0;
  position: absolute;
}
</style>
