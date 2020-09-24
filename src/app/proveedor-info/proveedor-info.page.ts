import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-proveedor-info',
  templateUrl: './proveedor-info.page.html',
  styleUrls: ['./proveedor-info.page.scss'],
})
export class ProveedorInfoPage implements OnInit {

  proveedor: any = { };
  constructor(private activatedroute: ActivatedRoute) { 
    this.activatedroute.params.subscribe(data => {
      console.log(data);
      this.proveedor = data;
    })    
  }

  ngOnInit() {
  }

}
