import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { OneSignal } from '@ionic-native/onesignal';
/**
 * Generated class for the AdminpagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-adminpage',
  templateUrl: 'adminpage.html',
})
export class AdminpagePage {
  list : Observable<any>;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,public db : AngularFireDatabase,
     public alert : AlertController,public oneSignal : OneSignal) {

    this.list = db.list("house",ref=>ref.orderByChild("confirm").equalTo("no")).snapshotChanges();


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminpagePage');
  }

  
  add(key,userid,title,price){
    var alert = this.alert.create({
        subTitle:"هل انت متأكد من نشر الاعلان؟",
        cssClass:"setdire",
        buttons:[{text:"تأكيد",handler: ()=> {
         this.db.list("house").update(key,{
           confirm:"yes"
          }).then( ()=> {
            this.oneSignal.postNotification({
              app_id:"6bb2ae4a-0c5f-4c3c-85b4-1648d4d8929c",
              include_player_ids:[userid],
              contents: {
                en: "تم الموافقة على الاعلان الخاص بك"
              },
              headings: {
                en: "تهانيا"
              }
            })

              this.db.list("ids").valueChanges().subscribe( ids => {
      
                ids.forEach(id => {
            
            
                  if(id['id'] != userid){
                    this.oneSignal.postNotification({
                      app_id:"6bb2ae4a-0c5f-4c3c-85b4-1648d4d8929c",
                      include_player_ids:[id['id']],
                      contents: {
                        en: "بسعر : " + price
                      },
                      headings: {
                        en: title
                      }
                    })
                  }
            
                 
                })
            
              })

          })
        }},"الغاء"]
      })
   
      alert.present();
     }
   
   
     delete(key,userid){
       var alert = this.alert.create({
           subTitle:"هل انت متأكد من حذف الاعلان",
           cssClass:"setdire",
           buttons:[{text:"تأكيد",handler: ()=> {
           this.db.list("house").remove(key).then( ()=> {


            this.oneSignal.postNotification({
              app_id:"6bb2ae4a-0c5f-4c3c-85b4-1648d4d8929c",
              include_player_ids:[userid],
              contents: {
                en: "تم رفض الاعلان الخاص بك"
              },
              headings: {
                en: "عذرا"
              }
            })
       

           });
           }},"الغاء"]
         }
         )
      
         alert.present();
        }

}
