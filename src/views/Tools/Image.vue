<template>
  <div id="tools-image" class="tools-image">
    <el-card class="image">
      <el-image class="img" :src="url" fit="cover" lazy :preview-src-list="[url]"></el-image>
    </el-card>
    <el-card class="params">
      <h3 style="margin-left: 24px">点击图片大图预览</h3>
      <el-form ref="form" label-width="80px">
        <el-form-item label="宽 × 高">
          <div class="item">
            <el-switch v-model="params.size.work" @change="redo"></el-switch>
            <el-input v-model="params.size.data[0]" @change="redo"></el-input>
            <el-input v-model="params.size.data[1]" @change="redo"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="背景色">
          <div class="item">
            <el-switch v-model="params.rgb.work" @change="redo"></el-switch>
            <el-color-picker v-model="params.rgb.data" color-format="rgb" @change="redo"></el-color-picker>
            <el-input v-model="params.rgb.data" @change="redo"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="渐变色">
          <div class="item">
            <el-switch v-model="params.colour.work" @change="redo"></el-switch>
            <el-select v-model="params.colour.data[0]" placeholder="请选择方向" @change="redo">
              <el-option label="上 到 下" value="2"></el-option>
              <el-option label="右 到 左" value="4"></el-option>
            </el-select>
            <el-color-picker v-model="params.colour.data[1]" color-format="rgb" @change="redo"></el-color-picker>
            <el-color-picker v-model="params.colour.data[2]" color-format="rgb" @change="redo"></el-color-picker>
          </div>
        </el-form-item>
        <el-form-item label="亮度">
          <div class="item">
            <el-switch v-model="params.point.work" @change="redo"></el-switch>
            <el-slider
              v-model="params.point.data"
              :min="0"
              :max="100"
              :format-tooltip="val => val/100"
              @change="redo"
            ></el-slider>
          </div>
        </el-form-item>
        <el-form-item label="透明度">
          <div class="item">
            <el-switch v-model="params.opacity.work" @change="redo"></el-switch>
            <el-slider v-model="params.opacity.data" :min="0" :max="255" @change="redo"></el-slider>
          </div>
        </el-form-item>
        <el-form-item label="图片库">
          <div class="item">
            <el-switch v-model="params.album.work" @change="redo"></el-switch>
            <el-select v-model="params.album.data[0]" placeholder="请选择图片库" @change="redo">
              <el-option v-for="item in album" :key="item.id" :label="item.name" :value="item.name">
                <span style="float: left">{{ item.name }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.max }}</span>
              </el-option>
            </el-select>
            <el-input v-model="params.album.data[1]" @change="redo"></el-input>
            <div style="width: 420px">
              <el-switch v-model="params.album.data[2]" active-text="原大小" @change="redo"></el-switch>
            </div>
          </div>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'tools-image',
  data() {
    return {
      album: [
        {
          id: 1,
          name: 'comic',
          max: '4311'
        },
        {
          id: 2,
          name: 'scenery',
          max: '5154'
        },
        {
          id: 3,
          name: 'girl',
          max: '4110'
        },
        {
          id: 4,
          name: 'beauty',
          max: '7300'
        }
      ],
      url: 'https://api.ahriknow.com/image',
      params: {
        size: {
          work: false,
          data: [400, 300]
        },
        rgb: {
          work: false,
          data: 'rgb(0, 205, 255)'
        },
        point: {
          work: false,
          data: 0
        },
        opacity: {
          work: false,
          data: 0
        },
        colour: {
          work: false,
          data: ['2', 'rgb(254,1,254)', 'rgb(0,245,246)']
        },
        album: {
          work: false,
          data: ['', '', true]
        }
      }
    }
  },
  methods: {
    redo() {
      let base = 'https://api.ahriknow.com/image'
      let params = []
      if (this.params.size.work) {
        params.push(`w=${this.params.size.data[0]}`)
        params.push(`h=${this.params.size.data[1]}`)
      }
      if (this.params.rgb.work) {
        let reg = /rgb\((.*?)\)/
        let s = reg.exec(this.params.rgb.data.trim())
        if (s && s.length > 0) params.push(`rgb=${s[1]}`)
      }
      if (this.params.colour.work) {
        let reg = /rgb\((.*?)\)/
        let s1 = reg.exec(this.params.colour.data[1].trim())
        let s2 = reg.exec(this.params.colour.data[2].trim())
        if (s1 && s2)
          params.push(`colour=${this.params.colour.data[0]},${s1[1]},${s2[1]}`)
      }
      if (this.params.point.work) {
        params.push(`point=${this.params.point.data / 100}`)
      }
      if (this.params.opacity.work) {
        params.push(`opacity=${this.params.opacity.data}`)
      }
      if (this.params.album.work) {
        params.push(
          `album=${this.params.album.data[0]},${this.params.album.data[1]}`
        )
        params.push(`original=${this.params.album.data[2] ? 'true' : 'false'}`)
      }
      let p = params.join('&')
      this.url = `${base}?${p}`
    }
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
#tools-image {
  width: 100%;
  height: 100%;
  padding: 40px;
  display: flex;
  .image {
    height: 100%;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    .img {
      max-width: 100%;
      max-height: 100%;
    }
  }
  .params {
    margin-left: 10px;
    width: 600px;
    .el-form {
      .item {
        display: flex;
        align-items: center;
        .el-switch {
          margin: 0 10px;
        }
        .el-slider {
          width: 400px;
        }
        .el-select {
          min-width: 140px;
        }
      }
    }
  }
}
</style>
