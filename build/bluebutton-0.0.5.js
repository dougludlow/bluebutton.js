/**
 * BlueButton.js
 */

// v.0.0.5


(function () {
var Core=function(){var g=function(){el=document.createElement("empty");el.elsByTag=Core.elsByTag;el.tag=Core.tag;el.attr=Core.attr;el.val=Core.val;return el};return{parseXML:function(d){if(!d||"string"!==typeof d)return console.log("Error: XML data is not a string"),null;var e;window.DOMParser?(parser=new DOMParser,e=parser.parseFromString(d,"text/xml")):(e=new ActiveXObject("Microsoft.XMLDOM"),e.async="false",e.loadXML(d));return e},template:function(d){a:{for(var e=this.getElementsByTagName("templateId"),
b=0;b<e.length;b++)if(e[b].getAttribute("root")===d){d=e[b];break a}d=void 0}return d?d.parentElement:g()},tag:function(d){return(d=this.getElementsByTagName(d)[0])?d:g()},elsByTag:function(d){return this.getElementsByTagName(d)},attr:function(d){return!this?null:this.getAttribute(d)},val:function(){if(!this)return null;try{return this.childNodes[0].nodeValue}catch(d){return null}},parseDate:function(d){if(!d||"string"!==typeof d)return console.log("Error: date is not a string"),null;var e=d.substr(0,
4),b=d.substr(4,2);d=d.substr(6,2);return new Date(e,b,d)}}}();var Allergies=function(){return{process:function(g,d){var e=[],b,a,c;b=g.template("ccda"==d?"2.16.840.1.113883.10.20.22.2.6.1":"2.16.840.1.113883.3.88.11.83.102");a=b.elsByTag("entry");for(var f=0;f<a.length;f++){c=a[f];b=c.template("2.16.840.1.113883.10.20.22.4.7").tag("code");var h=b.attr("displayName"),j=b.attr("code"),k=b.attr("codeSystem"),m=b.attr("codeSystemName");b=c.template("2.16.840.1.113883.10.20.22.4.7").tag("value");var l=b.attr("displayName"),n=b.attr("code");b.attr("codeSystem");var p=
b.attr("codeSystemName");b="ccda"==d?c.template("2.16.840.1.113883.10.20.22.4.9").tag("value"):c.template("2.16.840.1.113883.10.20.1.54").tag("value");var q=b.attr("displayName"),r=b.attr("code"),s=b.attr("codeSystem");b=c.template("2.16.840.1.113883.10.20.22.4.8").tag("value");var t=b.attr("displayName");b=c.tag("participant").tag("code");var u=b.attr("displayName"),v=b.attr("code"),w=b.attr("codeSystem"),x=b.attr("codeSystemName");b=c.template("2.16.840.1.113883.10.20.22.4.28").tag("value");b=b.attr("displayName");
e.push({date:{value:null,low:null,high:null},observation_date:{low:null},name:h,code:j,code_system:k,code_system_name:m,status:b,severity:t,reaction:{date:{low:null},name:q,code:r,code_system:s},reaction_type:{name:l,code:n,code_system:s,code_system_name:p},allergen:{name:u,code:v,code_system:w,code_system_name:x}})}return e}}}();var Demographics=function(){var g=Core.parseDate;return{process:function(d,e){var b,a;b=d.template("ccda"==e?"2.16.840.1.113883.10.20.22.1.1":"1.3.6.1.4.1.19376.1.5.3.1.1.1");a=b.tag("patientRole");b=a.tag("patient").tag("name");var c=b.tag("prefix").val(),f=b.tag("given").val(),h=b.tag("family").val();b=a.tag("patient");var j=g(b.tag("birthTime").attr("value")),k=b.tag("administrativeGenderCode").attr("displayName"),m=b.tag("maritalStatusCode").attr("displayName");b=a.tag("addr");var l=b.tag("streetAddressLine").val(),
n=b.tag("city").val(),p=b.tag("state").val(),q=b.tag("postalCode").val(),r=b.tag("country").val();b=a.tag("telecom");var s=b.attr("value");email=null;var t=a.tag("raceCode").attr("displayName"),u=a.tag("ethnicGroupCode").attr("displayName"),v=a.tag("religiousAffiliationCode").attr("displayName");b=a.tag("birthplace");var w=b.tag("state").val(),x=b.tag("postalCode").val(),y=b.tag("country").val();b=a.tag("guardian");var z=b.tag("code").attr("displayName"),A=b.tag("telecom").attr("value");b=b.tag("guardianPerson");
var B=b.tag("given").val(),C=b.tag("family").val();b=a.tag("guardian").tag("addr");var D=b.tag("streetAddressLine").val(),E=b.tag("city").val(),F=b.tag("state").val(),G=b.tag("postalCode").val(),H=b.tag("country").val();b=a.tag("providerOrganization");a=b.tag("name").val();var I=b.tag("telecom").attr("value"),J=b.tag("streetAddressLine").val(),K=b.tag("city").val(),L=b.tag("state").val(),M=b.tag("postalCode").val();b=b.tag("country").val();return{name:{prefix:c,given:f,family:h},dob:j,gender:k,marital_status:m,
address:{street:l,city:n,state:p,zip:q,country:r},phone:{home:s,work:null,mobile:null},email:email,race:t,ethnicity:u,religion:v,birthplace:{state:w,zip:x,country:y},guardian:{name:{given:B,family:C},relationship:z,address:{street:D,city:E,state:F,zip:G,country:H},phone:{home:A}},provider:{organization:a,phone:I,address:{street:J,city:K,state:L,zip:M,country:b}}}}}}();var Encounters=function(){var g=Core.parseDate;return{process:function(d,e){var b=[],a,c,f;a=d.template("ccda"==e?"2.16.840.1.113883.10.20.22.2.22.1":"2.16.840.1.113883.10.20.1.3");c=a.elsByTag("entry");for(var h=0;h<c.length;h++){f=c[h];var j=g(f.tag("effectiveTime").attr("value"));a=f.tag("code");var k=a.attr("displayName"),m=a.attr("code"),l=a.attr("codeSystem"),n=a.attr("codeSystemName"),p=a.attr("codeSystemVersion");a=f.tag("value");var q=a.attr("displayName"),r=a.attr("code"),s=a.attr("codeSystem");
a=f.tag("translation");var t=a.attr("displayName"),u=a.attr("code"),v=a.attr("codeSystem"),w=a.attr("codeSystemName");a=f.tag("performer").tag("code");var x=a.attr("displayName"),y=a.attr("code"),z=a.attr("codeSystem"),A=a.attr("codeSystemName");a=f.tag("participant");f=a.tag("code").attr("displayName");var B=a.tag("streetAddressLine").val(),C=a.tag("city").val(),D=a.tag("state").val(),E=a.tag("postalCode").val();a=a.tag("country").val();b.push({date:j,name:k,code:m,code_system:l,code_system_name:n,
code_system_version:p,finding:{name:q,code:r,code_system:s},translation:{name:t,code:u,code_system:v,code_system_name:w},performer:{name:x,code:y,code_system:z,code_system_name:A},location:{organization:f,street:B,city:C,state:D,zip:E,country:a}})}return b}}}();var Immunizations=function(){var g=Core.parseDate;return{process:function(d,e){var b=[],a,c,f;a=d.template("ccda"==e?"2.16.840.1.113883.10.20.22.2.2":"2.16.840.1.113883.10.20.1.6");c=a.elsByTag("entry");for(var h=0;h<c.length;h++){f=c[h];a=f.tag("effectiveTime");var j=g(a.attr("value"));a=f.template("2.16.840.1.113883.10.20.22.4.54").tag("code");var k=a.attr("displayName"),m=a.attr("code"),l=a.attr("codeSystem"),n=a.attr("codeSystemName");a=f.template("2.16.840.1.113883.10.20.22.4.54").tag("translation");
var p=a.attr("displayName"),q=a.attr("code"),r=a.attr("codeSystem"),s=a.attr("codeSystemName");a=f.tag("routeCode");var t=a.attr("displayName"),u=a.attr("code"),v=a.attr("codeSystem"),w=a.attr("codeSystemName");a=f.template("2.16.840.1.113883.10.20.22.4.20");f=a.tag("text").val();a=a.tag("code");var x=a.attr("displayName"),y=a.attr("code");a=a.attr("codeSystem");b.push({date:j,product:{name:k,code:m,code_system:l,code_system_name:n,translation:{name:p,code:q,code_system:r,code_system_name:s}},route:{name:t,
code:u,code_system:v,code_system_name:w},instructions:f,education_type:{name:x,code:y,code_system:a}})}return b}}}();var Labs=function(){var g=Core.parseDate;return{process:function(d,e){var b=[],a=[],c,f,h,j;c=d.template("ccda"==e?"2.16.840.1.113883.10.20.22.2.3.1":"2.16.840.1.113883.10.20.1.14");f=c.elsByTag("entry");for(var k=0;k<f.length;k++){h=f[k];c=h.tag("code");var m=c.attr("displayName"),l=c.attr("code"),n=c.attr("codeSystem"),p=c.attr("codeSystemName");h=h.elsByTag("component");for(var q=0;q<h.length;q++){j=h[q];var r=g(j.tag("effectiveTime").attr("value"));c=j.tag("code");m=c.attr("displayName");l=c.attr("code");
n=c.attr("codeSystem");p=c.attr("codeSystemName");c=j.tag("value");j=c.attr("value");c=c.attr("unit");reference_high=reference_low=null;a.push({date:r,name:m,value:j,unit:c,code:l,code_system:n,code_system_name:p,reference:{low:reference_low,high:reference_high}})}b.push({name:m,code:l,code_system:n,code_system_name:p,results:a})}return b}}}();var Medications=function(){var g=Core.parseDate;return{process:function(d,e){var b=[],a,c,f;a=d.template("ccda"==e?"2.16.840.1.113883.10.20.22.2.1.1":"2.16.840.1.113883.3.88.11.83.112");c=a.elsByTag("entry");for(var h=0;h<c.length;h++){f=c[h];a=f.tag("effectiveTime");var j=g(a.tag("low").attr("value")),k=g(a.tag("high").attr("value"));a=f.tag("manufacturedProduct").tag("code");var m=a.attr("displayName"),l=a.attr("code"),n=a.attr("codeSystem");a=f.tag("manufacturedProduct").tag("translation");var p=
a.attr("displayName"),q=a.attr("code"),r=a.attr("codeSystem"),s=a.attr("codeSystemName");a=f.tag("doseQuantity");var t=a.attr("value"),u=a.attr("unit");a=f.tag("rateQuantity");var v=a.attr("value"),w=a.attr("unit");a=f.tag("precondition").tag("value");var x=a.attr("displayName"),y=a.attr("code"),z=a.attr("codeSystem");a=f.template("2.16.840.1.113883.10.20.22.4.19").tag("value");var A=a.attr("displayName"),B=a.attr("code"),C=a.attr("codeSystem");a=f.tag("routeCode");var D=a.attr("displayName"),E=a.attr("code"),
F=a.attr("codeSystem"),G=a.attr("codeSystemName");a=f.tag("participant").tag("code");var H=a.attr("displayName"),I=a.attr("code"),J=a.attr("codeSystem"),K=a.attr("codeSystemName");a=f.tag("administrationUnitCode");var L=a.attr("displayName"),M=a.attr("code"),N=a.attr("codeSystem"),O=a.attr("codeSystemName");a=f.tag("performer");a=a.tag("name").val();b.push({effective_time:{low:j,high:k},product:{name:m,code:l,code_system:n,translation:{name:p,code:q,code_system:r,code_system_name:s}},dose_quantity:{value:t,
unit:u},rate_quantity:{value:v,unit:w},precondition:{name:x,code:y,code_system:z},reason:{name:A,code:B,code_system:C},route:{name:D,code:E,code_system:F,code_system_name:G},vehicle:{name:H,code:I,code_system:J,code_system_name:K},administration:{name:L,code:M,code_system:N,code_system_name:O},prescriber:{organization:a,person:null}})}return b}}}();var Problems=function(){var g=Core.parseDate;return{process:function(d,e){var b=[],a,c,f;a=d.template("ccda"==e?"2.16.840.1.113883.10.20.22.2.5":"2.16.840.1.113883.10.20.1.11");c=a.elsByTag("entry");for(var h=0;h<c.length;h++){f=c[h];a=f.tag("effectiveTime");var j=g(a.tag("low").attr("value")),k=g(a.tag("high").attr("value"));a=f.template("2.16.840.1.113883.10.20.22.4.4").tag("code");var m=a.attr("displayName"),l=a.attr("code"),n=a.attr("codeSystem");a=f.template("2.16.840.1.113883.10.20.22.4.6");
var p=a.tag("value").attr("displayName");a=f.template("2.16.840.1.113883.10.20.22.4.31");a=parseInt(a.tag("value").attr("value"));b.push({date:{from:j,to:k},name:m,status:p,age:a,code:l,code_system:n})}return b}}}();var Procedures=function(){var g=Core.parseDate;return{process:function(d,e){var b=[],a,c,f;a=d.template("ccda"==e?"2.16.840.1.113883.10.20.22.2.7":"2.16.840.1.113883.10.20.1.12");c=a.elsByTag("entry");for(var h=0;h<c.length;h++){f=c[h];a=f.tag("effectiveTime");var j=g(a.attr("value"));a=f.tag("code");var k=a.attr("displayName"),m=a.attr("code"),l=a.attr("codeSystem");specimen_code_system=specimen_code=specimen_name=null;a=f.tag("performer");var n=a.tag("name").val(),p=a.tag("telecom").attr("value"),
q=a.tag("streetAddressLine").val(),r=a.tag("city").val(),s=a.tag("state").val(),t=a.tag("postalCode").val(),u=a.tag("country").val();a=f.tag("participant").tag("code");f=a.attr("displayName");var v=a.attr("code");a=a.attr("codeSystem");b.push({date:j,name:k,code:m,code_system:l,specimen:{name:specimen_name,code:specimen_code,code_system:specimen_code_system},performer:{organization:n,street:q,city:r,state:s,zip:t,country:u,phone:p},device:{name:f,code:v,code_system:a}})}return b}}}();var Vitals=function(){var g=Core.parseDate;return{process:function(d,e){var b=[],a=[],c,f,h,j;c=d.template("ccda"==e?"2.16.840.1.113883.10.20.22.2.4.1":"2.16.840.1.113883.10.20.1.16");f=c.elsByTag("entry");for(var k=0;k<f.length;k++){h=f[k];c=h.tag("effectiveTime");var m=g(c.attr("value"));h=h.elsByTag("component");for(var l=0;l<h.length;l++){j=h[l];c=j.tag("code");var n=c.attr("displayName"),p=c.attr("code"),q=c.attr("codeSystem"),r=c.attr("codeSystemName");c=j.tag("value");j=c.attr("value");c=c.attr("unit");
a.push({name:n,code:p,code_system:q,code_system_name:r,value:j,unit:c})}b.push({date:m,results:a})}return[]}}}();var BlueButton=function(g){var d=null,e={};g=g.replace(/^\s+|\s+$/g,"");if("<?xml"==g.substr(0,5)){d=Core.parseXML(xml);g=d.getElementsByTagName("*");for(var b=0;b<g.length;b++)g[b].template=Core.template,g[b].tag=Core.tag,g[b].elsByTag=Core.elsByTag,g[b].attr=Core.attr,g[b].val=Core.val;d.template=Core.template;g="EMPTY"==d.template("1.3.6.1.4.1.19376.1.5.3.1.1.1").tagName?"ccda":"c32";e.allergies=Allergies.process(d,g);e.demographics=Demographics.process(d,g);e.encounters=Encounters.process(d,g);
e.immunizations=Immunizations.process(d,g);e.labs=Labs.process(d,g);e.medications=Medications.process(d,g);e.problems=Problems.process(d,g);e.procedures=Procedures.process(d,g);e.vitals=Vitals.process(d,g);g=[e,e.allergies,e.demographics,e.encounters,e.immunizations,e.labs,e.medications,e.problems,e.procedures,e.vitals];for(b=0;b<g.length;b++)g[b].json=function(){return JSON.stringify(this,null,2)}}else e=JSON.parse(g);return{data:e,xmlDOM:d,allergies:function(){return e.allergies},demographics:function(){return e.demographics},
encounters:function(){return e.encounters},immunizations:function(){return e.immunizations},labs:function(){return e.labs},medications:function(){return e.medications},problems:function(){return e.problems},procedures:function(){return e.procedures},vitals:function(){return e.vitals}}};window.BlueButton=BlueButton;
})();