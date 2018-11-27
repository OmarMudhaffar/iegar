import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewChild } from '@angular/core';
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

  constructor(public navCtrl: NavController, public params: NavParams) {

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





}
