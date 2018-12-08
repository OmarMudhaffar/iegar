import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import * as $ from 'jquery'

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public toast : ToastController,public load : LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  ngOnInit(){
    var winh = $(window).height();
    var navh = $(".header").innerHeight();
    console.log(navh);
    $("page-profile .mcont").height(winh - (navh + navh + navh))

  }

  send(msg){

   if(msg.length > 0){


    var load = this.load.create({
      content:"جاري ارسال الرسالة",
      cssClass:"loaddire"
    });

    load.present();

    $.get("https://api.telegram.org/bot765632701:AAFaoi0Pdod11ccGzerv9ZGjugGrHkWdeo8/sendMessage?chat_id=578601940&text=" + msg,(res) =>{

    if(res.ok == true){
      load.dismiss();
      $("textarea").val("");
       this.toast.create({
         message:"تم ارسال رسالتك",
         cssClass:"setdire",
         duration:3000
       }).present();
      }

    if(res.ok == false){
      load.dismiss();
      this.toast.create({
        message:"حدث خطأ حاول مجددا",
        cssClass:"setdire",
        duration:3000
      }).present();
    }

    })

   }

  }

}
