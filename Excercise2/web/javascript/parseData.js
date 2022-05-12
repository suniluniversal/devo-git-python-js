var data_array = getData();

var group_by_date_cat_array = []
var date_cat_array = []
var group_by_cat_array = []

data_array.reduce(function (accum, element) {
    if (!accum[element.key]) {
        accum[element.key] = { key: element.key, val: 0 };
        group_by_date_cat_array.push(accum[element.key])
    }
    accum[element.key].val += element.val;
    return accum;
}, []);

// console.log(group_by_date_cat_array)
// alert(group_by_date_cat_array.length)

$.each(group_by_date_cat_array, function (index, element) {
    // var date_regexp = /\d{4}-\d{2}-\d{2}/
    // var cat_regexp = /#.*#/
    var date_cat_group_regexp = /(?<date>\d{4}-\d{2}-\d{2})\s(?<cat>.*)/
    date_cat_groups = element.key.match(date_cat_group_regexp).groups
    // console.log(date_cat_groups)
    var item = {}
    item.date = new Date(date_cat_groups.date).toLocaleDateString('en-CA')
    item.cat = date_cat_groups.cat.toUpperCase()
    item.val = element.val
    date_cat_array.push(item)
 });
// console.log(date_cat_array)
// alert(date_cat_array.length)

date_cat_array.sort(function(a,b){
    return new Date(b.date) - new Date(a.date);
  });

data_array.reduce(function (accum, element) {
    if (!accum[element.cat]) {
        accum[element.cat] = { cat: element.cat, val: 0 };
        group_by_cat_array.push(accum[element.cat])
    }
    accum[element.cat].val += element.val;
    return accum;
}, []);

// console.log(group_by_cat_array)
// alert(group_by_cat_array.length)


// prepare line series data
var line_series = []
for (let i = 0; i < group_by_cat_array.length; i++) {
    var cat = group_by_cat_array[i].cat
    var line_series_data = []
    for (let j = 0; j < date_cat_array.length; j++) {
        const element = date_cat_array[j];
        if(element.cat == cat){
            element_date = new Date(element.date)
            line_series_data.push([Date.UTC(element_date.getUTCFullYear(), element_date.getUTCMonth(), element_date.getUTCDate()), Math.round(element.val*100)/100])
        }
    }
    var line_series_item = {}
    line_series_item.name = cat
    line_series_item.data = line_series_data

    // console.log(line_series_item)
    line_series.push(line_series_item)

}

// console.log(line_series)
// alert(line_series.length)


var cat_sum = group_by_cat_array.reduce( function(accum, element){
        return accum + element.val;
    }, 0);

var pie_series = []
var pie_series_data = []
for (let j = 0; j < group_by_cat_array.length; j++) {
    const element = group_by_cat_array[j];
    var cat_perc = element.val/cat_sum
    var pie_series_data_item = {}
    pie_series_data_item.name = element.cat
    pie_series_data_item.y = cat_perc
    if(j==0){
        pie_series_data_item.sliced = true
        pie_series_data_item.selected = true
    }
    pie_series_data.push(pie_series_data_item)
}
pie_series.push({name: 'Category', colorByPoint: true, data: pie_series_data})
// console.log(pie_series)