import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { CameraOptions, Camera } from '@ionic-native/camera';
import * as firebase from 'firebase/app';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  mySelectedPhoto;
  loading;
  imageSrc;
  imageArray = []
  uploadImages = [];
  donloadImgs = [];

  constructor(public navCtrl: NavController,private camera:Camera, public load : LoadingController,
    public db : AngularFireDatabase) {

  }
  


  takePhoto(){
    const options: CameraOptions = {
      targetHeight:720 ,
      targetWidth:720,
      quality:100, 
      destinationType : this.camera.DestinationType.DATA_URL,
      encodingType:this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType:this.camera.PictureSourceType.PHOTOLIBRARY
    }

    
    this.camera.getPicture(options).then((imageData) =>{
      this.loading = this.load.create({
        content: "جاري اضافة الصورة ",
        cssClass:"loaddire"
         });
  this.loading.present();
    this.mySelectedPhoto = this.dataURLtoBlob('data:image/jpeg;base64,'+imageData);
        this.upload();
            
            },(err)=>{
        alert(JSON.stringify(err));
            });
    
    
    }
    
        
        
    dataURLtoBlob(myURL){
        let binary = atob(myURL.split(',')[1]);
    let array = [];
    for (let i = 0 ; i < binary.length;i++){
        array.push(binary.charCodeAt(i));
    }
        return new Blob([new Uint8Array(array)],{type:'image/jpeg'});
    }    
        
        
    upload(){

      
    var char = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v"];
    var rand1 = Math.floor(Math.random() * char.length);
    var rand2 = Math.floor(Math.random() * char.length);
    var rand3 = Math.floor(Math.random() * char.length);
    var rand4 = Math.floor(Math.random() * char.length);
    var rand = char[rand1] + char[rand2] + char[rand3] + char[rand4];

    if(this.mySelectedPhoto){
        var uploadTask = firebase.storage().ref().child('images/'+rand+".jpg");
        var put = uploadTask.put(this.mySelectedPhoto);
        put.then( ()=> {
          this.loading.dismiss();

          uploadTask.getDownloadURL().then(url =>{
            
            this.donloadImgs.push(url);
  
          });

        });

        put.catch(err =>{
          this.loading.dismiss();

          alert(JSON.stringify(err));
        })
  

    }
    }    

 saveData(){
     this.db.list("house").push({
         images:this.donloadImgs
     })
 }

}
