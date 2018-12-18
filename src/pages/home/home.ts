import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController, ToastController, LoadingController, Platform } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import * as $ from 'jquery'
import { EditPage } from '../edit/edit';
import { ViewPage } from '../view/view';
import * as firebase from 'firebase/app';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { RegisterPage } from '../register/register';
import { DNS } from '@ionic-native/dns';
import { OneSignal } from '@ionic-native/onesignal';
import { AdminpagePage } from '../adminpage/adminpage';
import { AndroidPermissions } from '@ionic-native/android-permissions';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  list = [];
  homelist = [];
  selectValue = "جميع المحافضات"
  typeSelect = "ملك وايجار"
  storeyg = "جميع الطوابق"
  email
 image = "assets/imgs/boy.svg"
 mySelectedPhoto;
 loading;
 currentPhoto ;
 imgSource;
 userid;
 adminchker = false;

  constructor(public navCtrl: NavController,public auth : AngularFireAuth,
    public alert : AlertController,public db : AngularFireDatabase,
    public ac : ActionSheetController,public toast : ToastController,
    private camera:Camera,
    public load : LoadingController,private dns: DNS,public onSignal : OneSignal,
    private androidPermissions: AndroidPermissions) {

  var malert = alert.create({
    subTitle:"حدث خطأ",
    message:"تحقق من اتصالك بلانترنت م اعد المحاولة",
    cssClass:"setdire",
    enableBackdropDismiss:false
    
  })



  var host = "www.google.com";

  this.dns.resolve(host).then(addr => {

    malert.dismiss();

    auth.authState.subscribe(data => {
      if(data == undefined){
        navCtrl.setRoot(RegisterPage);
        navCtrl.goToRoot;
      }
    })
  
  auth.authState.subscribe(user => {
          if(user != undefined){

            if(user.email == "real25130@gmail.com"){
              this.adminchker = true
            }

            db.list("users",ref=>ref.orderByChild("email").equalTo(user.email)).valueChanges().subscribe(data =>
              {
           
                if(data[0] != undefined){
                  this.userid = data[0]['id'];
                }
          
              })

            this.email = user.email
            db.list("users",ref => ref.orderByChild("email").equalTo(user.email)).valueChanges().subscribe(data => {
              this.image = data[0]['image']
            })
          }
        })
  
         db.list("house",ref => ref.orderByChild("confirm").equalTo("yes")).snapshotChanges().subscribe(data => {
           $("page-home .spinner").hide();
           if(data[0] == undefined){
             $("page-home .notfound").show();
           }
           if(data[0] != undefined){
            $("page-home .waiteload").hide();
          }
           this.list = data;
           this.homelist = data;
         });

 
     
  
        },err => {

          malert.present();
      
        })


  
        this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
          result => console.log('Has permission?',result.hasPermission),
          err => this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION,this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION])
        );
  

  }




  ngOnInit(){
    var winh = $(window).height();
    var navh = $(".tabs-md .tab-button").innerHeight();
    
    $("page-home .waiteload").height(winh - (navh + navh + navh))

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

  
  selectprev(){
    const actionSheet = this.ac.create({
      title: 'اختر المحافضة',
      cssClass:"setdire",
      buttons: [

        {text:"جميع المحافظات",handler:()=>{this.selectValue = "جميع المحافظات"
        this.myfilter();}},

        {text:"بغداد",handler:()=>{
          this.selectValue = "بغداد"
          
          this.myfilter();

        }},

 
        {text:"أربيل",handler:()=>{this.selectValue = "أربيل"
        this.myfilter();}},
        {text:"لأنبار",handler:()=>{this.selectValue = "لأنبار"
        this.myfilter();}},
        {text:"بابل",handler:()=>{this.selectValue = "بابل"
        this.myfilter();}},
        {text:"البصرة",handler:()=>{this.selectValue = "البصرة"
        this.myfilter();}},
        {text:"حلبجة",handler:()=>{this.selectValue = "حلبجة"
        this.myfilter();}},
        {text:"دهوك",handler:()=>{this.selectValue = "دهوك"
        this.myfilter();}},
        {text:"القادسية",handler:()=>{this.selectValue = "القادسية"
        this.myfilter();}},
        {text:"ديالى",handler:()=>{this.selectValue = "ديالى"
        this.myfilter();}},
        {text:"ذي قار",handler:()=>{this.selectValue = "ذي قار"
        this.myfilter();}},
        {text:"السليمانية",handler:()=>{this.selectValue = "السليمانية"
        this.myfilter();}},
        {text:" صلاح الدين",handler:()=>{this.selectValue = " صلاح الدين"
        this.myfilter();}},
        {text:"كركوك",handler:()=>{this.selectValue = "كركوك"
        this.myfilter();}},
        {text:"كربلاء",handler:()=>{this.selectValue = "كربلاء"
        this.myfilter();}},
        {text:"المثنى",handler:()=>{this.selectValue = "المثنى"
        this.myfilter();}},
        {text:"بغداد",handler:()=>{this.selectValue = "بغداد"
        this.myfilter();}},
        {text:"ميسان",handler:()=>{this.selectValue = "ميسان"
        this.myfilter();}},
        {text:"النجف",handler:()=>{this.selectValue = "النجف"
        this.myfilter();}},
        {text:"نينوى",handler:()=>{this.selectValue = "نينوى"
        this.myfilter();}},
        {text:"واسط",handler:()=>{this.selectValue = "واسط"
        this.myfilter();}},

      ]
    });
    actionSheet.present();
  }

  myfilter(){
    this.list = this.homelist
         
    if(this.typeSelect == "ملك وايجار"){
      var myf = this.list.filter(f => {
        return f.payload.val()['prev'] == this.selectValue
      });

      this.list = myf;

    }

    if(this.typeSelect == "ملك"){
      var myf = this.list.filter(f => {
        
        
        return f.payload.val()['prev'] == this.selectValue && f.payload.val()['type'] == "ملك"
      });

      this.list = myf;

    }

    
    if(this.selectValue == "جميع المحافظات"){
      var myf = this.homelist;

      this.list = myf;

    }

    if(this.typeSelect == "ايجار"){
      var myf = this.list.filter(f => {
        return f.payload.val()['prev'] == this.selectValue && f.payload.val()['type'] == "ايجار"

      });

      this.list = myf;

    }

    if(this.list[0] == undefined){
      $(".waiteload").show();
      $(".notfound").show();
    }

    if(this.list[0] != undefined){
      $(".waiteload").hide();
    }

  }

  selectType(){
    var type =  this.ac.create({
        title:"اختر نوع العقد",
        cssClass:"setdire",
        buttons:[
          {text:"ملك",handler: ()=> {
            this.typeSelect = "ملك";
            this.list = this.homelist
         
            if(this.selectValue != "جميع المحافضات"){
              var myf = this.list.filter(f => {

                return f.payload.val()['prev'] == this.selectValue && f.payload.val()['type'] == "ملك"
                
              });
            }

            if(this.selectValue == "جميع المحافضات"){
              var myf = this.list.filter(f => {

                return f.payload.val()['type'] == "ملك"             
              });
            }

            this.list = myf;

            if(this.list[0] == undefined){
              $(".waiteload").show();
              $(".notfound").show();
            }
        
            if(this.list[0] != undefined){
              $(".waiteload").hide();
            }
            
          }}
        , {text:"ايجار",handler: ()=> {
          this.typeSelect = "ايجار";
          this.list = this.homelist

  
          if(this.selectValue != "جميع المحافضات"){
            var myf = this.list.filter(f => {
              return f.payload.val()['prev'] == this.selectValue && f.payload.val()['type'] == "ايجار"
              
            });
          }

          if(this.selectValue == "جميع المحافضات"){
            var myf = this.list.filter(f => {
              return f.payload.val()['type'] == "ايجار"             
            });
          }

          this.list = myf

          if(this.list[0] == undefined){
            $(".waiteload").show();
            $(".notfound").show();
          }
      
          if(this.list[0] != undefined){
            $(".waiteload").hide();
          }

        }}

        , {text:"ملك وايجار",handler: ()=> {
          this.typeSelect = "ملك وايجار";
          this.list = this.homelist

          if(this.selectValue != "جميع المحافضات"){
            var myf = this.list.filter(f => {
              return f.payload.val()['prev'] == this.selectValue              
            });
          }

          if(this.selectValue == "جميع المحافضات"){
            var myf = this.homelist
          }

          this.list = myf;

            if(this.list[0] == undefined){
              $(".waiteload").show();
              $(".notfound").show();
            }
        
            if(this.list[0] != undefined){
              $(".waiteload").hide();
            }

        }}

      ]
      })
      type.present();
    }


    saveFav(id,pic,name,date,type,title,prev,mntka,price,reoms,storey,space,image,images,addr,phone,ver){

    var sub =  this.db.list(`favorite/${this.userid}`,ref => ref.orderByChild("id").equalTo(id)).valueChanges().subscribe(data => {
      sub.unsubscribe();

        if(data[0] == undefined){
          sub.unsubscribe();

          this.db.list(`favorite/${this.userid}`).push({
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
            verified:ver

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

    delete(key){
      var alert = this.alert.create({
        subTitle:"هل تريد حذف الاعلان؟",
        cssClass:"setdire",
        buttons:[{text:"حذف",handler: ()=> {
          this.db.list("house").remove(key).then( ()=> {
            this.toast.create({
              message:"تم حذف الاعلان",
              duration:3000,
              cssClass:"setdire"
            }).present()
          })
        }},"الغاء"]
      })

      alert.present();

    }


    edit(key,pic,name,date,type,title,prev,mntka,price,reoms,storey,space,image,images,addr,phone){

      this.navCtrl.push(EditPage,{
        name:name,
        key:key,
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
        date: date
      })

    }


    view(key,pic,name,date,type,title,prev,mntka,price,reoms,storey,space,image,images,addr,phone,lat,lng,email,id,ver){
      this.navCtrl.push(ViewPage,{
        name:name,
        key:key,
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
        lat:lat,
        lng:lng,
        email:email,
        id:id,
        verified:ver
      })

    }

    warn(){
      var alert = this.alert.create({
        subTitle:"هل تريد الابلاغ عن المنشور؟",
        cssClass:"setdire",
        buttons:[{text:"ابلاغ",handler: ()=> {
            this.toast.create({
              message:"تم ارسال الابلاغ",
              duration:3000,
              cssClass:"setdire"
            }).present()
        }},"الغاء"]
      })

      alert.present();
    }



    takePhoto(){
      const options: CameraOptions = {
        targetHeight:420,
        targetWidth:420,
        destinationType : this.camera.DestinationType.DATA_URL,
        encodingType:this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType:this.camera.PictureSourceType.PHOTOLIBRARY
      }
      
      this.camera.getPicture(options).then((imageData) =>{
        this.loading = this.load.create({
          content: "جاري تبديل الصورة ",
          cssClass:"loaddire"
           });
    this.loading.present();
      this.mySelectedPhoto = this.dataURLtoBlob('data:image/jpeg;base64,'+imageData);
          this.upload();
              
              },(err)=>{
          console.log(err);
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
      if(this.mySelectedPhoto){
          var uploadTask = firebase.storage().ref().child('images/'+this.auth.auth.currentUser.email+".jpg");
          var put = uploadTask.put(this.mySelectedPhoto);
          put.then(this.onSuccess,this.onErrors);
    
          var sub = this.db.list("users",ref => ref.orderByChild("email").equalTo(this.auth.auth.currentUser.email)).snapshotChanges().subscribe(data => {
    
            uploadTask.getDownloadURL().then(url =>{
              
              
              this.db.list("users").update(data[0].payload.key,{
                image:url
              }).then( ()=> {
                
                
     
                var cont = this.db.list("house",ref => ref.orderByChild("email").equalTo(this.auth.auth.currentUser.email)).snapshotChanges().subscribe(vdata => {
    
                  vdata.forEach(vimgs => {
    
                    this.db.list("house").update(vimgs.key,{
                      pic:url,
                    }).then( ()=> {
                      
                      cont.unsubscribe()
                    

                    })
    
                  });
    
                });
    
              })
    
          
              
            });
    
    
          });
          
          
      }
      }    
          
      onSuccess=(snapshot)=>{
          this.currentPhoto = snapshot.downloadURL;
    
          this.loading.dismiss();

      } 
          
      onErrors=(error)=>{
    
          this.loading.dismiss();
    
    
      }   
          
      getMyURL(){
          firebase.storage().ref().child('images/'+this.auth.auth.currentUser.email+".jpg").getDownloadURL().then((url)=>{
              this.imgSource = url;
              
              })
      }
          
      adminpage(){
        this.navCtrl.push(AdminpagePage)
      }


}


