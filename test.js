var str = "1 2 Cyclingdeal.com.au stock a large selection of bicycle racks and stands. &nbsp;Click through for the full range of&nbsp;bike racks and stands&nbsp;from cyclingdeal.com.au";
var res = str.replace(/Cyclingdeal.com.au stock[^]* cyclingdeal.com.au/g,'');
console.log(res);