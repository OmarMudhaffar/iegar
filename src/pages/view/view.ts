import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,ToastController } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { CallNumber } from '@ionic-native/call-number';
import { Geolocation } from '@ionic-native/geolocation';

import { Slides } from 'ionic-angular';
import { ViewgpsPage } from '../viewgps/viewgps';
import { AngularFireAuth } from '@angular/fire/auth';
/**
 * Generated class for the ViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view',
  templateUrl: 'view.html',
})
export class ViewPage {

  @ViewChild(Slides) slides: Slides;

  donloadImgs = [];
  
  name
  key
  email
  pic
  title
  mntka
  space
  storey
  roms
  price
  addr
  phone
  images
  image
  date
  prev
  type
  lat
  lng
  id
  userid
  verified

  constructor(public navCtrl: NavController, public params: NavParams,public alert : AlertController,
    public toast : ToastController,public db : AngularFireDatabase,private callNumber: CallNumber,
    public gps : Geolocation,public auth : AngularFireAuth) {

    this.name = params.get("name");
    this.key= params.get("key");
    this.pic= params.get("pic");
    this.title= params.get("title");
    this.prev= params.get("prev");
    this.mntka= params.get("mntka");
    this.type= params.get("type");
    this.space= params.get("space");
    this.storey= params.get("storey");
    this.roms= params.get("roms");
    this.price= params.get("price");
    this.addr= params.get("addr");
    this.phone= params.get("phone");
    this.donloadImgs= params.get("images");
    this.image= params.get("image");
    this.date= params.get("date");
    this.lat= params.get("lat");
    this.lng= params.get("lng");
    this.images = params.get("images");
    this.id= params.get("id");
    this.verified = params.get("verified");
    this.email = auth.auth.currentUser.email;

    db.list("users",ref=>ref.orderByChild("email").equalTo(this.email)).valueChanges().subscribe(data =>
    {
 
      if(data[0] != undefined){
        this.userid = data[0]['id'];
      }

    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewPage');
  }



  saveFav(){
    var sub =  this.db.list(`favorite/${this.userid}`,ref => ref.orderByChild("id").equalTo(this.id)).valueChanges().subscribe(data => {
      sub.unsubscribe();

        if(data[0] == undefined){
          sub.unsubscribe();

          this.db.list(`favorite/${this.userid}`).push({
            name:this.name,
            email:this.email,
            pic:this.pic,
            title:this.title,
            prev:this.prev,
            mntka:this.mntka,
            type:this.type,
            space:this.space,
            storey:this.storey,
            roms:this.roms,
            price:this.price,
            addr:this.addr,
            phone:this.phone,
            images:this.donloadImgs,
            image:this.image,
            date: this.date,
            id:this.id,
            lat:this.lat,
            lng:this.lng,
            verified:this.verified
            }).then( ()=> {
           var toast = this.toast.create({
             message:"تم حفظ الاعلان",
             cssClass:"setdire",
             duration:3000
           })
    
           toast.present()
    
          })
        }else{

          var alert = this.alert.create({
            subTitle:"الاعلان محفوظ",
            buttons:["حسنا"],
            cssClass:"setdire"
          });
          alert.present();

        }
       

      })



    }


    call(number){
      this.callNumber.callNumber(number, true)
    }

    locate(lat,lng,title){

      this.navCtrl.push(ViewgpsPage,{
        lat:lat,
        lng:lng,
        title:title
      })

    }

}
