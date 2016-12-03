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
var viki=[];
var Urbanvalue=0,Ruralvalue=0;
var output2=[],output1=[];
var asiacountry=new Array("Afghanistan","Armenia","Azerbaijan","Bahrain","Bangladesh","Bhutan","Brunei","Cambodia",
"China","Cyprus","Georgia","India","Indonesia","Iran","Iraq","Israel","Japan","Jordan","Kazakhstan","Kuwait","Kyrgyzstan","Laos",
"Lebanon","Malaysia","Maldives","Mongolia","Myanmar (Burma)","Nepal","North Korea","Oman","Pakistan","Palestine",
"Philippines","Qatar","Russia","Saudi Arabia","Singapore","South Korea","Sri Lanka","Syria","Taiwan","Tajikistan","Thailand",
"Timor-Leste","Turkey","Turkmenistan","United Arab Emirates (UAE)","Uzbekistan","Vietnam","Yemen");
lineReader.on('line', function (line) {
	var lineData = line.trim().split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);;
	if(count==0)
	{
		this.indexCountry = lineData.indexOf('CountryName');
		this.indexindicatorname = lineData.indexOf('IndicatorName');
		this.indexyear=lineData.indexOf('Year');
		this.indexvalue=lineData.indexOf('Value');
		count++;
		console.log(this.indexCountry+"============"+this.indexindicatorname+"==============="+this.indexvalue+"======"+this.indexyear)
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
				Urbanvalue+=parseFloat(lineData[this.indexvalue]);
			}
			else if(lineData[this.indexindicatorname]=="Rural population (% of total population)")
			{
				Ruralvalue+=parseFloat(lineData[this.indexvalue]);
			}

			viki[lineData[this.indexyear]]={
				"Year":lineData[this.indexyear],
				"Urban population (% of total)":Urbanvalue,
				"Rural population (% of total population)":Ruralvalue
			};
}

}

});

lineReader.on('close',function(){
	for(var y=1960;y<2016;y++){
	output2.push(viki[y]);
}
fs.writeFile('ForLinechart.json',JSON.stringify(output1));
fs.writeFile('ForStackedbarchart.json',JSON.stringify(output2));
 });

