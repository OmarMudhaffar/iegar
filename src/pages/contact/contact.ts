import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController, ToastController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import * as $ from 'jquery'
import { ViewPage } from '../view/view';
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  list = [];
  homelist = [];
  selectValue = "جميع المحافضات"
  typeSelect = "ملك وايجار"
  storeyg = "جميع الطوابق"
  email

  constructor(public navCtrl: NavController,public auth : AngularFireAuth,
    public alert : AlertController,public db : AngularFireDatabase,
    public ac : ActionSheetController,public toast : ToastController) {



      auth.authState.subscribe(user => {
        if(user != undefined){

          
      
      db.list("favorite",ref => ref.orderByChild("email").equalTo(user.email)).snapshotChanges().subscribe(data => {
        $("page-contact .spinner").hide();
        if(data[0] == undefined){
          $("page-contact .notfound").show();
        }
        if(data[0] != undefined){
         $("page-contact .waiteload").hide();
       }
        this.list = data;
        this.homelist = data;
      });

          this.email = user.email
        }
      })

  }

  ngOnInit(){
    var winh = $(window).height();
    var navh = $(".tabs-md .tab-button").innerHeight();
    
    $("page-contact .waiteload").height(winh - (navh + navh + navh))

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
        return f['prev'] == this.selectValue
      });

      this.list = myf;

    }

    if(this.typeSelect == "ملك"){
      var myf = this.list.filter(f => {
        return f['prev'] == this.selectValue && f['type'] == "ملك"
      });

      this.list = myf;

    }

    
    if(this.selectValue == "جميع المحافظات"){
      var myf = this.homelist;

      this.list = myf;

    }

    if(this.typeSelect == "ايجار"){
      var myf = this.list.filter(f => {
        return f['prev'] == this.selectValue && f['type'] == "ايجار"

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
                return f['prev'] == this.selectValue && f['type'] == "ملك"
                
              });
            }

            if(this.selectValue == "جميع المحافضات"){
              var myf = this.list.filter(f => {
                return f['type'] == "ملك"             
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
              return f['prev'] == this.selectValue && f['type'] == "ايجار"
              
            });
          }

          if(this.selectValue == "جميع المحافضات"){
            var myf = this.list.filter(f => {
              return f['type'] == "ايجار"             
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
              return f['prev'] == this.selectValue              
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


 
    delete(key){
      var alert = this.alert.create({
        subTitle:"هل تريد الحذف من المفضلة؟",
        cssClass:"setdire",
        buttons:[{text:"حذف",handler: ()=> {
          this.db.list("favorite").remove(key).then( ()=> {
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


     
    view(key,pic,name,date,type,title,prev,mntka,price,reoms,storey,space,image,images,addr,phone){

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
        date: date
      })

    }

}
