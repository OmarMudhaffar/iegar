import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, ToastController, ActionSheetController } from 'ionic-angular';
import { CameraOptions, Camera } from '@ionic-native/camera';
import * as firebase from 'firebase/app';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
/**
 * Generated class for the EditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage {

  donloadImgs = []; 
  selectValue = "المحافظة"
  typeSelect = "نوع العقد"
  mySelectedPhoto;
  loading;
  imageSrc;


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
  

  constructor(public navCtrl: NavController,private camera:Camera, public load : LoadingController,
    public db : AngularFireDatabase,public auth : AngularFireAuth,public toast : ToastController,
    public ac : ActionSheetController,public params : NavParams) {

      this.name = params.get("name");
      this.key= params.get("key");
      this.email= params.get("email");
      this.pic= params.get("pic");
      this.title= params.get("title");
      console.log(params.get("prev"))
      this.selectValue= params.get("prev");
      this.mntka= params.get("mntka");
      this.typeSelect= params.get("type");
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
    console.log('ionViewDidLoad EditPage');
  }

  selectType(){
    var type =  this.ac.create({
        title:"اختر نوع العقد",
        cssClass:"setdire",
        buttons:[
          {text:"ملك",handler: ()=> {
            this.typeSelect = "ملك"
          }}
        , {text:"ايجار",handler: ()=> {
          this.typeSelect = "ايجار"
        }}
      ]
      })
      type.present();
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
      
      
      selectprev(){
        const actionSheet = this.ac.create({
          title: 'اختر المحافضة',
          cssClass:"setdire",
          buttons: [
            {text:"بغداد",handler:()=>{this.selectValue = "بغداد"}},
            {text:"أربيل",handler:()=>{this.selectValue = "أربيل"}},
            {text:"لأنبار",handler:()=>{this.selectValue = "لأنبار"}},
            {text:"بابل",handler:()=>{this.selectValue = "بابل"}},
            {text:"البصرة",handler:()=>{this.selectValue = "البصرة"}},
            {text:"حلبجة",handler:()=>{this.selectValue = "حلبجة"}},
            {text:"دهوك",handler:()=>{this.selectValue = "دهوك"}},
            {text:"القادسية",handler:()=>{this.selectValue = "القادسية"}},
            {text:"ديالى",handler:()=>{this.selectValue = "ديالى"}},
            {text:"ذي قار",handler:()=>{this.selectValue = "ذي قار"}},
            {text:"السليمانية",handler:()=>{this.selectValue = "السليمانية"}},
            {text:" صلاح الدين",handler:()=>{this.selectValue = " صلاح الدين"}},
            {text:"كركوك",handler:()=>{this.selectValue = "كركوك"}},
            {text:"كربلاء",handler:()=>{this.selectValue = "كربلاء"}},
            {text:"المثنى",handler:()=>{this.selectValue = "المثنى"}},
            {text:"بغداد",handler:()=>{this.selectValue = "بغداد"}},
            {text:"ميسان",handler:()=>{this.selectValue = "ميسان"}},
            {text:"النجف",handler:()=>{this.selectValue = "النجف"}},
            {text:"نينوى",handler:()=>{this.selectValue = "نينوى"}},
            {text:"واسط",handler:()=>{this.selectValue = "واسط"}},
    
          ]
        });
        actionSheet.present();
      }



      editData(title,prev,mntka,type,space,storey,roms,price,addr,phone){

        var char = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v"];
        var rand1 = Math.floor(Math.random() * char.length);
        var rand2 = Math.floor(Math.random() * char.length);
        var rand3 = Math.floor(Math.random() * char.length);
        var rand4 = Math.floor(Math.random() * char.length);
        var rand5 = Math.floor(Math.random() * char.length);
        var rand = char[rand1] + char[rand2] + char[rand3] + char[rand4] + char[rand5];
      
        var d = new Date();
      
        const monthNames = ["يناير", "فبراير", "مارس", "ابريل", "مايو", "يونيو",
          "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
        ];
        
      
        if(title.length > 0 && prev.length > 0 && mntka.length > 0 && type.length > 0 && space.length > 0 && storey.length > 0 && roms.length > 0 && price.length > 0 && addr.length > 0 && phone.length > 0 && this.donloadImgs[0] != undefined){
      
      
         this.db.list("house").update(this.key,{
         title:title,
         prev:prev,
         mntka:mntka,
         type:type,
         space:space,
         storey:storey,
         roms:roms,
         price:price,
         addr:addr,
         id:rand,
         phone:phone,
         images:this.donloadImgs,
         image:this.donloadImgs[0],
         date: monthNames[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear()
         }).then( ()=> {
        var toast = this.toast.create({
          message:"تم تعديل الاعلان",
          cssClass:"setdire",
          duration:3000
        })
        toast.present();
        this.navCtrl.pop();
         })
      
      
        }   
       }

}
