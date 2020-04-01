var Excel = require('exceljs');
var workbook = new Excel.Workbook();

workbook.xlsx.readFile('shopify.xlsx')
    .then(function() {
        var worksheet = workbook.getWorksheet(1);
       
        
        for(let i = 0 ; i<100000;i++){
            var row = worksheet.getRow(i);
            row.getCell(2).value ='https://cyclingdealusa.com/products/'+row.getCell(2).value;
            row.commit();
        }
        
      
        return workbook.xlsx.writeFile('new.xlsx');
    })