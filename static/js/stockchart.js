var upColor = '#00da3c';
var downColor = '#ec0000';
// values: pricedate, open, close, low, high, volume

var rsichart = echarts.init(document.getElementById("stockchart"));
rsichart.showLoading({color:'#4981B1',textColor:'#000',maskColor:'rgba(255, 255, 255, 0.5)',fontSize:20,lineWidth:5});
var rsichart_option = {
    backgroundColor: '#fff',
    animation: false,
    title: {
        text: 'Ticker: TSLA -- Boll.Bands(20,2) -- RSI(14)',
        textStyle: {
            color: '#4981B1',
            fontSize: 13,
        },
        left: '9%',
        // padding: [0,120]
    },
    color: ["#4981B1",'#EDA215','#4981B1','#00da3c','#1E3274'],
    legend: {
        bottom: 10,
        left: 'center',
        data: ['Dow-Jones index', 'BOLU', 'MA', 'BOLD', 'RSI'],
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        },
        backgroundColor: 'rgba(245, 245, 245, 0.8)',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        textStyle: {
            color: '#000'
        },
        position: function (pos, params, el, elRect, size) {
            var obj = {top: 10};
            obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
            return obj;
        },
        extraCssText: 'width: 170px'
    },
    axisPointer: {
        link: {xAxisIndex: 'all'},
        label: {
            backgroundColor: '#777'
        }
    },
    visualMap: {
        show: false,
        seriesIndex: 5,
        dimension: 2,
        pieces: [{
            value: 1,
            color: downColor
        }, {
            value: -1,
            color: upColor
        }]
    },
    grid: [
        {
            left: '10%',
            right: '8%',
            height: '45%'
        },
        {
            left: '10%',
            right: '8%',
            top: '55%',
            height: '12%'
        },
        {
            left: '10%',
            right: '8%',
            top: '69%',
            height: '20%'
        }
    ],
    xAxis: [
        {
            type: 'category',
            data: [],
            scale: true,
            boundaryGap : false,
            axisLine: {onZero: false,lineStyle:{color:'darkgray'}},
            splitLine: {show: false},
            splitNumber: 20,
            min: 'dataMin',
            max: 'dataMax',
            axisPointer: {
                z: 100
            }
        },
        {
            type: 'category',
            gridIndex: 1,
            data: [],
            scale: true,
            boundaryGap : false,
            axisLine: {onZero: false,lineStyle:{color:'darkgray'}},
            axisTick: {show: false},
            splitLine: {show: false},
            axisLabel: {show: false},
            splitNumber: 20,
            min: 'dataMin',
            max: 'dataMax',
            axisPointer: {
                label: {
                    formatter: function (params) {
                        return params.value
                    }
                }
            }
        },
        {
            type: 'category',
            gridIndex: 2,
            data: [],
            scale: true,
            boundaryGap : false,
            axisLine: {onZero: false,lineStyle:{color:'darkgray'}},
            axisTick: {show: false},
            splitLine: {show: false},
            axisLabel: {show: false},
            splitNumber: 20,
            min: 'dataMin',
            max: 'dataMax',
            axisPointer: {
                label: {
                    formatter: function (params) {
                        return params.value
                    }
                }
            }
        }
    ],
    yAxis: [
        {
            scale: true,
            splitArea: {
                show: true
            },
            axisLine: {
                show: false,
            }
        },
        {
            scale: true,
            gridIndex: 1,
            splitNumber: 2,
            axisLabel: {show: false},
            axisLine: {show: false},
            axisTick: {show: false},
            splitLine: {show: false},
        },
        {
            scale: true,
            gridIndex: 2,
            splitNumber: 5,
            min: 0,
            max: 100,
            axisLabel: {show: true},
            axisLine: {show: false},
            axisTick: {show: false},
            splitLine: {show: false},
        },
    ],
    dataZoom: [
        {
            type: 'inside',
            xAxisIndex: [0, 1, 2],
            start: 77,
            end: 100
        },
        {
            show: true,
            xAxisIndex: [0, 1, 2],
            type: 'slider',
            top: '90%',
            start: 77,
            end: 100,
            handleSize: 20,
            showDetail: false,
            zoomLock: false
        }
    ],
    series: [
        {
            name: 'Dow-Jones index',
            type: 'candlestick',
            data: [],
            itemStyle: {
                color: upColor,
                color0: downColor,
                borderColor: null,
                borderColor0: null
            },
            tooltip: {
                formatter: function (param) {
                    param = param[0];
                    return [
                        'Date: ' + param.name + '<hr size=1 style="margin: 3px 0">',
                        'Open: ' + param.data[0] + '<br/>',
                        'Close: ' + param.data[1] + '<br/>',
                        'Lowest: ' + param.data[2] + '<br/>',
                        'Highest: ' + param.data[3] + '<br/>'
                    ].join('');
                }
            },
            markLine: {
                symbol: ['none', 'none'],
                lineStyle: { color: '#D84D48' },
                // label: {
                //     position: 'middle',
                //     formatter: '{b}: {c}'
                // },
                data: [
                    {
                        name: 'min line on close',
                        type: 'min',
                        valueDim: 'close',
                    },
                    {
                        name: 'max line on close',
                        type: 'max',
                        valueDim: 'close'
                    }
                ]
            },
            markPoint: {
                label: {
                    // formatter: '{b}: {c}',
                    fontSize: 12,
                },
                symbolSize: 65,
                itemStyle: {color: '#D84D48'},
                data: [
                    {
                        name: 'highest value',
                        type: 'max',
                        valueDim: 'highest'
                    },
                    {
                        name: 'lowest value',
                        type: 'min',
                        valueDim: 'lowest'
                    },
                    {
                        name: 'average value on close',
                        type: 'average',
                        valueDim: 'close'
                    }
                ],
            },
        },
        {
            name: 'BOLU',
            type: 'line',
            data: [],
            smooth: false,
            symbol: 'none',
            lineStyle: {
                width: 0.25,
                color: '#4981B1',
                opacity: 0.7
            }
        },
        {
            name: 'MA',
            type: 'line',
            data: [],
            smooth: false,
            symbol: 'none',
            lineStyle: {
                width: 1,
                type: 'dashed',
                color: '#EDA215',
                opacity: 0.7
            }
        },
        {
            name: 'BOLD',
            type: 'line',
            data: [],
            smooth: false,
            symbol: 'none',
            lineStyle: {
                width: 0.25,
                color: '#4981B1',
                opacity: 0.7
            },
            stack: 'a',
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0,0,0,1,[
                    {
                        offset: 0,
                        color: 'rgba(213,72,120,0)'
                    },
                    {
                        offset: 1,
                        color: 'rgba(213,72,120,0)'
                    }
                ])
            }
        },
        {
            name: 'BBdiff',
            type: 'line',
            data: [],
            smooth: false,
            symbol: 'none',
            lineStyle: {
                width: 0.25,
                color: '#4981B1',
                opacity: 0.7
            },
            stack: 'a',
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0,0,0,1,[
                    {
                        offset: 0,
                        color: 'rgba(137,252,222,0.2)'
                    },
                    {
                        offset: 1,
                        color: 'rgba(137,252,222,0.2)'
                    }
                ])
            }
        },
        {
            name: 'Volume',
            type: 'bar',
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: []
        },
        {
            name: 'RSI',
            type: 'line',
            data: [],
            xAxisIndex: 2,
            yAxisIndex: 2,
            smooth: false,
            symbol: 'none',
            lineStyle: {
                color: '#1E3274',
                opacity: 0.5
            },
            markLine: {
                symbol: ['none','none'],  // start and end point
                data: [
                    {
                        yAxis: 30,
                        lineStyle: {
                            width: 1,
                            type: 'solid',
                            color: '#ec0000',
                            opacity: 0.5
                        }
                    },
                    {
                        yAxis: 50,
                        lineStyle: {
                            width: 1,
                            color: '#EDA215',
                            opacity: 0.7
                        }
                    },
                    {
                        yAxis: 70,
                        lineStyle: {
                            width: 1,
                            type: 'solid',
                            color: '#00da3c',
                            opacity: 0.6
                        }
                    }
                ]
            }
        },
    ]
};

// ##########################################################################################
function getdata(ticker,startdate,enddate,rsiperiod,bbperiod,bbindex) {
    $.ajax({
        url: "/getdata",
        type: "post",
        data: {ticker:ticker,startdate:startdate,enddate:enddate,rsiperiod:rsiperiod,bbperiod:bbperiod,bbindex:bbindex},
        success: function (data){
            if (null != data) {
                console.log(data)
                rsichart_option.title.text = "Ticker: "+ticker+" -- Boll.Bands("+bbperiod+","+bbindex+") -- RSI("+rsiperiod+")"
                rsichart_option.xAxis[0].data = data.categoryData
                rsichart_option.xAxis[1].data = data.categoryData
                rsichart_option.xAxis[2].data = data.categoryData
                rsichart_option.series[0].data = data.values
                rsichart_option.series[1].data = data.BBub
                rsichart_option.series[2].data = data.BBmb
                rsichart_option.series[3].data = data.BBlb
                rsichart_option.series[4].data = data.BBdiff
                rsichart_option.series[5].data = data.volumes
                rsichart_option.series[6].data = data.RSI

                rsichart_option && rsichart.setOption(rsichart_option, true);
                rsichart.resize();
                rsichart.hideLoading();
            } else {
               document.getElementById('stockchart').innerHTML = "<div id='message'>no record, please choose again.</div>"
            }
        },
        error: function (xhr,type,errorThrown){
            console.log(errorThrown)
        }
    })
}

// 初始化运行一次
// getdata('s','AAPL')
// setInterval(getdata,1000)