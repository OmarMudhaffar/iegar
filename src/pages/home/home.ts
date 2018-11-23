import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,public auth : AngularFireAuth,
    public alert : AlertController) {

  }

  logout(){
 
  var alert = this.alert.create({
   subTitle:"هل تريد تسجيل الخروج",
   cssClass:"setdire",
   buttons:[{text:"خروج",handler: ()=>{
    this.auth.auth.signOut();

   } },"الغاء"]
  });

  alert.present();

  }

}
