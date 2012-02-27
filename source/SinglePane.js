enyo.kind({
	name: "SinglePane",
	kind: enyo.VFlexBox,
	components: [
		{kind: "WebService", name:"awsSearch", url:"",onSuccess:"awsSearchSuccess", onFailure: "awsSearchFailure"},
		{kind: "WebService", name:"booksAPI", url:"http://openlibrary.org/search.json",onSuccess:"bookSuccess", onFailure: "awsSearchFailure"},
		{kind: "WebService", name:"booksAPIMatch", url:"http://openlibrary.org/search.json",onSuccess:"bookMatchSuccess", onFailure: "awsSearchFailure"},
		{kind: "WebService", name:"booksDetail", url:"http://openlibrary.org/api/books",onSuccess:"awsItemSuccess", onFailure: "awsSearchFailure"},
		{kind: "WebService", name:"gamesAPI", url:"http://thegamesdb.net/api/GetGame.php",onSuccess:"gamesSuccess", onFailure: "awsSearchFailure"},
		{kind: "WebService", name:"gamesAPIMatch", url:"http://thegamesdb.net/api/GetGame.php",onSuccess:"gamesMatchSuccess", onFailure: "awsSearchFailure"},
		{kind: "WebService", name:"gamesDetail", url:"http://thegamesdb.net/api/GetGame.php",onSuccess:"awsItemSuccess", onFailure: "awsSearchFailure"},
		{kind: "WebService", name:"moviesAPI", url:"http://api.remix.bestbuy.com/v1/products",onSuccess:"moviesSuccess", onFailure: "awsSearchFailure"},
		{kind: "WebService", name:"moviesAPIMatch", url:"http://api.remix.bestbuy.com/v1/products",onSuccess:"moviesMatchSuccess", onFailure: "awsSearchFailure"},
		{kind: "WebService", name:"moviesDetail", url:"http://api.remix.bestbuy.com/v1/products",onSuccess:"awsItemSuccess", onFailure: "awsSearchFailure"},
		{kind: "WebService", name:"musicAPI", url:"http://api.discogs.com/database/search",onSuccess:"musicSuccess", onFailure: "awsSearchFailure"},
		{kind: "WebService", name:"musicAPIMatch", url:"http://api.discogs.com/database/search",onSuccess:"musicMatchSuccess", onFailure: "awsSearchFailure"},
		{kind: "WebService", name:"musicDetail", url:"http://api.discogs.com/database/releases",onSuccess:"awsItemSuccess", onFailure: "awsSearchFailure"},
		{kind: "WebService", name:"barcodeAPI", url:"http://www.searchupc.com/handlers/upcsearch.ashx",onSuccess:"barcodeSuccess", onFailure: "awsSearchFailure"},
		{kind: "WebService", name:"awsItem", url:"",onSuccess:"awsItemSuccess", onFailure: "awsItemFailure"},
		{kind: "WebService", name:"zhephreeAPI", url:"http://accounts.zhephree.com/api.php",onSuccess:"zAPISuccess", onFailure: "zAPIFailure"},
		{kind: "WebService", name:"woodenrowsAPI", url:"http://woodenro.ws/api.php",onSuccess:"wAPISuccess", onFailure: "wAPIFailure"},
		{kind: "WebService", name:"reverseGeocode", url:"http://maps.googleapis.com/maps/api/geocode/json"},
	    {name: "downloadManager",kind: "PalmService",service: "palm://com.palm.downloadmanager",method: "upload", subscribe: true,

		          onSuccess: "onUploadSuccess",
		          onFailure: "onUploadFailure",
		          onResponse: "onUploadResponse"
		},
		{name: "facebookPost", kind: "WebService", url: "https://graph.facebook.com/OBJECT_ID/feed",method:"POST",onSuccess: "facebookSuccess",onFailure: "facebookFailure"},
		{name: "pickContact", kind: "com.palm.library.contactsui.peoplePicker",onContactClick:"contactClicked"},
		{name: "pgPickContact", kind:"pgPeoplePicker", onComplete: "contactClicked"},
		{name:'photoPicker', kind: "FilePicker", fileType:["image"], allowMultiSelect:false, onPickFile: "handlePhotoResult"},
		{kind: "Menu", name: "sortItemsMenu", onBeforeOpen:"",allowHtml: true, components: [
			{caption:"Added (Old-New)", onclick:"sortItems", by:"added"},
			{caption:"Added (New-Old)", onclick:"sortItems", by:"addedD"},
			{caption:"Title (A-Z)", onclick:"sortItems", by:"title"},
			{caption:"Title (Z-A)", onclick:"sortItems", by:"titleD"},
			{content:"Type (A-Z)", onclick:"sortItems", by:"type", allowHtml:true},
			{content:"Type (Z-A)", onclick:"sortItems", by:"typeD", allowHtml:true},
			{caption:"Year (Old-New)", onclick:"sortItems", by:"year"},
			{caption:"Year (New-Old)", onclick:"sortItems", by:"yearD"},
		]},		
		{kind: "Menu", name: "cellHoldMenu", components: [
			{caption: "Add to Shelf", onclick:"addToShelf"},
			{caption: "Remove from Library", onclick:""}
		]},
		{kind: "Menu", name: "shareMenu", onBeforeOpen:"",components: [
			{caption:"Twitter", onclick:"openShare", by:"twitter"},
			{caption:"Facebook", onclick:"openShare", by:"facebook"},
			{caption:"E-mail",onclick: "openShare", by:"email"},
			{caption:"Copy URL", onclick:"openShare",by:"clipboard"}
			/*{caption:"Google+", onclick:"openShare", by:"google"},*/
		]},		
		{kind: "AppMenu", name:"theMenu", onOpen:"setUpFBMenu", components: [
			{caption: "Share Activity on Facebook", onclick: "toggleFBSharing", name:"fbActivityMenu"},
			{caption: "Wooden Rows on Twitter",onclick:"goToLink",href:"http://twitter.com/woodenrows"},
			{caption: "Wooden Rows Website",onclick:"goToLink",href:"http://woodenro.ws"}
		]},

		{kind: "Menu", name: "filterItemsMenu", onBeforeOpen:"",components: []},		

		{kind: "PageHeader", className:"shelf-header", components: [
			{flex:1, components: [
				{kind: "Image", src:"images/logo.png", width: "230px", height:"38px"}
			]}/*,
			{kind:"Button", caption:"Shelf", style:"background-color:transparent; color: #4a4a4a;"}*/
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
			{kind: "HFlexBox", components:[
				{kind: "Button", caption: "Close", onclick:"closeDialog", dialog:"addItemDialog", flex:1},
				{kind: "Button", caption: "Add Manually", onclick:"openDialog",dialog:"manualAddDialog", className:"enyo-button-secondary"}
			]}
		]},
		{kind:"ModalDialog",lazy:false,name:"manualAddDialog",caption:"Manually Add Item",width:"500px", height:"90%",onBeforeOpen:"setupManualDialog", components:[
			{kind: "BasicScroller",height:"370px", autoVertical:true,autoHorizontal:true, components:[
				{kind: "RowGroup", caption:"Details",components:[
					{layoutKind: "HFlexLayout", components:[
						{kind:"Input", name:"aiTitle", flex:1, components:[
							{content:"Title",className:"enyo-label"}
						]}
					]},
					{layoutKind: "HFlexLayout", name:"aiArtistRow",components:[
						{kind:"Input", name:"aiArtist", flex:1, components:[
							{content:"Artist",className:"enyo-label"}
						]}
					]},
					{layoutKind: "HFlexLayout", name:"aiAuthorRow", components:[
						{kind:"Input", name:"aiAuthor", flex:1, components:[
							{content:"Author",className:"enyo-label"}
						]}
					]},
					{layoutKind: "HFlexLayout", name:"aiDirectorRow", components:[
						{kind:"Input", name:"aiDirector", flex:1, components:[
							{content:"Director",className:"enyo-label"}
						]}
					]},
					{layoutKind: "HFlexLayout", name:"aiPublisherRow", components:[
						{kind:"Input", name:"aiPublisher", flex:1, components:[
							{content:"Publisher",className:"enyo-label"}
						]}
					]},
					/*{layoutKind: "HFlexLayout", name:"aiPlatformRow", components:[
						{kind:"Input", name:"aiPlatform", flex:1, components:[
							{content:"Platform",className:"enyo-label"}
						]}
					]},*/
					{layoutKind: "HFlexLayout", align: "center", name:"aiPlatformRow", components: [
						{kind: "ListSelector", name:"aiPlatform",flex:1, items: [
							{caption: "3DO", value: "3DO"},
							{caption: "Amiga", value: "Amiga"},
							{caption: "Arcade", value: "Arcade"},
							{caption: "Atari 2600", value: "Atari 2600"},
							{caption: "Atari 5200", value: "Atari 5200"},
							{caption: "Atari 7800", value: "Atari 7800"},
							{caption: "Atari Jaguar", value: "Atari Jaguar"},
							{caption: "Atari Jaguar CD", value: "Atari Jaguar CD"},
							{caption: "Atari XE", value: "Atari XE"},
							{caption: "Colecovision", value: "Colecovision"},
							{caption: "Commodore 64", value: "Commodore 64"},
							{caption: "Intellivision", value: "Intellivision"},
							{caption: "Mac OS", value: "Mac OS"},
							{caption: "Microsoft Xbox", value: "Microsoft Xbox"},
							{caption: "Microsoft Xbox 360", value: "Microsoft Xbox 360"},
							{caption: "NeoGeo", value: "NeoGeo"},
							{caption: "Nintendo 64", value: "Nintendo 64"},
							{caption: "Nintendo 3DS", value: "Nintendo 3DS"},
							{caption: "Nintendo DS", value: "Nintendo DS"},
							{caption: "Nintendo Entertainment System (NES)", value: "Nintendo Entertainment System (NES)"},
							{caption: "Nintendo Game Boy", value: "Nintendo Game Boy"},
							{caption: "Nintendo Game Boy Advance", value: "Nintendo Game Boy Advance"},
							{caption: "Nintendo Game Boy Color", value: "Nintendo Game Boy Color"},
							{caption: "Nintendo GameCube", value: "Nintendo GameCube"},
							{caption: "Nintendo Wii", value: "Nintendo Wii"},
							{caption: "Nintendo Wii U", value: "Nintendo Wii U"},
							{caption: "PC", value: "PC"},
							{caption: "Sega 32X", value: "Sega 32X"},
							{caption: "Sega CD", value: "Sega CD"},
							{caption: "Sega Dreamcast", value: "Sega Dreamcast"},
							{caption: "Sega Game Gear", value: "Sega Game Gear"},
							{caption: "Sega Genesis", value: "Sega Genesis"},
							{caption: "Sega Master System", value: "Sega Master System"},
							{caption: "Sega Mega Drive", value: "Sega Mega Drive"},
							{caption: "Sega Saturn", value: "Sega Saturn"},
							{caption: "Sony Playstation", value: "Sony Playstation"},
							{caption: "Sony Playstation 2", value: "Sony Playstation 2"},
							{caption: "Sony Playstation 3", value: "Sony Playstation 3"},
							{caption: "Sony Playstation Vita", value: "Sony Playstation Vita"},
							{caption: "Sony PSP", value: "Sony PSP"},
							{caption: "Super Nintendo (SNES)", value: "Super Nintendo (SNES)"},
							{caption: "TurboGrafx 16", value: "TurboGrafx 16"}
						]},
						{content: "Platform", className: "enyo-label"},						
					]},										
					{layoutKind: "HFlexLayout", align: "center", name:"aiMusicBindingRow", components: [
						{kind: "ListSelector", name:"aiMusicBinding",flex:1, items: [
							{caption: "CD", value: "CD"},
							{caption: "Vinyl", value: "Vinyl"},
							{caption: "Cassette", value: "Cassette"}
						]},
						{content: "Kind", className: "enyo-label"},						
					]},					
					{layoutKind: "HFlexLayout", align: "center", name:"aiMovieBindingRow", components: [
						{kind: "ListSelector", name:"aiMovieBinding",flex:1, items: [
							{caption: "DVD", value: "DVD"},
							{caption: "Blu-ray", value: "Blu-ray"},
							{caption: "VHS", value: "VHS"}
						]},
						{content: "Kind", className: "enyo-label"},						
					]},					
					{layoutKind: "HFlexLayout", align: "center", name:"aiBookBindingRow", components: [
						{kind: "ListSelector", name:"aiBookBinding",flex:1, items: [
							{caption: "Hardcover", value: "Hardcover"},
							{caption: "Paperback", value: "Paperback"}
						]},
						{content: "Kind", className: "enyo-label"},						
					]},										
					{layoutKind: "HFlexLayout", name:"aiYearRow", components:[
						{kind:"Input", name:"aiYear", flex:1, components:[
							{content:"Year",className:"enyo-label"}
						]}
					]},
					{layoutKind: "HFlexLayout", name:"aiUPCRow", components:[
						{kind:"Input", name:"aiUPC", flex:1, components:[
							{content:"UPC",className:"enyo-label"}
						]}
					]},
					{layoutKind: "HFlexLayout", name:"aiISBNRow", components:[
						{kind:"Input", name:"aiISBN", flex:1, components:[
							{content:"ISBN",className:"enyo-label"}
						]}
					]},
					{layoutKind: "HFlexLayout", components:[
						{kind:"Input", name:"aiPrice", flex:1, components:[
							{content:"Price",className:"enyo-label"}
						]}
					]},
					{layoutKind: "HFlexLayout", components:[
						{kind:"Input", name:"aiComment", flex:1, components:[
							{content:"Comment",className:"enyo-label"}
						]}
					]},
					{layoutKind: "HFlexLayout",components:[
						{kind:"Image", name:"aiImage", flex:1, width:"264px",onclick:"setAIImage",  src:"images/defaultadd.png"},
						{content:"Image",className:"enyo-label"}

					]},
				]}
			]},
			{content: "By submitting this content, it will become a searchable item for other users to add to their libraries. You agree that the photo you submit was taken by you. It will also be the photo used when this item is searchable for inclusion in other users' libraries. You're helping Wooden Rows' product database grow! Thanks!", style:"font-size: 13px"},
			{kind: "ActivityButton", caption:"Save and Upload", name:"aiSaveItem", onclick:"aiSaveItem", className:"enyo-button-affirmative"},
			{kind: "Button", caption:"Cancel", onclick:"closeDialog",dialog:"manualAddDialog"}
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
			{name:"awsSearchStatus", content:"Loading results...",style:"text-align:center;"},
			{kind:"HFlexBox", components:[
				{kind: "Button", caption: "Close", onclick:"closeDialog", dialog:"resultsDialog", flex:1},
				{content:" "},
				{kind: "CheckBox", name: "resultsStayOpen"},
				{content:" Stay Open"},
				{kind: "Button",caption:"Try BestBuy",onclick:"doBBSearch",name:"doBBSearch"},
				{kind: "Image", name:"resultsBranding", href:"", src:"", width:"125px", onclick:"goToLink"}
			]}
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
	        			]},
	        			{kind: "Image",src:"",href:"",onclick:"goToLink", name:"displayItemBranding",style:"max-height: 125px;"}
	        		]}
        		]},
        		{name: "toolbar", kind: "Toolbar", align: "center", defaultKind: "Control", components: [
            		{name: "dragHandle", kind: "GrabButton",onclick: "closeDialog", dialog:"itemDetail"},
            		{name: "buttonsClient", layoutKind: "HFlexLayout", pack:"left",components:[
            			{kind: "Button", name:"detailLendButton",caption:"Lend", onclick:"lendItem", style:"background-color:transparent; color:#fff;"},
            			{kind: "Button", name:"detailReturnButton",caption:"Returned", onclick:"returnItem", style:"background-color:transparent; color:#fff;"},
            			{kind: "Button",caption:"Share",onclick:"shareItem", style:"background-color:transparent; color:#fff;"},
            			{flex:1},
            			{kind: "Button",caption:"Comment",onclick:"openDialog", dialog:"commentDialog", style:"background-color:transparent; color:#fff;"},
            			{kind: "Button",caption:"Edit",name:"itemDetailEditButton",onclick:"doEditItem", style:"background-color:transparent; color:#fff;"},
            			{kind: "Button",caption:"Remove",onclick:"removeItem", className:"enyo-button-negative"}
            		]}
          		]}
      		]}			
		]},
		{kind:"ModalDialog", lazy:false, name:"migrationDialog", caption:"Migration Assistant", width:"90%", height: "99%", components:[
			{kind:"HFlexBox", width: "100%",components:[
				{name: "maCurrentItemBox", flex:1,components:[
					{kind: "Image",name:"maCurrentItemImage",src:"",style:"display:block;margin:0 auto; max-height: 200px"},
					{kind:"HtmlContent",name:"maCurrentItemDetails"},
					{kind: "Button", name:"maAdd", onclick:"maAddItem",caption:"Add Manually"},					
					{kind: "Button", name:"maSkip", onclick:"maSkipItem",caption:"Skip This"}					
				]},
				{name: "maMatchedItemBox", flex:1,components:[
					{kind: "Image",name:"maMatchedItemImage",src:"",style:"display:block;margin:0 auto; max-height: 200px"},
					{kind:"HtmlContent",name:"maMatchedItemDetails"},
					{kind: "Button", name:"maPrevMatch",caption:"Previous Match", onclick:"maPrevMatch"},
					{kind: "Button", name:"maNextMatch",caption:"Next Match", onclick:"maNextMatch"},
					{kind: "ActivityButton",name:"maUseMatch",caption:"Use This",className:"enyo-button-affirmative", onclick:"maUseMatch"}					
				]}
			]},
			{kind:"HFlexBox", width:"100%", components:[
				{kind:"Input",name:"maSearchInput",hint:"Search...",flex:1},
				{kind:"ActivityButton", name:"maSearchButton",caption:"Search",onclick:"maDoSearch"}
			]},
			{kind: "Button", caption:"Exit Migration Assistant", dialog:"migrationDialog",onclick:"closeDialog"}
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
	    {kind: "Toaster", name: "androidMenu", lazy:false,className:'zheph-android-menu', flyInFrom:"bottom", onOpen:"fadeAndroidMenuIn",onClose:"fadeAndroidMenuOut",components:[
	    	{layoutKind: "HFlexLayout", pack:"center",align:"stretch",components:[
	    		{kind:"CustomButton",className:"zheph-android-menu-button", components:[
	    			{kind:"Image", src:"images/menu_facebook.png"},
	    			{kind:"HtmlContent",content:"Disable FB Activity"}
	    		], onclick:""},
	    		{kind:"CustomButton",className:"zheph-android-menu-button", components:[
	    			{kind:"Image", src:"images/menu_facebook.png"},
	    			{kind:"HtmlContent",content:"Edit Profile"}
	    		],onclick:""}
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
		{kind: "ModalDialog", name:"facebookDialog", scrim:true, caption: "Share on Facebook", width: "600px",onOpen:"facebookOpened",components:[
	        	{kind:"RowGroup", caption:"", components:[
	        		{kind:"Input",name:"facebookShare", oninput:"facebookChanged", hint:"Add a comment... (optional)"},
	        	]},
			/*{kind:"HtmlContent", name:"tweetPreview"},*/
			{kind: "Button", name:"shareFacebook", caption: "Share", onclick:"shareFacebook", dialog:"facebookDialog"},
			{kind: "Button", caption: "Cancel", onclick:"closeDialog", dialog:"facebookDialog"}
		]},
		{kind: "ModalDialog", name:"commentDialog", scrim:true, caption: "Save a Comment", width: "600px",onOpen:"commentOpened",components:[
	        	{kind:"RowGroup", caption:"", components:[
	        		{kind:"Input",name:"commentInput", oninput:"", hint:"Add a comment..."},
	        	]},
			/*{kind:"HtmlContent", name:"tweetPreview"},*/
			{kind: "Button", name:"saveComment", caption: "Save", onclick:"saveComment", dialog:"commentDialog"},
			{kind: "Button", caption: "Remove Comment", onclick:"removeComment", dialog:"commentDialog", className:"enyo-button-negative"},
			{kind: "Button", caption: "Cancel", onclick:"closeDialog", dialog:"commentDialog"}
		]},
		{kind: "ModalDialog", layoutKind:"VFlexLayout",name:"addShelfDialog", scrim:true, caption: "Add to Shelf", width: "400px", height:"500px",onOpen:"addShelfOpened",components:[
			{kind:"Scroller",flex:1, components:[
	        	{kind:"RowGroup", caption:"", components:[
	        		{kind:"Input",name:"addShelfInput", oninput:"", hint:"Type the name of a new shelf..."},
	        	]},
				{kind: "Button", name:"saveComment", caption: "Save", onclick:"saveComment", dialog:"commentDialog"},
				{kind: "Button", caption: "Remove Comment", onclick:"removeComment", dialog:"commentDialog", className:"enyo-button-negative"},
				{kind: "Button", caption: "Cancel", onclick:"closeDialog", dialog:"addShelfDialog"}
			]}
		]},
		{kind: "ModalDialog", name:"lendDialog", scrim:true, caption: "Lend This Item", width: "600px",onOpen:"lendOpened",components:[
	        	{kind:"RowGroup", caption:"", components:[
	        		{kind:"Input",name:"lendInput", oninput:"", hint:"Type the name of the person you lent this to..."},
	        	]},
			/*{kind:"HtmlContent", name:"tweetPreview"},*/
			{kind: "Button", name:"saveLend", caption: "Lend", onclick:"saveLend", dialog:"lendDialog"},
			{kind: "Button", caption: "Cancel", onclick:"closeDialog", dialog:"lendDialog"}
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
	fadeAndroidMenuIn: function(inSender,inEvent){
		inSender.addClass("showing");
	},
	fadeAndroidMenuOut: function(inSender,inEvent){
		inSender.removeClass("showing");
	},
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
		
		if(e.target){
			var url=e.target.href;
		}else if(e.href) {
			var url=e.href;
		}else{
			var url=e;
		}
		
		switch(this.platform){
			case "webos":
				this.$.openApp.call({target: url},{method:"open"})
				break;
			case "android":
			case "web":
				window.open(url);
				break;
			case "ios":
				break;
		}
		//return false;
	},
	doSignUp: function(inSender, inEvent){
		inSender.setActive(true);
		this.apiInSender=inSender;
		
		var data={method:'user.create',
	         		username:this.$.signupUsername.getValue(),
	         		password:calcMD5(this.$.signupPassword.getValue()),
	         		email:this.$.signupEmail.getValue()};
		
		//this.log(data);
		
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
	setAIImage: function(inSender,inEvent){
		switch(this.platform){
			case "webos":
				this.$.photoPicker.pickFile();
				break;
		}
	},
	handlePhotoResult: function(inSender,msg){
		if(msg.length>0){
			this.log(msg);
			var pic=msg[0];
			this.$.aiImage.setSrc(pic.fullPath);
			this.uploadFile=pic.fullPath;
		}else{
		
		}
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
						//this.log("create ok");
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
						//this.log(token);
						//this.log(user);
						this.saveSetting("token",token);
						this.saveSetting("user",user.id);
						this.userToken=token;
						this.userId=user.id;
						this.apiInSender.setActive(false);
					  	window.setTimeout(enyo.bind(this,function(){this.$.signupUsername.forceBlur();}),500);
					  	window.setTimeout(enyo.bind(this,function(){this.$.signupPassword.forceBlur();}),500);
					  	window.setTimeout(enyo.bind(this,function(){this.$.signupEmail.forceBlur();}),500);
						
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
		//this.log("success");
		//this.log(inResponse);
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
						//this.log("got ok");
						var user=inResponse.result.user;
						this.saveSetting("user",inResponse.result.user.id);
						var d=new Date();
						var t=Math.floor(d.getTime()/1000);
						this.saveSetting("lastcheck",t);
						
						if(!inResponse.result.options){ //full library get
							
							this.serverLibrary=inResponse.result.library;
							this.serverLoaded=true;
							
							this.shares.twitter=inResponse.result.user.shares.twitter;
							this.shares.facebook=inResponse.result.user.shares.facebook;
							
							if(this.localLoaded){
								if(this.serverLibrary.count==0){
									//no items on the server.
									this.$.emptyLibrary.setContent("Your library is looking a little bare!<br>Try adding some items by tapping the \"+Add\" button in the corner.");
									this.$.emptyLibrary.show();
									
									if(this.data.length>0 && this.data[0].placeholder!=true){ //but we have items stored locally
										var items=enyo.json.stringify(this.data);
										//this.log("gonna bulk upload");
										//this.log(items);
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
									//this.log("server load success; forcing localload=true");
									//this.localLoaded=true;
								}
								this.checkLocalLibrary();
							}
							
						}else{ //some options were set on this getLibrary
							//this.log("OPTION CALL RECEIVED");
							
							if(inResponse.result.options.status=="not-existing"){
								this.prevStatus="not-existing";
								this.citems=inResponse.result.library.items;
								this.ccount=this.citems.length;
								this.asyncCount=this.citems.length;
								this.asyncOn=0;
								this.fromSync=true;
								//this.log("1");
								this.db.transaction( 
							        enyo.bind(this,(function (transaction) { 
							        	//this.log("2");			
										for(var i=0;i<this.ccount;i++){
											//this.log("3");
											var item=this.citems[i];
											//this.log("4");
											switch(item.status){
												case "0": //existing
													break;
												case "1": //added
													//this.log("added item");
													//this.log(item);
													var sql='INSERT INTO library (artist,asin,author,binding,director,image,platform,price,publisher,title,upc,year,extra,type,title_sort,shelves) VALUES ("'+item.artist+'", "'+item.asin+'", "'+item.author+'", "'+item.binding+'", "'+item.director+'", "'+item.image+'", "'+item.platform+'", "'+item.price+'", "'+item.publisher+'", "'+item.title+'", "'+item.upc+'", "'+item.year+'","'+item.extra+'","'+item.type+'","'+item.title_sort+'","'+item.shelves+'")';
													//this.log("4.3");
													//this.log(sql);
													this.errorfrom="found added item on server";
										            transaction.executeSql(sql, [], enyo.bind(this,this.libraryAsyncSuccess), enyo.bind(this,this.errorHandler,"found added item on server")); 
													//this.log("4.5");
													break;
												case "2": //modified
													break;
												case "3": //deleted
													break;
												default:
													//this.log("no status");
													//this.log(item);
													break;
											}
											//this.log("5");
										}
							        })) 
							    );		
							}else{
								//this.checkLocalLibrary();
							}
						}
						this.$.syncSpinner.hide();		
						//this.loadLibrary();				
						break;
					case "library.bulkAddItems":
						//this.log("bulk add ok");
						//this.log(inResponse.result.message);
						//this.log(inResponse.result.sql);
						this.$.syncSpinner.hide();
						
						break;
					case "library.addItem":
						//this.log(inResponse.result.message);
						//this.log(inResponse.result.itemId);
						this.$.syncSpinner.hide();
						this.$.aiSaveItem.setActive(false);
						break;
					case "library.editItem":
						if(this.isEditing){
							this.$.syncSpinner.hide();
							this.$.aiSaveItem.setActive(false);
							this.closeDialog({dialog:"manualAddDialog"});
							this.currentItem=this.itemBackUp;
						  	enyo.job("reloadItem",enyo.bind(this,"displayItem"), 1000);
							this.isEditing=false;
						}
						break;
					case "library.deleteItem":
						//this.log(inResponse.result.message);
						//this.log(inResponse.result.itemId);
						this.$.syncSpinner.hide();
						break;
					case "library.lendItem":
						//this.log(inResponse.result.message);
						//this.log(inResponse.result.itemId);
						this.$.syncSpinner.hide();
						break;
					case "library.returnItem":
						//this.log(inResponse.result.message);
						//this.log(inResponse.result.itemId);
						this.$.syncSpinner.hide();
						brreak;
					case "library.saveComment":
						//this.log(inResponse.result.message);
						//this.log(inResponse.result.itemId);
						this.$.syncSpinner.hide();
						break;
					case "library.resetStatuses":
						//this.log(inResponse.result.message);
						this.loadLibrary();
						this.$.syncSpinner.hide();
						break;
					case "library.getASIN":
						this.newasin=inResponse.result.asin;
						
						if(this.addDialogMode=="addfill"){
							this.updateItem(this.newasin);
						}else{
						
			
							//uploadimage
							if(this.uploadFile){
							  	switch(this.platform){
							  		case "webos":
							  			this.log("uploading in webos...");
									    this.$.downloadManager.call(
									       {
									          fileName: this.uploadFile,
									          url: 'http://woodenro.ws/api.php',
									          fileLabel: "upload",
									          postParameters: [
											          	{key: "method",data:"image.upload",contentType:"text/plain"},		          
											          	{key: "asin",data:this.newasin,contentType:"text/plain"},		          
									          ]
									       }
									    );								
							  			break;
							  		default:
							  			this.log("no matching platform actions");
							  			break;
							  	}
						  	}else{
						  	
						  	}
						}					  							
						break;
				}
				break;
		}
	},
	wAPIFailure: function(inSender,inResponse,inRequest){
		this.log("api failure");
		this.showErrorDialog('Unknown wAPI Failure. Server may be down.');
		
	},
	checkLocalLibrary: function(){
		//this.log("checking load statuses...");
		//this.log("local="+this.localLoaded);
		if(this.localLoaded){
			
			this.loadCount++;
		}
		
		//this.log("1");
		
		if(this.localLoaded && this.loadCount==1){
		    var sort=this.getSetting("sort");
		    //this.log("1.5");
		    if(sort!=undefined && sort!=""){
		    	this.sortItems({by:sort});
		    	//this.log("1.6");
		    }		
		}
		
		//this.log("2");

		if(this.serverLibrary){
			if(this.serverLibrary.count>0 && this.data[0].placeholder==true){
				//this.log("server load success; forcing localload=true");
				//this.localLoaded=true;
			}
		}
				
		//this.log("3");
		if(this.localLoaded && this.serverLoaded){
			//this.log("both loaded");
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
			}else{
				//this.$.emptyLibrary.setContent("Your library is looking a little bare!<br>Try adding some items by tapping the \"+Add\" button in the corner.");
				//this.$.emptyLibrary.show();

			}
			
			
		}
	},
	insertArray: function(array,callback){
		//this.log("insert array...");
		this.strings=[];
		this.asyncCount=array.length;
		this.asyncOn=0;
		this.asyncArray=array;
		this.$.emptyLibrary.hide();
		this.db.transaction( 
	        enyo.bind(this,(function (transaction) { 			
	        	//this.log("before loop");
				for(var a=0;a<this.asyncArray.length;a++){
					this.errorfrom="insert array";
							            transaction.executeSql('INSERT INTO library (artist,asin,author,binding,director,image,platform,price,publisher,title,upc,year,extra,type,title_sort,shelves) VALUES ("'+this.asyncArray[a].artist+'", "'+this.asyncArray[a].asin+'", "'+this.asyncArray[a].author+'", "'+this.asyncArray[a].binding+'", "'+this.asyncArray[a].director+'", "'+this.asyncArray[a].image+'", "'+this.asyncArray[a].platform+'", "'+this.asyncArray[a].price+'", "'+this.asyncArray[a].publisher+'", "'+this.asyncArray[a].title+'", "'+this.asyncArray[a].upc+'", "'+this.asyncArray[a].year+'","","'+this.asyncArray[a].type+'","'+this.asyncArray[a].title_sort+'","'+this.asyncArray[a].shelves+'")', [], enyo.bind(this,this.libraryAsyncSuccess), enyo.bind(this,this.errorHandler,"insert array")); 
				}
				//this.log("after loop");
	        })) 
	    );
	

	},
	libraryAsyncSuccess: function(transaction, results){
		this.asyncOn++;
		//this.log("async success");
		//this.log(this.asyncOn);
		//this.log(this.asyncCount);
		if(this.asyncOn==this.asyncCount){
			if(!this.fromSync){
				this.loadLibrary();
				this.$.syncSpinner.hide();
			}else{
				this.fromSync=false;
				var token=this.userToken;
				var data={
					method: "library.resetStatuses",
					token: token,
					status: this.prevStatus
				};
				
				this.$.syncSpinner.show();
				this.$.woodenrowsAPI.setMethod("POST");
				this.$.woodenrowsAPI.call(data);
				
			}
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
		this.shelves=[];
		if(!this.isFiltering && !this.isSorting){
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
					row.extra=row.extra.replace(/\&quot\;/g,'"');
					
					if(row.shelves){
						var shelves=row.shelves.split("|");
						for(var s=0;s<shelves.length;s++){
							if(!this.inArray(this.shelves,shelves[s])){
								this.shelves.push(shelves[s]);
							}
						}
					}
					
					if(!this.inArray(this.types,row.type) && !this.isFiltering && !this.isSorting){
						this.types.push(row.type);
					}
					
					if(this.addedItem){
						if(row.asin==this.addedItemASIN){
							//row.new=true;
							this.addedItem=false;
							this.addedItemASIN='';
						}
					}
					
					this.data.push(row);

				}
				this.isSorting=false;
				//this.log(this.types);
				
				if(this.setCurrent){
					this.currentItem=this.data[this.currentIndex];
				}else{
					this.currentItem=undefined;
				}
				
				//this.log(this.data);
				//this.log("querydata handler set localloaded=true");
				this.localLoaded=true;
				
				//see if we should bulk upload
				if(this.serverLoaded){
					//this.log("1");
					if(this.serverLibrary.count==0){
					//this.log("2");
						//no items on the server.
						if(this.data.length>0){ //but we have items stored locally
						//this.log("3");
							var items=enyo.json.stringify(this.data);
							//this.log("gonna bulk upload");
							//this.log(items);
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
						//this.log("local loaded; server has stuff");
						this.checkLocalLibrary();
					}
				}else{
				//this.log("4");
					this.checkLocalLibrary();	
				}
				//this.log("5");
				
				this.buildItemCells();
				//this.log("6");
				this.$.itemList.punt();
				//this.log("7");
			}
		}catch(e){
			console.log("errror");
			console.log(e.description);
			this.errorfrom="error in data query handler";
			this.errorHandler(e,undefined,"error in query data handler");
		}
	},
	createRecordDataHandler: function(transaction,results){
		try{
			console.log("create record handler");
			this.addedItem=true;
			this.loadLibrary();
			this.$.aiTitle.setValue('');
			this.$.aiArtist.setValue('');
			this.$.aiAuthor.setValue('');
			this.$.aiDirector.setValue('');
			this.$.aiPublisher.setValue('');
			this.$.aiPlatform.setValue('');
			this.$.aiYear.setValue('');
			this.$.aiUPC.setValue('');
			this.$.aiISBN.setValue('');
			this.$.aiPrice.setValue('');
			this.$.aiComment.setValue('');
			this.newItemImage='';
			this.$.aiSaveItem.setActive(false);
			this.closeDialog({dialog:"manualAddDialog"});
			console.log(enyo.json.stringify(results));
			console.log(enyo.json.stringify(transaction));
		}catch(e){}
	},	
	errorHandler: function(transaction, error,c){
		if(error){
			if(error.description){
				console.log(error.description);
			}
			if(error.message){
				console.log(error.message);
			}
			//console.log("error: "+error);
			//console.log("error: "+enyo.json.stringify(error));	
			//this.log(error);
		}
			//console.log("transaction: "+enyo.json.stringify(transaction));	
			console.log("c: "+this.errorfrom);	

		var stuff='';
		for(var i in error){
			stuff+=i+': '+error[i]+', ';
		}
		console.log(stuff);
		
		var stuff2='';
		for(var i in transaction){
			console.log(i+': '+transaction[i]+', ');
		}
	//	console.log(stuff2);
	},
	create: function(){
	
		//figure out what platform we're on
		//start with phonegap, then fail with webOS
		try{
			this.platform=device.platform.toLowerCase();
		}catch(e){
			if(window.PalmSystem){
				this.platform="webos";
			}else{
				this.platform="web";
			}
		}
		
		if(window.innerWidth==480 || window.innerHeight==480){
			this.deviceType="phone";
		}else{
			this.deviceType="tablet";
		}
	
	
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
			
			var string = 'CREATE TABLE IF NOT EXISTS library (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, artist TEXT, asin TEXT NOT NULL, author TEXT, binding TEXT, director TEXT, image TEXT, platform TEXT, price TEXT, publisher TEXT, title TEXT, upc TEXT, year INTEGER, type TEXT, extra TEXT, lent INTEGER, lentTo TEXT, lentOn INTEGER, title_sort TEXT, shelves TEXT, provider TEXT, isbn TEXT)';
			//this.log("create table");
		    this.db.transaction( 
		        enyo.bind(this,(function (transaction) { 
					//transaction.executeSql('DROP TABLE IF EXISTS library;', []); 
					//transaction.executeSql('ALTER TABLE library ADD COLUMN type TEXT;', []); 
					//transaction.executeSql('ALTER TABLE library ADD COLUMN lent INTEGER;', []); 
					//transaction.executeSql('ALTER TABLE library ADD COLUMN lentTo TEXT;', []); 
					//transaction.executeSql('ALTER TABLE library ADD COLUMN lentOn INTEGER;', []); 
					//transaction.executeSql('ALTER TABLE library ADD COLUMN lentOn INTEGER;', []); 
					
					this.errorfrom="create table";
		            transaction.executeSql(string, [], enyo.bind(this,this.createTableDataHandler), enyo.bind(this,this.errorHandler,"create table")); 

		        }))
		    );

			//for any legacy users
		    this.db.transaction( 
		        enyo.bind(this,(function (transaction) { 
					transaction.executeSql('ALTER TABLE library ADD COLUMN provider TEXT;', []); 
					transaction.executeSql('ALTER TABLE library ADD COLUMN isbn TEXT;', []); 

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
	getSetting: function(setting){
		switch(this.platform){
			case "webos":
				return enyo.getCookie(setting);
				break;
			default:
				return window.localStorage.getItem(setting);
				break;
		}
	},
	saveSetting: function(setting,value){
		switch(this.platform){
			case "webos":
				return enyo.setCookie(setting,value);
				break;
			default:
				return window.localStorage.setItem(setting,value);
				break;
		}
	},
	rendered: function(){
	    this.inherited(arguments);
		this.$.emptyLibrary.hide();
	    this.$.syncSpinner.hide();
	    this.loadCount=0;
    	this.searchType="DVD";
    	this.filterBy='';
    	this.addDialogMode="add";
    	this.musicSource="discogs";
	    this.buildItemCells();
	    
	    
	    
	    
		if(this.platform=="webos"){
		    this.region=enyo.g11n.currentLocale().region.toUpperCase();    
		}else{		
			//this.$.detailLendButton.hide(); //disable until this doesn't suck
	    	navigator.geolocation.getCurrentPosition(function(position){
	    		enyo.xhrGet({
	    			url: "http://maps.googleapis.com/maps/api/geocode/json?latlng="+position.latitude+","+position.longitude+"&sensor=true",
	    			load: function(responseText,xhrObject){
	    				var json=enyo.json.parse(responseText);
	    				var parts=json.results[0].address_components;
	    				var country='';
	    				for(var p=0;p<parts.length;p++){
	    					var types=parts[p].types;
	    					for(var t=0;t<types.length;t++){
	    						if(types[t]=="country"){
	    							country=parts[p].short_name;
	    							break;
	    						}
	    					}
	    					if(country!=""){
	    						break;
	    					}
	    				}
	    				
	    				this.region=country;
	    			}
	    		});
	    	});
	    }
	    
	    if(LOCALES[this.region]){
	    	this.apiUrl=LOCALES[this.region];
	    }else{
	    	this.apiUrl=LOCALES["US"];
	    }
	    
	    //this.log(this.apiUrl);
	    switch(this.platform){
	    	case "android":
	    		document.addEventListener("menubutton", enyo.bind(this,this.onMenuButton), false);
	    		break;
	    }
	    
	    
	    var token=this.getSetting("token");
	    if(token!=undefined && token!=""){
	    	this.userToken=token;
	    	
			///GET MODIFIED OR NEW ITEMS
			//var token=this.userToken;
/*			var lc=enyo.getCookie("lastcheck");
			if(lc!=undefined && lc!='' && lc!=null){
				var data={
					method: "user.getLibrary",
					token: this.userToken,
					modifiedSince: lc
				};
				this.$.syncSpinner.show();
				this.$.woodenrowsAPI.setMethod("GET");
				this.$.woodenrowsAPI.call(data);
			}else{*/
				var data={
					method: "user.getLibrary",
					token: this.userToken,
					status: 'not-existing'
				};
				this.$.syncSpinner.show();
				this.$.woodenrowsAPI.setMethod("GET");
				this.$.woodenrowsAPI.call(data);
			
			/*}*/
	    	
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
	    
	    var userid=this.getSetting("user");
	    if(userid!=undefined && userid!=""){
	    	this.userId=userid;
	    }
	    
	    
	    try{
	    	this.$.appMenu.render();
	    }catch(e){}
	    
	    
	    
	    
	    //now we must check if they have old Amazon data in their library
		//var string = 'SELECT * FROM library WHERE image LIKE "%%ecx.images-amazon.com%%" OR image LIKE "%%images.amazon.com%%"';
		var string = 'SELECT * FROM library WHERE provider IS NULL';
		//this.log("create table");
	    this.db.transaction( 
	        enyo.bind(this,(function (transaction) { 
	            transaction.executeSql(string, [], enyo.bind(this,this.amazonDataHandler), enyo.bind(this,this.errorHandler,"create table")); 

	        }))
	    );
	    
	    
	    
	    
	    //this.log(enyo.getCookie("user"));
	},
	setupManualDialog: function(inSender,inEvent){
		switch(this.addDialogMode){
			case "edit":
				this.$.aiTitle.setValue(this.editItem.title || '');this.log("1");
				this.$.aiArtist.setValue(this.editItem.artist || '');this.log("2");
				this.$.aiAuthor.setValue(this.editItem.author || '');this.log("3");
				this.$.aiDirector.setValue(this.editItem.director || '');this.log("4");
				this.$.aiPublisher.setValue(this.editItem.publisher || '');this.log("5");
				this.$.aiPlatform.setValue(this.editItem.platform || '');this.log("6");
				this.$.aiYear.setValue(this.editItem.year || '');this.log("7");
				this.$.aiUPC.setValue(this.editItem.upc || '');this.log("8");
				this.$.aiISBN.setValue(this.editItem.isbn || '');this.log("9");
				this.$.aiPrice.setValue(this.editItem.price || '');this.log("10");
				this.$.aiComment.setValue(this.editItem.comment || '');this.log("11");
				
				this.$.manualAddDialog.setCaption("Edit Item");
				this.newItemImage=this.editItem.image || '';
				this.uploadFile='';
				this.$.aiImage.setSrc(this.newItemImage || "images/defaultadd.png")
				
				break;
			case "add":
				this.$.aiTitle.setValue('');
				this.$.aiArtist.setValue('');
				this.$.aiAuthor.setValue('');
				this.$.aiDirector.setValue('');
				this.$.aiPublisher.setValue('');
				this.$.aiPlatform.setValue('');
				this.$.aiYear.setValue('');
				this.$.aiUPC.setValue('');
				this.$.aiISBN.setValue('');
				this.$.aiPrice.setValue('');
				this.$.aiComment.setValue('');
				this.newItemImage='';
				this.uploadFile='';
				this.$.manualAddDialog.setCaption("Manually Add Item");
				this.$.aiImage.setSrc("images/defaultadd.png")

				break;
			case "addfill":
				this.$.aiTitle.setValue(this.editItem.title || '');this.log("1");
				this.$.aiArtist.setValue(this.editItem.artist || '');this.log("2");
				this.$.aiAuthor.setValue(this.editItem.author || '');this.log("3");
				this.$.aiDirector.setValue(this.editItem.director || '');this.log("4");
				this.$.aiPublisher.setValue(this.editItem.publisher || '');this.log("5");
				this.$.aiPlatform.setValue(this.editItem.platform || '');this.log("6");
				this.$.aiYear.setValue(this.editItem.year || '');this.log("7");
				this.$.aiUPC.setValue(this.editItem.upc || '');this.log("8");
				this.$.aiISBN.setValue(this.editItem.isbn || '');this.log("9");
				this.$.aiPrice.setValue(this.editItem.price || '');this.log("10");
				this.$.aiComment.setValue(this.editItem.comment || '');this.log("11");
				
				this.$.manualAddDialog.setCaption("Manually Add Item");
				this.newItemImage=this.editItem.image || '';
				this.uploadFile='';
				this.$.aiImage.setSrc(this.newItemImage || "images/defaultadd.png")
				
				break;
		}
	},
	doEditItem: function(inSender,inEvent){
		this.addDialogMode="edit";this.log("a");
		this.editItem=this.currentItem;this.log("b");
		this.itemBackUp=this.currentItem;
		this.searchType=this.editItem.type;this.log("c");

		this.openDialog({dialog:"manualAddDialog"});
	},
	amazonDataHandler: function(transaction,results){
		if(results){
			if(results.rows){
				if(results.rows.length>0){
					//has amazon
					this.amazonData=results.rows;
					this.showConfirmDialog("Your library contains content from Amazon. Due to their Terms of Service, this data must be removed from your library. However, you can replace your Amazon items with items found from our new data sources. Would you like to do this now?","scrubAmazonData");
				}else{
					//no amazon
				}
			}
		}
	},
	scrubAmazonData: function(){
		this.openDialog({dialog:"migrationDialog"});
		this.maIndex=-1;
		this.loadMAItem();
	},
	loadMAItem: function(){
		this.maIndex++;
		this.musicSource="discogs";

		this.$.maSearchInput.setValue('');
		this.$.maSearchButton.setActive(false);
		var item=this.amazonData.item(this.maIndex);
		this.$.maCurrentItemImage.setSrc(item.image);
		this.currentMAItem=item;
		var details='';
		for(var k in item){
			if((k!="image" && k!="id" && k!="asin" && k!="lent" && k!="lentTo" && k!="lentOn" && k!="title_sort" && k!="price" && k!="provider" && k!="shelves") && item[k]){
				details+="<b>"+k+"</b>: "+item[k]+"<br>"; 
			}
		}
		this.$.maCurrentItemDetails.setContent(details);
		this.$.maMatchedItemDetails.setContent('');
		this.$.maMatchedItemImage.setSrc('data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAQAIBRAA7');
		this.maDoSearch(this.$.maSearchButton);
	},
	maAddItem: function(inSender,inEvent){
		this.addDialogMode="addfill";this.log("a");
		this.editItem=this.currentMAItem;this.log("b");
		this.itemBackUp=this.currentMAItem;
		this.searchType=this.editItem.type;this.log("c");

		this.openDialog({dialog:"manualAddDialog"});	
	},
	maDoSearch: function(inSender,inEvent){
		if(inSender) inSender.setActive(true);
		this.$.maUseMatch.setDisabled(true);		

		var query=this.$.maSearchInput.getValue();
		if(query==""){
			query=this.currentMAItem.title;
		}
		switch(this.currentMAItem.type){
			case "Books":
				if(query.indexOf(":")>-1){
					var p=query.split(":");
					this.log(p);
					var title=p[0];
				}else{
					var title=query;
				}
				this.$.booksAPIMatch.call({title:title,limit:50});
				break;
			case "VideoGames":
				if(query.indexOf(":")>-1){
					var p=query.split(":");
					this.log(p);
					var title=p[0];
				}else{
					var title=query;
				}
				this.$.gamesAPIMatch.call({name:title});
				break;
			case "DVD":
				if(query.indexOf(":")>-1){
					var p=query.split(":");
					this.log(p);
					var title=p[0];
				}else{
					var title=query;
				}
				title=title.replace(/(\([^(]+\))/gi,"");
				
				var url="http://api.remix.bestbuy.com/v1/products(search="+title+"&type=Movie)";
				var data={
					apiKey:'dqgzhcnnktw2a8yjruguxey4',
					format:'json'
				};
				this.$.moviesAPIMatch.setUrl(url);
				this.$.moviesAPIMatch.call(data);
				break;
			case "Music":
				if(query.indexOf(":")>-1){
					var p=query.split(":");
					this.log(p);
					var title=p[0];
				}else{
					var title=query;
				}
				
				title=title.replace(/(\([^(]+\))/gi,"");
				if(this.musicSource=="discogs"){
					this.$.musicAPIMatch.call({q:title,type:'release',per_page:75});
					//this.$.doBBSearch.show();

				}else if(this.musicSource=="bestbuy"){
					var url="http://api.remix.bestbuy.com/v1/products(search="+title+"&type=Music)";
					var data={
						apiKey:'dqgzhcnnktw2a8yjruguxey4',
						format:'json'
					};
					this.$.moviesAPIMatch.setUrl(url);
					this.$.moviesAPIMatch.call(data);
				}
				
				break;
		}
		
	},
	loadMatchItem: function(){
		this.maMatchIndex++;
		var item=this.matchItems[this.maMatchIndex];
		if(!item && this.currentMAItem.type=="Music" && this.musicSource=="discogs"){
			this.musicSource="bestbuy";
			this.maDoSearch();
		}
		
		var pitem=this.matchItems[this.maMatchIndex-1];
		var nitem=this.matchItems[this.maMatchIndex+1];
		if(!pitem){
			this.$.maPrevMatch.setDisabled(true);
		}else{
			this.$.maPrevMatch.setDisabled(false);
		}
		if(!nitem){
			this.$.maNextMatch.setDisabled(true);
		}else{
			this.$.maNextMatch.setDisabled(false);
		}
		
		
		this.matchedItem=item;
		this.$.maMatchedItemImage.setSrc(item.image || item.fullImage);
		var details='';
		for(var k in item){
			if((k!="image" && k!="id" && k!="fullImage" && k!="asin" && k!="lent" && k!="lentTo" && k!="lentOn" && k!="title_sort" && k!="price" && k!="provider" && k!="shelves") && item[k]){
				if(this.currentMAItem.hasOwnProperty(k)){
					var cival=(this.currentMAItem[k]==null || this.currentMAItem[k]==undefined)? "": this.currentMAItem[k];
					if(this.isNumber(cival)){
						cival=""+cival+"";
					}
				}else{
					var cival="";
				}
				var val=item[k];
				
				if(cival!="" && cival!=undefined){
					if(this.isNumber(item[k])){
						item[k]=""+item[k]+"";
					}
					if(cival.toLowerCase()==item[k].toLowerCase()){
						val='<span style="color: #0f0;">'+item[k]+'</span>';
						//this.log("values are equal");
					}else{
						if(cival!=""){
							if(cival.toLowerCase().indexOf(item[k].toLowerCase())>-1 || item[k].toLowerCase().indexOf(cival.toLowerCase())>-1){
								//this.log("value in other value");
								val='<span style="color: #0f0;">'+item[k]+'</span>';			
							}
						}
					}
				}
				
				details+="<b>"+k+"</b>: "+val+"<br>"; 
			}
		}
		this.$.maMatchedItemDetails.setContent(details);
	},
	musicMatchSuccess: function(inSender,inResponse,inRequest){
		this.$.maSearchButton.setActive(false);
		var j=inResponse;
		this.log(j);
		var items=j.results;
		var itemsCount=items.length;
			  	this.matchItems=[];

		if(itemsCount==0){
			this.musicSource="bestbuy";
			this.maDoSearch();
			//this.log("redo search with best buy");
		}else{
			this.musicSource="discogs";
			this.$.maUseMatch.setDisabled(false);
			for(var i=0;i<itemsCount;i++){
				var key=items[i].id;
				var isbn='';
				var upc='';
				var fulltitle=items[i].title;
				var tparts=fulltitle.split(" - ");
				var artist=tparts[0];
				var title=tparts[1];
				var year=(items[i].year)? items[i].year: "";
				var image=(items[i].thumb)? items[i].thumb: "";
				var fullImage= "";
				var author='';
				var publisher=(items[i].label)? items[i].label: "";
				var platform=(items[i].format)? items[i].format[0]: "";
				
			
				var itm={
					asin: key,
					isbn: isbn,
					upc: "",
					title: title,
					year: year,
					image: image,
					fullImage: fullImage,
					director: "",
					binding: platform,
					author: author,
					artist: artist,
					publisher: publisher,
					platform: "",
					price: "",
					provider: "discogs"
				};
				
				this.matchItems.push(itm);
			}
			this.maMatchIndex=-1;
			this.loadMatchItem();
		
		}	  
		
	},
	moviesMatchSuccess: function(inSender,inResponse,inRequest){
		this.$.maSearchButton.setActive(false);
		var j=inResponse;
		this.log(j);
		var items=j.products;
		var itemsCount=items.length;
			  	this.matchItems=[];

		if(itemsCount>0){
			this.$.maUseMatch.setDisabled(false);
		}
		for(var i=0;i<itemsCount;i++){
			var asin=(items[i].sku)? items[i].sku: "";
			var isbn='';
			var upc=(items[i].upc)? items[i].upc: "";
			var title=(items[i].name)? items[i].name.replace(" - DVD","").replace(" - Blu-ray Disc","").replace("Blu-ray 3D",""): "";
			var tparts=title.split("[");
			var title=tparts[0];
			var year=(items[i].releaseDate)? items[i].releaseDate.substr(0,4): "";
			var image=(items[i].thumbnailImage)? items[i].thumbnailImage: "";
			var fullImage=(items[i].image)? items[i].image: "";
			var director="";
			var author='';
			var artist=(items[i].artistName)? items[i].artistName: "";
			var publisher=(items[i].studio)? items[i].studio: "";
			var price=(items[i].regularPrice)? items[i].regularPrice: "";
			var format=(items[i].format)? items[i].format: "DVD";
			
	
			var itm={
				asin: asin,
				isbn: isbn,
				upc: upc,
				title: title,
				year: year,
				image: image,
				fullImage: fullImage,
				director: director,
				binding: format,
				author: author,
				artist: artist,
				publisher: publisher,
				platform: "",
				price: price,
				provider: "bestbuy"
			};
			
			this.matchItems.push(itm);
	
		}
		this.maMatchIndex=-1;
		this.loadMatchItem();
	
	},
	gamesMatchSuccess: function(inSender,inResponse,inRequest){
		this.$.maSearchButton.setActive(false);
	    var parser=new DOMParser();
	  	var xml=parser.parseFromString(inResponse,"text/xml");
	  	
	  	var items=xml.getElementsByTagName("Game");
	  	//this.log("found "+items.length+" items");
	  	this.matchItems=[];

	
	  	var itemCount=items.length;
	  	if(itemCount>0){
			this.$.maUseMatch.setDisabled(false);
	  		this.$.awsSearchStatus.hide();
	  		this.$.resultsList.show();
		  	for(var i=0;i<itemCount;i++){
		  		var item=items[i];
		  		
		  		var asin=item.getElementsByTagName("id")[0];
		  		if(asin){asin=asin.childNodes[0].nodeValue;}
	
		  		var title=item.getElementsByTagName("GameTitle")[0];
		  		if(title){title=title.childNodes[0].nodeValue;}
	
		  		var platform=item.getElementsByTagName("Platform")[0];
		  		if(platform){platform=platform.childNodes[0].nodeValue;}
	
		  		var year=item.getElementsByTagName("ReleaseDate")[0];
		  		if(year){year=year.childNodes[0].nodeValue.substr(-4);}
	
		  		var baseimgurl=xml.getElementsByTagName("baseImgUrl")[0];
		  		if(baseimgurl){baseimgurl=baseimgurl.childNodes[0].nodeValue;}
	
	
		  		var images=item.getElementsByTagName("boxart");
		  		var image="";
		  		for(var b=0;b<images.length;b++){
		  			if(images[b].getAttribute("side")=="front"){
			  			image=baseimgurl+images[b].childNodes[0].nodeValue;
		  			}
		  		}
	
		  		var publisher=item.getElementsByTagName("Publisher")[0];
		  		if(publisher){publisher=publisher.childNodes[0].nodeValue;}
	
				var itm={
					asin: asin,
					isbn: "",
					upc: "",
					title: title,
					year: year,
					image: image,
					fullImage: "",
					director: "",
					binding: "VideoGame",
					author: "",
					artist: "",
					publisher: publisher,
					platform: platform,
					price: "",
					provider: "gamesdb"
				};
				
				this.matchItems.push(itm);
	
			}
			
		}else{
		
		}
		this.maMatchIndex=-1;
		this.loadMatchItem();
	
	},
	bookMatchSuccess: function(inSender,inResponse,inRequest){
		this.$.maSearchButton.setActive(false);
		var j=inResponse;
		this.log(j);
		var items=j.docs;
		var itemsCount=items.length;
		this.matchItems=[];
		if(itemsCount>0){
			this.$.maUseMatch.setDisabled(false);		
		}
		for(var i=0;i<itemsCount;i++){
			if(!items[i].isbn){
				items[i].isbn=[{}];
			}
			for(var j=0,isbnCount=items[i].isbn.length;j<isbnCount;j++){
				var isbn=items[i].isbn[j];
				var key=(items[i].key)? items[i].key: isbn;
				var year=(items[i].first_publish_year)? items[i].first_publish_year: "";
				var image=(items[i].isbn)? "http://covers.openlibrary.org/b/isbn/"+isbn+"-S.jpg": "http://covers.openlibrary.org/b/id/"+items[i].cover_i+"-S.jpg";
				var fullImage=(items[i].isbn)? "http://covers.openlibrary.org/b/isbn/"+isbn+"-M.jpg": "http://covers.openlibrary.org/b/id/"+items[i].cover_i+"-M.jpg";
				var author=(items[i].author_name)? items[i].author_name[0]: "";
				var publisher=(items[i].publisher)? items[i].publisher[0]: "";
				var itm={
					asin: key,
					isbn: isbn,
					upc: "",
					title: items[i].title,
					year: year,
					image: image,
					fullImage: fullImage,
					director: "",
					binding: "Books",
					author: author,
					artist: "",
					publisher: publisher,
					platform: "",
					price: "",
					provider: "openlibrary"
				};
				
				this.matchItems.push(itm);
			}
		}
		
		this.maMatchIndex=-1;
		this.loadMatchItem();
	},
	maUseMatch: function(inSender,inEvent){
		this.$.maUseMatch.setActive(true);
		
		//determine what has changed
		var ci=this.currentMAItem;
		var mi=this.matchedItem;
		this.log(ci);
		this.log(mi);
		var itm={};
		itm.asin=mi.asin;
		if(ci.isbn!=mi.isbn && mi.isbn) itm.isbn=mi.isbn;
		if(ci.upc!=mi.upc && mi.upc) itm.upc=mi.upc;
		if(ci.title!=mi.title && mi.title) itm.title=mi.title;
		if(ci.year!=mi.year && mi.year) itm.year=mi.year;
		if(ci.image!=mi.image && mi.image) itm.image=mi.image;
		if(ci.director!=mi.director && mi.director) itm.director=mi.director;
		if(ci.author!=mi.author && mi.author) itm.author=mi.author;
		if(ci.artist!=mi.artist && mi.artist) itm.artist=mi.artist;
		if(ci.publisher!=mi.publisher && mi.publisher) itm.publisher=mi.publisher;
		if(ci.platform!=mi.platform && mi.platform) itm.platform=mi.platform;
		if(ci.price!=mi.price && mi.price) itm.price=mi.price;
		itm.provider=mi.provider;
		
 		
 		itm.token= this.userToken;
 		itm.method= 'library.editItem';
 		itm.owner= this.userId;
 		itm.oldasin= this.currentMAItem.asin;
 		this.log(itm);
 		
 		this.$.woodenrowsAPI.setMethod("POST");
 		this.$.woodenrowsAPI.call(itm);
 		
 		//TODO: allow manual add/edit
 		
 		//update local database
 		//var itmpre=enyo.mixin(itm,ci); //fill in existing properties from the current item
 		
 		//this.log(itmpre);
 		//create a base model of a full item to apply empty fields where needed
 		var itmmodel={
 			asin:'',
 			isbn:'',
 			upc:'',
 			title:'',
 			year:'',
 			image:'',
 			director:'',
 			author:'',
 			artist:'',
 			publisher:'',
 			platform:'',
 			price:'',
 			provider:''
 		};
 		
 		//loop through and delete any properties we already have, filling in some blanks from the current item
 		for(var k in itmmodel){
			if(itm[k]){
				//item already has this property
			}else{
				//item does not have this property
				if(ci[k]){
					//existing item has this data
					itm[k]=ci[k];
				}else{
					//existing item doesn't have this data
					itm[k]=itmmodel[k];
				}
			}
 		}
 		//var newitm=enyo.mixin(itmpre,itmmodel); //only filling in for missing values

	  	var sqlpre='UPDATE library SET asin="{$asin}", isbn="{$isbn}", upc="{$upc}", title="{$title}", year="{$year}", image="{$image}", director="{$director}", author="{$author}", artist="{$artist}", publisher="{$publisher}", platform="{$platform}", price="{$price}", provider="{$provider}" WHERE asin="{$oldasin}"';
	  	var sql=enyo.macroize(sqlpre,itm);
	  	
	  	this.log(sql);
	  	
		this.db.transaction( 
		    enyo.bind(this,(function (transaction) { 
		    	this.errorfrom="save item";
	        	transaction.executeSql(sql, [], enyo.bind(this,this.createRecordDataHandler), enyo.bind(this,this.errorHandler,"save item")); 
	    	})) 
		);  
		
		this.$.maUseMatch.setActive(false);
 		
		this.loadMAItem();
		
	},
	maSkipItem: function(inSender,inEvent){
		this.loadMAItem();
	},
	maNextMatch: function(inSender,inEvent){
		this.loadMatchItem();
	},
	maPrevMatch: function(inSender,inEvent){
		this.maMatchIndex=this.maMatchIndex-2;
		this.loadMatchItem();
	},
	onMenuButton: function(){
		this.$.androidMenu.toggleOpen();
	},
	setUpFBMenu: function(){
		//this.log("opening menu");
	    var cookie=this.getSetting("fbActivity");
	    //this.log(this.fbActivity);
	    if(cookie=="1"){
	 		//this.log("activity=true");
	    	this.fbActivity=true;
	    	//this.log(this.$.fbActivityMenu.getCaption());
	    	this.$.fbActivityMenu.setCaption("Don't Share Activity on Facebook");	    
	    	//this.$.appMenu.createComponent({caption: "Don't Share Activity on Facebook", onclick: "toggleFBSharing", name:"fbActivityMenu"},{owner:this});
	    }else{
	    	//this.log("activity=false");
	    	this.fbActivity=false;
	    	this.$.fbActivityMenu.setCaption("Share Activity on Facebook");
	    	//this.$.appMenu.createComponent({caption: "Share Activity on Facebook", onclick: "toggleFBSharing", name:"fbActivityMenu"}, {owner:this});
	    }	
	},
	toggleFBSharing: function(){
	    if(!this.fbActivity){
	    	this.fbActivity=true;
	    	this.saveSetting("fbActivity","1");
	    	this.$.fbActivityMenu.setCaption("Don't Share Activity on Facebook");	    
	    }else{
	    	this.fbActivity=false;
	    	this.saveSetting("fbActivity","0");
	    	this.$.fbActivityMenu.setCaption("Share Activity on Facebook");
	    }	
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
				orderby=" ORDER BY type ASC, title_sort ASC";
				break;
			case "typeD":
				orderby=" ORDER BY type DESC, title_sort ASC";
				break;
			case "year":
				orderby=" ORDER BY year ASC, title_sort ASC";
				break;
			case "yearD":
				orderby=" ORDER BY year DESC, title_sort ASC";
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
		//this.log(mytext);
		this.setCurrent=setCurrent;
	    this.db.transaction( 
	        enyo.bind(this,(function (transaction) { 
	        	this.errorfrom="loading library";
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
		var divisor;
		if(bounds.width>480){
			divisor=170;
		}else{
			divisor=85;
		}
		this.cellCount = Math.floor(bounds.width / divisor);
		this.rowCount = Math.floor(bounds.height / divisor);
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
			var c = this.$.itemCells.createComponent({flex: 1, kind: "VFlexBox", pack: "center", align: "center", style: "padding: 8px;", owner: this, idx: i, onclick: "cellClick", onmousehold:"cellHold"});
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

						
						//if(this.data[idx].new==true){
							//w.addClass("animated");
							//w.addClass("bounceInDown");
							//this.log("new: "+this.data[idx].title);
							//this.data[idx].new=false;
						//}else{
							//w.removeClass("bounceInDown");	
												
						//}
						
						c.addStyles("visibility: visible; height: auto;");
						
						var type=this.bindingToType(this.data[idx].binding,this.data[idx].platform);
  						//this.log(this.data[idx]);
					
						c.$.itemTitle.setContent(this.data[idx].title);
						c.$.itemTitle.hide();
						var itemImage=this.data[idx].image;
						if(itemImage.indexOf("://")==-1){ //no image, so let's make one!
							var canvas=document.createElement("canvas");
							switch(this.data[idx].type){
								case "Music":
									var width="116";
									var height="116";
									var creator=this.data[idx].artist;
									break;
								case "VideoGames":
									var creator=this.data[idx].publisher;

									switch(type){
										case "wii":
											break;
											var width="116";
											var height="160";
										case "xbox":
											var width="116";
											var height="160";										
											break;
										case "ds":
											var width="116";
											var height="103";
											break;
										case "tds":
											var width="116";
											var height="103";
											break;
										case "ps3":
											var width="116";
											var height="134";
											break;
										case "dvd":
											var width="116";
											var height="160";
											break;
										case "cd":
											var width="116";
											var height="116";
											break;
										default:
											creator=this.data[idx].platform;
											var width="160";
											var height="116";
											break;
									}
									break;
								case "Books":
									var width="104";
									var height="158";
									var creator=this.data[idx].author;
									if(creator=="" || !creator){
										creator=this.data[idx].publisher;
									}
									break;
								case "DVD":
								default:
									var width="116";
									var height="160";
									var creator=this.data[idx].director;
									if(creator=="" || !creator){
										creator=this.data[idx].publisher;
									}								
									break;
							}
							
							canvas.width=width;
							canvas.height=height;
							var ctx=canvas.getContext('2d');
							ctx.fillStyle='#ffffff';
							ctx.fillRect(0,0,width,height);
							ctx.fillStyle="#000000";
							ctx.font='12px sans-serif';
							ctx.textBaseline='top';
							//ctx.strokeText(this.data[idx].title,0,0);
							this.wrapText(ctx,creator,0,0,width-1,14);
							this.wrapText(ctx,this.data[idx].title,0,this.lastY+18,width-1,14);
							
							itemImage=canvas.toDataURL();
						}
						w.$.image.setSrc(itemImage);
						//this.log(w.$.image.getBounds());
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
	wrapText: function (context, text, x, y, maxWidth, lineHeight){
	    var words = text.split(" ");
	    var line = "";
	    this.lastY=0;
	 
	    for (var n = 0; n < words.length; n++) {
	        var testLine = line + words[n] + " ";
	        var metrics = context.measureText(testLine);
	        var testWidth = metrics.width;
	        if (testWidth > maxWidth) {
	            context.fillText(line, x, y);
	            line = words[n] + " ";
	            y += lineHeight;
	        }
	        else {
	            line = testLine;
	        }
	    }
	    this.lastY=y;
	    context.fillText(line, x, y);
	},  
  cellClick: function(inSender, inEvent){
  	var idx = inEvent.rowIndex * this.cellCount + inSender.idx;
  	//this.log(this.data[idx]);
  	var item=this.data[idx];
  	this.currentItem=item;
  	this.currentIndex=idx;
  	this.currentElement=inSender;
  	//this.log(inSender);
  	//this.log(this.currentElement);
  	
  	this.displayItem(item);
  },
  cellHold: function(inSender, inEvent){
  	var idx = inEvent.rowIndex * this.cellCount + inSender.idx;
  	var item=this.data[idx];
  	this.currentHoldItem=item;
  	this.currentHoldIndex=idx;
  	this.currentHoldElement=inSender;
  	
  	//this.$.cellHoldMenu.openAtEvent(inEvent);	
  },
  displayItem: function(item){
  	var item=(item)? item: this.data[this.currentIndex];
	 this.log(item);
  	
  	this.$.detailItemName.setContent(item.title.replace(/\\'/g,"'"));
  	var creator=item.author || item.artist || item.director || item.publisher || "Unknown";
  	
  	this.$.detailItemCreator.setContent(creator);
  	this.$.detailItemImage.setSrc(item.image.replace("._SL160_","").replace("-M.","-L.").replace("-S.","-L."));
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
  	//var url=this.apiUrl+"?Service=AWSECommerceService&Operation=ItemLookup&AssociateTag=frobba-20&ResponseGroup=Large";
  	//url+="&ItemId="+item.asin;
  	//this.log(url);
  	
  	//var signedUrl=invokeRequest(url);
  	//this.log("signed=",signedUrl);
  	//this.$.awsItem.setUrl(signedUrl);
  	//this.$.awsItem.call();
	switch(item.provider){
		case "openlibrary":
			this.log("openlibrary");
			this.bibkey="ISBN:"+item.isbn;
			var data={
				bibkeys: this.bibkey,
				format: "json",
				jscmd: "details"
			};
			this.$.booksDetail.call(data);
			break;
		case "gamesdb":
			this.log("gamedb");
			var data={
				id: item.asin
			};
			this.$.gamesDetail.call(data);
			break;
		case "bestbuy":
			this.log("bby");
			var url="http://api.remix.bestbuy.com/v1/products(sku="+item.asin+")";
			var data={
				apiKey:'dqgzhcnnktw2a8yjruguxey4',
				format:'json'
			};
			this.$.moviesDetail.setUrl(url);
			this.$.moviesDetail.call(data);
			break;
		case "discogs":
			this.$.musicDetail.setUrl("http://api.discogs.com/releases/"+item.asin);
			this.$.musicDetail.call();
			break;
		case "woodenrows":
			this.awsItemSuccess("woodenrows");
			this.$.displayItemBranding.hide();

			break;
		default:
			this.log("not a thing");
			this.awsItemSuccess("woodenrows");
			this.$.displayItemBranding.hide();		
			break;
	}
	
  	
  	this.$.itemDetail.open();
  
  },
  awsItemSuccess: function(inSender,inResponse,inRequest){
  	this.log(inResponse);
  	this.log("success");
  	var rows=[];
  	switch(inSender){
  		case this.$.booksDetail:
  			var j=inResponse;
  			this.log(j);
  			var item=j[this.bibkey].details;
  			
			var publisher=item.publishers;
			if(publisher){
				publisher=publisher[0];
				var r={layoutKind: "HFlexLayout", components:[{content:publisher, flex:1},{content:"Publisher",className:"enyo-label"}]};
				rows.push(r);
			}
			var publicationdate=item.publish_date;
			if(publicationdate){
				//publicationdate=publicationdate.childNodes[0].nodeValue;
				var r={layoutKind: "HFlexLayout", components:[{content:publicationdate, flex:1},{content:"Publication Date",className:"enyo-label"}]};
				rows.push(r);
			}
			var genre=item.genres;
			if(genre){
				genre=genre[0];
				var r={layoutKind: "HFlexLayout", components:[{content:genre, flex:1},{content:"Genre",className:"enyo-label"}]};
				rows.push(r);
			}
			var pages=item.number_of_pages;
			if(pages){
				//publicationdate=publicationdate.childNodes[0].nodeValue;
				var r={layoutKind: "HFlexLayout", components:[{content:pages, flex:1},{content:"Pages",className:"enyo-label"}]};
				rows.push(r);
			}
			
  			break;
  		case this.$.musicDetail:
  			var j=inResponse;
  			var item=j;
  			
			var genres=item.genres;
			if(genres){
				var genre=genres.join("<br>");
				var r={layoutKind: "HFlexLayout", components:[{content:genre, flex:1},{content:"Genre",className:"enyo-label"}]};
				rows.push(r);
				
			}
			var styles=item.styles;
			if(styles){
				var style=styles.join("<br>");
				var r={layoutKind: "HFlexLayout", components:[{content:style, flex:1},{content:"Styles",className:"enyo-label"}]};
				rows.push(r);
				
			}
  			
			var labels=item.labels;
			if(labels){
				var label='';
				for(var b=0;b<labels.length;b++){
					label+=labels[b].name+"<br>";
				}
				var r={layoutKind: "HFlexLayout", components:[{content:label, flex:1},{content:"Label",className:"enyo-label"}]};
				rows.push(r);
				
			}

			var notes=item.notes;
			if(notes){
				var notes=notes.replace(/(<([^>]+)>)/ig,"").replace("\r\n","<br>");
				var r={layoutKind: "HFlexLayout", components:[{content:notes, flex:1},{content:"Notes",className:"enyo-label"}]};
				rows.push(r);
			}
			
			var year=item.released;
			if(year){
				var r={layoutKind: "HFlexLayout", components:[{content:year, flex:1},{content:"Release Date",className:"enyo-label"}]};
				rows.push(r);
			}
			
			var tracklist=item.tracklist;
			if(tracklist){
				var songs=[];
				for(var t=0;t<tracklist.length;t++){
					var track=tracklist[t];
					songs[parseInt(track.position)]=track.title+" ("+track.duration+")";
				}
				var l='<ol>';
				for(var s=1;s<songs.length;s++){
					l+='<li>'+songs[s]+'</li>';
				}
				l+='</ol>';
				var r={layoutKind: "HFlexLayout", components:[{content:l, flex:1},{content:"Tracks",className:"enyo-label"}]};
				rows.push(r);
				
			}
  			
  			//find a better image, if available:
  			var images=item.images;
  			if(images){
  				for(var p=0;p<images.length;p++){
  					if(images[p].type=="primary"){
  						this.$.detailItemImage.setSrc(images[p].uri);
  						break;
  					}
  				}
  			}
  			
  			break;
  		case this.$.moviesDetail:
  			var j=inResponse;
  			var item=j.products[0];

			var description=item.plot;
			if(description){
				var r={layoutKind: "HFlexLayout", components:[{content:description, flex:1},{content:"Description",className:"enyo-label"}]};
				rows.push(r);
			}
  			

			var duration=item.lengthInMinutes;
			if(duration){
				var r={layoutKind: "HFlexLayout", components:[{content:duration+" minutes", flex:1},{content:"Running Time",className:"enyo-label"}]};
				rows.push(r);
			}

			var rating=item.mpaaRating;
			if(rating){
				var r={layoutKind: "HFlexLayout", components:[{content:rating, flex:1},{content:"MPAA Rating",className:"enyo-label"}]};
				rows.push(r);
			}

			var tdate=item.theatricalReleaseDate;
			if(tdate){
				var r={layoutKind: "HFlexLayout", components:[{content:tdate, flex:1},{content:"Theatrical Release",className:"enyo-label"}]};
				rows.push(r);
			}

			var genre=item.genre;
			if(genre){
				var r={layoutKind: "HFlexLayout", components:[{content:genre, flex:1},{content:"Genre",className:"enyo-label"}]};
				rows.push(r);
			}

			var label=item.albumLabel;
			if(label){
				var r={layoutKind: "HFlexLayout", components:[{content:label, flex:1},{content:"Label",className:"enyo-label"}]};
				rows.push(r);
			}

			var rdate=item.releaseDate;
			if(rdate){
				var r={layoutKind: "HFlexLayout", components:[{content:rdate, flex:1},{content:"Release Date",className:"enyo-label"}]};
				rows.push(r);
			}





/*			var link=item.url;
			if(link){
				var r={layoutKind: "HFlexLayout", components:[{content:"Click to View", flex:1,href:link,onclick:"goToLink",goToLink:function(inSender){
					this.parent.parent.goToLink(inSender);
				}},{content:"External Website",className:"enyo-label"}]};
				rows.push(r);
			}*/
  			
  			break;
  		case this.$.gamesDetail:
  			var parser=new DOMParser();
		  	var xml=parser.parseFromString(inResponse,"text/xml");
			
			var description=xml.getElementsByTagName("Overview")[0];
			if(description){
				description=description.childNodes[0].nodeValue;		
				var r={layoutKind: "HFlexLayout", components:[{content:description, flex:1},{content:"Description",className:"enyo-label"}]};
			}else{
				description="";
			}

			var platform=xml.getElementsByTagName("Platform")[0];
			if(platform){
				platform=platform.childNodes[0].nodeValue;
				var r={layoutKind: "HFlexLayout", components:[{content:platform, flex:1},{content:"Platform",className:"enyo-label"}]};
				rows.push(r);
			}
			
			var developer=xml.getElementsByTagName("Developer")[0];
			if(developer){
				developer=developer.childNodes[0].nodeValue;
				var r={layoutKind: "HFlexLayout", components:[{content:developer, flex:1},{content:"Developers",className:"enyo-label"}]};
				rows.push(r);
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

			var audience=xml.getElementsByTagName("ESRB")[0];
			if(audience){
				audience=audience.childNodes[0].nodeValue;
				var r={layoutKind: "HFlexLayout", components:[{content:audience, flex:1},{content:"ESRB Rating",className:"enyo-label"}]};
				rows.push(r);
			}

			var genres=xml.getElementsByTagName("Genres")[0];
			if(genres){
				var genrelist=genres.getElementsByTagName("genre");
				var genre='';
				for(var g=0;g<genrelist.length;g++){
					genre+=genrelist[g].childNodes[0].nodeValue+"<br>";
				}
				var r={layoutKind: "HFlexLayout", components:[{content:genre, flex:1},{content:"Genre",className:"enyo-label"}]};
				rows.push(r);
			}

			var players=xml.getElementsByTagName("Players")[0];
			if(players){
				players=players.childNodes[0].nodeValue;
				var r={layoutKind: "HFlexLayout", components:[{content:players, flex:1},{content:"Players",className:"enyo-label"}]};
				rows.push(r);
			}
			
  			break;
  		case "woodenrows":
  			var item=this.currentItem;
			var author=item.author;
			if(author){
				var r={layoutKind: "HFlexLayout", components:[{content:author, flex:1},{content:"Author",className:"enyo-label"}]};
				rows.push(r);
			}
			var artist=item.artist;
			if(artist){
				var r={layoutKind: "HFlexLayout", components:[{content:artist, flex:1},{content:"Artist",className:"enyo-label"}]};
				rows.push(r);
			}
			var director=item.director;
			if(director){
				var r={layoutKind: "HFlexLayout", components:[{content:director, flex:1},{content:"Director",className:"enyo-label"}]};
				rows.push(r);
			}
			var publisher=item.publisher;
			if(publisher){
				var r={layoutKind: "HFlexLayout", components:[{content:publisher, flex:1},{content:"Publisher",className:"enyo-label"}]};
				rows.push(r);
			}
			var year=item.year;
			if(year){
				var r={layoutKind: "HFlexLayout", components:[{content:year, flex:1},{content:"Year",className:"enyo-label"}]};
				rows.push(r);
			}
			var comment=item.comment;
			if(comment){
				var r={layoutKind: "HFlexLayout", components:[{content:comment, flex:1},{content:"Comment",className:"enyo-label"}]};
				rows.push(r);
			}
			var binding=item.binding;
			if(binding && binding!="VideoGame"){
				var r={layoutKind: "HFlexLayout", components:[{content:binding, flex:1},{content:"Kind",className:"enyo-label"}]};
				rows.push(r);
			}
			var platform=item.platform;
			if(platform){
				var r={layoutKind: "HFlexLayout", components:[{content:platform, flex:1},{content:"Platform",className:"enyo-label"}]};
				rows.push(r);
			}
  			
  			break;
  		default:
  			break;
  	}
  	/*var parser=new DOMParser();
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
		if(unit=="seconds"){
			var secs=runingtime.childNodes[0].nodeValue;
		    var hours = Math.floor(secs / (60 * 60));
		   
		    var divisor_for_minutes = secs % (60 * 60);
		    var minutes = Math.floor(divisor_for_minutes / 60);
		 
		    var divisor_for_seconds = divisor_for_minutes % 60;
		    var seconds = Math.ceil(divisor_for_seconds);
		    
		    runingtime=((hours==0)? "":hours+"h ")+minutes+"m "+seconds+"s";
    	}else{
			runingtime=runingtime.childNodes[0].nodeValue+" "+unit;
		}
		var r={layoutKind: "HFlexLayout", components:[{content:runingtime, flex:1},{content:"Running Time",className:"enyo-label"}]};
		rows.push(r);
	}

	var pages=xml.getElementsByTagName("NumberOfPages")[0];
	if(pages){
		pages=pages.childNodes[0].nodeValue;
		var r={layoutKind: "HFlexLayout", components:[{content:pages, flex:1},{content:"Pages",className:"enyo-label"}]};
		rows.push(r);
	}*/

	var r={layoutKind: "HFlexLayout", components:[{content:this.sqlUnescape(this.currentItem.extra || ''), flex:1},{content:"Comment",className:"enyo-label"}]};	
	rows.push(r);

	var provider=this.currentItem.provider;
	if(provider){
		this.$.displayItemBranding.setSrc("images/"+this.getBrandingLogo(provider));
		this.$.displayItemBranding.href= this.getBrandingLink(provider);
		this.$.displayItemBranding.show();
	}else{
		this.$.displayItemBranding.hide();
	}
	
	this.$.detailItemDetails.createComponents(rows);
	this.$.detailItemDetails.render();
  },
  bindingToType: function(binding,platform){
  	var map={
  		"Audio CD":"cd",
  		"CD":"cd",
  		"Vinyl":"vinyl",
  		"DVD":"dvd",
  		"Blu-ray":"bluray",
  		"Blu-ray Disc":"bluray",
  		"Blu-ray 3D":"bluray",
  		"Paperback":"book",
  		"Hardcover":"book",
  		"Mass Market Paperback":"book",
  		"MP3 Download":"cd",
  		"Books":"book"
  		
  	};
  	
  	var platmap={
  		"Nintendo Wii":"wii",
  		"Xbox 360":"xbox",
  		"Xbox":"xbox",
  		"Microsoft Xbox 360":"xbox",
  		"Microsoft Xbox":"xbox",
  		"Nintendo DS":"ds",
  		"Nintendo 3DS":"tds",
  		"PlayStation 3":"ps3",
  		"PlayStation2":"dvd",
  		"PlayStation":"cd",
  		"Sony Playstation 3":"ps3",
  		"Sony Playstation2":"dvd",
  		"Sony Playstation":"cd",
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
  typeToSingular: function(type){
  	switch(type){
  		case "DVD":
  			type="movie";
  			break;
  		case "Music":
  			type="music album";
  			break;
  		case "VideoGames":
  			type="video game";
  			break;
  		case "Books":
  			type="book";
  			break;
  	}
  	
  	return type;
  },
  typeToOGType: function(type){
  	switch(type){
  		case "DVD":
  			type="movie";
  			break;
  		case "Music":
  			type="album";
  			break;
  		case "VideoGames":
  			type="game";
  			break;
  		case "Books":
  			type="book";
  			break;
  	}
  	
  	return type;
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
	//this.log(string);
	//this.log("update table");
	this.db.transaction( 
		enyo.bind(this,(function (transaction) { 
			//transaction.executeSql('DROP TABLE IF EXISTS library;', []); 
			this.errorfrom="item returned";
		    transaction.executeSql(string, [], enyo.bind(this,this.itemReturnedOK), enyo.bind(this,this.errorHandler,"item returned")); 
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
      //this.log(this.currentItem);
		this.$.detailLendButton.show();
		this.$.detailReturnButton.hide();
	  enyo.windows.addBannerMessage("Woohoo! Got your stuff back!","{}");

  },
  addToShelf: function(inSender,inEvent){
  	this.openDialog({dialog:"addShelfDialog"});	
  },
  removeItem: function(inSender, inEvent){
  	//this.log("showing dialog...");
        this.showConfirmDialog("Are you sure you want to remove <i>"+this.currentItem.title+"</i> from your library? This cannot be undone.","doRemoveItem");  	
  },
  doRemoveItem: function(){
    this.$.confirmDialog.close();
    this.$.itemDetail.close();

	var string = 'DELETE FROM library WHERE id="'+this.currentItem.id+'"';
	//this.log(string);
	//this.log("update table");
	this.db.transaction( 
		enyo.bind(this,(function (transaction) { 
			//transaction.executeSql('DROP TABLE IF EXISTS library;', []); 
			this.errorfrom="remove item";
		    transaction.executeSql(string, [], enyo.bind(this,this.itemRemovedOK), enyo.bind(this,this.errorHandler,"remove item")); 
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
    	if(this.iw){
	    	this.iw.hasNode().addEventListener( 'webkitTransitionEnd', this.removeDone, false );
    		this.iw.addClass("removing");
    	}
    }
  },
  removeAniDone: function(){
	this.loadLibrary(true);
      //this.log(this.currentItem);
	  enyo.windows.addBannerMessage("Ohh, that was a nice i-- DELETED!!","{}");
    this.iw.hasNode().removeEventListener('webkitTransitionEnd',this.removeDone,false);
  },
 
  lendItem: function(inSender,inEvent){
  	if(this.platform=="webos"){
	  this.$.pickContact.pickPerson();
	}else{
		//this.$.pgPickContact.openPeoplePicker();
		this.$.lendDialog.openAtCenter();
	}
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
  	if(a.emails){
  		var b=a;
  	}
  	
  	this.log(b.name);
  	
  	var lname=b.name.familyName;
  	var fname=b.name.givenName;
  	var name=(lname)? fname +" "+ lname: fname;
  	
  	this.selectedContact=name;
  	

  	
  	this.log(name);
  	if(this.platform=="webos"){
	  	this.$.pickContact.close();
	}else{
	  	//this.$.pgPickContact.closePeoplePicker();
	}
	
	
	this.log("ugh");
	this.showConfirmDialog("Are you sure you want to lend <i>"+this.currentItem.title+"</i> to <b>"+name+"</b>?","lendItemToContact");
  },
  saveLend: function(inSender, inEvent){
  	this.selectedContact=this.$.lendInput.getValue();
  	this.$.lendDialog.close();
	this.showConfirmDialog("Are you sure you want to lend <i>"+this.currentItem.title+"</i> to <b>"+this.selectedContact+"</b>?","lendItemToContact");
  	
  },
  lendItemToContact: function(a,b){
  	this.$.confirmDialog.close();

	var when=new Date();
	when=when.getTime();
	
	var name=this.selectedContact;
 
	var string = 'UPDATE library SET lent="1", lentTo="'+name+'", lentOn="'+when+'" WHERE id="'+this.currentItem.id+'"';
	//this.log(string);
	//this.log("update table");
	this.db.transaction( 
		enyo.bind(this,(function (transaction) { 
			//transaction.executeSql('DROP TABLE IF EXISTS library;', []); 
			this.errorfrom="lend out";
		    transaction.executeSql(string, [], enyo.bind(this,this.itemLentOK), enyo.bind(this,this.errorHandler,"lend out")); 
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
      //this.log(this.currentItem);
		this.$.detailLendButton.hide();
		this.$.detailReturnButton.show();
	  enyo.windows.addBannerMessage("Alrighty! Item has been lent out!","{}");
  },
  saveComment: function(inSender,inEvent){
  	var comment=this.$.commentInput.getValue();
  	if(comment){
  		//enyo.mixin(this.currentItem,{extra:comment});
  		//enyo.mixin(this.data[this.currentIndex],{extra:comment});
//  		this.currentItem.extra=comment;
  //		this.data[this.currentIndex].extra=comment;
  		
  		
  		//enyo.setObject("currentItem.extra",comment,this);
//  		enyo.setObject("data)
  		
  		//this.log(this.currentItem);
  		//this.log(this.data[this.currentIndex]);
		var string = 'UPDATE library SET extra="'+this.sqlEscape(comment)+'" WHERE id="'+this.currentItem.id+'"';
		this.db.transaction( 
			enyo.bind(this,(function (transaction) { 
				//transaction.executeSql('DROP TABLE IF EXISTS library;', []); 
				this.errorfrom="save comment";
			    transaction.executeSql(string, [], enyo.bind(this,this.itemCommentOK), enyo.bind(this,this.errorHandler,"save comment")); 
			}))
		);  		

	 	if(this.userToken){
	 		var data={
	 			token: this.userToken,
	 			method: 'library.saveComment',
	 			owner: this.userId,
	 			asin: this.currentItem.asin,
	 			comment: comment
	 		};
	
			this.$.syncSpinner.show(); 		
	 		this.$.woodenrowsAPI.setMethod("POST");
	 		this.$.woodenrowsAPI.call(data);
	 	}

  	}
  },
  removeComment: function(inSender,inEvent){
  		//this.log(this.currentItem);
  		//this.log(this.data[this.currentIndex]);
  		
  		var comment='';
		var string = 'UPDATE library SET extra="'+this.sqlEscape(comment)+'" WHERE id="'+this.currentItem.id+'"';
		this.db.transaction( 
			enyo.bind(this,(function (transaction) { 
				//transaction.executeSql('DROP TABLE IF EXISTS library;', []); 
				this.errorfrom="remove comment";
			    transaction.executeSql(string, [], enyo.bind(this,this.itemCommentOK), enyo.bind(this,this.errorHandler,"remove comment")); 
			}))
		);  		

	 	if(this.userToken){
	 		var data={
	 			token: this.userToken,
	 			method: 'library.saveComment',
	 			owner: this.userId,
	 			asin: this.currentItem.asin,
	 			comment: comment
	 		};
	
			this.$.syncSpinner.show(); 		
	 		this.$.woodenrowsAPI.setMethod("POST");
	 		this.$.woodenrowsAPI.call(data);
	 	}

  },
  itemCommentOK: function(){
 	this.loadLibrary(true);
 
  	this.closeDialog({dialog:'commentDialog'});
	enyo.windows.addBannerMessage("Item comment saved.","{}");

  	//this.displayItem(this.data[this.currentIndex]);
  	
  	enyo.job("reloadItem",enyo.bind(this,"displayItem"), 1000);
  },
  commentOpened: function(){
  	this.$.commentInput.setValue(this.sqlUnescape(this.currentItem.extra));
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
  	this.$.doBBSearch.hide();

  	/*var url=this.apiUrl+"?Service=AWSECommerceService&Operation=ItemSearch&AssociateTag=frobba-20&ResponseGroup=Medium";
  	var kw=this.$.addItemInput.getValue().replace(/\-/g,"");
	if(this.isNumber(kw) && kw.length>3){
		url+="&SearchIndex=All";
	}else{
	  	url+="&SearchIndex="+this.searchType;
	}
  	url+="&Keywords="+encodeURIComponent(kw);
  	
  	url=url.replace(/'/g," ");
  	//this.log(url);
  	
  	var signedUrl=invokeRequest(url);
  	//this.log("signed=",signedUrl);*/

  	var kw=this.$.addItemInput.getValue().replace(/\-/g,"");
  	var upcData={
  		request_type: 3,
  		access_token: '84489762-578D-47FF-8D02-D6012A7FAD25',
  		upc: kw
  	};
	if(this.isNumber(kw) && kw.length>3){
		switch(this.searchType){
			case "Books":
				if(kw.length!=10 && kw.length!=13){
					//then we have a upc, not an ISBN
					this.$.barcodeAPI.call(upcData);
				}else{
					this.$.booksAPI.call({isbn:kw, limit:50});
				}
				break;
			case "VideoGames":
				this.$.barcodeAPI.call(upcData);
				break;
			case "DVD":
				var url="http://api.remix.bestbuy.com/v1/products(upc="+kw+")";
				var data={
					apiKey:'dqgzhcnnktw2a8yjruguxey4',
					format:'json'
				};
				this.$.moviesAPI.setUrl(url);
				this.$.moviesAPI.call(data);
				break;
			case "Music":
				if(this.musicSource=="discogs"){
					var data={
						barcode: kw
					};
					this.$.musicAPI.call(data);
				  	this.$.doBBSearch.show();

				}else if(this.musicSource=="bestbuy"){
					var url="http://api.remix.bestbuy.com/v1/products(upc="+kw+")";
					var data={
						apiKey:'dqgzhcnnktw2a8yjruguxey4',
						format:'json'
					};
					this.$.moviesAPI.setUrl(url);
					this.$.moviesAPI.call(data);					
				}
				break;
		}
	}else{
		switch(this.searchType){
			case "Books":
				//search Google Books
				this.$.booksAPI.call({title:kw,limit:50});
				break;
			case "DVD":
				var url="http://api.remix.bestbuy.com/v1/products(search="+kw+"&type=Movie)";
				var data={
					apiKey:'dqgzhcnnktw2a8yjruguxey4',
					format:'json'
				};
				this.$.moviesAPI.setUrl(url);
				this.$.moviesAPI.call(data);
				break;
			case "Music":
				if(this.musicSource=="discogs"){
					this.$.musicAPI.call({q:kw,type:'release',per_page:75});
					this.$.doBBSearch.show();

				}else if(this.musicSource=="bestbuy"){
					var url="http://api.remix.bestbuy.com/v1/products(search="+kw+"&type=Music)";
					var data={
						apiKey:'dqgzhcnnktw2a8yjruguxey4',
						format:'json'
					};
					this.$.moviesAPI.setUrl(url);
					this.$.moviesAPI.call(data);
				}
				break;
			case "VideoGames":
				this.$.gamesAPI.call({name:kw});
				break;
		}
	}
  	

  	this.searchResults=[];
  	this.doingSearch=true;
  	this.gettingPage=false;
  	
//  	this.$.awsSearch.setUrl(url);
  //	this.$.awsSearch.call();
  },
  gamesSuccess: function(inSender, inResponse, inRequest){
  	this.$.addItemSearch.setActive(false);
  	//enyo.keyboard.setManualMode(true);
  	//enyo.keyboard.hide();
  	window.setTimeout(enyo.bind(this,function(){this.$.addItemInput.forceBlur();}),500);

	this.log("got games");
    
    var parser=new DOMParser();
  	var xml=parser.parseFromString(inResponse,"text/xml");
  	
  	var items=xml.getElementsByTagName("Game");
  	//this.log("found "+items.length+" items");
  	

  	var itemCount=items.length;
  	if(itemCount>0){
  		this.$.awsSearchStatus.hide();
  		this.$.resultsList.show();
	  	for(var i=0;i<itemCount;i++){
	  		var item=items[i];
	  		
	  		var asin=item.getElementsByTagName("id")[0];
	  		if(asin){asin=asin.childNodes[0].nodeValue;}

	  		var title=item.getElementsByTagName("GameTitle")[0];
	  		if(title){title=title.childNodes[0].nodeValue;}

	  		var platform=item.getElementsByTagName("Platform")[0];
	  		if(platform){platform=platform.childNodes[0].nodeValue;}

	  		var year=item.getElementsByTagName("ReleaseDate")[0];
	  		if(year){year=year.childNodes[0].nodeValue.substr(-4);}

	  		var baseimgurl=xml.getElementsByTagName("baseImgUrl")[0];
	  		if(baseimgurl){baseimgurl=baseimgurl.childNodes[0].nodeValue;}


	  		var images=item.getElementsByTagName("boxart");
	  		var image="";
	  		for(var b=0;b<images.length;b++){
	  			if(images[b].getAttribute("side")=="front"){
		  			image=baseimgurl+images[b].childNodes[0].nodeValue;
	  			}
	  		}

	  		var publisher=item.getElementsByTagName("Publisher")[0];
	  		if(publisher){publisher=publisher.childNodes[0].nodeValue;}

			var itm={
				asin: asin,
				isbn: "",
				upc: "",
				title: title,
				year: year,
				image: image,
				fullImage: "",
				director: "",
				binding: "VideoGame",
				author: "",
				artist: "",
				publisher: publisher,
				platform: platform,
				price: "",
				provider: "gamesdb"
			};
			
			this.searchResults.push(itm);

		}
		
	}else{
	
	}

  	if(this.doingSearch){
	  	this.$.resultsList.punt();
	  	this.openDialog({dialog:"resultsDialog"});
  		this.$.awsSearchStatus.hide();
  		this.$.resultsList.show();
	  	this.doingSearch=false;
	}

  },
  moviesSuccess: function(inSender,inResponse,inRequest){
  	this.$.addItemSearch.setActive(false);
  	//enyo.keyboard.setManualMode(true);
  	//enyo.keyboard.hide();
  	window.setTimeout(enyo.bind(this,function(){this.$.addItemInput.forceBlur();}),500);

	this.log("got books");
	
	var j=inResponse;
	this.log(j);
	var items=j.products;
	this.musicSource="discogs";
	var itemsCount=items.length;
	for(var i=0;i<itemsCount;i++){
		var asin=(items[i].sku)? items[i].sku: "";
		var isbn='';
		var upc=(items[i].upc)? items[i].upc: "";
		var title=(items[i].name)? items[i].name.replace(" - DVD","").replace(" - Blu-ray Disc","").replace("Blu-ray 3D",""): "";
		var tparts=title.split("[");
		var title=tparts[0];
		var year=(items[i].releaseDate)? items[i].releaseDate.substr(0,4): "";
		var image=(items[i].thumbnailImage)? items[i].thumbnailImage: "";
		var fullImage=(items[i].image)? items[i].image: "";
		var director="";
		var author='';
		var artist=(items[i].artistName)? items[i].artistName: "";
		var publisher=(items[i].studio)? items[i].studio: "";
		var price=(items[i].regularPrice)? items[i].regularPrice: "";
		var format=(items[i].format)? items[i].format: "DVD";
		

		var itm={
			asin: asin,
			isbn: isbn,
			upc: upc,
			title: title,
			year: year,
			image: image,
			fullImage: fullImage,
			director: director,
			binding: format,
			author: author,
			artist: artist,
			publisher: publisher,
			platform: "",
			price: price,
			provider: "bestbuy"
		};
		
		this.searchResults.push(itm);

	}

  	if(this.doingSearch){
  		this.$.resultsBranding.setSrc("images/"+this.getBrandingLogo("bestbuy"));
  		this.$.resultsBranding.href=this.getBrandingLink("bestbuy");
	  	this.$.resultsList.punt();
	  	this.openDialog({dialog:"resultsDialog"});
  		this.$.awsSearchStatus.hide();
  		this.$.resultsList.show();
	  	this.doingSearch=false;
	}
	
	  
  },
  musicSuccess: function(inSender,inResponse,inRequest){
  	this.$.addItemSearch.setActive(false);
  	//enyo.keyboard.setManualMode(true);
  	//enyo.keyboard.hide();
  	window.setTimeout(enyo.bind(this,function(){this.$.addItemInput.forceBlur();}),500);

	this.log("got music");
	
	var j=inResponse;
	this.log(j);
	var items=j.results;
	var itemsCount=items.length;
	if(itemsCount==0){
		if(this.isNumber(this.$.addItemInput.getValue())){ //barcode
		  	var upcData={
		  		request_type: 3,
		  		access_token: '84489762-578D-47FF-8D02-D6012A7FAD25',
		  		upc: this.$.addItemInput.getValue()
		  	};
			this.$.barcodeAPI.call(upcData);
		}else{
			this.musicSource="bestbuy";
			this.searchItems(this.$.addItemSearch);
		}
	}else{
		this.musicSource="discogs";
		for(var i=0;i<itemsCount;i++){
			var key=items[i].id;
			var isbn='';
			var upc='';
			var fulltitle=items[i].title;
			var tparts=fulltitle.split(" - ");
			var artist=tparts[0];
			var title=tparts[1];
			var year=(items[i].year)? items[i].year: "";
			var image=(items[i].thumb)? items[i].thumb: "";
			var fullImage= "";
			var author='';
			var publisher=(items[i].label)? items[i].label: "";
			var platform=(items[i].format)? items[i].format[0]: "";
			
		
			var itm={
				asin: key,
				isbn: isbn,
				upc: "",
				title: title,
				year: year,
				image: image,
				fullImage: fullImage,
				director: "",
				binding: platform,
				author: author,
				artist: artist,
				publisher: publisher,
				platform: "",
				price: "",
				provider: "discogs"
			};
			
			this.searchResults.push(itm);
		}
	
	  	if(this.doingSearch){
		  	this.$.resultsList.punt();
		  	this.openDialog({dialog:"resultsDialog"});
	  		this.$.awsSearchStatus.hide();
	  		this.$.resultsList.show();
		  	this.doingSearch=false;
		}
	}	  
  },
  doBBSearch: function(inSender){
  	this.musicSource="bestbuy";
  	this.searchItems(this.$.addItemSearch);
  	this.$.doBBSearch.hide();
  },
  barcodeSuccess: function(inSender,inResponse,inRequest){
  	var item=inResponse["0"];
  	if(item){
  		var titleParts=item.productname.split("-");
  		var title=enyo.string.trim(titleParts[0]);
  		this.$.addItemInput.setValue(title);
  		this.searchItems(this.$.addItemSearch);
  	}else{
		this.showErrorDialog('Couldn\'t find any products with that barcode. Try searching by the item\'s title.');
  	}
  },
  bookSuccess: function(inSender,inResponse,inRequest){
  	this.$.addItemSearch.setActive(false);
  	//enyo.keyboard.setManualMode(true);
  	//enyo.keyboard.hide();
  	window.setTimeout(enyo.bind(this,function(){this.$.addItemInput.forceBlur();}),500);

	this.log("got books");
	
	var j=inResponse;
	this.log(j);
	var items=j.docs;
	var itemsCount=items.length;
	for(var i=0;i<itemsCount;i++){
		if(!items[i].isbn){
			items[i].isbn=[{}];
		}
		for(var j=0,isbnCount=items[i].isbn.length;j<isbnCount;j++){
			var isbn=items[i].isbn[j];
			var key=(items[i].key)? items[i].key: isbn;
			var year=(items[i].first_publish_year)? items[i].first_publish_year: "";
			var image=(items[i].isbn)? "http://covers.openlibrary.org/b/isbn/"+isbn+"-M.jpg": "http://covers.openlibrary.org/b/id/"+items[i].cover_i+"-M.jpg";
			var fullImage=(items[i].isbn)? "http://covers.openlibrary.org/b/isbn/"+isbn+"-M.jpg": "http://covers.openlibrary.org/b/id/"+items[i].cover_i+"-M.jpg";
			var author=(items[i].author_name)? items[i].author_name[0]: "";
			var publisher=(items[i].publisher)? items[i].publisher[0]: "";
			var itm={
				asin: key,
				isbn: isbn,
				upc: "",
				title: items[i].title,
				year: year,
				image: image,
				fullImage: fullImage,
				director: "",
				binding: "Books",
				author: author,
				artist: "",
				publisher: publisher,
				platform: "",
				price: "",
				provider: "openlibrary"
			};
			
			this.searchResults.push(itm);
		}
	}
	  
  	if(this.doingSearch){
	  	this.$.resultsList.punt();
	  	this.openDialog({dialog:"resultsDialog"});
  		this.$.awsSearchStatus.hide();
  		this.$.resultsList.show();
	  	this.doingSearch=false;
	}
	
  },
  isNumber: function(n) {
  	return !isNaN(parseFloat(n)) && isFinite(n);
  },
  fancyProvider: function(provider){
  	//converts provider string to user friendly text
  	var providers={
  		"openlibrary":"OpenLibrary.org",
  		"gamesdb":"TheGamesDB.net",
  		"bestbuy":"BestBuy Open Products",
  		"discogs":"Discogs"
  	};
  	
  	if(providers[provider]){
  		return providers[provider];
  	}else{
  		return provider;
  	}
  },
  getBrandingLogo: function(provider){
  	var logos={
  		"openlibrary":"openlib.png",
  		"gamesdb":"gamesdb.png",
  		"bestbuy":"bestbuy.gif",
  		"discogs":"discogs.png"
  	};
 
 	return logos[provider];
  },
  getBrandingLink: function(provider){
  	var logos={
  		"openlibrary":"http://openlibrary.org/developers",
  		"gamesdb":"http://thegamesdb.net/api/",
  		"bestbuy":"http://bbyopen.com/developer",
  		"discogs":"http://www.discogs.com/developers/"
  	};
 
 	return logos[provider];
  },
  resetSearch: function(inSender, inEvent){
  	this.$.librarySearch.setValue('');
  	window.setTimeout(enyo.bind(this,function(){this.$.librarySearch.forceBlur();}),500);
  	this.searchQuery='';
  	this.loadLibrary();
  	this.doingSearch=false;
  	this.gettingPage=false;  	
  },
  awsSearchSuccess: function(inSender,inResponse,inRequest){
  	this.$.addItemSearch.setActive(false);
  	//enyo.keyboard.setManualMode(true);
  	//enyo.keyboard.hide();
  	window.setTimeout(enyo.bind(this,function(){this.$.addItemInput.forceBlur();}),500);

  	this.log(inResponse);
  	var j=inResponse;
  	
  	var items=j.result.results.items;
  	var itemCount=items.length;
  	
  	if(itemCount>0){
  		this.$.awsSearchStatus.hide();
  		this.$.resultsList.show();
  		this.searchResults=items;
  	}
/*  	
  	var parser=new DOMParser();
  	var xml=parser.parseFromString(inResponse,"text/xml");
  	
  	var items=xml.getElementsByTagName("Item");
  	//this.log("found "+items.length+" items");
  	

  	var itemCount=items.length;
  	if(itemCount>0){
  		this.$.awsSearchStatus.hide();
  		this.$.resultsList.show();
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
  	
  	}else if(!this.gettingPage){ //no results
  		this.$.awsSearchStatus.setContent("Sorry! No items match that query.");
  		this.$.awsSearchStatus.show();
  		this.$.resultsList.hide();
  		
  	}*/
  	
  	//this.log(this.searchResults);
  	
  	if(this.doingSearch){
	  	this.$.resultsList.punt();
	  	this.openDialog({dialog:"resultsDialog"});
	  	this.doingSearch=false;
	}

  },
  setupResults: function(inSender){
  },
  getPage: function(inSender,inPage){
  /*
  	var index=inPage*inSender.pageSize;
  	if(!this.searchResults[index]){
  		this.gettingPage=true;
	  	var url=this.apiUrl+"?Service=AWSECommerceService&Operation=ItemSearch&AssociateTag=frobba-20&ResponseGroup=Medium";
	  	url+="&SearchIndex="+this.searchType;
	  	var kw=this.$.addItemInput.getValue().replace(/\-/g,"");
	  	url+="&Keywords="+encodeURIComponent(kw);
	  	url+="&ItemPage="+inPage;
	  	//this.log(url);
	  	
	  	var signedUrl=invokeRequest(url);
	  	//this.log("signed=",signedUrl);
	
	  	this.doingSearch=false;
	  	
	  	this.$.awsSearch.setUrl(signedUrl);
	  	this.$.awsSearch.call();  
	}*/
  },
  getResult: function(inSender,inIndex){
  	//this.log(inIndex);
  	var row=this.searchResults[inIndex];
  	
  	if(row){
	  	this.$.resultsItemImage.setSrc(row.image);
  		this.$.resultsItemName.setContent(row.title);
  		
  		//this.log(row);
  	
  		if(row.year){
  			if(row.year.indexOf){
	  			if(row.year.indexOf("-")>-1){
				  	var d=row.year.split("-");
  					var y=d[0];
  				}else{
  					var y=row.year;
  				}
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
  		
  		if(row.isbn){
  			extra.push("ISBN: "+(row.isbn)+"");
  		}
  		if(row.provider){
  			extra.push("from "+this.fancyProvider(row.provider)+"");
  		}
  		
  		//this.log(extra);
  		var e=extra.join(" &#149; ");
  		//this.log(e);
  		
	  	this.$.resultsItemExtra.setContent(e);
	  	return true;
	}else{
		return false;
	}
	
  },
  getCreator: function(item){
  		var creator=item.publisher;
  		if(!item.type){
  			item.type=this.searchType;
  		}
  		switch(item.type){
  			case "DVD":
  				if(item.director){creator=item.director;}
  				break;
  			case "Books":
  				if(item.author){creator=item.author;}
  				break;
  			case "Music":
  				if(item.artist){creator=item.artist;}
  				break;
  			case "VideoGames":
  				if(item.publisher){creator=item.publisher;}
  				break;
  		}  
  		
  		return creator;
  },
  resultItemSelect: function(inSender, inEvent){
  //	'INSERT INTO groupitems (groupid,accountid) VALUES ("'+guid+'","'+accountid+'")';
  	this.log("~~~~~~~~~~~~~adding to db");
  	var row=this.searchResults[inEvent.rowIndex];
  	this.rowData=row;
  	
  	
  	
  	//this.log(row);
  	
  	//first, see if this is already in the library
  	var inLibrary=false;
  	var count=this.data.length;
  	for(var i=0;i<count;i++){
  		//this.log(this.data[i]);
		if((row.upc==this.data[i].upc && (row.upc!="" && this.data[i].upc!="" && row.upc!=undefined && this.data[i].upc!=undefined)) || row.asin==this.data[i].asin){
			//this.log("same upc or asin");
			inLibrary=true;
			break;
		}else{
	  		if(row.title==this.data[i].title && this.searchType==this.data[i].type){
	  			//this.log("same title and same type");
	  			inLibrary=true;
				var creator1=this.getCreator(row);
				var creator2=this.getCreator(this.data[i]);
				//this.log("1="+creator1);
				//this.log("2="+creator2);
				if(creator1!=creator2){
					inLibrary=false;
				}else{
		  			break;
		  		}
	  		}
	  	}
	  	//this.log("the items:");
	  	//this.log(row);
	  	//this.log(this.data[i]);
  	}
  	
  	if(!inLibrary){
		this.saveItem();
	}else{
		this.showConfirmDialog("This item appears to already be in your library. Do you want to add it anyway?","saveItem");
	
	}	
	
  },
  aiSaveItem: function(inSender, inEvent){
  	//manually add an item
  	//first, upload the image
  	this.log("going to save...");
  	inSender.setActive(true);
  	
  	switch(this.addDialogMode){
  		case "edit":
  			if(this.uploadFile==''){ //no new image to upload
				//this.newItemImage=url;

				//time to save the item
				//build up a fake rowData item
				var binding='';
				switch(this.searchType){
					case "DVD":
						binding=this.$.aiMovieBinding.getValue();
						break;
					case "Music":
						binding=this.$.aiMusicBinding.getValue();
						break;
					case "Books":
						binding=this.$.aiBookBinding.getValue();
						break;
					case "VideoGames":
						binding="VideoGame";
						break;
				}
				
				var platform=(this.searchType!="VideoGames")? "": this.$.aiPlatform.getValue();
				this.rowData={
					title: this.$.aiTitle.getValue(),
					artist: this.$.aiArtist.getValue(),
					author: this.$.aiAuthor.getValue(),
					director: this.$.aiDirector.getValue(),
					publisher: this.$.aiPublisher.getValue(),
					platform: platform,
					year: this.$.aiYear.getValue(),
					upc: this.$.aiUPC.getValue(),
					isbn: this.$.aiISBN.getValue(),
					price: this.$.aiPrice.getValue(),
					extra: this.$.aiComment.getValue(),
					image: this.newItemImage,
					binding: binding
				};
				this.updateItem();
  				
  			}else{ //gotta upload a new image
  				//build filename
  				var fn=this.userId+"-"+this.editItem.asin;
  				
			  	switch(this.platform){
			  		case "webos":
			  			this.log("uploading in webos...");
					    this.$.downloadManager.call(
					       {
					          fileName: this.uploadFile,
					          url: 'http://woodenro.ws/api.php',
					          fileLabel: "upload",
					          postParameters: [
							          	{key: "method",data:"image.upload",contentType:"text/plain"},		          
							          	{key: "asin",data:fn,contentType:"text/plain"},		          
					          ]
					       }
					    );								
			  			break;
			  		default:
			  			this.log("no matching platform actions");
			  			break;
			  	}

  			}
  			break;
  		case "add":
		  	//fetch a new ASIN
			this.$.woodenrowsAPI.setMethod("GET");
			this.$.woodenrowsAPI.call({method:"library.getASIN"});
			break;
  		case "addfill":
  			if(this.uploadFile==''){ //no new image to upload
				//this.newItemImage=url;

				//time to save the item
				//build up a fake rowData item
				var binding='';
				switch(this.searchType){
					case "DVD":
						binding=this.$.aiMovieBinding.getValue();
						break;
					case "Music":
						binding=this.$.aiMusicBinding.getValue();
						break;
					case "Books":
						binding=this.$.aiBookBinding.getValue();
						break;
					case "VideoGames":
						binding="VideoGame";
						break;
				}
				
				var platform=(this.searchType!="VideoGames")? "": this.$.aiPlatform.getValue();
				this.rowData={
					title: this.$.aiTitle.getValue(),
					artist: this.$.aiArtist.getValue(),
					author: this.$.aiAuthor.getValue(),
					director: this.$.aiDirector.getValue(),
					publisher: this.$.aiPublisher.getValue(),
					platform: platform,
					year: this.$.aiYear.getValue(),
					upc: this.$.aiUPC.getValue(),
					isbn: this.$.aiISBN.getValue(),
					price: this.$.aiPrice.getValue(),
					extra: this.$.aiComment.getValue(),
					image: this.newItemImage,
					binding: binding
				};
  				
  			}else{ //gotta upload a new image
  			
  			}
		  	//fetch a new ASIN
			this.$.woodenrowsAPI.setMethod("GET");
			this.$.woodenrowsAPI.call({method:"library.getASIN"});
  			break;
  	}
	
  	
  },
  onUploadSuccess:function(inSender,inResponse,inRequest){
  		this.log("upload ok");
//		this.log(inResponse.responseString);
 enyo.log("Upload success, results=" + enyo.json.stringify(inResponse));

		if(inResponse.completed){
			var j=enyo.json.parse(inResponse.responseString);
			if(j.result!=undefined){
				var url=j.result.url;
				
				this.newItemImage=url;

				//time to save the item
				//build up a fake rowData item
				var binding='';
				switch(this.searchType){
					case "DVD":
						binding=this.$.aiMovieBinding.getValue();
						break;
					case "Music":
						binding=this.$.aiMusicBinding.getValue();
						break;
					case "Books":
						binding=this.$.aiBookBinding.getValue();
						break;
					case "VideoGames":
						binding="VideoGame";
						break;
				}
				
				var platform=(this.searchType!="VideoGames")? "": this.$.aiPlatform.getValue();
				var asin=(this.addDialogMode=="add")? this.newasin: this.editItem.asin;
				var isnew=(this.addDialogMode=="add")? true: false;
				this.rowData={
					title: this.$.aiTitle.getValue(),
					artist: this.$.aiArtist.getValue(),
					author: this.$.aiAuthor.getValue(),
					director: this.$.aiDirector.getValue(),
					publisher: this.$.aiPublisher.getValue(),
					platform: platform,
					year: this.$.aiYear.getValue(),
					upc: this.$.aiUPC.getValue(),
					isbn: this.$.aiISBN.getValue(),
					price: this.$.aiPrice.getValue(),
					extra: this.$.aiComment.getValue(),
					image: this.newItemImage,
					provider: "woodenrows",
					binding: binding,
					asin: asin,
					isnew:isnew
				};
				
				if(this.addDialogMode=="add"){
					this.saveItem();
				}else{
					this.updateItem();
				}
		
				//image upload okay. let's fetch an ASIN for the item
			}else{
				//console.log("no url");
				this.newItemImage='';
				//this.onUploadFailure(inSender,inResponse,inRequest);
			}
		}  	
  },
  onUploadFailure:function(inSender,inResponse,inRequest){
  	this.log("upload failed");
 enyo.log("Upload failed, results=" + enyo.json.stringify(inResponse));  	
  	this.log(inResponse.responseString);
  },
  onUploadResponse:function(inSender,inResponse,inRequest){
  	this.log("upload response");
 enyo.log("Upload response, results=" + enyo.json.stringify(inResponse));  	
  	this.log(inResponse.responseString);
  },
  saveItem: function(){
  		row=this.rowData;
  		this.log(row);
	  	var artist=this.sqlEscape(row.artist);
	  	var asin=row.asin;
	  	var isbn=row.isbn;
	  	this.log("isbn="+isbn);
	  	var provider=row.provider;
	  	this.log("provider="+provider);
	  	var author=this.sqlEscape(row.author);
	  	var binding=this.sqlEscape(row.binding);
	  	var director=this.sqlEscape(row.director);
	  	var image=(row.fullImage)? this.sqlEscape(row.fullImage): this.sqlEscape(row.image);
	  	var platform=this.sqlEscape(row.platform);
	  	var price=this.sqlEscape(row.price);
	  	var publisher=this.sqlEscape(row.publisher);
	  	var title=this.sqlEscape(row.title);
	  	var upc=this.sqlEscape(row.upc);
	  	var year=row.year;
	  	var type=this.searchType;
	  	var isnew=row.isnew || "";
	  	
	  	//create title to sort by
	  	var title_sort=row.title;
	  	if(title.toLowerCase().substr(0,4)=="the "){
	  		title_sort=title.substr(4);
	  	}else if(title.toLowerCase().substr(0,2)=="a "){
	  		title_sort=title.substr(2);
	  	}else if(title.toLowerCase().substr(0,3)=="an "){
	  		title_sort=title.substr(3);
	  	}
	  	
	  	this.addedItemASIN=asin;
		this.$.addItemInput.setValue('');
	  	enyo.keyboard.setManualMode(false);

		
		if(this.$.resultsStayOpen.getChecked()){
		
		}else{
			enyo.windows.addBannerMessage("Item added to your library!","{}");
		  	this.closeDialog({dialog:"resultsDialog"});
		}
	
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
				image: image,
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
				title_sort: title_sort,
				isbn: isbn,
				provider: provider,
				isnew:isnew
			};
			//this.log(data);
			this.$.woodenrowsAPI.setMethod("POST");
			this.$.woodenrowsAPI.call(data);
		}
		
	  	
	  	var sql='INSERT INTO library (artist,asin,author,binding,director,image,platform,price,publisher,title,upc,year,extra,type,title_sort,shelves,isbn,provider) VALUES ("'+artist+'", "'+asin+'", "'+author+'", "'+binding+'", "'+director+'", "'+image+'", "'+platform+'", "'+price+'", "'+publisher+'", "'+title+'", "'+upc+'", "'+year+'","","'+type+'","'+title_sort+'","","'+isbn+'","'+provider+'")';
	  	
	  	this.log(sql);
		this.$.emptyLibrary.hide();
	  	
		this.db.transaction( 
		    enyo.bind(this,(function (transaction) { 
		    	this.errorfrom="save item";
	        	transaction.executeSql(sql, [], enyo.bind(this,this.createRecordDataHandler), enyo.bind(this,this.errorHandler,"save item")); 
	    	})) 
		);  
		
		
		//facebook stuff
		var cookie=this.getSetting("fbActivity");

		if(cookie=="1"){
			//this.log("posting to fb");
			var itemUrl=encodeURIComponent("http://woodenro.ws/item/"+this.userId+"-"+asin);
			var kind=this.typeToOGType(type);
			var url="https://graph.facebook.com/me/zhephree-rows:add?access_token="+this.shares.facebook.token;
			this.$.facebookPost.setUrl(url);
			//console.log(url);
			//var msg=this.$.publisherInput.getValue();
			
			var data={};
			data[kind]=itemUrl;
			data["scrape"]="true";
			
			//this.log(data);
			
			this.$.facebookPost.call(data);
		
		}else{
			//this.log("not posting to fb");
		}
  },
  updateItem: function(asin){
  		var ci=this.editItem;
  		var mi=this.rowData;
 		//create a base model of a full item to apply empty fields where needed
 		var itmmodel={
 			asin:'',
 			isbn:'',
 			upc:'',
 			title:'',
 			year:'',
 			image:'',
 			director:'',
 			author:'',
 			artist:'',
 			publisher:'',
 			platform:'',
 			price:'',
 			provider:''
 		};
 		//loop through and delete any properties we already have, filling in some blanks from the current item
 		for(var k in itmmodel){
			if(ci[k]){
				//item already has this property
			}else{
				//item does not have this property
					//existing item doesn't have this data
					ci[k]=itmmodel[k];
			}
			if(mi[k]){
				//item already has this property
			}else{
				//item does not have this property
					//existing item doesn't have this data
					mi[k]=itmmodel[k];
			}
 		}
  		
		var itm={};
		if(this.addDialogMode=="addfill"){
			itm.asin=asin;
			itm.provider="woodenrows";
		}else{
			itm.asin=mi.asin || ci.asin;	
			itm.provider=mi.provider;
		}
		if(ci.isbn!=mi.isbn && mi.isbn) itm.isbn=mi.isbn;
		if(ci.upc!=mi.upc && mi.upc) itm.upc=mi.upc;
		if(ci.title!=mi.title && mi.title) itm.title=mi.title;
		if(ci.year!=mi.year && mi.year) itm.year=mi.year;
		if(ci.image!=mi.image && mi.image) itm.image=mi.image;
		if(ci.director!=mi.director && mi.director) itm.director=mi.director;
		if(ci.author!=mi.author && mi.author) itm.author=mi.author;
		if(ci.artist!=mi.artist && mi.artist) itm.artist=mi.artist;
		if(ci.publisher!=mi.publisher && mi.publisher) itm.publisher=mi.publisher;
		if(ci.platform!=mi.platform && mi.platform) itm.platform=mi.platform;
		if(ci.price!=mi.price && mi.price) itm.price=mi.price;
		
 		
 		itm.token= this.userToken;
 		itm.method= 'library.editItem';
 		itm.owner= this.userId;
 		itm.oldasin= this.editItem.asin;
 		this.isEditing=true;
 		this.log(itm);
 		
 		this.$.woodenrowsAPI.setMethod("POST");
 		this.$.woodenrowsAPI.call(itm);
 		
 		//TODO: allow manual add/edit
 		
 		//update local database
 		//var itmpre=enyo.mixin(itm,ci); //fill in existing properties from the current item
 		
 		//this.log(itmpre);
 		
 		//loop through and delete any properties we already have, filling in some blanks from the current item
 		for(var k in itmmodel){
			if(itm[k]){
				//item already has this property
			}else{
				//item does not have this property
				if(ci[k]){
					//existing item has this data
					itm[k]=ci[k];
				}else{
					//existing item doesn't have this data
					itm[k]=itmmodel[k];
				}
			}
 		}
 		//var newitm=enyo.mixin(itmpre,itmmodel); //only filling in for missing values

	  	var sqlpre='UPDATE library SET asin="{$asin}", isbn="{$isbn}", upc="{$upc}", title="{$title}", year="{$year}", image="{$image}", director="{$director}", author="{$author}", artist="{$artist}", publisher="{$publisher}", platform="{$platform}", price="{$price}", provider="{$provider}" WHERE asin="{$oldasin}"';
	  	var sql=enyo.macroize(sqlpre,itm);
	  	
	  	this.log(sql);
	  	
		this.db.transaction( 
		    enyo.bind(this,(function (transaction) { 
		    	this.errorfrom="save item";
	        	transaction.executeSql(sql, [], enyo.bind(this,this.createRecordDataHandler), enyo.bind(this,this.errorHandler,"save item")); 
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
  				this.dialog="facebookDialog";
  			}else{
  				ok=false;
  				this.showConfirmDialog("You do not currently have your Facebook account linked to Wooden Rows. Would you like to visit the Wooden Rows website and do this now?","linkNetwork");
  			}
  			break;
  		case "email":
  			this.dialog="email";
  			break;
  		case "clipboard":
  			this.dialog="clipboard";
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
	switch(this.dialog){
		case "clipboard":
			switch(this.platform){
				case "webos":
					enyo.dom.setClipboard(this.shareURL);
					enyo.windows.addBannerMessage("URL Copied to Clipboard","{}");  
					break;
				case "android":
					window.plugins.clipboardManager.copy(
					    this.shareURL,
					    function(r){alert("URL Copied to Clipboard")},
					    function(e){alert(e)}
					);					
			}
			break;
		case "email":
			this.goToLink({target:{href:"mailto:?body="+encodeURIComponent("Check out "+this.currentItem.title.replace(/\\'/g,"'")+" in my library on Wooden Rows! "+this.shareURL)}});
			break;
		default:
		    this.openDialog({dialog:this.dialog});
    		break;
	}

  },
  linkNetwork: function(){
  	if(this.fbfailed){
  		var query="?reauthfb=true";
  		this.fbfailed=false;
  	}else{
  		var query='';
  	}
  	window.open("http://woodenro.ws/login.php?token="+this.userToken+"&continue="+encodeURIComponent("/sharing.php"+query));
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
  facebookOpened: function(inSender,inEvent){
  	this.$.facebookShare.setValue('');
  },
  facebookChanged: function(inSender,inEvent){
  
  },
  shareFacebook: function(inSender,inEvent){
	var url="https://graph.facebook.com/"+this.shares.facebook.uid+"/feed?access_token="+this.shares.facebook.token;
	this.$.facebookPost.setUrl(url);
	//console.log(url);
	//var msg=this.$.publisherInput.getValue();
	
	this.$.facebookPost.call({
		message: (enyo.string.trim(this.$.facebookShare.getValue())),
		link: this.shareURL
	});
  	
  },
  facebookSuccess: function(inSender,inResponse,inRequest){
  	//this.log("facebook success");
  	//this.log(inResponse);
  	this.closeDialog({dialog:"facebookDialog"});
	enyo.windows.addBannerMessage("Item shared on Facebook!","{}");  
	this.fbfailed=false;	  
  },
  facebookFailure: function(inSender,inResponse,inRequest){
  	var j=(inResponse);
  	if(j.error){
  		if(j.error.type=="OAuthException"){
  			this.fbfailed=true;
  			//the token expired. ask facebook to revitalize it
  			this.showConfirmDialog("Your Facebook authorization has expired. You will need to reauthorize Wooden Rows to work with Facebook. Would you like to visit the Wooden Rows website and do this now?","linkNetwork");
  			
  		}
  	}
  },
  twitterOpened: function(inSender,inEvent){
  		var base="Check out "+this.currentItem.title.replace(/\\'/g,"'")+" in my library! "+this.shareURL;
  		if(base.length>140){
  			base=base.replace("in my library! ","");
  		}
  		
  		if(base.length>140){
  			base=base.replace("Check out ","");
  		}
  		
  		if(base.length>140){
  			base="Check out this "+this.typeToSingular(this.currentItem.type)+" in my Wooden Rows library! "+this.shareURL;
  		}
  		
  		this.$.twitterShare.setValue('');
  		this.tweet=base;
  		this.$.tweetPreview.setContent(base);
	  	this.$.tweetCounter.setContent(140-this.tweet.length);

  },
  tweetChanged: function(inSender,inEvent){
  	var text=inSender.getValue();
  	if(!text){
  		var base="Check out "+this.currentItem.title.replace(/\\'/g,"'")+" in my library! "+this.shareURL;
  		if(base.length>140){
  			base=base.replace("in my library! ","");
  		}
  		
  		if(base.length>140){
  			base=base.replace("Check out ","");
  		}
  		
  		if(base.length>140){
  			base="Check out this "+this.typeToSingular(this.currentItem.type)+" in my Wooden Rows library! "+this.shareURL;
  		}
  		
  		this.tweet=base;
  	}else{
  		var tweet=text+" | "+this.currentItem.title.replace(/\\'/g,"'")+" "+this.shareURL;
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
	
	//this.log(oauth);
	
	oauth.setAccessToken([this.shares.twitter.token,this.shares.twitter.secret]);  
	var tweetData={status: this.tweet};
	this.errorfrom="twitterfail";
	oauth.request({
		method: "POST",
		url: "http://api.twitter.com/1/statuses/update.json",
		data: tweetData,
		success: enyo.bind(this,"twitterSuccess"),
		failure: enyo.bind(this,"errorHandler","twitter fail")
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
  	this.isSorting=true;
  	this.saveSetting("sort",this.sortBy);
  	
  	var cap=this.sortBy.charAt(0).toUpperCase() + this.sortBy.slice(1)
  	//this.log(cap);
  	if(cap.substr(cap.length-1)=="D"){
  		cap=cap.substr(0,cap.length-1);
  		//cap=cap+"▼";
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
  	//this.log(inSender.by);
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
  	//this.log(str);
  	if(str!=undefined && str!="" && !this.isNumber(str)){
	  	return str.replace(/\&nbsp\;/g," ").replace(/\"/g,'&quot;');
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
  	if(inSender.dialog=="addItemDialog"){
  			this.addDialogMode="add";
  			this.$.emptyLibrary.hide();
  	}
  	
  	if(inSender.dialog=="manualAddDialog"){
		switch(this.searchType){
			case "Books":
				this.$.aiArtistRow.hide();
				this.$.aiAuthorRow.show();
				this.$.aiDirectorRow.hide();
				this.$.aiPublisherRow.show();
				this.$.aiPlatformRow.hide();
				this.$.aiISBNRow.show();
				this.$.aiMusicBindingRow.hide();
				this.$.aiMovieBindingRow.hide();
				this.$.aiBookBindingRow.show();
				break;
			case "Music":
				this.$.aiArtistRow.show();
				this.$.aiAuthorRow.hide();
				this.$.aiDirectorRow.hide();
				this.$.aiPublisherRow.show();
				this.$.aiPlatformRow.hide();
				this.$.aiISBNRow.hide();
				this.$.aiMusicBindingRow.show();
				this.$.aiMovieBindingRow.hide();
				this.$.aiBookBindingRow.hide();
				break;
			case "VideoGames":
				this.$.aiArtistRow.hide();
				this.$.aiAuthorRow.hide();
				this.$.aiDirectorRow.hide();
				this.$.aiPublisherRow.show();
				this.$.aiPlatformRow.show();
				this.$.aiISBNRow.hide();
				this.$.aiMusicBindingRow.hide();
				this.$.aiMovieBindingRow.hide();
				this.$.aiBookBindingRow.hide();
				break;
			case "DVD":
				this.$.aiArtistRow.hide();
				this.$.aiAuthorRow.hide();
				this.$.aiDirectorRow.show();
				this.$.aiPublisherRow.show();
				this.$.aiPlatformRow.hide();
				this.$.aiISBNRow.hide();
				this.$.aiMusicBindingRow.hide();
				this.$.aiMovieBindingRow.show();
				this.$.aiBookBindingRow.hide();
				break;
		}
  	}
  	
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