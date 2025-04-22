<template>
    <div class="overflow-hidden">
        <dropzone @vdropzone-file-added="uploadedProductImage" id="foo" ref="el" :options="options" :destroyDropzone="true">
            <div class="flex flex-col items-center">
                <div class="upload-icon-wrapper p-2 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="upload-icon color-primary-2"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M288 109.3L288 352c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-242.7-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352l128 0c0 35.3 28.7 64 64 64s64-28.7 64-64l128 0c35.3 0 64 28.7 64 64l0 32c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64l0-32c0-35.3 28.7-64 64-64zM432 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"/>
                    </svg>
                </div>
                <p><a class="font-semibold color-primary-2">Click to upload</a> or drag and drop</p>
                <p>PDF, DOCX, CSV, MD or TXT</p>
            </div>
        </dropzone>
    </div>
</template>

<script>
import Dropzone from 'nuxt-dropzone'
import 'nuxt-dropzone/dropzone.css'

export default {
  name: 'DropzoneUploader',
  data () {
    return {
        options: {
            file: '', // profileImageUrl
            autoProcessQueue: false,
            url: 'https://',
            thumbnailWidth: 120,
            maxFilesize: 5,
            dictDefaultMessage: ''
        }
    }
  },
  components: {
    Dropzone
  },
  methods: {
    uploadedProductImage (file) {
        console.log('file', file)
        this.$store.dispatch('identity/uploadFile', {
            file
        }).then((res) => {
            console.log('file uploaded', res)
            this.$emit('file_uploaded')
            console.log(this.$refs.el)
            this.$refs.el.removeAllFiles()
            // this.getMyMemory()
        })
        // let item = {
        //     uid: this.$store.getters['AUTH.uid'],
        //     file
        // }
        // this.$store.dispatch('AUTH.uploadPublicImage', item).then((res) => {
        //   console.log('uploadPublicImage result', res.url)
        //   setTimeout(() => {
        //     this.$emit('uploadedImage', {url: res ? res.url : false})
        //   }, 100)
        // })
    }
  }
}
</script>

<style lang="scss">
.dropzone {
    border-radius: .75rem;
    border: 1px solid #777;
    background-color: #efefef;
}
.upload-icon {
    width: 22px;
    height: 22px;
    /*border-radius: 50%;*/
    /*background-color: #eee;*/
}
.upload-icon-wrapper {
    border-radius: 50%;
    background-color: #e2e2e2;
    border: 1px solid #ddd;
}
</style>
