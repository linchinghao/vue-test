<template>
  <div>
    <div>DEMO</div>
    <croppa v-model="myCroppa" canvas-color="transparent"></croppa>
    <button @click="generateImage">Generate</button>
    <br>
    <p>{{ file }}</p>
    <img class="output" :src="imgUrl">
  </div>
</template>

<script>
import rq from 'axios'
import Cookies from 'js-cookie'
export default {
  data() {
    return {
      myCroppa: null,
      imgUrl: '',
      file: null
    }
  },
  methods: {
    async generateImage() {
      // base64
      // let url = this.myCroppa.generateDataUrl()
      // console.log(url);
      // if (!url) {
      //   return
      // }
      // this.imgUrl = url

      // choosen file
      let file = this.myCroppa.getChosenFile()
      if(!file) {
        return alert('no file')
        // return console.log('no file')
      }
      // this.upload(file, file);
      // this.upload();
      // console.log(file)

      // blob
      let blob = await this.myCroppa.promisedBlob();
      console.log(file, blob)
      this.upload(file, blob)
    },
    async upload(file, blob) {
      let csrf = Cookies.get('csrfToken');
      let formData = new FormData();
      formData.append('user', 'allin');
      formData.append('timestamp', new Date().getTime());
      formData.append('filename', file.name);
      // formData.append('type', file.type)
      // formData.append('size', file.size)
      formData.append('file', blob)
      let res = await rq.post('/api/upload', formData, {
          headers: {'x-csrf-token': csrf},
      })
      // let res = rq.post('/api/upload', formData)
      console.log(res);

      alert(res.data.url);
    }
  }
};
</script>

<style>
.croppa-container {
  background-color: white;
  border: 3px solid black
}
</style>
