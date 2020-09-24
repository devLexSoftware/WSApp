import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

import { ImageModalPage } from '../image-modal/image-modal.page';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-compra-info',
  templateUrl: './compra-info.page.html',
  styleUrls: ['./compra-info.page.scss'],
})
export class CompraInfoPage implements OnInit {

  compra: any = { };

  constructor(private activatedroute: ActivatedRoute, 
    public modalCtrl: ModalController,
    ) { 
    debugger;

    this.activatedroute.params.subscribe(data => {      
      this.compra = data;
    })    
  }

  ngOnInit() {
  }
  openImage(image){    
    this.modalCtrl.create({
      component: ImageModalPage,
      componentProps:{
        img: image
      }
    }).then(modal => modal.present());
  }
}
