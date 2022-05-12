Highcharts.chart('lineContainer', {
    chart: {
        scrollablePlotArea: {
            minWidth: 700
        }
    },
    title: {
        text: 'Category over time'
    },
    xAxis: {
        type: 'datetime',
        // tickInterval: 7 * 24 * 3600 * 1000, // one week
      },

    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },

    tooltip: {
        shared: true,
        crosshairs: true
    },
    plotOptions: {
        series: {
            cursor: 'pointer',
            marker: {
                lineWidth: 1
            }
        }
    },
    // plotOptions: {
    //     series: {
    //         marker: {
    //             enabled: false
    //         }
    //     }
    // },
    series: line_series
});