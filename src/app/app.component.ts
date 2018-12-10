import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { RegisterPage } from '../pages/register/register';
import { AngularFireAuth } from '@angular/fire/auth';
import { OneSignal } from '@ionic-native/onesignal';
import { AngularFireDatabase } from '@angular/fire/database';
import { ProfilePage } from '../pages/profile/profile';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = RegisterPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    public auth : AngularFireAuth,public oneSignal: OneSignal,public db : AngularFireDatabase) {

    auth.authState.subscribe(user => {
      
      if(user != undefined){
        if(!user.emailVerified){
          this.rootPage = RegisterPage
      }

      if(user.emailVerified){
        this.rootPage = ProfilePage
    }
      
      }

      if(user == undefined){
        this.rootPage = RegisterPage
      }

    })


    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();

      this.oneSignal.startInit('6bb2ae4a-0c5f-4c3c-85b4-1648d4d8929c', '1098066924806');

      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
      
      this.oneSignal.endInit();

         this.mynote();

      
    });
  }

  

  mynote(){



    this.auth.authState.subscribe(user => {
      if(user != undefined){
    
          this.oneSignal.getIds().then( id => {
           var sub = this.db.list("ids",ref => ref.orderByChild("id").equalTo(id.userId)).valueChanges().subscribe( mdata => {
             if(mdata[0] == undefined){
               this.db.list("ids").push({
                 id:id.userId,
                 email:this.auth.auth.currentUser.email
               }).then( ()=> {
                 sub.unsubscribe();
               })
             }
            });
            });
    
      }
    })
    
    
    
      }
    

}
