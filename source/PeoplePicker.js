//*****************************
//**  Contact Record Fields  **
//*****************************
/*
	id: A globally unique identifier. (String)
	displayName: The name of this Contact, suitable for display to end-users. (String)
	name: An object containing all components of a persons name.
		formatted: The complete name of the contact. (String)
		familyName: The contacts family name. (String)
		givenName: The contacts given name. (String)
		middleName: The contacts middle name. (String)
		honorificPrefix: The contacts prefix (example Mr. or Dr.) (String)
		honorificSuffix: The contacts suffix (example Esq.). (String)
	nickname: A casual name to address the contact by. (String)
	phoneNumbers: An array of all the contact's phone numbers. (Object Array)
		type: A string that tells you what type of field this is (example: 'home'). (String)
		value: The value of the field (such as a phone number or email address). (String)
		pref: Set to true if this ContactField contains the user's preferred value. (Boolean)
	emails: An array of all the contact's email addresses. (Object Array)
		type: A string that tells you what type of field this is (example: 'home'). (String)
		value: The value of the field (such as a phone number or email address). (String)
		pref: Set to true if this ContactField contains the user's preferred value. (Boolean)
	addresses: An array of all the contact's addresses. (Object Array)
		pref: Set to true if this ContactAddress contains the user's preferred value. (Boolean)
		type: A string that tells you what type of field this is (example: 'home'). (String)
		formatted: The full address formatted for display. (String)
		streetAddress: The full street address. (String)
		locality: The city or locality. (String)
		region: The state or region. (String)
		postalCode: The zip code or postal code. (String)
		country: The country name. (String)
	ims: An array of all the contact's IM addresses. (Object Array)
		type: A string that tells you what type of field this is (example: 'home'). (String)
		value: The value of the field (such as a phone number or email address). (String)
		pref: Set to true if this ContactField contains the user's preferred value. (Boolean)
	organizations: An array of all the contact's organizations. (Object Array)
		pref: Set to true if this ContactOrganization contains the user's preferred value. (Boolean)
		type: A string that tells you what type of field this is (example: 'home'). (String)
		name: The name of the organization. (String)
		department: The department the contract works for. (String)
		title: The contacts title at the organization. (String)
	birthday: The birthday of the contact. (Date)
	note: A note about the contact. (String)
	photos: An array of the contact's photos. (Object Array)
		type: A string that tells you what type of field this is (example: 'home'). (String)
		value: The value of the field (such as a phone number or email address). (String)
		pref: Set to true if this ContactField contains the user's preferred value. (Boolean)
	categories: An array of all the contacts user defined categories. (Object Array)
		type: A string that tells you what type of field this is (example: 'home'). (String)
		value: The value of the field (such as a phone number or email address). (String)
		pref: Set to true if this ContactField contains the user's preferred value. (Boolean)
	urls: An array of web pages associated to the contact. (Object Array)
		type: A string that tells you what type of field this is (example: 'home'). (String)
		value: The value of the field (such as a phone number or email address). (String)
		pref: Set to true if this ContactField contains the user's preferred value. (Boolean)
*/	

enyo.kind({
	name: "pgPeoplePicker",
	kind: "Component",
	events: {
		onComplete: ""
	},
	published: {
		ppDialogStyle: "width: 450px;",
		ppHeaderIcon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAaCAYAAADWm14/AAADcUlEQVRIx62Wy2sTURTGUwpJmoq2aWObNHSloiYq1fpYiN0oqX+BVBCFKNaNCCIpJm1azcLULLS0IIIgFLoILroIXSi40EWgWEuf0JrSl33QxBhjH7EPjudM7sSZm0fHkgs/bu6c757zZTgzc1Wqf8OA1CHXkOt5gnJdQspV3AAAAXEU6vX6qwMDAxtzc3OQL2ZnZ6Gvr29Nq9VeoRq5DGjMZvODfBYXDYyMjEBVVdV9qqHKMYpNJlNTvg0Qo6OjYDQam6hGLgP7UdQs3Tg4OAh+vx+6urqgo6Njz3i9XiguLvZjDXu2nihADqABt1h8enoaenp6YHJyEra3t2FnZycvUK7+/v41nU4n6wkyUCI1EAqFwOfzCRt4A3+G38HG+1Zh3osBorq6WtYTaQYmJibA4/HA1taWjPUPHoi3W1PQmtcoAZtS1hNpBsbHx6GtrQ02NzdlxH1n4ZcHiyPCjGteowQ04KK+SzNAjw0xNjYGbrcbEomEjLjvIsScVog1W4WZ1rxGCVSL+o7VTjdAj05LSwusr6/LWA2+hZjrJPx8ZBVmWvMaJTADJbsaWF1dTeP37DDEA8+FOVNcCYoNxONxGbGvnyD6pg1+tN8TZlrzGiUoMuByuSAWiyVZ+g5RfyeE7bUQvmGB8K2a5Ixruk7xlFYBigw4nU6IRqNJvo1BpNsLkZcPIfLKCZFOR3KmNV6neEqrgMrKSmV3IBKJyAiHwwIrKyvCzMelOtJk02UyQK/ixzMzM0CIPSAmyTeZDOzTaDQNvb29G0NDQxAMBsHhcMDy8rKM+nqbDD6eTbe0tCQgxnkDNIoQC3IbeYK8KC0t/by4uAhS+MR8PJtuYWFBQIyjgVasUSo1oEb0yGHkNHLZYDC8FjeKZEv8vzp8FT9l9VIGCtldoItG5FhFRcUz8dswPz8vMDU1Bd3d3WCz2Uboky1e56GPGensdntIul/MZ7FYvFijTGqggJlQMyMGtVp9k3oik4G6urqP2YqLkK6hoeELbyAQCCTw/GmXfgsyjVRPNDbehXyCOe8gJxBdLgPSnqhBziPnkFPIUeQQclwSuyChlhU4wnT0R84wXQ3LWaba5ZAq7YlKxIxUsd8GluAg6xczh6grZ1QgJhYzspy61JFMPJ9Lz+hcT2iZmSL2WyOhKAtSHb9fzXILt/8v3ol82/M5lNEAAAAASUVORK5CYII=",
		ppHeaderIconStyle: "padding-left: 10px; padding-top: 5px;",
		ppHeaderText: "Select A Contact",
		ppHeaderTextStyle: "font-size: x-large; padding-left: 7px; padding-top: 5px;",
		ppHeaderButton: "Close",
		ppHeaderButtonStyle: "margin-left: 112px;",
		ppFilter: "",
		ppFields_id: true,
		ppFields_displayName: true,
		ppFields_name: true,
		ppFields_nickname: true,
		ppFields_phoneNumbers: true,
		ppFields_emails: true,
		ppFields_addresses: true,
		ppFields_ims: true,
		ppFields_organizations: true,
		ppFields_birthday: true,
		ppFields_note: true,
		ppFields_photos: true,
		ppFields_categories: true,
		ppFields_urls: true,
		ppPhoto: "data:image/png;base64,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"
	},
	components: [
		{name: "peoplePickerDialog", kind: "ModalDialog", layoutKind: "VFlexLayout", style: "width: 450px;", components: [
			{kind: "HFlexBox", components: [
				{name: "ppHeaderIcon", kind: "Image", src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAaCAYAAADWm14/AAADcUlEQVRIx62Wy2sTURTGUwpJmoq2aWObNHSloiYq1fpYiN0oqX+BVBCFKNaNCCIpJm1azcLULLS0IIIgFLoILroIXSi40EWgWEuf0JrSl33QxBhjH7EPjudM7sSZm0fHkgs/bu6c757zZTgzc1Wqf8OA1CHXkOt5gnJdQspV3AAAAXEU6vX6qwMDAxtzc3OQL2ZnZ6Gvr29Nq9VeoRq5DGjMZvODfBYXDYyMjEBVVdV9qqHKMYpNJlNTvg0Qo6OjYDQam6hGLgP7UdQs3Tg4OAh+vx+6urqgo6Njz3i9XiguLvZjDXu2nihADqABt1h8enoaenp6YHJyEra3t2FnZycvUK7+/v41nU4n6wkyUCI1EAqFwOfzCRt4A3+G38HG+1Zh3osBorq6WtYTaQYmJibA4/HA1taWjPUPHoi3W1PQmtcoAZtS1hNpBsbHx6GtrQ02NzdlxH1n4ZcHiyPCjGteowQ04KK+SzNAjw0xNjYGbrcbEomEjLjvIsScVog1W4WZ1rxGCVSL+o7VTjdAj05LSwusr6/LWA2+hZjrJPx8ZBVmWvMaJTADJbsaWF1dTeP37DDEA8+FOVNcCYoNxONxGbGvnyD6pg1+tN8TZlrzGiUoMuByuSAWiyVZ+g5RfyeE7bUQvmGB8K2a5Ixruk7xlFYBigw4nU6IRqNJvo1BpNsLkZcPIfLKCZFOR3KmNV6neEqrgMrKSmV3IBKJyAiHwwIrKyvCzMelOtJk02UyQK/ixzMzM0CIPSAmyTeZDOzTaDQNvb29G0NDQxAMBsHhcMDy8rKM+nqbDD6eTbe0tCQgxnkDNIoQC3IbeYK8KC0t/by4uAhS+MR8PJtuYWFBQIyjgVasUSo1oEb0yGHkNHLZYDC8FjeKZEv8vzp8FT9l9VIGCtldoItG5FhFRcUz8dswPz8vMDU1Bd3d3WCz2Uboky1e56GPGensdntIul/MZ7FYvFijTGqggJlQMyMGtVp9k3oik4G6urqP2YqLkK6hoeELbyAQCCTw/GmXfgsyjVRPNDbehXyCOe8gJxBdLgPSnqhBziPnkFPIUeQQclwSuyChlhU4wnT0R84wXQ3LWaba5ZAq7YlKxIxUsd8GluAg6xczh6grZ1QgJhYzspy61JFMPJ9Lz+hcT2iZmSL2WyOhKAtSHb9fzXILt/8v3ol82/M5lNEAAAAASUVORK5CYII=", style: "padding-left: 10px; padding-top: 5px;"},
				{name: "ppHeaderText", content: "Select A Contact", style: "font-size: x-large; padding-left: 7px; padding-top: 5px;"},
				{name: "ppCloseBtn", kind: "Button", caption: "Close", style: "margin-left: 112px;", onclick: "closePeoplePicker"},
			]},
			{kind: "HFlexBox", components: [
	//			{kind: "Scroller", horizontal: false, vertical:true, style: "height: 500px;", components: [
					{name: "peoplePicker", kind: "peoplePickerList"}
		//		]}
			]}
		]}
	],
	create: function() {
	
		this.inherited(arguments);
		
		//build ppFields Object
		this.ppFields = {};
		
		this.ppFields.id = this.ppFields_id;
		this.ppFields.displayName = this.ppFields_displayName;
		this.ppFields.name = this.ppFields_name;
		this.ppFields.nickname = this.ppFields_nickname;
		this.ppFields.phoneNumbers = this.ppFields_phoneNumbers;
		this.ppFields.emails = this.ppFields_emails;
		this.ppFields.addresses = this.ppFields_addresses;
		this.ppFields.ims = this.ppFields_ims;
		this.ppFields.organizations = this.ppFields_organizations;
		this.ppFields.birthday = this.ppFields_birthday;
		this.ppFields.note = this.ppFields_note;
		this.ppFields.photos = this.ppFields_photos;
		this.ppFields.categories = this.ppFields_categories;
		this.ppFields.urls = this.ppFields_urls;
		this.ppFields.ppPhoto = this.ppPhoto;
		
		//override default model dialog style
		this.$.peoplePickerDialog.setStyle(this.ppDialogStyle);
	},
		openPeoplePicker: function()
	{     
		var success = false;

		if(!this.onComplete)
		{
			console.log("pgPeoplePicker Error! : Please provide a callback so we know where to return your data.");
		}
		else
		{
			var ppOptions = new ContactFindOptions();
			ppOptions.multiple = true;
			ppOptions.filter = this.ppFilter;

			var ppFieldsKeys = [];
			var ppFieldsValues = [];

			for(var key in this.ppFields)
			{
				if (this.ppFields.hasOwnProperty(key)) 
				{
					ppFieldsKeys.push(key);
					ppFieldsValues.push(this.ppFields[key]);
				}
			}

			var fields = [];

			for(var i = 0; i < ppFieldsKeys.length; i++)
			{
				if(ppFieldsValues[i])
				{
					fields.push(ppFieldsKeys[i]);
				}
			}

			//Always need to request the name field for the list widget
			if(!this.ppFields.name)
			{
				fields.push("name");
			}

			//Always need to request the name field for the list widget
			if(!this.ppFields.photos)
			{
				fields.push("photos");
			}

			if(fields.length < 1)
			{
				console.log("pgPeoplePicker Error! : Please specify at least one field to return.");
			}
			else
			{
				//TODO: show Scrim ????
				
				navigator.contacts.find(fields, enyo.bind(this, this.peoplePickerSuccess), this.peoplePickerError, ppOptions);	
				success = true;
			}	
		}
		
		if(!success)
		{
			this.closePeoplePicker();
		}
	},
	peoplePickerSuccess:function(contacts)
	{
		this.contacts = contacts;
		this.contactsList = [];

		//build data set for the list widget
		for (var i = 0; i < contacts.length; i++) 
		{
			var ppContact = {};
			
			if(contacts[i].name)
			{					
				ppContact.name = contacts[i].name.familyName + (contacts[i].name.honorificSuffix ? (" " + contacts[i].name.honorificSuffix) : "") + ", " + (contacts[i].name.honorificPrefix ? (contacts[i].name.honorificPrefix + " ") : "") + contacts[i].name.givenName + " " + (contacts[i].name.middleName ? contacts[i].name.middleName : "");
			}

			if(contacts[i].photos)
			{
				for(var j = 0; j < contacts[i].photos.length; j++)
				{
					if(contacts[i].photos[0].type == "url")
					{
						ppContact.photo = contacts[i].photos[j].value;
						break;
					}
					else
					{
						ppContact.photo = this.ppPhoto;
					}
				} 
			}
			else
			{
				ppContact.photo = this.ppPhoto;	
			}

			this.contactsList.push(ppContact);
		}

		if(this.contactsList.length > 0)
		{
			//sort list alphabetically
			//TODO: This times out on long contact lists, rethink this
			//this.contactsList.sort(enyo.bind(this, this.sortLastNameAscending));

			//TODO: hide Scrim ???
			
			this.$.peoplePickerDialog.openAtCenter();
			
			//Set dialog dom params since they don't exist until its open
			this.$.ppCloseBtn.setStyle(this.ppHeaderButtonStyle);
			this.$.ppCloseBtn.setCaption(this.ppHeaderButton);

			this.$.ppHeaderText.setStyle(this.ppHeaderTextStyle);
			this.$.ppHeaderText.setContent(this.ppHeaderText);

			this.$.ppHeaderIcon.setStyle(this.ppHeaderIconStyle);
			this.$.ppHeaderIcon.setSrc(this.ppHeaderIcon);
			
			//go
			this.$.peoplePicker.setPpCallback(enyo.bind(this, this.peoplePickerSelection));
			this.$.peoplePicker.setParams(this.contactsList);
		}
		else
		{
			alert("Sorry no contacts found!");
		}
	},
	peoplePickerSelection: function(recordIndex)
	{
		var record = this.contacts[recordIndex];

		this.$.peoplePicker.setParams(null);
		this.$.peoplePickerDialog.close();

		//
		//Normalize contact data since different OS's support different fields
		//
		var ppContact = {};
		ppContact.name = {};
		ppContact.addresses = [];
		ppContact.organizations = [];

		if(record.id)
		{
			ppContact.id = record.id;
		}
		
		if(record.id)
		{
			ppContact.id = record.id;
		}

		//NOTE: iOS does not support displayName so if the user requested it construct it manually
		if(record.displayName || this.ppFields.displayName)
		{
			if(record.displayName)
			{
				ppContact.displayName = record.displayName;
			}
			else if(record.name)
			{
				ppContact.displayName = record.name.formatted;
			}
		}

		if(record.name)
		{
			if(record.name.givenName)
			{
				ppContact.name.givenName
			}

			if(record.name.middleName)
			{
				ppContact.name.middleName = record.name.middleName;
			}
			
			if(record.name.familyName)
			{
				ppContact.name.familyName = record.name.familyName;	
			}
			
			if(record.name.honorificPrefix)
			{
				ppContact.name.honorificPrefix = record.name.honorificPrefix;
			}

			if(record.name.honorificSuffix)
			{
				ppContact.name.honorificSuffix = record.name.honorificSuffix
			}

			ppContact.name.formatted = record.name.formatted;

			ppContact.name.formatedList = ppContact.name.familyName + (ppContact.name.honorificSuffix ? (" " + ppContact.name.honorificSuffix) : "") + ", " + (ppContact.name.honorificPrefix ? (ppContact.name.honorificPrefix + " ") : "") + ppContact.name.givenName + " " + ppContact.name.middleName;
		}

		if(record.nickname)
		{
			ppContact.nickname = record.nickname;
		}
		else if(this.ppFields.nickname) //NOTE: Android 1.x and Blackberry do not support this field. If requested on these platforms just return empty.
		{
			ppContact.nickname = "";	
		}

		if(record.phoneNumbers)
		{
			ppContact.phonenumbers = record.phoneNumbers;
		}
		
		if(record.emails)
		{
			ppContact.emails = record.emails;
		}

		if(record.addresses)
		{
			for(var aa = 0; aa < record.addresses.length; aa++)
			{
				var addy = {};

				addy.pref = record.addresses[aa].pref;
				addy.type = record.addresses[aa].type;

				if(record.addresses[aa].streetAddress) //NOTE: Android 1.x do not support this field.
				{
					addy.streetAddress = record.addresses[aa].streetAddress;
				}
				else
				{
					addy.streetAddress = "";
				}

				if(record.addresses[aa].locality) //NOTE: Android 1.x do not support this field.
				{
					addy.locality = record.addresses[aa].locality;	
				}
				else
				{
					addy.locality = "";	
				}

				if(record.addresses[aa].region)
				{
					addy.region = record.addresses[aa].region;
				}
				else
				{
					addy.region = ""; //NOTE: Android 1.x do not support this field.	
				}
				
				if(record.addresses[aa].postalCode)
				{
					addy.postalCode = record.addresses[aa].postalCode;
				}
				else
				{
					addy.postalCode = "";
				}

				if(record.addresses[aa].country)
				{
					addy.country = record.addresses[aa].country;
				}
				else
				{
					addy.country = "";
				}

				if(record.addresses[aa].formatted)
				{
					addy.formatted = record.addresses[aa].formatted;
				}
				else //NOTE: iOS does not support this field so construct it manually. No reason to limit, manual construction to iOS if not available
				{
					addy.formatted = (addy.streetAddress ? (addy.streetAddress + " "): "") + (addy.locality ? (addy.locality + " "): "") + (addy.region ? (addy.region + " "): "") + (addy.postalCode ? (addy.postalCode + " "): "") + (addy.country ? addy.country : "");
				}

				ppContact.addresses.push(addy)
			}	
		}

		if(record.ims)
		{
			ppContact.ims = record.ims;
		}

		if(record.organizations)
		{
			for(var gg = 0; gg < record.organizations.length; gg++)
			{
				var org = {};
				
				org.pref = record.organizations[gg].pref;
				
				if(record.organizations[gg].type)
				{
					org.type = record.organizations[gg].type;
				}
				else //NOTE: Android 1.x and iOS does not support this field so blank it out
				{
					org.type = "";
				}
				
				if(record.organizations[gg].name)
				{
					org.name = record.organizations[gg].name;
				}
				else //NOTE: Android 1.x and Blackberry does not support this field so blank it out
				{
					org.name = "";
				}
				
				if(record.organizations[gg].department)
				{
					org.department = record.organizations[gg].department;
				}
				else //NOTE: Blackberry does not support this field so blank it out
				{
					org.department = "";
				}
				
				if(record.organizations[gg].title)
				{
					org.title = record.organizations[gg].title;
				}
				else //NOTE: Android 1.x does not support this field so blank it out
				{
					org.title = "";
				}
				
				ppContact.organizations.push(org);
			}
		}

		if(record.birthdate)
		{
			ppContact.birthdate = record.birthdate;	
		}

		if(record.note)
		{
			ppContact.note = record.note;
		}

		if(record.photos)
		{
			ppContact.photos = record.photos;
		}

		if(record.categories) //NOTE: Android does not support this field
		{
			ppContact.categories = record.categories;
		}

		if(record.urls)
		{
			ppContact.urls = record.urls;
		}

		//We are all done here return the data to the user
		this.doComplete(ppContact);
	},
	peoplePickerError: function(contactError)
	{
		console.log("Error getting contact data or it is unavailable");
	},
	closePeoplePicker: function()
	{
		this.$.peoplePicker.setParams(null);
		this.$.peoplePickerDialog.close();
		this.doComplete(null);
	},
	sortLastNameAscending: function(thisObject,thatObject) 
	{ 
		if (thisObject.name > thatObject.name)
		{
			return 1;
		}
		else if (thisObject.name < thatObject.name)
		{
			return -1;
		}

		return 0;
	}
});

	
enyo.kind({
	name: "peoplePickerList",
	kind: enyo.VFlexBox,
	flex: 1,
	className: "home",
	published: {
		params: [],
		ppCallback: {}
	},
	components: [
		{name: "ppList", kind: "VirtualRepeater", className: "", onSetupRow: "ppListSetupRow", components: [
			{kind: "Divider"},
			{kind: "Item", className: "ppItem", tapHighlight: true, layoutKind: "HFlexLayout", onclick: "ppItemClick", components: [
				{name: "ppItemPhoto", content: "", style: "width: 32px; height: 32px;"},
				{name: "ppItemName", content: "", style: "margin-left: 7px; padding-top: 7px;"}
			]}
		]}
	],
	paramsChanged: function(params)
	{
		if(this.params === null)
		{
			this.contacts = [];
		}
		else
		{
			this.contacts = this.params;
			this.$.ppList.render();
		}
	},
	ppListSetupRow: function(inSender, inIndex) 
	{
		if(this.contacts)
		{
			var record = this.contacts[inIndex];

			if (record) 
			{
				// bind data to item controls
				this.ppSetupDivider(inIndex);
				
				this.$.ppItemName.setContent(record.name);
				
				var photoUrl = "url(" + record.photo + ")";

				this.$.ppItemPhoto.applyStyle("background-image", photoUrl);

				//If we are not using the default photo add a boarder
				if(this.contacts[inIndex].photo !== "data:image/png;base64,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") 
				{
					this.$.ppItemPhoto.applyStyle("border", "1px solid black;");
				}
			
				return true;
			}
		}
	},
	ppSetupDivider: function(inIndex) 
	{
		// use group divider at group transition, otherwise use item border for divider
		var group = this.ppGetGroupName(inIndex);

		this.$.divider.setCaption(group);
		this.$.divider.canGenerate = Boolean(group);
		this.$.item.applyStyle("border-top", Boolean(group) ? "none" : "1px solid silver;");
	},
	ppGetGroupName: function(inIndex) 
	{
		var a = "";

		// get previous record
		if(inIndex !== 0)
		{
			a = this.contacts[inIndex -1].name.charAt(0);
		}
		
		var b = this.contacts[inIndex].name.charAt(0);

		// new group if first letter of last name has changed
		return a != b ? b : null;
	},
	ppItemClick: function(inSender, inEvent)
	{
		this.ppCallback(inEvent.rowIndex);
	}
});