import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,ToastController } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { CallNumber } from '@ionic-native/call-number';

import { Slides } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public params: NavParams,public alert : AlertController,
    public toast : ToastController,public db : AngularFireDatabase,private callNumber: CallNumber) {

    this.name = params.get("name");
    this.key= params.get("key");
    this.email= params.get("email");
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



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewPage');
  }



  saveFav(id,pic,name,date,type,title,prev,mntka,price,reoms,storey,space,image,images,addr,phone){

    var sub =  this.db.list("favorite",ref => ref.orderByChild("id").equalTo(id)).valueChanges().subscribe(data => {
      sub.unsubscribe();

        if(data[0] == undefined){
          sub.unsubscribe();

          this.db.list("favorite").push({
            name:name,
            email:this.email,
            pic:pic,
            title:title,
            prev:prev,
            mntka:mntka,
            type:type,
            space:space,
            storey:storey,
            roms:reoms,
            price:price,
            addr:addr,
            phone:phone,
            images:images,
            image:image,
            date: date,
            id:id,
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


}
