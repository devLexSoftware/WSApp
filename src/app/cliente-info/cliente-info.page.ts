import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-cliente-info',
  templateUrl: './cliente-info.page.html',
  styleUrls: ['./cliente-info.page.scss'],  
  providers: [NavParams]


})
export class ClienteInfoPage implements OnInit {

  cliente: any = { };

  constructor( private activatedroute: ActivatedRoute) {       

    this.activatedroute.params.subscribe(data => {
      console.log(data);
      this.cliente = data;
    })    
   
  }

  ngOnInit() {
  }

}
