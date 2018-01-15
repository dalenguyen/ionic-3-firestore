import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';


@IonicPage({
	name: "manage-document"
})
@Component({
  selector: 'page-manage-document',
  templateUrl: 'manage-document.html',
})
export class ManageDocumentPage {



   /**
    * @name form
    * @type {object}
    * @public
    * @description     Defines an object for handling form validation
    */
   public form          : any;



   /**
    * @name records
    * @type {object}
    * @public
    * @description     Defines an object for returning documents from Cloud Firestore database
    */
   public records       : any;



   /**
    * @name city
    * @type {string}
    * @public
    * @description     Model for city form field
    */
   public city          : string          = '';



   /**
    * @name population
    * @type {string}
    * @public
    * @description     Model for population form field
    */
   public population    : string          = '';



   /**
    * @name established
    * @type {string}
    * @public
    * @description     Model for established form field
    */
   public established 	: string          = '';



   /**
    * @name docID
    * @type {string}
    * @public
    * @description     property that stores an edited document's ID
    */
   public docID         : string          = '';



   /**
    * @name isEditable
    * @type {boolean}
    * @public
    * @description     property that stores value to signify whether
                       we are editing an existing document or not
    */
   public isEditable    : boolean         = false;



   /**
    * @name title
    * @type {string}
    * @public
    * @description     property that defines the template title value
    */
   public title 		: string		   = 'Add a new document';



   /**
    * @name _COLL
    * @type {string}
    * @private
    * @description     property that stores the value for the database collection
    */
   private _COLL 		: string 			= "Britain";


   constructor(public navCtrl        : NavController,
               public params         : NavParams,
               private _FB 	         : FormBuilder,
               private _DB           : DatabaseProvider,
               private _ALERT        : AlertController)
   {

      // Use Formbuilder API to create a FormGroup object
      // that will be used to programmatically control the
      // form / form fields in the component template
      this.form 		= _FB.group({
         'city' 		        : ['', Validators.required],
         'population' 	        : ['', Validators.required],
         'established'	        : ['', Validators.required]
      });


      // If we have navigation parameters then we need to
      // parse these as we know these will be used for
      // editing an existing record
      if(params.get('isEdited'))
      {
          let record 		        = params.get('record');

          this.city	            = record.location.city;
          this.population   	  = record.location.population;
          this.established      = record.location.established;
          this.docID            = record.location.id;
          this.isEditable       = true;
          this.title            = 'Update this document';
      }
   }



   /**
    * Saves form data as newly added/edited record within Firebase Realtime
    * database and handles uploading of media asset to Firebase Storage
    *
    * @public
    * @method saveDocument
    * @param  val          {any}              Form data
    * @return {none}
    */
   saveDocument(val : any) : void
   {
      let city	            : string		= this.form.controls["city"].value,
	 	      population        : string 		= this.form.controls["population"].value,
  		    established       : string		= this.form.controls["established"].value;


      // If we are editing an existing record then handle this scenario
      if(this.isEditable)
      {

         // Call the DatabaseProvider service and pass/format the data for use
         // with the updateDocument method
         this._DB.updateDocument(this._COLL,
                               this.docID,
                               {
	                               city    		 : city,
	                               population    : population,
	                               established   : established
	                           })
         .then((data) =>
         {
            this.clearForm();
            this.displayAlert('Success', 'The document ' +  city + ' was successfully updated');
         })
         .catch((error) =>
         {
            this.displayAlert('Updating document failed', error.message);
         });
      }

      // Otherwise we are adding a new record
      else
      {

         // Call the DatabaseProvider service and pass/format the data for use
         // with the addDocument method
         this._DB.addDocument(this._COLL,
                            {
	                           city    		 : city,
	                           population    : population,
	                           established   : established
	                        })
         .then((data) =>
         {
            this.clearForm();
            this.displayAlert('Record added', 'The document ' +  city + ' was successfully added');
         })
         .catch((error) =>
         {
            this.displayAlert('Adding document failed', error.message);
         });
      }
   }



   /**
    * Provide feedback to user after an operation has succeeded/failed
    *
    * @public
    * @method displayAlert
    * @param  title          {String}           Heading for alert message
    * @param  message        {String}           Content for alert message
    * @return {none}
    */
   displayAlert(title      : string,
                message    : string) : void
   {
      let alert : any     = this._ALERT.create({
         title      : title,
         subTitle   : message,
         buttons    : ['Got it!']
      });
      alert.present();
   }



   /**
    * Clear all form data
    *
    * @public
    * @method clearForm
    * @return {none}
    */
   clearForm() : void
   {
      this.city  					= '';
      this.population				= '';
      this.established 				= '';
   }


}
