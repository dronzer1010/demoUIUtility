function loadCharts(){
//---------------------------------------bar chart js-------------------------------------------
$(function () {
    'use strict';
    (function (factory) {
        if (typeof module === 'object' && module.exports) {
            module.exports = factory;
        } else {
            factory(Highcharts);
        }
    }(function (Highcharts) {
        (function (H) {
            H.wrap(H.seriesTypes.column.prototype, 'translate', function (proceed) {
                const options = this.options;
                const topMargin = options.topMargin || 0;
                const bottomMargin = options.bottomMargin || 0;

                proceed.call(this);

                H.each(this.points, function (point) {
                    if (options.borderRadiusTopLeft || options.borderRadiusTopRight || options.borderRadiusBottomRight || options.borderRadiusBottomLeft) {
                        const w = point.shapeArgs.width;
                        const h = point.shapeArgs.height;
                        const x = point.shapeArgs.x;
                        const y = point.shapeArgs.y;

                        let radiusTopLeft = H.relativeLength(options.borderRadiusTopLeft || 0, w);
                        let radiusTopRight = H.relativeLength(options.borderRadiusTopRight || 0, w);
                        let radiusBottomRight = H.relativeLength(options.borderRadiusBottomRight || 0, w);
                        let radiusBottomLeft = H.relativeLength(options.borderRadiusBottomLeft || 0, w);

                        const maxR = Math.min(w, h) / 2

                        radiusTopLeft = radiusTopLeft > maxR ? maxR : radiusTopLeft;
                        radiusTopRight = radiusTopRight > maxR ? maxR : radiusTopRight;
                        radiusBottomRight = radiusBottomRight > maxR ? maxR : radiusBottomRight;
                        radiusBottomLeft = radiusBottomLeft > maxR ? maxR : radiusBottomLeft;

                        point.dlBox = point.shapeArgs;

                        point.shapeType = 'path';
                        point.shapeArgs = {
                            d: [
                                'M', x + radiusTopLeft, y + topMargin,
                                'L', x + w - radiusTopRight, y + topMargin,
                                'C', x + w - radiusTopRight / 2, y, x + w, y + radiusTopRight / 2, x + w, y + radiusTopRight,
                                'L', x + w, y + h - radiusBottomRight,
                                'C', x + w, y + h - radiusBottomRight / 2, x + w - radiusBottomRight / 2, y + h, x + w - radiusBottomRight, y + h + bottomMargin,
                                'L', x + radiusBottomLeft, y + h + bottomMargin,
                                'C', x + radiusBottomLeft / 2, y + h, x, y + h - radiusBottomLeft / 2, x, y + h - radiusBottomLeft,
                                'L', x, y + radiusTopLeft,
                                'C', x, y + radiusTopLeft / 2, x + radiusTopLeft / 2, y, x + radiusTopLeft, y,
                                'Z'
                            ]
                        };
                    }

                });
            });
        }(Highcharts));
    }));

    Highcharts.chart('paybar', {


        chart: {
            type: 'column',
            height: (11.4 / 20 * 100) + '%',
        },
        navigation: {
            buttonOptions: {
                enabled: false
            }
        },
        credits: {
            enabled: false
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: ['XVY Supp.', 'CVS Ven', 'XVY Supp.', 'MVS Ven', 'CTSVen'],
        },
        // yAxis: {
        //    lineWidth: 1,
        //    categories: ['10L', '20L', '30L', '40L', '50L', '60L', '70L', '80L'],
        //    title: { text: '' }
        //},
        yAxis: {
            title: {
                text: null
            },
            lineWidth: 1,
            labels: {
                formatter: function () {
                    return Math.abs(this.value) + 'L';
                }
            }
        },
        //colors: ['#10c469', '#22b9ff', '#fff33b', '#ab0764', '#564fc1'],
		
        plotOptions: {
			//series: {
                // stickyTracking: false,
                // events: {
                    // mouseOver() {
                        // const color = arguments[0].target.color;

                        // this.chart.tooltip.options.backgroundColor = color; //first time overwrite
                        // setTimeout(() => {
                            // const tooltipMainBox = document.querySelector('g.highcharts-tooltip path:last-of-type');
                            // if (tooltipMainBox) {
                                // tooltipMainBox.setAttribute('fill', color);
                            // }
                        // });
                    // }
                // }
            // },
			
            column: {
                grouping: false,
                borderRadiusTopLeft: 10,
                borderRadiusTopRight: 10,
            borderWidth: 0,
            }
        },
        
        series: [{
            type: 'column',
            colorByPoint: true,
            data: [10, 20, 30, 40, 50],
            showInLegend: false,
            pointWidth: 16,
            shadow: {
                color: 'rgba(87, 82, 156, 0.5)',
                width: 6,
                offsetX: 0,
                offsetY: 0
            },
        }],
		colors: [
 {
linearGradient: { x1: 1, x2: 1, y1: 1, y2: 0 },
 
 stops: [
 [0, '#094627'],
 [1, '#10c469'],
 [2, '#32d080a1'],
 [3, '#66e8a63b'],
 ]
 },
 {
linearGradient: { x1: 1, x2: 1, y1: 1, y2: 0 },
 
 stops: [
 [0, '#1b668a'],
 [1, '#3d9ccad4'],
 [2, '#60b9e4d4'],
 [3, '#60b9e46e'],
 ]
 },
 {
linearGradient: { x1: 1, x2: 1, y1: 1, y2: 0 },
 
 stops: [
 [0, '#4a460c'],
 [1, '#fff33bc2'],
 [2, '#fff33b96'],
 [3, '#fff33b4a'],
 ]
 },
 {
linearGradient: { x1: 1, x2: 1, y1: 1, y2: 0 },
 
 stops: [
 [0, '#4c092f'],
 [1, '#a71f6ccc'],
 [2, '#a71f6c91'],
 [3, '#a71f6c47'],
 ]
 }, 
 {
linearGradient: { x1: 1, x2: 1, y1: 1, y2: 0 },
 
 stops: [
 [0, '#100c4e'],
 [1, '#564fc1cf'],
 [2, '#5339799c'],
 [3, '#53397945'],
 ]
 },],
        tooltip: {
			
			//useHTML: true,
			//borderColor: null,
			borderWidth:3,
			borderRadius:0.1,
			//backgroundColor: '#100c4e',
			//backgroundColor: null,
            shadow: false,
            formatter: function () {
                //debugger;
                return ' <b style="background-color:' + this.color +'!important;font-weight:bold;color:#333333;padding:0px 14px;">' + this.y + '% ' + '</b>';
            },
        },
		
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        align: 'center',
                        verticalAlign: 'bottom',
                        layout: 'horizontal'
                    }
                }
            }]
        }
    });




    //chart: {
    //    height: (11.4 / 20 * 100) + '%',
    // },

    //  title: {
    //    text: ''
    //  },
    //navigation: {
    //    buttonOptions: {
    //      enabled: false
    //      }
    // },
    // credits: {
    //      enabled: false
    //  },
    //  subtitle: {
    //    text: ''
    //  },

    //  xAxis: {
    //      categories: ['XVY Supp.', 'CVS Ven', 'XVY Supp.', 'MVS Ven', 'CTSVen'],
    //      offset: 0,
    //  },
    //  yAxis: {
    //             categories: ['10l', '20l', '30l', '40l', '50l','60l', '70l', '80l'],
    //             title: { text: '' },
    //             offset: 0,
    //        },
    // tooltip: {
    //		formatter: function () {
    //            return ' <b style="background-color:' + this.series.color + '>' + this.y + '% ' + '</b>';
    //        },

    //    },
    //	plotOptions: {
    //            series: {
    //				pointWidth: 15
    //        },
    //            column: {
    //                grouping: false,
    //                borderRadiusTopLeft: 10,
    //                borderRadiusTopRight: 10
    //            }
    // },

    //  series: [{
    //    type: 'column',
    //    colorByPoint: true,
    //    data: [1, 2, 3, 4, 5],
    //    showInLegend: false,
    //    shadow: {
    //        color: 'black',
    //        width: 5,
    //        offsetX: 0,
    //        offsetY: 0
    //    },

    //  }],
    //  responsive: {
    //        rules: [{
    //            condition: {
    //                maxWidth: 500
    //            },
    //            chartOptions: {
    //                legend: {
    //                    align: 'center',
    //                    verticalAlign: 'bottom',
    //                    layout: 'horizontal'
    //                }
    //            }
    //        }]
    //    }

    //});
});
//---------------------------------------bar chart js edn-------------------------------------------

//---------------------------------------pie chart js-------------------------------------------

(function () {
    var $, MyMorris;

    MyMorris = window.MyMorris = {};
    $ = jQuery;

    MyMorris = Object.create(Morris);

    MyMorris.Donut.prototype.select = function (idx) {
        var row, s, segment, _i, _len, _ref, _fill_color; // ADDED _fill_color
        _ref = this.segments;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            s = _ref[_i];
            s.deselect();
        }
        segment = this.segments[idx];
        segment.select();
        row = this.data[idx];
        _fill_color = row.labelColor || this.options.labelColor || '#000000'; // ADDED
        return this.setLabels(row.label, this.options.formatter(row.value, row), _fill_color); // ADDED parameter _fill_color
    };


    MyMorris.Donut.prototype.setLabels = function (label1, label2, fill_color) {
        var inner, maxHeightBottom, maxHeightTop, maxWidth, text1bbox, text1scale, text2bbox, text2scale;
        _default_fill = fill_color || '#000000'; // ADDED
        inner = (Math.min(this.el.width() / 2, this.el.height() / 2) - 10) * 2 / 3;
        maxWidth = 1.8 * inner;
        maxHeightTop = inner / 2;
        maxHeightBottom = inner / 3;
        this.text1.attr({
            text: '',
            transform: '',
            fill: fill_color // ADDED
        });
        text1bbox = this.text1.getBBox();
        text1scale = Math.min(maxWidth / text1bbox.width, maxHeightTop / text1bbox.height);
        this.text1.attr({
            transform: "S" + text1scale + "," + text1scale + "," + (text1bbox.x + text1bbox.width / 2) + "," + (text1bbox.y + text1bbox.height)
        });
        this.text2.attr({
            //text: label2,
            text: label1,
            transform: '',
            fill: fill_color, // ADDED
           
        });
        text2bbox = this.text2.getBBox();
        text2scale = Math.min(maxWidth / text2bbox.width, maxHeightTop / text2bbox.height);
        return this.text2.attr({
            transform: "S" + text2scale + "," + text2scale + "," + (text2bbox.x + text2bbox.width / 2) + "," + (text2bbox.y + text2bbox.height)
        });
    };
}).call(this);


$(function () {
    getMorris('donut', 'donut_chart');
});

function getMorris(type, element) {
    if (type === 'donut') {
        Morris.Donut({
            element: element,
            data: [
                {
                    label: '60L',
                    value: 60,
                    labelColor: "#ab0764",
					
                }, {
                    label: '50L',
                    value: 50,
                    labelColor: "#fff33b",
                }, {
                    label: '40L',
                    value: 40,
                    labelColor: "#52178b",
                },
                {
                    label: '20L',
                    value: 20,
                    labelColor: "#34bfa3",
                }, {
                    label: '30L',
                    value: 30,
                    labelColor: "#b6bccd",
                }],
            resize: true,
            redraw: true,
			

            colors: ['#ab0764', '#fff33b', '#52178b', '#34bfa3', '#b6bccd',],
            formatter: function (y) {
                return y
            }
        });
    }
}
$('#donut_chart svg tspan').css({
    'font-weight': 'bold'
});
//---------------------------------------pie chart js edn-------------------------------------------
}

//------------------------As line chart--------------------------------------------------------------

function loadAsCharts(){

    Highcharts.chart('areachart', {
        chart: {
          type: 'areaspline',
        },
          
       xAxis: {
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec 2018'],
          },
              
      yAxis: {
      tickInterval: 1000,           
                  labels: {
                      formatter: function () {
                          return this.value/100 + 'L';
                      }
                  }        
      },
        tooltip: {
            backgroundColor: '#3814a1',
            borderColor: '#3814a1',
            color: '#fff',
            borderRadius: '0',
       formatter : function() {
                       return this.y/100 + '%' ;
                  },
            //      pointFormat: '<b>{this.value}</b>',
          style: {
            color: '#fff',
          }
        },
        plotOptions: {
          area: {
            marker: {
              enabled: false,
              
            }
          }
        },
        series: [{
          data: [
            0, 2500, 3500, 2500, 2200, 2000, 4000, 5000, 3700, 3000, 4500, 6800,
          ],
            color: '#F7BCAE',
            lineWidth: 0,
        }, {
          data: [
            0, 1800, 2500, 1700, 3350, 5500, 4650, 3800, 3200, 2900, 3600, 4500
          ],
           color: '#6DE3EC',
            lineWidth: 0,
      
        },
           {
          data: [      
            0, 1400, 2200, 2000, 3250, 4500, 3700, 3000, 2600, 2400, 3600, 6000
          ],
                color: '#4AB2E4',
            lineWidth: 0,
           
        }]      
      });
}
//----------------------------As line chart end-------------------------------------------------------

//-------------------------As pichart start------------------------------------------------------------

function loadAsPiCharts(){


(function () {
    var $, MyMorris;

    MyMorris = window.MyMorris = {};
    $ = jQuery;

    MyMorris = Object.create(Morris);

    MyMorris.Donut.prototype.select = function (idx) {
        var row, s, segment, _i, _len, _ref, _fill_color; // ADDED _fill_color
        _ref = this.segments;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            s = _ref[_i];
            s.deselect();
        }
        segment = this.segments[idx];
        segment.select();
        row = this.data[idx];
        _fill_color = row.labelColor || this.options.labelColor || '#000000'; // ADDED
        return this.setLabels(row.label, this.options.formatter(row.value, row), _fill_color); // ADDED parameter _fill_color
    };


    MyMorris.Donut.prototype.setLabels = function (label1, label2, fill_color) {
        var inner, maxHeightBottom, maxHeightTop, maxWidth, text1bbox, text1scale, text2bbox, text2scale;
        _default_fill = fill_color || '#000000'; // ADDED
        inner = (Math.min(this.el.width() / 2, this.el.height() / 2) - 10) * 2 / 3;
        maxWidth = 1.8 * inner;
        maxHeightTop = inner / 2;
        maxHeightBottom = inner / 3;
        //maxHeightTop1 = inner / 4;
       
        this.text1.attr({
            text: "Paid",
            transform: '',
            fill: '#000000' // ADDED
        });
        //alert(text1bbox.width);
       // alert(text1bbox.height);
        text1bbox = this.text1.getBBox();
        text1scale = Math.min(maxWidth / text1bbox.width, maxHeightBottom / text1bbox.height);
       // alert(text1scale);
        this.text1.attr({
         transform: "S" + text1scale + "," + text1scale + "," + (text1bbox.x + text1bbox.width / 2) + "," + (text1bbox.y + text1bbox.height)
         //transform: "S" + text1scale + "," + text1scale + "," + (text1bbox.x + text1bbox.width / 2) + "," + text1bbox.y
        });
        this.text2.attr({
           // text: label2,
           text: label1,
            transform: '',
            fill: fill_color ,// ADDED,
            font : 'bold'
        });
        text2bbox = this.text2.getBBox();
       
        text2scale = Math.min(maxWidth / text2bbox.width, maxHeightTop / text2bbox.height);
        
        return this.text2.attr({
            transform: "S" + text2scale + "," + text2scale + "," + (text2bbox.x + text2bbox.width / 2) + "," + text2bbox.y
        });
    };
}).call(this);
	

$(function () { 
        getMorris2('donut', 'donut_chart1');
        $('#donut_chart1 svg tspan').css({
            'font-weight': 'bold'
        });
	});
	
	function getMorris2(type, element) {
			    if (type === 'donut') {
			        Morris.Donut({
			            element: element,
			            data: [
			            {
			                label: '60L',
			                value:60,
                            labelColor:"#ab0764", 
                            
			            }, {
			                    label: '50L',
			                    value: 50,
								labelColor:"#fff33b", 
			                }, {
			                    label: '40L',
			                    value: 40,
								labelColor:"#52178b",
			                },
                  {
			                    label: '20L',
			                    value: 20,
								labelColor:"#34bfa3",
			                }, {
			                    label: '30L',
			                    value: 30,
								labelColor:"#b6bccd",
			                }],
                resize: true,
  redraw: true,
			              
			            colors: ['#ab0764', '#fff33b','#52178b','#34bfa3','#b6bccd',],
			            formatter: function (y) {
			                return y
			            }
			        });
			    }
            }
         
            
            
}


//--------------------------As pichartend---------------------------------------------------------------------

//-----------------------------AS date picker----------------------------------------------------------------
 
//------------------------------AS date picker -----------------------------------------------------------------