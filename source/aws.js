/*

Copyright 2009 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file 
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/apache2.0/

or in the "LICENSE.txt" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
License for the specific language governing permissions and limitations under the License. 

- - -

Amazon Product Advertising API
Signed Requests Sample Code

- - -

Code modified to be more modular by Geoffrey Gauchet.

- - -  

This tool utilizes jsSHA2: http://anmar.eu.org/projects/jssha2/


http://ecx.images-amazon.com/images/I/51ZFH5OEU8L.jpg
http://ecx.images-amazon.com/images/I/51ZFH5OEU8L._SL160_.jpg

*/

function invokeRequest(unsignedUrl) {
	if (getAccessKeyId() == "AWS Access Key ID") {
	  console.log("Please provide an AWS Access Key ID");
	  return;
	}

	if (getSecretAccessKey() == "AWS Secret Access Key") {
	  console.log("Please provide an AWS Secret Access Key");
	  return;
	}

  //var unsignedUrl = document.getElementById("UnsignedURL").value;
  if (unsignedUrl == "") {
	  console.log("Please provide a URL");
	  return;
	}

	var lines = unsignedUrl.split("\n");
	unsignedUrl = "";
	for (var i in lines) { unsignedUrl += lines[i]; }
  // find host and query portions
  var urlregex = new RegExp("^http:\\/\\/(.*)\\/onca\\/xml\\?(.*)$");
  var matches = urlregex.exec(unsignedUrl);

	if (matches == null) {
	  console.log("Could not find PA-API end-point in the URL. Please ensure the URL looks like the example provided.");
	  return;
	}

  var host = matches[1].toLowerCase();
  var query = matches[2];

  // split the query into its constituent parts
  var pairs = query.split("&");

  // remove signature if already there
  // remove access key id if already present 
  //  and replace with the one user provided above
  // add timestamp if not already present
  pairs = cleanupRequest(pairs);

  // show it
  //document.getElementById("NameValuePairs").value = pairs.join("\n");
  console.log(pairs.join("\n"));
        
  // encode the name and value in each pair
  pairs = encodeNameValuePairs(pairs);
        
  // sort them and put them back together to get the canonical query string
  pairs.sort();
  //document.getElementById("OrderedPairs").value = pairs.join("\n");
  console.log(pairs.join("\n"));

  var canonicalQuery = pairs.join("&");
  var stringToSign = "GET\n" + host + "\n/onca/xml\n" + canonicalQuery;

  // calculate the signature
  var secret = getSecretAccessKey();
  var signature = sign(secret, stringToSign);
        
  // assemble the signed url
  var signedUrl = "http://" + host + "/onca/xml?" + canonicalQuery + "&Signature=" + signature;
        
  // update the UI
  //var stringToSignArea = document.getElementById("StringToSign");
  //stringToSignArea.value = stringToSign;
  console.log(stringToSign);
        
  //var signedURLArea = document.getElementById("SignedURL");
  //signedURLArea.value = signedUrl;
  return signedUrl;
}

function encodeNameValuePairs(pairs) {
  for (var i = 0; i < pairs.length; i++) {
    var name = "";
    var value = "";
          
    var pair = pairs[i];
    var index = pair.indexOf("=");

    // take care of special cases like "&foo&", "&foo=&" and "&=foo&" 
    if (index == -1) {
      name = pair;
    } else if (index == 0) {
      value = pair;
    } else {
      name = pair.substring(0, index);
      if (index < pair.length - 1) {
        value = pair.substring(index + 1);
      }
    }
          
	  // decode and encode to make sure we undo any incorrect encoding
    name = encodeURIComponent(decodeURIComponent(name));

	  value = value.replace(/\+/g, "%20");
    value = encodeURIComponent(decodeURIComponent(value));

    pairs[i] = name + "=" + value;
  }
        
  return pairs;
}
      
function cleanupRequest(pairs) {
  var haveTimestamp = false;
	var haveAwsId = false;
  var accessKeyId =  getAccessKeyId();
        
  var nPairs = pairs.length;
  var i = 0;
  while (i < nPairs) {
    var p = pairs[i];
    if (p.search(/^Timestamp=/) != -1) {
      haveTimestamp = true;
    } else if (p.search(/^(AWSAccessKeyId|SubscriptionId)=/) != -1) {
      pairs.splice(i, 1, "AWSAccessKeyId=" + accessKeyId);
	    haveAwsId = true;
    } else if (p.search(/^Signature=/) != -1) {
      pairs.splice(i, 1);
      i--;
      nPairs--;
    }
    i++;
  }

  if (!haveTimestamp) {
    pairs.push("Timestamp=" + getNowTimeStamp());
  }

	if (!haveAwsId) {
	  pairs.push("AWSAccessKeyId=" + accessKeyId);
	}
  return pairs;
}
      
function sign(secret, message) {
  var messageBytes = str2binb(message);
  var secretBytes = str2binb(secret);
        
  if (secretBytes.length > 16) {
    secretBytes = core_sha256(secretBytes, secret.length * chrsz);
  }
        
  var ipad = Array(16), opad = Array(16);
  for (var i = 0; i < 16; i++) { 
    ipad[i] = secretBytes[i] ^ 0x36363636;
    opad[i] = secretBytes[i] ^ 0x5C5C5C5C;
  }

  var imsg = ipad.concat(messageBytes);
  var ihash = core_sha256(imsg, 512 + message.length * chrsz);
  var omsg = opad.concat(ihash);
  var ohash = core_sha256(omsg, 512 + 256);
        
  var b64hash = binb2b64(ohash);
  var urlhash = encodeURIComponent(b64hash);
        
  return urlhash;
}
      
Date.prototype.toISODate =
     new Function("with (this)\n    return " +
		 "getFullYear()+'-'+addZero(getMonth()+1)+'-'" +
		 "+addZero(getDate())+'T'+addZero(getHours())+':'" +
		 "+addZero(getMinutes())+':'+addZero(getSeconds())+'.000Z'");

function addZero(n) {
  return ( n < 0 || n > 9 ? "" : "0" ) + n;
}

function getNowTimeStamp() {
  var time = new Date();
  var gmtTime = new Date(time.getTime() + (time.getTimezoneOffset() * 60000));
  return gmtTime.toISODate() ;
}

function getAccessKeyId() {
  return "AKIAI2PIRYQBAGLOGRQQ";//document.getElementById('AWSAccessKeyId').value;
}
      
function getSecretAccessKey() {
  return "K9kSiiHWaXRP3xFOZzgHjCoTDIFC4hk9j7YBkePK";//document.getElementById('AWSSecretAccessKey').value;        
}

var LOCALES={
	"CA":"http://ecs.amazonaws.ca/onca/xml",
	"CN":"http://webservices.amazon.cn/onca/xml",
	"DE":"http://ecs.amazonaws.de/onca/xml",
	"ES":"http://webservices.amazon.es/onca/xml",
	"FR":"http://ecs.amazonaws.fr/onca/xml",
	"IT":"http://webservices.amazon.it/onca/xml",
	"JP":"http://ecs.amazonaws.jp/onca/xml",
	"UK":"http://ecs.amazonaws.co.uk/onca/xml",
	"US":"http://webservices.amazon.com/onca/xml"
};