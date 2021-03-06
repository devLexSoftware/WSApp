import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavController, AlertController, NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.page.html',
  styleUrls: ['./image-modal.page.scss'],
})
export class ImageModalPage implements OnInit {

  img: any;

  @ViewChild('slider', {read: ElementRef })slider:ElementRef;
  sliderOpts = {
    zoom:{
      maxRatio: 3
    }
  }

  constructor(
    public navCtrl: NavController,  
    public navParam: NavParams,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.img = this.navParam.get('img');    
  }

  zoom(zoomIn: boolean){
    let zoom = this.slider.nativeElement.swiper.zoom;
    if(zoomIn){
      zoom.in();
    }
    else{
      zoom.out();
    }
  }
  close(){
    this.modalCtrl.dismiss();
  }

}
