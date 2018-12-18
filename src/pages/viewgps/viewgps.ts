import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform} from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Diagnostic } from '@ionic-native/diagnostic';
import { LocationAccuracy } from '@ionic-native/location-accuracy';

import {

  GoogleMap,
  Marker
} from '@ionic-native/google-maps';
import { AngularFireDatabase } from '@angular/fire/database';
/**
 * Generated class for the ViewgpsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-viewgps',
  templateUrl: 'viewgps.html',
})
export class ViewgpsPage {

  lat;
  lng;
  title;
 
  gpsmap : GoogleMap;

  constructor(public navCtrl: NavController, public navParams: NavParams,public platform : Platform,
    public db : AngularFireDatabase,public gps : Geolocation,
    private diagnostic: Diagnostic,private locationAccuracy: LocationAccuracy) {

      this.diagnostic.isLocationEnabled().then(res => {
        if(!res){
         this.locationAccuracy.canRequest().then((canRequest: boolean) => {
   
           if(canRequest) {
             // the accuracy option will be ignored by iOS
             this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
               () => console.log('Request successful'),
               error => console.log('Error requesting location permissions', error)
             );
           }
         
         });
        }
      })

      this.lat = navParams.get("lat");
      this.lng = navParams.get("lng");
      this.title = navParams.get("title");


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    this.loadmap();
  }

  
  
  loadmap(){

  
    var map = this.gpsmap = new GoogleMap("gpsmap",{
          camera: {
            target: {
              lat: this.lat,
              lng:this.lng
            },
            zoom: 14,
            tilt: 30
          },
          controls: {
           zoom:true,
           myLocationButton:true,
           myLocation:true,
          },
          gestures : {
            scroll:true,
            tilt:true,
            zoom:true,
            rotate:true
          }

        });


  
            map.addMarker({
          title: this.title,
          icon: "yellow",
          animation: 'DROP',
          position: {
            lat: this.lat,
            lng: this.lng
          }
          }).then((marker: Marker) => {
    
          }).catch(err => {
            alert(err.message);
          });
  
  
  



      
      

  }


}
