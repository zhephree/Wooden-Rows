enyo.kind({
	name: "SinglePane",
	kind: enyo.VFlexBox,
	components: [
		{kind: "WebService", name:"awsSearch", url:"",onSuccess:"awsSearchSuccess", onFailure: "awsSearchFailure"},
		{kind: "WebService", name:"awsItem", url:"",onSuccess:"awsItemSuccess", onFailure: "awsItemFailure"},
		{name: "pickContact", kind: "com.palm.library.contactsui.peoplePicker",onContactClick:"contactClicked"},
		{kind: "PageHeader", className:"shelf-header", components: [
			{content: "Page Header"}
		]},
		{flex: 1, kind: "Pane", components: [
			{flex: 1, kind: "VirtualList", onSetupRow:"getItems",className:"itemList", name:"itemList",autoVertical:true, horizontal:false, components: [
				{kind: "Item", className:"shelf-row", onclick:"itemSelectRow", components:[
         			{name:"itemCells", className:"itemCells", kind:"HtmlContent", layoutKind:"HFlexLayout"}
		        ]}
			]}
		]},
		{kind: "Toolbar", components: [
			{name:"addItemButton", onclick:"openDialog", dialog:"addItemDialog", caption: "+ Add"}
		]},
		{kind: "ModalDialog", name:"addItemDialog", caption: "Add Item", width: "500px",components:[
			{kind:"Divider", caption:"Type of Item"},
			{kind: "HFlexBox", name:"addItemIcons", pack:"center",align:"end",components:[
				{kind: "Image", src:"images/movie-button.png", onclick: "setSearchType", type:"DVD", className: "icon-selected"},
				{kind: "Image", src:"images/book-button.png", onclick: "setSearchType", type:"Books", className: "icon-unselected"},
				{kind: "Image", src:"images/music-button.png", onclick: "setSearchType", type:"Music", className: "icon-unselected"},
				{kind: "Image", src:"images/game-button.png", onclick: "setSearchType", type:"VideoGames", className: "icon-unselected"}
				
			]},
			{kind:"Divider",caption:"Search"},
			{content: "Enter in some keywords from the title of the item, or, type in its UPC or ISBN code.", style:"font-size: 16px;text-align:center;"},
			{kind: "Input", name:"addItemInput", hint:"Keywords, UPC code, or ISBN...", alwaysLooksFocused:true, components:[
				{kind: "Button", name:"addItemSearch", onclick:"searchItems", caption:"Search"}
			]},
			{kind:"InputBox", components:[
				{kind:"Image", src:"images/barcodes.png", style:"display:block;margin:10px auto;"}
			]},
			{kind: "Button", caption: "Close", onclick:"closeDialog", dialog:"addItemDialog"}
		]},
		{kind:"ModalDialog",lazy:false,name:"resultsDialog",layoutKind:"VFlexLayout",onBeforeOpen:"setupResults",caption: "Search Results", width: "90%", components: [
			{kind: "VirtualList",height:"500px", name:"resultsList", onAcquirePage:"getPage", pageSize:10, onSetupRow: "getResult", autoVertical: true, horizontal:false, components:[
				{kind:"Item", layoutKind:"HFlexLayout", onclick:"resultItemSelect", components:[
					{kind: "Image", name:"resultsItemImage", width: "75px", style:"margin-right:10px;"},
					{kind: "VFlexBox", flex:1, components: [
						{content:"", name:"resultsItemName", className:"result-item-name"},
						{kind:"HtmlContent",content:"", name:"resultsItemExtra", className:"result-item-extra"}
					]}
				]}
			]},
			{kind: "Button", caption: "Close", onclick:"closeDialog", dialog:"resultsDialog"}
		]},
		{kind: "Toaster", name: "itemDetail", flyInFrom:"right",className: "enyo-toaster enyo-popup-float pullout", lazy:false, components: [
		    {name: "shadow", className: "enyo-sliding-view-shadow"},
		    {name: "detailContainer", layoutKind: "VFlexLayout", height: "100%", components: [
       			{kind:"Scroller", flex:1,components:[
	        		{name: "detailContent",flex: 1,layoutKind: "VFlexLayout", components:[
	        			{name: "detailItemName", className:"displayItemName"},
	        			{name: "detailItemCreator", className:"displayItemCreator"},
	        			{className:"displayItemImageWrapper", components:[
	        				{kind: "Image", name:"detailItemImage", className:"displayItemImage", width: "150%"}
	        			]},
	        			{kind: "Divider", caption:""},
	        			{name: "detailItemDescription", className:"displayItemDescription"},
	        			{kind: "RowGroup", name:"detailItemDetails", caption: "Details", components:[
	        			]}
	        		]}
        		]},
        		{name: "toolbar", kind: "Toolbar", align: "center", defaultKind: "Control", components: [
            		{name: "dragHandle", kind: "GrabButton",onclick: "closeDialog", dialog:"itemDetail"},
            		{name: "buttonsClient", layoutKind: "HFlexLayout", pack:"left",components:[
            			{kind: "Button", name:"detailLendButton",caption:"Lend", onclick:"lendItem", style:"background-color:transparent; color:#fff;"},
            			{kind: "Button", name:"detailReturnButton",caption:"Returned", onclick:"returnItem", style:"background-color:transparent; color:#fff;"},
            			{kind: "Button",caption:"Share",onclick:"shareItem", style:"background-color:transparent; color:#fff;"},
            			{flex:1},
            			{kind: "Button",caption:"Remove",onlick:"removeItem", className:"enyo-button-negative"}
            		]}
          		]}
      		]}			
		]},
	    {kind: "Toaster", name:"confirmDialog", lazy:false,className: "enyo-dialog", flyInFrom: "bottom", components: [
	        {kind:"HtmlContent",content: "Are you sure you want to delete this group?", name:"confirmDialogText"},
	        {layoutKind: "HFlexLayout", pack: "center", components: [
	            {kind: "Button", caption: "OK", name: 'confirmDialogOK', onclick: "confirmDialogOK", action:'', className: "enyo-button-affirmative"},
	            {kind: "Button", caption: "Cancel", onclick: "confirmDialogCancel", className: "enyo-button-negative"}
	        ]}
	    ]},
		
	],
	createTableDataHandler: function(transaction, results){
		this.log("db and table created");
	},
	queryDataHandler: function(transaction, results){
		this.data=[];
		
		try {
			if(results.rows.length==0){
				this.log("no items in library");
			}else{
				for (var i = 0; i < results.rows.length; i++) {
					var row = results.rows.item(i);
					row.extra=row.extra.replace(/\&nbsp\;/g,'"');
					this.data.push(row);
				}
				
				
				if(this.setCurrent){
					this.currentItem=this.data[this.currentIndex];
				}else{
					this.currentItem=undefined;
				}
				
				this.log(this.data);
				
				this.buildItemCells();
				
				this.$.itemList.punt();
			}
		}catch(e){
			console.log("errror");
			console.log(e.description);
			this.errorHandler(e);
		}
	},
	createRecordDataHandler: function(transaction,results){
		try{
			console.log("create record handler");
			this.loadLibrary();
			
			console.log(enyo.json.stringify(results));
			console.log(enyo.json.stringify(transaction));
		}catch(e){}
	},	
	errorHandler: function(transaction, error){
		if(error.description){
			console.log(error.description);
		}
		console.log("error: "+error);
		//console.log("error: "+enyo.json.stringify(error));	
		this.log(error);
	},
	create: function(){
		//first thing's first! do we have any data added?
		try {
			//console.log("creating db");
			this.db = openDatabase('library', '', 'library stuff', 65536);
		}
		catch (e)
		{
			console.log(e);		
		}

		//create table...
		try {
			//console.log("creating table");
			this.nullHandleCount = 0;
			
			var string = 'CREATE TABLE IF NOT EXISTS library (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, artist TEXT, asin TEXT NOT NULL, author TEXT, binding TEXT, director TEXT, image TEXT, platform TEXT, price TEXT, publisher TEXT, title TEXT, upc TEXT, year INTEGER, type TEXT, extra TEXT)';
			this.log("create table");
		    this.db.transaction( 
		        enyo.bind(this,(function (transaction) { 
					//transaction.executeSql('DROP TABLE IF EXISTS library;', []); 
					//transaction.executeSql('ALTER TABLE library ADD COLUMN type TEXT;', []); 
					//transaction.executeSql('ALTER TABLE library ADD COLUMN lent INTEGER;', []); 
					//transaction.executeSql('ALTER TABLE library ADD COLUMN lentTo TEXT;', []); 
					//transaction.executeSql('ALTER TABLE library ADD COLUMN lentOn INTEGER;', []); 
		            transaction.executeSql(string, [], enyo.bind(this,this.createTableDataHandler), enyo.bind(this,this.errorHandler)); 
		        }))
		    );

		}
		catch (e)
		{
			console.log(e);
		}		

		this.loadLibrary();

		this.inherited(arguments);
	},
	rendered: function(){
	    this.inherited(arguments);
    	this.searchType="DVD";
	    this.buildItemCells();
	    this.region=enyo.g11n.currentLocale().region.toUpperCase();
	    if(LOCALES[this.region]){
	    	this.apiUrl=LOCALES[this.region];
	    }else{
	    	this.apiUrl=LOCALES["US"];
	    }
	    
	    this.log(this.apiUrl);
	    
	    
	},
	resizeHandler: function() {
		this.buildItemCells();
		this.inherited(arguments);
	},  
	loadLibrary: function(setCurrent){
		this.log("loading library");
		//query table...
		var mytext = 'select * from library';
		this.setCurrent=setCurrent;
	    this.db.transaction( 
	        enyo.bind(this,(function (transaction) { 
	            transaction.executeSql(mytext, [], enyo.bind(this,this.queryDataHandler), enyo.bind(this,this.errorHandler)); 
	        }))
	    );
	
	},
	data: [
    /*{title:"A Title", image:"http://ecx.images-amazon.com/images/I/510KCP63P0L._SL160_.jpg", type:"dvd"},
    {title:"A Title2", image:"http://ecx.images-amazon.com/images/I/418MR1SQNKL._SL160_.jpg", type:"cd"},
    {title:"A Title3", image:"http://ecx.images-amazon.com/images/I/510KCP63P0L._SL160_.jpg", type:"dvd"},
    {title:"A Title4", image:"http://ecx.images-amazon.com/images/I/418MR1SQNKL._SL160_.jpg", type:"cd"},
    {title:"A Title5", image:"http://ecx.images-amazon.com/images/I/510KCP63P0L._SL160_.jpg", type:"dvd"},
    {title:"A Title6", image:"http://ecx.images-amazon.com/images/I/61uYQM9S3mL._SL160_.jpg", type:"book"},
    {title:"A Title7", image:"http://ecx.images-amazon.com/images/I/418MR1SQNKL._SL160_.jpg", type:"cd"},
    {title:"A Title8", image:"http://ecx.images-amazon.com/images/I/510KCP63P0L._SL160_.jpg", type:"dvd"},
    {title:"A Title9", image:"http://ecx.images-amazon.com/images/I/418MR1SQNKL._SL160_.jpg", type:"cd"},
    {title:"A Title10", image:"http://ecx.images-amazon.com/images/I/61uYQM9S3mL._SL160_.jpg", type:"book"},
    {title:"A Title11", image:"", type:"game"},
    {title:"A Title12", image:"http://ecx.images-amazon.com/images/I/418MR1SQNKL._SL160_.jpg", type:"cd"},
    {title:"A Title13", image:"http://ecx.images-amazon.com/images/I/510KCP63P0L._SL160_.jpg", type:"dvd"},
    {title:"A Title14", image:"http://ecx.images-amazon.com/images/I/61uYQM9S3mL._SL160_.jpg", type:"book"},
    {title:"A Title15", image:"http://ecx.images-amazon.com/images/I/418MR1SQNKL._SL160_.jpg", type:"cd"},
    {title:"A Title16", image:"http://ecx.images-amazon.com/images/I/510KCP63P0L._SL160_.jpg", type:"dvd"},
    {title:"A Title17", image:"http://ecx.images-amazon.com/images/I/61uYQM9S3mL._SL160_.jpg", type:"book"},
    {title:"A Title18", image:"", type:"game"},
    {title:"A Title19", image:"http://ecx.images-amazon.com/images/I/510KCP63P0L._SL160_.jpg", type:"dvd"},*/
  ],
  buildItemCells: function(){
		var bounds = this.$.itemList.getBounds();
		this.cellCount = Math.floor(bounds.width / 170);
		this.rowCount = Math.floor(bounds.height / 170);
		this.log(this.cellCount);
		this.log(this.rowCount);
		
		this.log(this.data.length/this.cellCount);
		
		if(this.data.length/this.cellCount<this.rowCount){  //not enough data for minimum number of rows
			var minimum=this.cellCount*this.rowCount;
			var needed=Math.abs(this.data.length-minimum);
			
			this.log("min=",minimum);
			this.log("needed=",needed);
			for(var x=0;x<needed;x++){
				this.data.push({placeholder:true});
			}
		}
		
		
		this.$.itemCells.destroyControls();
		this.cells = [];
		for (var i=0; i<this.cellCount; i++) {
			var c = this.$.itemCells.createComponent({flex: 1, kind: "VFlexBox", pack: "center", align: "center", style: "padding: 8px;", owner: this, idx: i, onclick: "cellClick"});
			c.createComponent({kind: "HtmlContent", className:"itemTitle",name: "itemTitle"});
			c.createComponent({flex:1});
			var w=c.createComponent({kind:"HtmlContent", name:"imageWrapper", className: "imageWrapper"});
      w.createComponent({kind: "Image", style: ""});
			w.createComponent({kind: "Image", name:"itemOverlay"});
			this.cells.push(c);
		}
		
		this.log(this.data);
		
		this.$.itemList.refresh();
  },
  getItems: function(inSender,inIndex){
		var idx = inIndex * this.cellCount;


		this.log("idx:",idx);
		if (idx >= 0 && idx < this.data.length) {
			this.log("1: ",idx);
			for (var i=0, c; c=this.cells[i]; i++, idx++) {
			this.log("2: ", i);
				if (idx < this.data.length) {
				this.log("3: ",idx);
					if(this.data[idx].placeholder==true){
						c.addStyles("visibility: hidden; height: 170px;");
					}else{
						
					  var w=c.$.imageWrapper;
						w.$.image.removeClass("dvd-img");
						w.$.itemOverlay.removeClass("dvd");
						
						c.addStyles("visibility: visible; height: auto;");
						
						var type=this.bindingToType(this.data[idx].binding,this.data[idx].platform);
  						this.log(this.data[idx]);
					
						c.$.itemTitle.setContent(this.data[idx].title);
						c.$.itemTitle.hide();
						w.$.image.setSrc(this.data[idx].image);
						w.$.image.setClassName(type+"-img");
						w.$.itemOverlay.setClassName(type);
						w.$.itemOverlay.setSrc("images/"+type+"-overlay.png");
					}
				} else {
					c.addStyles("visibility: hidden;");
				}
			}
			return true;
		}
  },
  cellClick: function(inSender, inEvent){
  	var idx = inEvent.rowIndex * this.cellCount + inSender.idx;
  	this.log(this.data[idx]);
  	var item=this.data[idx];
  	this.currentItem=item;
  	this.currentIndex=idx;
  	
  	this.$.detailItemName.setContent(item.title);
  	var creator=item.author || item.artist || item.director || item.publisher || "Unknown";
  	
  	this.$.detailItemCreator.setContent(creator);
  	this.$.detailItemImage.setSrc(item.image.replace("._SL160_",""));
  	this.$.detailItemDetails.destroyControls();

	if(item.lent=="1"){
		this.$.detailLendButton.hide();
		this.$.detailReturnButton.show();
	}else{
		this.$.detailLendButton.show();
		this.$.detailReturnButton.hide();	
	}

	//make a call for more data
  	var url=this.apiUrl+"?Service=AWSECommerceService&Operation=ItemLookup&AssociateTag=frobba-20&ResponseGroup=Large";
  	url+="&ItemId="+item.asin;
  	this.log(url);
  	
  	var signedUrl=invokeRequest(url);
  	this.log("signed=",signedUrl);
  	this.$.awsItem.setUrl(signedUrl);
  	this.$.awsItem.call();
	
  	
  	this.$.itemDetail.open();
  },
  awsItemSuccess: function(inSender,inResponse,inRequest){
  	this.log(inResponse);
  	var parser=new DOMParser();
  	var xml=parser.parseFromString(inResponse,"text/xml");
  	var rows=[];

	var description=xml.getElementsByTagName("Content")[0];
	if(description){
		description=description.childNodes[0].nodeValue;		
	}else{
		description="";
	}
	
	var publisher=xml.getElementsByTagName("Publisher")[0];
	if(publisher){
		publisher=publisher.childNodes[0].nodeValue;
		var r={layoutKind: "HFlexLayout", components:[{content:publisher, flex:1},{content:"Publisher",className:"enyo-label"}]};
		rows.push(r);
	}
	
	var releasedate=xml.getElementsByTagName("ReleaseDate")[0];
	if(releasedate){
		releasedate=releasedate.childNodes[0].nodeValue;
		var r={layoutKind: "HFlexLayout", components:[{content:releasedate, flex:1},{content:"Release Date",className:"enyo-label"}]};
		rows.push(r);
	}
	
	var theatricaldate=xml.getElementsByTagName("TheatricalReleaseDate")[0];
	if(theatricaldate){
		theatricaldate=theatricaldate.childNodes[0].nodeValue;
		var r={layoutKind: "HFlexLayout", components:[{content:theatricaldate, flex:1},{content:"Theatrical Release",className:"enyo-label"}]};
		rows.push(r);
	}
	
	var publicationdate=xml.getElementsByTagName("PublicationDate")[0];
	if(publicationdate){
		publicationdate=publicationdate.childNodes[0].nodeValue;
		var r={layoutKind: "HFlexLayout", components:[{content:publicationdate, flex:1},{content:"Publication Date",className:"enyo-label"}]};
		rows.push(r);
	}
	
	var actors=xml.getElementsByTagName("Actor");
	var actorscontent='';
	if(actors){
		if(actors.length>0){
			for(var a=0;a<actors.length;a++){
				var actor=actors[a].childNodes[0].nodeValue;
				actorscontent+=actor+"<br>";
			}
			var r={layoutKind: "HFlexLayout", components:[{kind:"HtmlContent",content:actorscontent, flex:1},{content:"Actors",className:"enyo-label"}]};
			rows.push(r);
		}
	}

	var discs=xml.getElementsByTagName("Disc");
	var trackscontent='<ul>';
	if(discs){
		if(discs.length>0){
			for(var d=0;d<discs.length;d++){
				var num=(d+1);
				trackscontent+="<li><b>Disc "+num+"</b><li>";
				tracks=discs[d].getElementsByTagName("Track");
				trackscontent+="<ol>";
				for(var t=0;t<tracks.length;t++){
					trackscontent+="<li>"+tracks[t].childNodes[0].nodeValue+"</li>";
				}
				trackscontent+="</ol>";
			}
			trackscontent+="</ul>";
			var r={layoutKind: "HFlexLayout", components:[{kind:"HtmlContent",content:trackscontent, flex:1},{content:"Tracks",className:"enyo-label"}]};
			rows.push(r);
		}
	}
	
	
	var audience=xml.getElementsByTagName("AudienceRating")[0];
	if(audience){
		audience=audience.childNodes[0].nodeValue;
		var r={layoutKind: "HFlexLayout", components:[{content:audience, flex:1},{content:"Audience Rating",className:"enyo-label"}]};
		rows.push(r);
	}
	
	var binding=xml.getElementsByTagName("Binding")[0];
	if(binding){
		binding=binding.childNodes[0].nodeValue;
		var r={layoutKind: "HFlexLayout", components:[{content:binding, flex:1},{content:"Format",className:"enyo-label"}]};
		rows.push(r);
	}

	var languages=xml.getElementsByTagName("Language");
	var languagescontent='';
	if(languages){
		if(languages.length>0){
			for(var a=0;a<languages.length;a++){
				var language=languages[a];
				var name=language.getElementsByTagName("Name")[0].childNodes[0].nodeValue;
				var type=language.getElementsByTagName("Type")[0].childNodes[0].nodeValue;
				
				languagescontent+=name+" ("+type+")<br>";
			}
			var r={layoutKind: "HFlexLayout", components:[{kind:"HtmlContent",content:languagescontent, flex:1},{content:"Language",className:"enyo-label"}]};
			rows.push(r);
		}
	}

	var features=xml.getElementsByTagName("Feature");
	var featurescontent='';
	if(features){
		if(features.length>0){
			for(var a=0;a<features.length;a++){
				var feature=features[a].childNodes[0].nodeValue;
				featurescontent+=feature+"<br>";
			}
			var r={layoutKind: "HFlexLayout", components:[{kind:"HtmlContent",content:featurescontent, flex:1},{content:"Features",className:"enyo-label"}]};
			rows.push(r);
		}
	}
	
	var runingtime=xml.getElementsByTagName("RunningTime")[0];
	if(runingtime){
		var unit=runingtime.getAttribute("Units");
		runingtime=runingtime.childNodes[0].nodeValue+" "+unit;
		var r={layoutKind: "HFlexLayout", components:[{content:runingtime, flex:1},{content:"Running Time",className:"enyo-label"}]};
		rows.push(r);
	}

	var pages=xml.getElementsByTagName("NumberOfPages")[0];
	if(pages){
		pages=pages.childNodes[0].nodeValue;
		var r={layoutKind: "HFlexLayout", components:[{content:pages, flex:1},{content:"Pages",className:"enyo-label"}]};
		rows.push(r);
	}

	
	
	this.$.detailItemDetails.createComponents(rows);
	this.$.detailItemDetails.render();
  },
  bindingToType: function(binding,platform){
  	var map={
  		"Audio CD":"cd",
  		"DVD":"dvd",
  		"Blu-ray":"bluray",
  		"Paperback":"book",
  		"Hardcover":"book",
  		"Mass Market Paperback":"book",
  	};
  	
  	var platmap={
  		"Nintendo Wii":"wii",
  		"Xbox 360":"xbox",
  		"Xbox":"xbox",
  		"Nintendo DS":"ds",
  		"Nintendo 3DS":"tds",
  		"PlayStation 3":"ps3",
  		"PlayStation2":"dvd",
  		"PlayStation":"cd"
  	};

	if(map[binding]){
		return map[binding];
	}else{
		if(platmap[platform]){
			return platmap[platform];
		}else{
			return "default";
		}
	}
  },
  showConfirmDialog: function(content,action){
	this.$.confirmDialogText.setContent(content);
	this.$.confirmDialogOK.action=action;
	this.$.confirmDialog.open();
  
  },
  returnItem: function(inSender,inEvent){
        this.showConfirmDialog("Has <b>"+this.currentItem.lentTo+"</b> returned <i>"+this.currentItem.title+"</i>?","itemWasReturned");
  },
  itemWasReturned: function(inSender,inEvent){
  	this.$.confirmDialog.close();

  	var when=new Date();
	when=when.getTime();

	var string = 'UPDATE library SET lent="0", lentOn="'+when+'" WHERE id="'+this.currentItem.id+'"';
	this.log(string);
	this.log("update table");
	this.db.transaction( 
		enyo.bind(this,(function (transaction) { 
			//transaction.executeSql('DROP TABLE IF EXISTS library;', []); 
		    transaction.executeSql(string, [], enyo.bind(this,this.itemReturnedOK), enyo.bind(this,this.errorHandler)); 
		}))
	);
  
  },
  itemReturnedOK: function(){
	this.loadLibrary(true);
      this.log(this.currentItem);
		this.$.detailLendButton.show();
		this.$.detailReturnButton.hide();
	  enyo.windows.addBannerMessage("Woohoo! Got your stuff back!","{}");

  },

  lendItem: function(inSender,inEvent){
	  this.$.pickContact.pickPerson();
  },
  updateExtra: function(newProps){
  	var extra=this.currentItem.extra;
  	if(extra==""){
  		extra={};
  	}else{
  		extra=enyo.json.parse(extra);
  	}
  	
  	enyo.mixin(extra,newProps);
  	this.currentItem.extra=enyo.json.stringify(extra);
  },
  contactClicked: function(a,b){
  	this.log(a);
  	this.log(b);
  	
  	var lname=b.name.familyName;
  	var fname=b.name.givenName;
  	var name=(lname)? fname +" "+ lname: fname;
  	
  	this.selectedContact=name;
  	
  	this.log(name);
  	this.$.pickContact.close();
	
	this.showConfirmDialog("Are you sure you want to lend <i>"+this.currentItem.title+"</i> to <b>"+name+"</b>?","lendItemToContact");
  },
  lendItemToContact: function(a,b){
  	this.$.confirmDialog.close();

	var when=new Date();
	when=when.getTime();
	
	var name=this.selectedContact;
 
	var string = 'UPDATE library SET lent="1", lentTo="'+name+'", lentOn="'+when+'" WHERE id="'+this.currentItem.id+'"';
	this.log(string);
	this.log("update table");
	this.db.transaction( 
		enyo.bind(this,(function (transaction) { 
			//transaction.executeSql('DROP TABLE IF EXISTS library;', []); 
		    transaction.executeSql(string, [], enyo.bind(this,this.itemLentOK), enyo.bind(this,this.errorHandler)); 
		}))
	);
 	
  },
  itemLentOK: function(){
	this.loadLibrary(true);
      this.log(this.currentItem);
		this.$.detailLendButton.hide();
		this.$.detailReturnButton.show();
	  enyo.windows.addBannerMessage("Alrighty! Item has been lent out!","{}");
  },

  confirmDialogCancel: function(inSender,inEvent){
  	this.$.confirmDialog.close();
  },
  confirmDialogOK: function(inSender,inEvent){
  	if(this[inSender.action]){
  		this[inSender.action]();
  	}
  },
  setSearchType: function(inSender){
  	this.searchType=inSender.type;
  	var comps=this.$.addItemIcons.children;
  	for(var c=0;c<comps.length;c++){
  		comps[c].setClassName("icon-unselected");
  	}
  	inSender.setClassName("icon-selected");
  },
  searchItems: function(inSender){
  	var url=this.apiUrl+"?Service=AWSECommerceService&Operation=ItemSearch&AssociateTag=frobba-20&ResponseGroup=Medium";
  	url+="&SearchIndex="+this.searchType;
  	var kw=this.$.addItemInput.getValue().replace(/\-/g,"");
  	url+="&Keywords="+encodeURIComponent(kw);
  	this.log(url);
  	
  	var signedUrl=invokeRequest(url);
  	this.log("signed=",signedUrl);

  	this.searchResults=[];
  	this.doingSearch=true;
  	
  	this.$.awsSearch.setUrl(signedUrl);
  	this.$.awsSearch.call();
  },
  awsSearchSuccess: function(inSender,inResponse,inRequest){
  	this.log(inResponse);
  	var parser=new DOMParser();
  	var xml=parser.parseFromString(inResponse,"text/xml");
  	
  	var items=xml.getElementsByTagName("Item");
  	this.log("found "+items.length+" items");
  	
  	
  	var itemCount=items.length;
  	for(var i=0;i<itemCount;i++){
  		var item=items[i];
  		var mimage=item.getElementsByTagName("MediumImage")[0];
  		if(!mimage){
  			mimage=item.getElementsByTagName("SmallImage")[0];
  		}
  		
  		if(mimage){
	  		var image=mimage.getElementsByTagName("URL")[0];
  			if(image){image=image.childNodes[0].nodeValue;}
  		}else{
  			image=""; //make a default image
  		}
  		
  		var asin=item.getElementsByTagName("ASIN")[0];
  		if(asin){asin=asin.childNodes[0].nodeValue;}
  		
  		var title=item.getElementsByTagName("Title")[0];
  		if(title){title=title.childNodes[0].nodeValue;}
  		
  		var upc=item.getElementsByTagName("UPC")[0];
  		if(upc){upc=upc.childNodes[0].nodeValue;}
  		
  		var year=item.getElementsByTagName("TheatricalReleaseDate")[0];
  		if(year){
  			year=year.childNodes[0].nodeValue;
  		}else{
	  		var year=item.getElementsByTagName("PublicationDate")[0];
  			if(year){
  				year=year.childNodes[0].nodeValue;
  			}else{
		  		var year=item.getElementsByTagName("ReleaseDate")[0];
  				if(year){year=year.childNodes[0].nodeValue;}
  			}
  		}

  		var director=item.getElementsByTagName("Director")[0];
  		if(director){director=director.childNodes[0].nodeValue;}

  		var binding=item.getElementsByTagName("Binding")[0];
  		if(binding){binding=binding.childNodes[0].nodeValue;}

  		var author=item.getElementsByTagName("Author")[0];
  		if(author){author=author.childNodes[0].nodeValue;}

  		var artist=item.getElementsByTagName("Artist")[0];
  		if(artist){artist=artist.childNodes[0].nodeValue;}

  		var platform=item.getElementsByTagName("Platform")[0];
  		if(platform){platform=platform.childNodes[0].nodeValue;}

  		var publisher=item.getElementsByTagName("Publisher")[0];
  		if(publisher){publisher=publisher.childNodes[0].nodeValue;}

  		var price=item.getElementsByTagName("ListPrice")[0];
  		if(price){
			price=price.getElementsByTagName("FormattedPrice")[0];
  			price=price.childNodes[0].nodeValue;
  		}else{
  			price=item.getElementsByTagName("LowestNewPrice")[0];
  			if(price){
  				price=price.getElementsByTagName("FormattedPrice")[0];
  				price=price.childNodes[0].nodeValue;
  			}else{
  				price=item.getElementsByTagName("LowestUsedPrice")[0];
  				if(price){
	  				price=price.getElementsByTagName("FormattedPrice")[0];
  					price=price.childNodes[0].nodeValue;
  				}
  			}
  		}

  		
  		

  		var itm={
  			asin: asin,
  			upc: upc,
  			title: title,
  			year: year,
  			image: image,
  			director: director,
  			binding: binding,
  			author: author,
  			artist: artist,
  			publisher: publisher,
  			platform: platform,
  			price: price
  		};
  		
  		this.searchResults.push(itm);
  	}
  	
  	this.log(this.searchResults);
  	
  	if(this.doingSearch){
	  	this.$.resultsList.punt();
	  	this.openDialog({dialog:"resultsDialog"});
	  	this.doingSearch=false;
	}

  },
  setupResults: function(inSender){
  },
  getPage: function(inSender,inPage){
  
  	var index=inPage*inSender.pageSize;
  	if(!this.searchResults[index]){
	  	var url=this.apiUrl+"?Service=AWSECommerceService&Operation=ItemSearch&AssociateTag=frobba-20&ResponseGroup=Medium";
	  	url+="&SearchIndex="+this.searchType;
	  	var kw=this.$.addItemInput.getValue().replace(/\-/g,"");
	  	url+="&Keywords="+encodeURIComponent(kw);
	  	url+="&ItemPage="+inPage;
	  	this.log(url);
	  	
	  	var signedUrl=invokeRequest(url);
	  	this.log("signed=",signedUrl);
	
	  	this.doingSearch=false;
	  	
	  	this.$.awsSearch.setUrl(signedUrl);
	  	this.$.awsSearch.call();  
	}
  },
  getResult: function(inSender,inIndex){
  	this.log(inIndex);
  	var row=this.searchResults[inIndex];
  	
  	if(row){
	  	this.$.resultsItemImage.setSrc(row.image);
  		this.$.resultsItemName.setContent(row.title);
  		
  		this.log(row);
  	
  		if(row.year){
  			if(row.year.indexOf("-")>-1){
			  	var d=row.year.split("-");
  				var y=d[0];
  			}else{
  				var y=row.year;
  			}
  		}else{
  			var y=undefined;
  		}
  		var extra=[];
  		
  		switch(this.searchType){
  			case "DVD":
  				if(y){extra.push(y);}
  				if(row.binding){extra.push(row.binding);}
  				if(row.director){extra.push(row.director);}
  				break;
  			case "Books":
  				if(y){extra.push(y);}
  				if(row.binding){extra.push(row.binding);}
  				if(row.author){extra.push(row.author);}
  				break;
  			case "Music":
  				if(y){extra.push(y);}
  				if(row.binding){extra.push(row.binding);}
  				if(row.artist){extra.push(row.artist);}
  				break;
  			case "VideoGames":
  				if(y){extra.push(y);}
  				if(row.platform){extra.push(row.platform);}
  				if(row.publisher){extra.push(row.publisher);}
  				break;
  		}
  		
  		if(row.price){
  			extra.push(row.price);
  		}
  		
  		this.log(extra);
  		var e=extra.join(" &#149; ");
  		this.log(e);
  		
	  	this.$.resultsItemExtra.setContent(e);
	  	return true;
	}else{
		return false;
	}
	
  },
  resultItemSelect: function(inSender, inEvent){
  //	'INSERT INTO groupitems (groupid,accountid) VALUES ("'+guid+'","'+accountid+'")';
  	var row=this.searchResults[inEvent.rowIndex];
  	
  	var artist=this.sqlEscape(row.artist);
  	var asin=row.asin;
  	var author=this.sqlEscape(row.author);
  	var binding=this.sqlEscape(row.binding);
  	var director=this.sqlEscape(row.director);
  	var image=this.sqlEscape(row.image);
  	var platform=this.sqlEscape(row.platform);
  	var price=this.sqlEscape(row.price);
  	var publisher=this.sqlEscape(row.publisher);
  	var title=this.sqlEscape(row.title);
  	var upc=this.sqlEscape(row.upc);
  	var year=row.year;
  	var type=this.searchType;
  	
  	
  	var sql='INSERT INTO library (artist,asin,author,binding,director,image,platform,price,publisher,title,upc,year,extra,type) VALUES ("'+artist+'", "'+asin+'", "'+author+'", "'+binding+'", "'+director+'", "'+image+'", "'+platform+'", "'+price+'", "'+publisher+'", "'+title+'", "'+upc+'", "'+year+'","","'+type+'")';
  	
  	this.log(sql);
  	
	this.db.transaction( 
	    enyo.bind(this,(function (transaction) { 
        	transaction.executeSql(sql, [], enyo.bind(this,this.createRecordDataHandler), enyo.bind(this,this.errorHandler)); 
    	})) 
	);
  },
  awsSearchFailure: function(inSender,inResponse,inRequest){
  	this.log(inResponse);
  },
  sqlEscape: function(str){
  	if(str){
	  	return str.replace(/&nbsp;/g," ").replace(/"/g,'&quot;');
	}else{
		return "";
	}
  },
  sqlUnescape: function(str){
  	if(str){
	  	return str.replace(/&quot;/g,'"');
	}else{
		return "";
	}
  },
  openDialog: function(inSender){
  	var p=this.$[inSender.dialog];
  	if(p){
  		p.openAtCenter();
  	}
  },
  closeDialog: function(inSender){
   	var p=this.$[inSender.dialog];
  	if(p){
  		p.close();
  	}
  }
});