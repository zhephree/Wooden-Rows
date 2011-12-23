enyo.kind({
	name: "SinglePane",
	kind: enyo.VFlexBox,
	components: [
		{kind: "WebService", name:"awsSearch", url:"",onSuccess:"awsSearchSuccess", onFailure: "awsSearchFailure"},
		{kind: "WebService", name:"awsItem", url:"",onSuccess:"awsItemSuccess", onFailure: "awsItemFailure"},
		{kind: "WebService", name:"zhephreeAPI", url:"http://accounts.zhephree.com/api.php",onSuccess:"zAPISuccess", onFailure: "zAPIFailure"},
		{kind: "WebService", name:"woodenrowsAPI", url:"http://woodenro.ws/api.php",onSuccess:"wAPISuccess", onFailure: "wAPIFailure"},
		{name: "pickContact", kind: "com.palm.library.contactsui.peoplePicker",onContactClick:"contactClicked"},
		{kind: "Menu", name: "sortItemsMenu", onBeforeOpen:"",components: [
			{caption:"Added ▲", onclick:"sortItems", by:"added"},
			{caption:"Added ▼", onclick:"sortItems", by:"addedD"},
			{caption:"Title ▲", onclick:"sortItems", by:"title"},
			{caption:"Title ▼", onclick:"sortItems", by:"titleD"},
			{caption:"Type ▲", onclick:"sortItems", by:"type"},
			{caption:"Type ▼", onclick:"sortItems", by:"typeD"},
			{caption:"Year ▲", onclick:"sortItems", by:"year"},
			{caption:"Year ▼", onclick:"sortItems", by:"yearD"},
		]},		
		{kind: "Menu", name: "shareMenu", onBeforeOpen:"",components: [
			{caption:"Twitter", onclick:"openShare", by:"twitter"},
			{caption:"Facebook", onclick:"openShare", by:"facebook"},
			{caption:"Google+", onclick:"openShare", by:"google"},
		]},		

		{kind: "Menu", name: "filterItemsMenu", onBeforeOpen:"",components: []},		

		{kind: "PageHeader", className:"shelf-header", components: [
			{flex:1, components: [
				{kind: "Image", src:"images/logo.png", width: "230px", height:"38px"}
			]}
		]},
		{flex: 1, kind: "Pane", components: [
			{flex: 1, kind: "VirtualList", onSetupRow:"getItems",className:"itemList", name:"itemList",autoVertical:true, horizontal:false, components: [
				{kind: "Item", className:"shelf-row", onclick:"itemSelectRow", components:[
         			{name:"itemCells", className:"itemCells", kind:"HtmlContent", layoutKind:"HFlexLayout"}
		        ]}
			]}
		]},
		{kind: "Toolbar", layoutKind:"HFlexLayout",components: [
			{name:"sortItemsButton", onclick:"sortItemsMenu",caption:"Sort: Added"},
			{name:"filterItemsButton", onclick:"filterItemsMenu",caption:"Show: All"},
  			{kind: "ToolInput", hint: "Search...", name:"librarySearch", width: "200px", oninput:"searchLibrary", components:[
  				{style: "background: url(images/delete-x.png) 0 0; width: 32px; height: 32px;", onclick:"resetSearch"}
  			]},
			{flex:1},
			{name:"addItemButton", onclick:"openDialog", dialog:"addItemDialog", caption: "+ Add"},
			{kind:"Spinner", name:"syncSpinner"}
		]},
		{kind: "ModalDialog", name:"addItemDialog", scrim:false, caption: "Add Item", width: "500px",components:[
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
				{kind: "ActivityButton", name:"addItemSearch", onclick:"searchItems", caption:"Search"}
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
	        			{kind:'HtmlContent', name:'detailItemBorrowed', content:'', style:'font-weight:bold;text-align:center;'},
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
            			{kind: "Button",caption:"Remove",onclick:"removeItem", className:"enyo-button-negative"}
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
	    {kind: "Toaster", name:"errorDialog", lazy:false,className: "enyo-dialog", flyInFrom: "bottom", components: [
	        {kind:"HtmlContent",content: "", name:"errorDialogText"},
	        {layoutKind: "HFlexLayout", pack: "center", components: [
	            {kind: "Button", caption: "OK", name: 'errorDialogOK', onclick: "closeDialog", dialog:'errorDialog', className: "enyo-button-primary"},
	        ]}
	    ]},
		{kind: "ModalDialog", name:"shareDialog", scrim:true, caption: "Share", width: "600px", height:"560px",onOpen:"shareOpened",components:[
			{kind:"WebView", name:"shareWebView", height:"400px"},
			{kind: "Button", caption: "Close", onclick:"closeDialog", dialog:"shareDialog"}
		]},
		{kind: "ModalDialog", name:"twitterDialog", scrim:true, caption: "Share on Twitter", width: "600px",onOpen:"twitterOpened",components:[
	        	{kind:"RowGroup", caption:"", components:[
	        		{kind:"Input",name:"twitterShare", oninput:"tweetChanged", hint:"Add a comment... (optional)",components:[
	        			{content:"140",name:"tweetCounter",className:"enyo-label"}
	        		]},
	        	]},
			{kind:"HtmlContent", name:"tweetPreview"},
			{kind: "Button", name:"shareTwitter", caption: "Share", onclick:"shareTwitter", dialog:"twitterDialog"},
			{kind: "Button", caption: "Cancel", onclick:"closeDialog", dialog:"twitterDialog"}
		]},
	    {kind: "Toaster", name:"signinDialog", width:"600px",lazy:false,className: "enyo-dialog topdown", flyInFrom: "top", autoClose:false, modal:true, dismissWithClick:false,dismissWithEscape:false,onOpen:'fixPrivacyLinks',components: [
	        {kind:"HtmlContent",content: "Welcome to Wooden Rows! To get things started, you'll have to sign up for a Zhephree account. A Zhephree Account is free and quick to set up. This will allow you to store your library in the cloud so you can access it anywhere in the world. It'll also allow you to easily sign in to other Zhephree apps.", style: "font-size: 14px;"},
	        {layoutKind: "HFlexLayout", pack: "center", components: [
	            {kind: "Button", caption: "Sign Up", name: 'signinSignUp', onclick: "showSignUpForm", action:'', className: "enyo-button-blue", style:"width: 150px"},
	            {kind: "Button", caption: "Log In", name: 'signinLogin', onclick: "showLoginForm", className: "enyo-button-primary", style:"width: 150px"}
	        ]},
	        {name:"signupForm",components:[
	        	{kind:"RowGroup", caption:"Sign Up", components:[
	        		{kind:"Input",name:"signupUsername", autoCapitalize:"lowercase", spellcheck:false, autocorrect:false, components:[
		        		{content:"Username",className:"enyo-label"}
	        		]},
	        		{kind:"Input",name:"signupPassword", autoCapitalize:"lowercase", spellcheck:false, autocorrect:false, components:[
		        		{content:"Password",className:"enyo-label"}
	        		]},
	        		{kind:"Input",name:"signupEmail", autoCapitalize:"lowercase", inputType:"email",spellcheck:false, autocorrect:false, components:[
		        		{content:"Email",className:"enyo-label"}
	        		]},
	        	]},
	            {kind: "ActivityButton", caption: "Sign Up", name: 'signupFormOK', onclick: "doSignUp", action:'', className: "enyo-button-affirmative"},
	            {kind: 'HtmlContent', content:'<a href="http://accounts.zhephree.com/privacy.php" id="privacylink">Privacy Policy</a> and <a href="http://accounts.zhephree.com/terms.php" id="termslink">Terms of Use</a>', style: 'font-size: 14px'}
	        ]},
	        {name:"loginForm",components:[
	        	{kind:"RowGroup", caption:"Log In", components:[
	        		{kind:"Input",name:"loginUsername", autoCapitalize:"lowercase", spellcheck:false, autocorrect:false, components:[
		        		{content:"Username",className:"enyo-label"}
	        		]},
	        		{kind:"PasswordInput",name:"loginPassword", autoCapitalize:"lowercase", spellcheck:false, autocorrect:false, components:[
		        		{content:"Password",className:"enyo-label"}
	        		]},
	        	]},
	            {kind: "ActivityButton", caption: "Log In", name: 'loginFormOK', onclick: "doLogin", action:'', className: "enyo-button-affirmative"},	        
	            {kind: 'HtmlContent', content:'<a href="http://accounts.zhephree.com/forgot.php" id="forgotlink">Forgot Password?</a>', style: 'font-size: 14px'}
	
	        ]}
	    ]},
			{
				name: "openApp", 
				kind: enyo.PalmService,
			    service: "palm://com.palm.applicationManager/"
			},		
		{kind:"HtmlContent",className:"emptyLibrary", name:"emptyLibrary"}
		
	],
	fixPrivacyLinks: function(firstTime) {
		if(firstTime){
			var goToLinkBound=enyo.bind(this,this.goToLink);
			document.getElementById("privacylink").addEventListener('click',goToLinkBound,false);
			document.getElementById("termslink").addEventListener('click',goToLinkBound,false);
			document.getElementById("forgotlink").addEventListener('click',goToLinkBound,false);
		}
	},
	goToLink: function(e){
		//e.preventDefault();
		//window.open(e.target.href);
		this.$.openApp.call({target: e.target.href},{method:"open"})
		//return false;
	},
	doSignUp: function(inSender, inEvent){
		inSender.setActive(true);
		this.apiInSender=inSender;
		
		var data={method:'user.create',
	         		username:this.$.signupUsername.getValue(),
	         		password:calcMD5(this.$.signupPassword.getValue()),
	         		email:this.$.signupEmail.getValue()};
		
		this.log(data);
		
		this.$.zhephreeAPI.setMethod("POST");
		this.$.zhephreeAPI.call(data);
		
	},
	doLogin: function(inSender,inEvent){
		inSender.setActive(true);
		this.apiInSender=inSender;
		
		this.$.zhephreeAPI.setMethod("GET");
		var data={
			method:"user.getToken",
     		username:this.$.loginUsername.getValue(),
     		password:calcMD5(this.$.loginPassword.getValue()),
     		app: "woodenrows"			
		};
		this.$.zhephreeAPI.call(data);
		
	},
	zAPISuccess: function(inSender,inResponse,inRequest){
		//inResponse=enyo.json.parse(inResponse);
		switch(inResponse.code){
			case 500:
			case 404:
			case 403:
				//enyo.windows.addBannerMessage(inResponse.error,"{}");	
				this.showErrorDialog('Error '+inResponse.code+': '+inResponse.error);

				this.apiInSender.setActive(false);
				break;
			case 200:
				switch(inResponse.method){
					case "user.create":
						this.log("create ok");
						this.$.zhephreeAPI.setMethod("GET");
						var data={
							method:"user.getToken",
			         		username:this.$.signupUsername.getValue(),
	    		     		password:calcMD5(this.$.signupPassword.getValue()),
	    		     		app: "woodenrows"			
						};
						this.$.zhephreeAPI.call(data);
						break;
					case "user.getToken":
						var token=inResponse.result.token;
						var user=inResponse.result.user;
						this.log(token);
						this.log(user);
						enyo.setCookie("token",token);
						enyo.setCookie("user",user.id);
						this.userToken=token;
						this.userId=user.id;
						this.apiInSender.setActive(false);
						this.$.signinDialog.close();
						
						///LOAD LIBRARY FROM SERVER. If no items, do a bulk upload
						this.$.syncSpinner.show();
						this.$.woodenrowsAPI.setMethod("GET");
						var data={
							method:"user.getLibrary",
							token: token
						};
						this.$.woodenrowsAPI.call(data);
						
						break;
				}
				break;
		}
	},
	zAPIFailure: function(inSender,inResponse,inRequest){
		this.log("api failure");
		this.showErrorDialog('Unknown zAPI Failure. Server may be down.');

	},
	wAPISuccess: function(inSender,inResponse,inRequest){
		//inResponse=enyo.json.parse(inResponse);
		this.log("success");
		this.log(inResponse);
		switch(inResponse.code){
			case 500:
			case 404:
			case 403:
				//enyo.windows.addBannerMessage(inResponse.error,"{}");	
				this.showErrorDialog('Error '+inResponse.code+': '+inResponse.error);
				this.apiInSender.setActive(false);
				break;
			case 200:
				switch(inResponse.method){
					case "user.getLibrary":
						this.log("got ok");
						var user=inResponse.result.user;
						enyo.setCookie("user",inResponse.result.user.id);
						
						this.serverLibrary=inResponse.result.library;
						this.serverLoaded=true;
						
						this.shares.twitter=inResponse.result.user.shares.twitter;
						this.shares.facebook=inResponse.result.user.shares.facebook;
						
						if(this.localLoaded){
							if(this.serverLibrary.count==0){
								//no items on the server.
								if(this.data.length>0){ //but we have items stored locally
									var items=enyo.json.stringify(this.data);
									this.log("gonna bulk upload");
									this.log(items);
									var token=this.userToken;
									var data={
										method: "library.bulkAddItems",
										token: token,
										items: items
									};
									
									this.$.syncSpinner.show();
									this.$.woodenrowsAPI.setMethod("POST");
									this.$.woodenrowsAPI.call(data);
								}
							}else{
								this.checkLocalLibrary();
							}
						}else{
							if(this.serverLibrary.count>0 && this.data[0].placeholder==true){
								this.log("server load success; forcing localload=true");
								//this.localLoaded=true;
							}
							this.checkLocalLibrary();
						}

						this.$.syncSpinner.hide();		
						//this.loadLibrary();				
						break;
					case "library.bulkAddItems":
						this.log("bulk add ok");
						this.log(inResponse.result.message);
						this.log(inResponse.result.sql);
						this.$.syncSpinner.hide();
						
						break;
					case "library.addItem":
						this.log(inResponse.result.message);
						this.log(inResponse.result.itemId);
						this.$.syncSpinner.hide();
					case "library.deleteItem":
						this.log(inResponse.result.message);
						//this.log(inResponse.result.itemId);
						this.$.syncSpinner.hide();
					case "library.lendItem":
						this.log(inResponse.result.message);
						//this.log(inResponse.result.itemId);
						this.$.syncSpinner.hide();
					case "library.returnItem":
						this.log(inResponse.result.message);
						//this.log(inResponse.result.itemId);
						this.$.syncSpinner.hide();
				}
				break;
		}
	},
	wAPIFailure: function(inSender,inResponse,inRequest){
		this.log("api failure");
		this.showErrorDialog('Unknown wAPI Failure. Server may be down.');
		
	},
	checkLocalLibrary: function(){
		this.log("checking load statuses...");
		//this.log("local="+this.localLoaded);
		if(this.localLoaded){
			
			this.loadCount++;
		}
		
		if(this.localLoaded && this.loadCount==1){
		    var sort=enyo.getCookie("sort");
		    if(sort!=undefined && sort!=""){
		    	this.sortItems({by:sort});
		    }		
		}

		if(this.serverLibrary.count>0 && this.data[0].placeholder==true){
			this.log("server load success; forcing localload=true");
			//this.localLoaded=true;
		}
		
		if(this.localLoaded && this.serverLoaded){
			this.log("both loaded");
			if(this.serverLibrary.count>0 && (this.data.length==0 || this.data[0].placeholder==true) && (this.searchQuery=="" || this.searchQuery==undefined)){ //no local data, but there's server data
				enyo.windows.addBannerMessage("Syncing library...","{}");

				/*for(var i=0;i<this.serverLibrary.count;i++){
					var item=this.serverLibrary.items[i];
					var sql='INSERT INTO library (artist,asin,author,binding,director,image,platform,price,publisher,title,upc,year,extra,type) VALUES ("'+item.artist+'", "'+item.asin+'", "'+item.author+'", "'+item.binding+'", "'+item.director+'", "'+item.image+'", "'+item.platform+'", "'+item.price+'", "'+item.publisher+'", "'+item.title+'", "'+item.upc+'", "'+item.year+'","","'+item.type+'")';
				  	
				  	//this.log(sql);
				  	
					this.db.transaction( 
					    enyo.bind(this,(function (transaction) { 
				        	transaction.executeSql(sql, [], enyo.bind(this,this.createRecordDataHandler), enyo.bind(this,this.errorHandler)); 
				    	})) 
					);

				}
				this.log("finished loop");*/
				this.$.syncSpinner.show();
				enyo.asyncMethod(this,"insertArray",this.serverLibrary.items);
			}
			
			
		}
	},
	insertArray: function(array,callback){
		this.log("insert array...");
		this.strings=[];
		this.asyncCount=array.length;
		this.asyncOn=0;
		this.asyncArray=array;
		this.db.transaction( 
	        enyo.bind(this,(function (transaction) { 			
	        	this.log("before loop");
				for(var a=0;a<this.asyncArray.length;a++){
							            transaction.executeSql('INSERT INTO library (artist,asin,author,binding,director,image,platform,price,publisher,title,upc,year,extra,type,title_sort) VALUES ("'+this.asyncArray[a].artist+'", "'+this.asyncArray[a].asin+'", "'+this.asyncArray[a].author+'", "'+this.asyncArray[a].binding+'", "'+this.asyncArray[a].director+'", "'+this.asyncArray[a].image+'", "'+this.asyncArray[a].platform+'", "'+this.asyncArray[a].price+'", "'+this.asyncArray[a].publisher+'", "'+this.asyncArray[a].title+'", "'+this.asyncArray[a].upc+'", "'+this.asyncArray[a].year+'","","'+this.asyncArray[a].type+'","'+this.asyncArray[a].title_sort+'")', [], enyo.bind(this,this.libraryAsyncSuccess), enyo.bind(this,this.errorHandler)); 
				}
				this.log("after loop");
	        })) 
	    );
	

	},
	libraryAsyncSuccess: function(transaction, results){
		this.asyncOn++;
		this.log("async success");
		this.log(this.asyncOn);
		this.log(this.asyncCount);
		if(this.asyncOn==this.asyncCount){
			this.loadLibrary();
			this.$.syncSpinner.hide();
		}
	},	
	showSignUpForm: function(inSender, inEvent){
		this.$.signupForm.show();
		this.$.loginForm.hide();
	},
	showLoginForm: function(inSender, inEvent){
		this.$.loginForm.show();
		this.$.signupForm.hide();
	},
	createTableDataHandler: function(transaction, results){
		this.log("db and table created");
	},
	inArray: function(array,item){
		var inarray=false;
		for(var i=0,l=array.length;i<l;i++){
			if(array[i]==item){
				inarray=true;
				break;
			}
		}
		
		return inarray;
	},
	queryDataHandler: function(transaction, results){
		this.data=[];
		if(!this.isFiltering){
			this.types=[];
			this.platforms=[];
		}
		
		try {
			if(results.rows.length==0){
				this.log("no items in library");
				this.localLoaded=true;
				this.buildItemCells();
				if(this.filterBy=="" || this.filterBy.toLowerCase()=="all"){
					this.checkLocalLibrary();
					this.$.emptyLibrary.hide()
				}else{
					this.$.emptyLibrary.setContent("There are currently no "+this.filterBy+" items in your library");
					this.$.emptyLibrary.show();
				}
				
				this.$.itemList.punt();
				
			}else{
				this.$.emptyLibrary.hide()
				for (var i = 0; i < results.rows.length; i++) {
					var row = results.rows.item(i);
					row.extra=row.extra.replace(/\&nbsp\;/g,'"');
					
					if(!this.inArray(this.types,row.type) && !this.isFiltering){
						this.types.push(row.type);
					}
					
					if(this.addedItem){
						if(row.asin==this.addedItemASIN){
							row.new=true;
							this.addedItem=false;
							this.addedItemASIN='';
						}
					}
					
					this.data.push(row);

				}
				
				this.log(this.types);
				
				if(this.setCurrent){
					this.currentItem=this.data[this.currentIndex];
				}else{
					this.currentItem=undefined;
				}
				
				this.log(this.data);
				this.log("querydata handler set localloaded=true");
				this.localLoaded=true;
				
				//see if we should bulk upload
				if(this.serverLoaded){
					if(this.serverLibrary.count==0){
						//no items on the server.
						if(this.data.length>0){ //but we have items stored locally
							var items=enyo.json.stringify(this.data);
							this.log("gonna bulk upload");
							this.log(items);
							var token=this.userToken;
							var data={
								method: "library.bulkAddItems",
								token: token,
								items: items
							};
							
							this.$.syncSpinner.show();
							this.$.woodenrowsAPI.setMethod("POST");
							this.$.woodenrowsAPI.call(data);
						}
					}else{ //stuff on server
						this.log("local loaded; server has stuff");
						this.checkLocalLibrary();
					}
				}else{
					this.checkLocalLibrary();	
				}
				
				
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
			this.addedItem=true;
			this.loadLibrary();
			
			console.log(enyo.json.stringify(results));
			console.log(enyo.json.stringify(transaction));
		}catch(e){}
	},	
	errorHandler: function(transaction, error){
		if(error){
			if(error.description){
				console.log(error.description);
			}
			console.log("error: "+error);
			//console.log("error: "+enyo.json.stringify(error));	
			this.log(error);
		}
	},
	create: function(){
		//first thing's first! do we have any data added?
		this.serverLoaded=false;
		this.localLoaded=false;
		this.shares={twitter:{},facebook:{}};
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
			
			var string = 'CREATE TABLE IF NOT EXISTS library (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, artist TEXT, asin TEXT NOT NULL, author TEXT, binding TEXT, director TEXT, image TEXT, platform TEXT, price TEXT, publisher TEXT, title TEXT, upc TEXT, year INTEGER, type TEXT, extra TEXT, lent INTEGER, lentTo TEXT, lentOn INTEGER, title_sort TEXT)';
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
		this.$.emptyLibrary.hide();
	    this.$.syncSpinner.hide();
	    this.loadCount=0;
    	this.searchType="DVD";
    	this.filterBy='';
	    this.buildItemCells();
	    this.region=enyo.g11n.currentLocale().region.toUpperCase();
	    if(LOCALES[this.region]){
	    	this.apiUrl=LOCALES[this.region];
	    }else{
	    	this.apiUrl=LOCALES["US"];
	    }
	    
	    this.log(this.apiUrl);
	    
	    
	    var token=enyo.getCookie("token");
	    if(token!=undefined && token!=""){
	    	this.userToken=token;
			///LOAD LIBRARY FROM SERVER. If no items, do a bulk upload
			this.$.syncSpinner.show();
			this.$.woodenrowsAPI.setMethod("GET");
			var data={
				method:"user.getLibrary",
				token: this.userToken
			};
			this.$.woodenrowsAPI.call(data);
	    }else{
	    	this.$.signupForm.hide();
	    	this.$.loginForm.hide();
	    	this.openDialog({dialog:"signinDialog"});
	    }

/*
	    	this.$.signupForm.hide();
	    	this.$.loginForm.hide();	    
	    this.openDialog({dialog:"signinDialog"});*/
	    
	    var userid=enyo.getCookie("user");
	    if(userid!=undefined && userid!=""){
	    	this.userId=userid;
	    }
	    
	    
	    //this.log(enyo.getCookie("user"));
	},
	resizeHandler: function() {
		this.buildItemCells();
		this.inherited(arguments);
	},  
	loadLibrary: function(setCurrent,isFiltering,isSearching){
		this.log("loading library");
		//query table...
		var orderby="";
		switch(this.sortBy){
			case "added":
				orderby=" ORDER BY id ASC";
				break;
			case "addedD":
				orderby=" ORDER BY id DESC";
				break;
			case "title":
				orderby=" ORDER BY title_sort ASC";
				break;
			case "titleD":
				orderby=" ORDER BY title_sort DESC";
				break;
			case "type":
				orderby=" ORDER BY type ASC";
				break;
			case "typeD":
				orderby=" ORDER BY type DESC";
				break;
			case "year":
				orderby=" ORDER BY year ASC";
				break;
			case "yearD":
				orderby=" ORDER BY year DESC";
				break;
		}

		this.isFiltering=isFiltering;
		
		var where="";
		if(this.filterBy!="" && this.filterBy!=undefined){
			where=' WHERE type="'+this.filterBy+'" ';
			if(this.filterBy=='lent'){
				where=' WHERE lent="1" ';
			}
			
			if(this.searchQuery!=undefined && this.searchQuery!=""){
				where+=' AND (title LIKE "%'+this.searchQuery+'%" OR artist LIKE "%'+this.searchQuery+'%" OR author LIKE "%'+this.searchQuery+'%") ';
			}
		}else{
			if(this.searchQuery!=undefined && this.searchQuery!=""){
				where+=' WHERE (title LIKE "%'+this.searchQuery+'%" OR artist LIKE "%'+this.searchQuery+'%" OR author LIKE "%'+this.searchQuery+'%") ';
			}		
		}
		
				
		var mytext = 'select * from library'+where+orderby;
		this.log(mytext);
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
		//this.log(this.cellCount);
		//this.log(this.rowCount);
		
		//this.log(this.data.length/this.cellCount);
		
		if(this.data.length/this.cellCount<this.rowCount){  //not enough data for minimum number of rows
			var minimum=this.cellCount*this.rowCount;
			var needed=Math.abs(this.data.length-minimum);
			
			//this.log("min=",minimum);
			//this.log("needed=",needed);
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
		
		//this.log(this.data);
		
		this.$.itemList.refresh();
  },
  getItems: function(inSender,inIndex){
		var idx = inIndex * this.cellCount;


		//this.log("idx:",idx);
		if (idx >= 0 && idx < this.data.length) {
			//this.log("1: ",idx);
			for (var i=0, c; c=this.cells[i]; i++, idx++) {
			//this.log("2: ", i);
				if (idx < this.data.length) {
				//this.log("3: ",idx);
					if(this.data[idx].placeholder==true){
						c.addStyles("visibility: hidden; height: 170px;");
					}else{
						
					  var w=c.$.imageWrapper;
						w.$.image.removeClass("dvd-img");
						w.$.itemOverlay.removeClass("dvd");

						
						if(this.data[idx].lent=="1"){
							w.addClass("lent");
						}else{
							w.removeClass("lent");
						}

//						w.removeClass("animated");
//						w.removeClass("bounceInDown");						

						
						if(this.data[idx].new==true){
							//w.addClass("animated");
							//w.addClass("bounceInDown");
							//this.log("new: "+this.data[idx].title);
							//this.data[idx].new=false;
						}else{
							//w.removeClass("bounceInDown");	
												
						}
						
						c.addStyles("visibility: visible; height: auto;");
						
						var type=this.bindingToType(this.data[idx].binding,this.data[idx].platform);
  						//this.log(this.data[idx]);
					
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
  	this.currentElement=inSender;
  	this.log(inSender);
  	this.log(this.currentElement);
  	
  	this.$.detailItemName.setContent(item.title);
  	var creator=item.author || item.artist || item.director || item.publisher || "Unknown";
  	
  	this.$.detailItemCreator.setContent(creator);
  	this.$.detailItemImage.setSrc(item.image.replace("._SL160_",""));
  	this.$.detailItemDetails.destroyControls();

	if(item.lent=="1"){
		this.$.detailLendButton.hide();
		this.$.detailReturnButton.show();
		var one_day=1000*60*60*24;
		var lent=item.lentOn;
		var d=new Date();
		var now=d.getTime();
		var diff=now-lent;
		var daysago=Math.ceil(diff/one_day);
		var s=(daysago==1)? '':"s";
		
		this.$.detailItemBorrowed.setContent(item.lentTo+' borrowed this '+daysago+' day'+s+' ago.');
	}else{
		this.$.detailLendButton.show();
		this.$.detailReturnButton.hide();	
		this.$.detailItemBorrowed.setContent('');
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
  	//this.log(inResponse);
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
  		"PlayStation":"cd",
  		"Sega Dreamcast":"cd"
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
  showErrorDialog: function(content){
	this.$.errorDialogText.setContent(content);
	this.$.errorDialog.open();
  
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
	
 	if(this.userToken){
 		var data={
 			token: this.userToken,
 			method: 'library.returnItem',
 			owner: this.userId,
 			asin: this.currentItem.asin
 		};
 		
 		this.$.syncSpinner.show();
 		this.$.woodenrowsAPI.setMethod("POST");
 		this.$.woodenrowsAPI.call(data);
 	}
  
  },
  itemReturnedOK: function(){
	this.loadLibrary(true);
      this.log(this.currentItem);
		this.$.detailLendButton.show();
		this.$.detailReturnButton.hide();
	  enyo.windows.addBannerMessage("Woohoo! Got your stuff back!","{}");

  },
  removeItem: function(inSender, inEvent){
  	this.log("showing dialog...");
        this.showConfirmDialog("Are you sure you want to remove <i>"+this.currentItem.title+"</i> from your library? This cannot be undone.","doRemoveItem");  	
  },
  doRemoveItem: function(){
    this.$.confirmDialog.close();
    this.$.itemDetail.close();

	var string = 'DELETE FROM library WHERE id="'+this.currentItem.id+'"';
	this.log(string);
	this.log("update table");
	this.db.transaction( 
		enyo.bind(this,(function (transaction) { 
			//transaction.executeSql('DROP TABLE IF EXISTS library;', []); 
		    transaction.executeSql(string, [], enyo.bind(this,this.itemRemovedOK), enyo.bind(this,this.errorHandler)); 
		}))
	);
	
	if(this.userToken){
	    this.$.syncSpinner.show();
	    var data={
	    	token: this.userToken,
	    	method: 'library.deleteItem',
	    	owner: this.userId,
	    	asin: this.currentItem.asin
	    };
	    
	    this.$.woodenrowsAPI.setMethod("POST");
	    this.$.woodenrowsAPI.call(data);
    }
  },
  itemRemovedOK: function(){
    var cell=this.currentElement;
    this.removeDone=enyo.bind(this,this.removeAniDone);
    if(cell){
    	this.iw=cell.$.imageWrapper;
    	this.iw.hasNode().addEventListener( 'webkitTransitionEnd', this.removeDone, false );
    	this.iw.addClass("removing");
    }
  },
  removeAniDone: function(){
	this.loadLibrary(true);
      this.log(this.currentItem);
	  enyo.windows.addBannerMessage("Ohh, that was a nice i-- DELETED!!","{}");
    this.iw.removeEventListener('webkitTransitionEnd',this.removeDone,false);
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
 	if(this.userToken){
 		var data={
 			token: this.userToken,
 			method: 'library.lendItem',
 			owner: this.userId,
 			asin: this.currentItem.asin,
 			lentTo: name,
 			lentOn: when
 		};

		this.$.syncSpinner.show(); 		
 		this.$.woodenrowsAPI.setMethod("POST");
 		this.$.woodenrowsAPI.call(data);
 	}
 	
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
	  	this.$.confirmDialog.close();
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
  	inSender.setActive(true);
  	var url=this.apiUrl+"?Service=AWSECommerceService&Operation=ItemSearch&AssociateTag=frobba-20&ResponseGroup=Medium";
  	url+="&SearchIndex="+this.searchType;
  	var kw=this.$.addItemInput.getValue().replace(/\-/g,"");
  	url+="&Keywords="+encodeURIComponent(kw);
  	
  	url=url.replace(/'/g," ");
  	this.log(url);
  	
  	var signedUrl=invokeRequest(url);
  	this.log("signed=",signedUrl);

  	this.searchResults=[];
  	this.doingSearch=true;
  	
  	this.$.awsSearch.setUrl(signedUrl);
  	this.$.awsSearch.call();
  },
  resetSearch: function(inSender, inEvent){
  	this.$.librarySearch.setValue('');
  	this.searchQuery='';
  	this.loadLibrary();
  },
  awsSearchSuccess: function(inSender,inResponse,inRequest){
  	this.$.addItemSearch.setActive(false);
  	enyo.keyboard.setManualMode(true);
  	enyo.keyboard.hide();

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
  	this.log("~~~~~~~~~~~~~adding to db");
  	var row=this.searchResults[inEvent.rowIndex];
  	this.rowData=row;
  	this.log(row);
  	
  	//first, see if this is already in the library
  	var inLibrary=false;
  	var count=this.data.length;
  	for(var i=0;i<count;i++){
  		this.log(this.data[i]);
  		if(row.title==this.data[i].title && this.searchType==this.data[i].type){
  			inLibrary=true;
  			break;
  		}
  	}
  	
  	if(!inLibrary){
		this.saveItem();
	}else{
		this.showConfirmDialog("This item appears to already be in your library. Do you want to add it anyway?","saveItem");
	
	}	
	
  },
  saveItem: function(){
  		row=this.rowData;
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
	  	
	  	//create title to sort by
	  	var title_sort=row.title;
	  	if(title.toLowerCase().substr(0,4)=="the "){
	  		title_sort=title.substr(5);
	  	}else if(title.toLowerCase().substr(0,2)=="a "){
	  		title_sort=title.substr(3);
	  	}else if(title.toLowerCase().substr(0,3)=="an "){
	  		title_sort=title.substr(4);
	  	}
	  	
	  	this.addedItemASIN=asin;
		this.$.addItemInput.setValue('');
		
	  	this.closeDialog({dialog:"resultsDialog"});
	  	enyo.keyboard.setManualMode(false);
	
	  	//this.closeDialog({dialog:"addItemDialog"});
		this.doingSearch=false;
		if(this.userToken){
			this.$.syncSpinner.show();
			var data={
				token: this.userToken,
				method: 'library.addItem',
				artist: artist,
				asin: asin,
				binding: binding,
				director: director,
				image: row.image,
				platform: platform,
				price: price,
				publisher: publisher,
				title: title,
				upc: upc,
				year: year,
				type: type,
				lent: 0,
				lentTo: '',
				lentOn: null,
				title_sort: title_sort
			};
			this.log(data);
			this.$.woodenrowsAPI.setMethod("POST");
			this.$.woodenrowsAPI.call(data);
		}
		
	  	
	  	var sql='INSERT INTO library (artist,asin,author,binding,director,image,platform,price,publisher,title,upc,year,extra,type,title_sort) VALUES ("'+artist+'", "'+asin+'", "'+author+'", "'+binding+'", "'+director+'", "'+image+'", "'+platform+'", "'+price+'", "'+publisher+'", "'+title+'", "'+upc+'", "'+year+'","","'+type+'","'+title_sort+'")';
	  	
	  	this.log(sql);
	  	
		this.db.transaction( 
		    enyo.bind(this,(function (transaction) { 
	        	transaction.executeSql(sql, [], enyo.bind(this,this.createRecordDataHandler), enyo.bind(this,this.errorHandler)); 
	    	})) 
		);  
  },
  shareItem: function(inSender,inEvent){
  	this.$.shareMenu.openAtControl(inSender,{top: -45});
  },
  openShare: function(inSender, inEvent){
  	this.shareVia=inSender.by;
  	var ok=true;
  	this.dialog="shareDialog";
  	switch(this.shareVia){
  		case "twitter":
  			if(this.shares.twitter.token){
				this.dialog="twitterDialog";
  			}else{
  				ok=false;
  				this.showConfirmDialog("You do not currently have your Twitter account linked to Wooden Rows. Would you like to visit the Wooden Rows website and do this now?","linkNetwork");
  			}
  			break;
  		case "facebook":
  			if(this.shares.facebook.token){
  				
  			}else{
  				ok=false;
  				this.showConfirmDialog("You do not currently have your Facebook account linked to Wooden Rows. Would you like to visit the Wooden Rows website and do this now?","linkNetwork");
  			}
  			break;
  	}
  	
  	if(ok){
	  	var url=encodeURIComponent("http://woodenro.ws/item/"+this.userId+"-"+this.currentItem.asin);  	
		var bitly="http://api.bitly.com/v3/shorten?login=woodenrows&apiKey=R_3e2540a11bc85f05554a4ae7ea5ed4f4&longUrl="+url+"&format=txt";
		
		this.$.syncSpinner.show();
		enyo.xhr.request({
		 url: bitly,
		 method: "GET",
		 callback: enyo.bind(this, "linkSuccess"),
		 sync: false
		});
	} 	
  },
  linkSuccess: function(inResponse,inRequest){
	this.shareURL=enyo.string.trim(inResponse);
	this.$.syncSpinner.hide();
    this.openDialog({dialog:this.dialog});

  },
  linkNetwork: function(){
  	window.open("http://woodenro.ws/sharing.php");
  },
  
  shareOpened: function(inSender,inEvent){
  	var text=this.currentItem.title;
  	var url=encodeURIComponent(this.shareURL);
  	switch(this.shareVia){
  		case "twitter":
  			this.$.shareWebView.setUrl("https://twitter.com/intent/tweet?related=zhephree&text="+text+"&url="+url+"&via=WoodenRows");
  			break;
  		case "facebook":
  			this.$.shareWebView.setUrl("http://m.facebook.com/sharer.php?u="+url+"&t="+text);
  			break;
  		case "google":
  			text+=" on Wooden Rows";
  			this.$.shareWebView.setUrl("https://m.google.com/app/plus/x/1jvfeqxlhztom/?content="+text+" "+url+"&v=compose");
  			break;
  	}
  },
  twitterOpened: function(inSender,inEvent){
  		var base="Check out "+this.currentItem.title+" in my library! "+this.shareURL;
  		if(base.length>140){
  			base=base.replace("in my library! ","");
  		}
  		
  		if(base.length>140){
  			base=base.replace("Check out ","");
  		}
  		this.tweet=base;
  		this.$.tweetPreview.setContent(base);
	  	this.$.tweetCounter.setContent(140-this.tweet.length);

  },
  tweetChanged: function(inSender,inEvent){
  	var text=inSender.getValue();
  	if(!text){
  		var base="Check out "+this.currentItem.title+" in my library! "+this.shareURL;
  		if(base.length>140){
  			base=base.replace("in my library! ","");
  		}
  		
  		if(base.length>140){
  			base=base.replace("Check out ","");
  		}
  		this.tweet=base;
  	}else{
  		var tweet=text+" | "+this.currentItem.title+" "+this.shareURL;
  		if(tweet.length>140){
  			tweet=text+" "+this.shareURL;
  		}
	  	this.tweet=tweet;
  	}
  	this.$.tweetPreview.setContent(this.tweet);
  	this.$.tweetPreview.render();
  	
  	this.$.tweetCounter.setContent(140-this.tweet.length);
  	
  	if(140-this.tweet.length<0){
  		this.$.shareTwitter.setDisabled(true);
  	}else{
  		this.$.shareTwitter.setDisabled(false);
  	}
  },
  shareTwitter: function(inSender,inEvent){
	var oauth= OAuth({
		'consumerKey':'ZFYUlylX9YIwXS2vGHUDhg',
		'consumerSecret':'BtQ6XjJJYeO6mpRd1CINdxdlBaJoBdudRK4fAmY',
		'requestTokenUrl':'https://api.twitter.com/oauth/request_token',
		'authorizationUrl':'https://api.twitter.com/oauth/authorize',
		'accessTokenUrl':'https://api.twitter.com/oauth/access_token',
	});
	
	this.log(oauth);
	
	oauth.setAccessToken([this.shares.twitter.token,this.shares.twitter.secret]);  
	var tweetData={status: this.tweet};
	oauth.request({
		method: "POST",
		url: "http://api.twitter.com/1/statuses/update.json",
		data: tweetData,
		success: enyo.bind(this,"twitterSuccess"),
		failure: enyo.bind(this,"errorHandler")
	});
	
  },
  twitterSuccess:function(inResponse,inRequest){
  	this.closeDialog({dialog:"twitterDialog"});
	enyo.windows.addBannerMessage("Item shared on Twitter!","{}");  	
  },
  sortItemsMenu: function(inSender,inEvent){
  	this.$.sortItemsMenu.openAtControl(inSender,{top: -45});
  },
  sortItems: function(inSender,inEvent){
  	this.sortBy=inSender.by;
  	enyo.setCookie("sort",this.sortBy);
  	
  	var cap=this.sortBy.charAt(0).toUpperCase() + this.sortBy.slice(1)
  	this.log(cap);
  	if(cap.substr(cap.length-1)=="D"){
  		cap=cap.substr(0,cap.length-1);
  		cap=cap+"▼";
  	}
  	this.$.sortItemsButton.setCaption('Sort: '+cap);
  	this.loadLibrary();
  },
  filterItemsMenu: function(inSender, inEvent){
  	this.$.filterItemsMenu.destroyControls();
  	var c=[];
  	c.push({caption:"All",onclick:"filterItems", by:''});
  	
  	for(var i=0,l=this.types.length;i<l;i++){
  		var t='';
  		switch(this.types[i]){
  			case "VideoGames":
  				t="Video Games";
  				break;
  			case "DVD":
  				t="Movies";
  				break;
  			default:
  				t=this.types[i];
  				break;
  		}
  		c.push({caption:t,onclick:"filterItems", by:this.types[i]});
  	}
  	
  	c.push({caption:"Lent Out",onclick:"filterItems", by:'lent'});

  	
  	this.$.filterItemsMenu.filterItems=enyo.bind(this,this.filterItems);
  	this.$.filterItemsMenu.createComponents(c);
  	this.$.filterItemsMenu.render();
  	this.$.filterItemsMenu.openAtControl(inSender,{top:-45});
  },
  filterItems: function(inSender,inEvent){
  	this.log(inSender.by);
	switch(inSender.by){
		case "Video Games":
			t="VideoGames";
			break;
		case "Movies":
			t="DVD";
			break;
		default:
			t=inSender.by;
			break;
	}
	

	this.filterBy=t;
  	var cap=inSender.by.charAt(0).toUpperCase() + inSender.by.slice(1)
  	if(cap==""){
  		cap="All";
  		this.isFiltering=false;
  	}else{
  		this.isFiltering=true;
  		if(cap=="VideoGames"){
  			cap="Video Games";
  		}else if(cap=="DVD"){
  			cap="Movies";
  		}
  	}
  	this.$.filterItemsButton.setCaption('Show: '+cap);
  	this.loadLibrary(false,this.isFiltering);
  },
  searchLibrary: function(inSender,inEvent){
  	var val=inSender.value;
  	
  	this.searchQuery=val;
  	this.loadLibrary(false,this.isFiltering,true);
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
  		if(inSender.dialog=='resultsDialog'){
  		  	enyo.keyboard.setManualMode(false);
  		}
  	}
  }
});