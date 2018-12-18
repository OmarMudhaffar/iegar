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
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  
  mymaps : GoogleMap;

  constructor(public navCtrl: NavController, public navParams: NavParams,public platform : Platform,
    public db : AngularFireDatabase,public gps : Geolocation,
    private diagnostic: Diagnostic,private locationAccuracy: LocationAccuracy) {

      platform.ready().then( ()=> {
        this.loadmap();
  
      });

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

    

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
  }

  
  
  loadmap(){

    this.gps.getCurrentPosition().then( pos => {
  
    var map = this.mymaps = new GoogleMap("mymaps",{
          camera: {
            target: {
              lat: pos.coords.latitude,
              lng: pos.coords.longitude
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

        this.db.list("house").valueChanges().subscribe(mydata => {

          mydata.forEach(data => {
  
            map.addMarker({
          title: data['title'],
          icon: "yellow",
          animation: 'DROP',
          position: {
            lat: data['lat'],
            lng: data['lng']
          }
          }).then((marker: Marker) => {
    
          }).catch(err => {
            alert(err.message);
          });
  
        });
  
      });
  



      });
      
      

  }


}
