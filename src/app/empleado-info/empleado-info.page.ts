import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-empleado-info',
  templateUrl: './empleado-info.page.html',
  styleUrls: ['./empleado-info.page.scss'],
})
export class EmpleadoInfoPage implements OnInit {

  empleado: any = { };
  constructor(private activatedroute: ActivatedRoute) { 
        this.activatedroute.params.subscribe(data => {
          console.log(data);
          this.empleado = data;
        })    
  }

  ngOnInit() {
  }

}
