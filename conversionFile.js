var fs=require('fs');
var re=require('readline');
var lineReader = re.createInterface({
	input: fs.createReadStream('indicators.csv'),
});
var count=0,Object1={};
var indexCountry="";
var indexindicatorname="";
var indexyear=0;
var country=0;
var outputArray=[];
var Urbanvalue=new Array(2500).fill(0);
var Ruralvalue=new Array(2500).fill(0);
var output2=[],output1=[]; 
//assign the asian country to array
var asiacountry=new Array("Afghanistan","Armenia","Azerbaijan","Bahrain","Bangladesh","Bhutan","Brunei","Cambodia",
	"China","Cyprus","Georgia","India","Indonesia","Iran","Iraq","Israel","Japan","Jordan","Kazakhstan","Kuwait","Kyrgyzstan","Laos",
	"Lebanon","Malaysia","Maldives","Mongolia","Myanmar (Burma)","Nepal","North Korea","Oman","Pakistan","Palestine",
	"Philippines","Qatar","Russia","Saudi Arabia","Singapore","South Korea","Sri Lanka","Syria","Taiwan","Tajikistan","Thailand",
	"Timor-Leste","Turkey","Turkmenistan","United Arab Emirates (UAE)","Uzbekistan","Vietnam","Yemen");
lineReader.on('line', function (line) {
	var lineData = line.trim().split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);;
	if(count==0) //condition to get index values of required keys
	{
		this.indexCountry = lineData.indexOf('CountryName');
		this.indexindicatorname = lineData.indexOf('IndicatorName');
		this.indexyear=lineData.indexOf('Year');
		this.indexvalue=lineData.indexOf('Value');
		count++;
		}
	else
	{
		if(lineData[this.indexCountry]=="India"&&(lineData[this.indexindicatorname]=="Urban population (% of total)"||lineData[this.indexindicatorname]=="Rural population (% of total population)"))
		{
			this.Object1={
				'IndicatorName':lineData[this.indexindicatorname],
				'Year':lineData[this.indexyear],
				'Value':lineData[this.indexvalue]
			};
			output1.push(this.Object1);
		}
		if(asiacountry.indexOf(lineData[this.indexCountry])!=-1){
			if(lineData[this.indexindicatorname]=="Urban population (% of total)"){
				Urbanvalue[lineData[this.indexyear]]+=parseFloat(lineData[this.indexvalue]);
				if(lineData[this.indexyear]==2015)
					console.log(lineData[this.indexvalue]);
			}
			else if(lineData[this.indexindicatorname]=="Rural population (% of total population)")
			{
				Ruralvalue[lineData[this.indexyear]]+=parseFloat(lineData[this.indexvalue]);
			}
			outputArray[lineData[this.indexyear]]={
				"Year":lineData[this.indexyear],
				"Urban population (% of total)":Urbanvalue[lineData[this.indexyear]],
				"Rural population (% of total population)":Ruralvalue[lineData[this.indexyear]]
			};
		}

	}

});
lineReader.on('close',function(){//write into the json file when the read is finished
	for(var y=1960;y<2016;y++){
		output2.push(outputArray[y]);//push the output
	}	
	fs.writeFile('json/ForLinechart.json',JSON.stringify(output1));
	console.log("ForLinechart.json was created")
	fs.writeFile('json/ForStackedbarchart.json',JSON.stringify(output2));
	console.log("ForStackedbarchart.json was created")
});