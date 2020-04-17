<template>
  <div id="visualization" class="visualization">
    <div class="container">
      <header class="header">
        <div class="text">AHRIKNOW - VIEW</div>
        <div class="time">{{time}}</div>
      </header>
      <section class="section">
        <div class="left">
          <div class="top">
            <div class="title">柱状图</div>
            <div class="chart" ref="bar1"></div>
            <div class="s"></div>
          </div>
          <div class="center">
            <div class="title">折线图</div>
            <div class="chart" ref="line1"></div>
            <div class="s"></div>
          </div>
          <div class="bottom">
            <div class="title">饼图</div>
            <div class="chart" ref="pie1"></div>
            <div class="s"></div>
          </div>
        </div>
        <div class="middle">
          <div class="data">
            <div class="data-hd">
              <ul>
                <li>199703</li>
                <li>202004</li>
              </ul>
            </div>
            <div class="data-bd">
              <ul>
                <li>Data Title 1</li>
                <li>Data Title 2</li>
              </ul>
            </div>
          </div>
          <div class="map">
            <div class="m1"></div>
            <div class="m2"></div>
            <div class="m3"></div>
            <div class="chart" ref="map"></div>
          </div>
        </div>
        <div class="right">
          <div class="top">
            <div class="title">柱状图</div>
            <div class="chart" ref="bar2"></div>
            <div class="s"></div>
          </div>
          <div class="center">
            <div class="title">折线图</div>
            <div class="chart" ref="line2"></div>
            <div class="s"></div>
          </div>
          <div class="bottom">
            <div class="title">饼图</div>
            <div class="chart" ref="pie2"></div>
            <div class="s"></div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import 'echarts/map/js/china'
export default {
  name: 'visualization',
  data() {
    return {
      time: '',
      chart: null,
      chart1: null,
      chart2: null,
      chart3: null,
      chart4: null,
      chart5: null,
      chart6: null,
      option1: {
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '0',
          right: '0',
          bottom: '4%',
          top: '10px',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              color: 'rgba(255,255,255,0.6)',
              fontSize: '12'
            },
            axisLine: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              color: 'rgba(255,255,255,0.6)',
              fontSize: '12'
            },
            axisLine: {
              lineStyle: {
                color: 'rgba(255,255,255,0.1)'
              }
            },
            splitLine: {
              lineStyle: {
                color: 'rgba(255,255,255,0.1)'
              }
            }
          }
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            barWidth: '35%',
            itemStyle: {
              barBorderRadius: 5
            },
            data: [30, 52, 200, 334, 390, 330, 220]
          }
        ]
      },
      option2: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          top: '8%',
          left: '14%',
          bottom: '10%'
        },
        xAxis: {
          show: false
        },
        yAxis: [
          {
            type: 'category',
            inverse: true,
            data: ['巴西', '印尼', '美国', '印度', '中国'],
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: 'rgba(255,255,255,0.7)',
              fontSize: '12'
            }
          },
          {
            inverse: true,
            data: [40, 62, 57, 24, 89],
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: 'rgba(255,255,255,0.7)',
              fontSize: '12'
            }
          }
        ],
        series: [
          {
            name: 'line',
            type: 'bar',
            label: {
              show: true,
              position: 'inside',
              formatter: '{c}%'
            },
            barWidth: 10,
            barCategoryGap: 50,
            itemStyle: {
              barBorderRadius: 20,
              color: params => {
                return ['#1089E7', '#F57474', '#56D0E3', '#F8B448', '#8B78F6'][
                  params.dataIndex
                ]
              }
            },
            data: [40, 62, 57, 24, 89],
            yAxisIndex: 0
          },
          {
            name: 'frame',
            type: 'bar',
            barWidth: 12,
            barCategoryGap: 50,
            itemStyle: {
              color: 'none',
              borderColor: '#00c1de',
              borderWidth: 2,
              barBorderRadius: 15
            },
            data: [100, 100, 100, 100, 100],
            yAxisIndex: 1
          }
        ]
      },
      option3: {
        color: ['#00f2f1', '#ed3f35'],
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          textStyle: {
            color: '#4c9bfd'
          },
          right: '10%'
        },
        grid: {
          top: '20%',
          left: '3%',
          right: '4%',
          bottom: '3%',
          show: true,
          borderColor: '#012f4a',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: [
            '1月',
            '2月',
            '3月',
            '4月',
            '5月',
            '6月',
            '7月',
            '8月',
            '9月',
            '10月',
            '11月',
            '12月'
          ],
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#4c9bfd'
          },
          axisLine: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#4c9bfd'
          },
          axisLine: {
            show: false
          },
          splitLine: {
            lineStyle: {
              color: '#012f4a'
            }
          }
        },
        series: [
          {
            name: '新增粉丝',
            type: 'line',
            smooth: true,
            data: [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120]
          },
          {
            name: '新增游客',
            type: 'line',
            smooth: true,
            data: [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79]
          }
        ]
      },
      option4: {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          top: '0%',
          data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎'],
          textStyle: {
            color: 'rgba(255,255,255,.5)',
            fontSize: '12'
          }
        },
        grid: {
          left: '10',
          top: '30',
          right: '10',
          bottom: '10',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: [
              '01',
              '02',
              '03',
              '04',
              '05',
              '06',
              '07',
              '08',
              '09',
              '10',
              '11',
              '12',
              '13',
              '14',
              '15',
              '16',
              '17',
              '18',
              '19',
              '20',
              '21',
              '22',
              '23',
              '24',
              '25',
              '26',
              '26',
              '28',
              '29',
              '30'
            ],
            axisLabel: {
              textStyle: {
                color: 'rgba(255,255,255,.6)',
                fontSize: 12
              }
            },
            axisLine: {
              lineStyle: {
                color: 'rgba(255,255,255,.2)'
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisTick: { show: false },
            axisLine: {
              lineStyle: {
                color: 'rgba(255,255,255,.1)'
              }
            },
            axisLabel: {
              textStyle: {
                color: 'rgba(255,255,255,.6)',
                fontSize: 12
              }
            },
            splitLine: {
              lineStyle: {
                color: 'rgba(255,255,255,.1)'
              }
            }
          }
        ],
        series: [
          {
            name: '邮件营销',
            type: 'line',
            smooth: true,
            lineStyle: {
              color: '#0184d5',
              width: '2'
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: 'rgba(1, 132, 213, 0.4)'
                  },
                  {
                    offset: 0.8,
                    color: 'rgba(1, 132, 213, 0.1)'
                  }
                ],
                false
              ),
              shadowColor: 'rgba(0, 0, 0, 0.1)'
            },
            symbol: 'circle',
            symbolSize: 8,
            showSymbol: false,
            itemStyle: {
              color: '#0184d5',
              borderColor: 'rgba(221, 220, 107, .1)',
              borderWidth: 12
            },
            data: [
              30,
              40,
              30,
              40,
              30,
              40,
              30,
              60,
              20,
              40,
              30,
              40,
              30,
              40,
              30,
              40,
              30,
              60,
              20,
              40,
              30,
              40,
              30,
              40,
              30,
              40,
              20,
              60,
              50,
              40
            ]
          },
          {
            name: '联盟广告',
            type: 'line',
            smooth: true,
            lineStyle: {
              normal: {
                color: '#00d887',
                width: 2
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: 'rgba(0, 216, 135, 0.4)'
                    },
                    {
                      offset: 0.8,
                      color: 'rgba(0, 216, 135, 0.1)'
                    }
                  ],
                  false
                ),
                shadowColor: 'rgba(0, 0, 0, 0.1)'
              }
            },
            symbol: 'circle',
            symbolSize: 5,
            itemStyle: {
              color: '#00d887',
              borderColor: 'rgba(221, 220, 107, .1)',
              borderWidth: 12
            },
            showSymbol: false,
            data: [
              130,
              10,
              20,
              40,
              30,
              40,
              80,
              60,
              20,
              40,
              90,
              40,
              20,
              140,
              30,
              40,
              130,
              20,
              20,
              40,
              80,
              70,
              30,
              40,
              30,
              120,
              20,
              99,
              50,
              20
            ]
          }
        ]
      },
      option5: {
        color: ['#065aab', '#066eab', '#0682ab', '#0696ab', '#06a0ab'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          bottom: '0%',
          // 修改小图标的大小
          itemWidth: 10,
          itemHeight: 10,
          // 修改图例组件的文字为 12px
          textStyle: {
            color: 'rgba(255,255,255,.5)',
            fontSize: '12'
          }
        },
        series: [
          {
            name: '年龄分布',
            type: 'pie',
            // 这个radius可以修改饼形图的大小
            // radius 第一个值是内圆的半径 第二个值是外圆的半径
            radius: ['40%', '60%'],
            center: ['50%', '45%'],
            avoidLabelOverlap: false,
            // 图形上的文字
            label: {
              show: false,
              position: 'center'
            },
            // 链接文字和图形的线是否显示
            labelLine: {
              show: false
            },
            data: [
              { value: 1, name: '0岁以下' },
              { value: 4, name: '20-29岁' },
              { value: 2, name: '30-39岁' },
              { value: 2, name: '40-49岁' },
              { value: 1, name: '50岁以上' }
            ]
          }
        ]
      },
      option6: {
        color: [
          '#006cff',
          '#60cda0',
          '#ed8884',
          '#ff9f7f',
          '#0096ff',
          '#9fe6b8',
          '#32c5e9',
          '#1d9dff'
        ],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          bottom: '0%',
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            color: 'rgba(255,255,255,.5)',
            fontSize: '12'
          }
        },
        series: [
          {
            name: '地区分布',
            type: 'pie',
            radius: ['10%', '70%'],
            center: ['50%', '50%'],
            roseType: 'radius',
            // 图形的文字标签
            label: {
              fontSize: 10
            },
            // 链接图形和文字的线条
            labelLine: {
              // length 链接图形的线条
              length: 6,
              // length2 链接文字的线条
              length2: 8
            },
            data: [
              { value: 20, name: '云南' },
              { value: 26, name: '北京' },
              { value: 24, name: '山东' },
              { value: 25, name: '河北' },
              { value: 20, name: '江苏' },
              { value: 25, name: '浙江' },
              { value: 30, name: '四川' },
              { value: 42, name: '湖北' }
            ]
          }
        ]
      },
      geoCoordMap: {
        上海: [121.4648, 31.2891],
        东莞: [113.8953, 22.901],
        东营: [118.7073, 37.5513],
        中山: [113.4229, 22.478],
        临汾: [111.4783, 36.1615],
        临沂: [118.3118, 35.2936],
        丹东: [124.541, 40.4242],
        丽水: [119.5642, 28.1854],
        乌鲁木齐: [87.9236, 43.5883],
        佛山: [112.8955, 23.1097],
        保定: [115.0488, 39.0948],
        兰州: [103.5901, 36.3043],
        包头: [110.3467, 41.4899],
        北京: [116.4551, 40.2539],
        北海: [109.314, 21.6211],
        南京: [118.8062, 31.9208],
        南宁: [108.479, 23.1152],
        南昌: [116.0046, 28.6633],
        南通: [121.1023, 32.1625],
        厦门: [118.1689, 24.6478],
        台州: [121.1353, 28.6688],
        合肥: [117.29, 32.0581],
        呼和浩特: [111.4124, 40.4901],
        咸阳: [108.4131, 34.8706],
        哈尔滨: [127.9688, 45.368],
        唐山: [118.4766, 39.6826],
        嘉兴: [120.9155, 30.6354],
        大同: [113.7854, 39.8035],
        大连: [122.2229, 39.4409],
        天津: [117.4219, 39.4189],
        太原: [112.3352, 37.9413],
        威海: [121.9482, 37.1393],
        宁波: [121.5967, 29.6466],
        宝鸡: [107.1826, 34.3433],
        宿迁: [118.5535, 33.7775],
        常州: [119.4543, 31.5582],
        广州: [113.5107, 23.2196],
        廊坊: [116.521, 39.0509],
        延安: [109.1052, 36.4252],
        张家口: [115.1477, 40.8527],
        徐州: [117.5208, 34.3268],
        德州: [116.6858, 37.2107],
        惠州: [114.6204, 23.1647],
        成都: [103.9526, 30.7617],
        扬州: [119.4653, 32.8162],
        承德: [117.5757, 41.4075],
        拉萨: [91.1865, 30.1465],
        无锡: [120.3442, 31.5527],
        日照: [119.2786, 35.5023],
        昆明: [102.9199, 25.4663],
        杭州: [119.5313, 29.8773],
        枣庄: [117.323, 34.8926],
        柳州: [109.3799, 24.9774],
        株洲: [113.5327, 27.0319],
        武汉: [114.3896, 30.6628],
        汕头: [117.1692, 23.3405],
        江门: [112.6318, 22.1484],
        沈阳: [123.1238, 42.1216],
        沧州: [116.8286, 38.2104],
        河源: [114.917, 23.9722],
        泉州: [118.3228, 25.1147],
        泰安: [117.0264, 36.0516],
        泰州: [120.0586, 32.5525],
        济南: [117.1582, 36.8701],
        济宁: [116.8286, 35.3375],
        海口: [110.3893, 19.8516],
        淄博: [118.0371, 36.6064],
        淮安: [118.927, 33.4039],
        深圳: [114.5435, 22.5439],
        清远: [112.9175, 24.3292],
        温州: [120.498, 27.8119],
        渭南: [109.7864, 35.0299],
        湖州: [119.8608, 30.7782],
        湘潭: [112.5439, 27.7075],
        滨州: [117.8174, 37.4963],
        潍坊: [119.0918, 36.524],
        烟台: [120.7397, 37.5128],
        玉溪: [101.9312, 23.8898],
        珠海: [113.7305, 22.1155],
        盐城: [120.2234, 33.5577],
        盘锦: [121.9482, 41.0449],
        石家庄: [114.4995, 38.1006],
        福州: [119.4543, 25.9222],
        秦皇岛: [119.2126, 40.0232],
        绍兴: [120.564, 29.7565],
        聊城: [115.9167, 36.4032],
        肇庆: [112.1265, 23.5822],
        舟山: [122.2559, 30.2234],
        苏州: [120.6519, 31.3989],
        莱芜: [117.6526, 36.2714],
        菏泽: [115.6201, 35.2057],
        营口: [122.4316, 40.4297],
        葫芦岛: [120.1575, 40.578],
        衡水: [115.8838, 37.7161],
        衢州: [118.6853, 28.8666],
        西宁: [101.4038, 36.8207],
        西安: [109.1162, 34.2004],
        贵阳: [106.6992, 26.7682],
        连云港: [119.1248, 34.552],
        邢台: [114.8071, 37.2821],
        邯郸: [114.4775, 36.535],
        郑州: [113.4668, 34.6234],
        鄂尔多斯: [108.9734, 39.2487],
        重庆: [107.7539, 30.1904],
        金华: [120.0037, 29.1028],
        铜川: [109.0393, 35.1947],
        银川: [106.3586, 38.1775],
        镇江: [119.4763, 31.9702],
        长春: [125.8154, 44.2584],
        长沙: [113.0823, 28.2568],
        长治: [112.8625, 36.4746],
        阳泉: [113.4778, 38.0951],
        青岛: [120.4651, 36.3373],
        韶关: [113.7964, 24.7028]
      },
      data: [
        [
          '西安',
          [
            [{ name: '西安' }, { name: '拉萨', value: 100 }],
            [{ name: '西安' }, { name: '上海', value: 100 }],
            [{ name: '西安' }, { name: '广州', value: 100 }],
            [{ name: '西安' }, { name: '西宁', value: 100 }],
            [{ name: '西安' }, { name: '银川', value: 100 }]
          ]
        ],
        [
          '西宁',
          [
            [{ name: '西宁' }, { name: '北京', value: 100 }],
            [{ name: '西宁' }, { name: '上海', value: 100 }],
            [{ name: '西宁' }, { name: '广州', value: 100 }],
            [{ name: '西宁' }, { name: '西安', value: 100 }],
            [{ name: '西宁' }, { name: '银川', value: 100 }]
          ]
        ],
        [
          '银川',
          [
            [{ name: '拉萨' }, { name: '潍坊', value: 100 }],
            [{ name: '拉萨' }, { name: '哈尔滨', value: 100 }],
            [{ name: '银川' }, { name: '上海', value: 100 }],
            [{ name: '银川' }, { name: '西安', value: 100 }],
            [{ name: '银川' }, { name: '西宁', value: 100 }]
          ]
        ]
      ],
      planePath:
        'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z',
      color: ['#a6c84c', '#ffa022', '#46bee9'],
      option: {
        tooltip: {
          trigger: 'item',
          formatter: function(params, ticket, callback) {
            if (params.seriesType == 'effectScatter') {
              return '线路：' + params.data.name + '' + params.data.value[2]
            } else if (params.seriesType == 'lines') {
              return (
                params.data.fromName +
                '>' +
                params.data.toName +
                '<br />' +
                params.data.value
              )
            } else {
              return params.name
            }
          }
        },
        legend: {
          orient: 'vertical',
          top: 'bottom',
          left: 'right',
          data: ['西安 Top3', '西宁 Top3', '银川 Top3'],
          textStyle: {
            color: '#fff'
          },
          selectedMode: 'multiple'
        },
        geo: {
          map: 'china',
          label: {
            emphasis: {
              show: true,
              color: '#fff'
            }
          },
          zoom: 1,
          roam: true,
          itemStyle: {
            normal: {
              areaColor: 'rgba(20, 41, 87,0.6)',
              borderColor: '#195BB9',
              borderWidth: 1
            },
            emphasis: {
              areaColor: '#2B91B7'
            }
          }
        },
        series: []
      }
    }
  },
  methods: {
    convertData(data) {
      let res = []
      for (let i = 0; i < data.length; i++) {
        let dataItem = data[i]
        let fromCoord = this.geoCoordMap[dataItem[0].name]
        let toCoord = this.geoCoordMap[dataItem[1].name]
        if (fromCoord && toCoord) {
          res.push({
            fromName: dataItem[0].name,
            toName: dataItem[1].name,
            coords: [fromCoord, toCoord],
            value: dataItem[1].value
          })
        }
      }
      return res
    },
    init() {
      this.chart1 = echarts.init(this.$refs.bar1)
      this.chart2 = echarts.init(this.$refs.bar2)
      this.chart3 = echarts.init(this.$refs.line1)
      this.chart4 = echarts.init(this.$refs.line2)
      this.chart5 = echarts.init(this.$refs.pie1)
      this.chart6 = echarts.init(this.$refs.pie2)
      this.chart = echarts.init(this.$refs.map)
      this.chart1.setOption(this.option1)
      this.chart2.setOption(this.option2)
      this.chart3.setOption(this.option3)
      this.chart4.setOption(this.option4)
      this.chart5.setOption(this.option5)
      this.chart6.setOption(this.option6)
      this.chart.setOption(this.option)
    },
    timer() {
      let dt = new Date()
      let y = dt.getFullYear()
      let mt = dt.getMonth() + 1
      let day = dt.getDate()
      let h = dt.getHours() //获取时
      let m = dt.getMinutes() //获取分
      let s = dt.getSeconds() //获取秒
      this.time =
        '当前时间: ' + y + '/' + mt + '/' + day + ' ' + h + ':' + m + ':' + s
    }
  },
  mounted() {
    this.data.forEach((item, i) => {
      this.option.series.push(
        {
          name: item[0] + ' Top3',
          type: 'lines',
          zlevel: 1,
          effect: {
            show: true,
            period: 6,
            trailLength: 0.7,
            color: 'red',
            symbolSize: 3
          },
          lineStyle: {
            normal: {
              color: this.color[i],
              width: 0,
              curveness: 0.2
            }
          },
          data: this.convertData(item[1])
        },
        {
          name: item[0] + ' Top3',
          type: 'lines',
          zlevel: 2,
          symbol: ['none', 'arrow'],
          symbolSize: 10,
          effect: {
            show: true,
            period: 6,
            trailLength: 0,
            symbol: this.planePath,
            symbolSize: 15
          },
          lineStyle: {
            normal: {
              color: this.color[i],
              width: 1,
              opacity: 0.6,
              curveness: 0.2
            }
          },
          data: this.convertData(item[1])
        },
        {
          name: item[0] + ' Top3',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          zlevel: 2,
          rippleEffect: {
            brushType: 'stroke'
          },
          label: {
            normal: {
              show: true,
              position: 'right',
              formatter: '{b}'
            }
          },
          symbolSize: function(val) {
            return val[2] / 8
          },
          itemStyle: {
            normal: {
              color: this.color[i]
            },
            emphasis: {
              areaColor: '#2B91B7'
            }
          },
          data: item[1].map(dataItem => {
            return {
              name: dataItem[1].name,
              value: this.geoCoordMap[dataItem[1].name].concat([
                dataItem[1].value
              ])
            }
          })
        }
      )
    })
    this.init()
    window.onresize = () => {
      if (this.chart1) this.chart1.resize()
      if (this.chart2) this.chart2.resize()
      if (this.chart3) this.chart3.resize()
      if (this.chart4) this.chart4.resize()
      if (this.chart5) this.chart5.resize()
      if (this.chart6) this.chart6.resize()
      if (this.chart) this.chart.resize()
    }
    if (window.timer) {
      clearInterval(window.timer)
    }
    window.timer = setInterval(this.timer, 1000)
  }
}
</script>

<style lang="scss" scoped>
@font-face {
  font-family: electronicFont;
  src: url(../assets/DS-DIGIT.TTF);
}
#visualization {
  width: 100%;
  height: 100%;
  min-width: 1300px;
  min-height: 800px;
  background: url(../assets/view_bg.jpg);
  background-size: 100% 100%;
  overflow: hidden;
  .container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    .header {
      height: 90px;
      background: url(../assets/head_bg.png);
      background-size: 100% 100%;
      line-height: 80px;
      text-align: center;
      position: relative;
      .text {
        font-size: 32px;
        color: #eee;
        font-weight: 600;
      }
      .time {
        position: absolute;
        top: 0;
        right: 0;
        line-height: 80px;
        color: #eee;
        padding-right: 20px;
        font-weight: 400px;
      }
    }
    .section {
      flex: 1;
      display: grid;
      grid-template-columns: 14fr 24fr 14fr;
      column-gap: 8px;
      .left,
      .right {
        display: grid;
      }
      .middle {
        margin: 5px 0;
        display: flex;
        flex-direction: column;
        .data {
          background: rgba(101, 131, 226, 0.1);
          padding: 10px;
          .data-hd {
            border: solid 1px rgba(25, 168, 139, 0.17);
            position: relative;
            &::before {
              content: '';
              position: absolute;
              width: 32px;
              height: 15px;
              top: 0;
              left: 0;
              border-top: solid 2px #02a6b5;
              border-left: solid 2px #02a6b5;
            }
            &::after {
              content: '';
              position: absolute;
              width: 32px;
              height: 15px;
              bottom: 0;
              right: 0;
              border-bottom: solid 2px #02a6b5;
              border-right: solid 2px #02a6b5;
            }
            ul {
              display: flex;
              li {
                flex: 1;
                height: 80px;
                font-size: 70px;
                color: #ffeb70;
                text-align: center;
                line-height: 80px;
                list-style: none;
                font-family: 'electronicFont';
                &:nth-child(1) {
                  position: relative;
                  &::after {
                    content: '';
                    position: absolute;
                    height: 50%;
                    top: 25%;
                    right: 0;
                    border-right: solid 1px rgba(230, 230, 230, 0.3);
                  }
                }
              }
            }
          }
          .data-bd {
            ul {
              display: flex;
              li {
                flex: 1;
                height: 40px;
                font-size: 25px;
                color: rgba(255, 255, 255, 0.7);
                text-align: center;
                line-height: 40px;
                list-style: none;
              }
            }
          }
        }
        .map {
          flex: 1;
          position: relative;
          .m1 {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 475px;
            height: 475px;
            background: url(../assets/map.png);
            background-size: 100% 100%;
            opacity: 0.3;
          }
          .m2 {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 600px;
            height: 600px;
            background: url(../assets/lbx.png);
            background-size: 100% 100%;
            animation: rotate1 15s linear infinite;
            opacity: 0.6;
          }
          .m3 {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 523px;
            height: 523px;
            background: url(../assets/jt.png);
            background-size: 100% 100%;
            animation: rotate2 15s linear infinite;
            opacity: 0.6;
          }
          .chart {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }
        }
      }
      .top,
      .center,
      .bottom {
        border: solid 1px rgba(25, 168, 139, 0.17);
        background: url(../assets/line.png);
        background-size: 100% 100%;
        margin: 5px 0;
        height: 98%;
        position: relative;
        &::before {
          content: '';
          position: absolute;
          width: 10px;
          height: 10px;
          top: 0;
          left: 0;
          border-top: solid 2px #02a6b5;
          border-left: solid 2px #02a6b5;
        }
        &::after {
          content: '';
          position: absolute;
          width: 10px;
          height: 10px;
          top: 0;
          right: 0;
          border-top: solid 2px #02a6b5;
          border-right: solid 2px #02a6b5;
        }
        .title {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 50px;
          font-size: 22px;
          line-height: 50px;
          text-align: center;
          color: rgba(255, 255, 255, 0.7);
        }
        .chart {
          position: absolute;
          top: 50px;
          left: 10px;
          bottom: 0;
          right: 10px;
        }
        .s {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          &::before {
            content: '';
            position: absolute;
            width: 10px;
            height: 10px;
            bottom: 0;
            left: 0;
            border-bottom: solid 2px #02a6b5;
            border-left: solid 2px #02a6b5;
          }
          &::after {
            content: '';
            position: absolute;
            width: 10px;
            height: 10px;
            bottom: 0;
            right: 0;
            border-bottom: solid 2px #02a6b5;
            border-right: solid 2px #02a6b5;
          }
        }
      }
    }
  }
  @keyframes rotate1 {
    from {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    to {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
  @keyframes rotate2 {
    from {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    to {
      transform: translate(-50%, -50%) rotate(-360deg);
    }
  }
}
</style>
