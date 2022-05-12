function getData() {
   var data1_url = 'http://s3.amazonaws.com/logtrust-static/test/test/data1.json'
   var data2_url = 'http://s3.amazonaws.com/logtrust-static/test/test/data2.json'
   var data3_url = 'http://s3.amazonaws.com/logtrust-static/test/test/data3.json'

   var data_array = []

   function getData1() {
      $.ajax({
         type: 'GET',
         url: data1_url,
         async: false,
         data: {},
         success: function (data1_response) {
            $.each(data1_response, function (index, element) {
               var item = {}
               item.date = new Date(element.d).toLocaleDateString('en-CA')
               item.cat = element.cat.toUpperCase()
               item.val = element.value
               item.key = item.date + " " + item.cat
               data_array.push(item)
            });
         }
      });
   }

   function getData2() {
      $.ajax({
         type: 'GET',
         url: data2_url,
         async: false,
         data: {},
         success: function (data2_response) {
            $.each(data2_response, function (index, element) {
               var item = {}
               item.date = new Date(element.myDate).toLocaleDateString('en-CA')
               item.cat = element.categ.toUpperCase()
               item.val = element.val
               item.key = item.date + " " + item.cat
               data_array.push(item)
            });
         }
      });
   }


   function getData3() {
      $.ajax({
         type: 'GET',
         url: data3_url,
         async: false,
         data: {},
         success: function (data3_response) {
            $.each(data3_response, function (index, element) {
               // var date_regexp = /\d{4}-\d{2}-\d{2}/
               // var cat_regexp = /#.*#/
               var date_cat_group_regexp = /(?<date>\d{4}-\d{2}-\d{2}).*#(?<cat>.*)#/
               date_cat_groups = element.raw.match(date_cat_group_regexp).groups
               // console.log(date_cat_groups)
               var item = {}
               item.date = new Date(date_cat_groups.date).toLocaleDateString('en-CA')
               item.cat = date_cat_groups.cat.toUpperCase()
               item.val = element.val
               item.key = item.date + " " + item.cat
               // console.log(item.key)
               data_array.push(item)
            });
         }
      });
   }

   getData1();
   getData2();
   getData3();

   // console.log(data_array)
   // alert(data_array.length)

   return data_array
}