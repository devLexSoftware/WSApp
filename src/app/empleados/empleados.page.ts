import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

import { LoadingService } from '../services/loading/loading.service';
import { PopoverController } from '@ionic/angular';

import { EmpleadosService } from '../services/empleados/empleados.service';
import { EmpleadoOpcionComponent } from '../empleado-opcion/empleado-opcion.component';


@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.page.html',
  styleUrls: ['./empleados.page.scss'],
})
export class EmpleadosPage implements OnInit {

  empleados: any[] = [];

  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    private empleadosService: EmpleadosService,
    private router: Router,
    private loadingService: LoadingService,
    private popoverCtrl: PopoverController,        
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(): void
  {
  this.loadingService.showLoader();
    
    this.empleadosService.getEmpleados().subscribe(
      (data) =>
      {
        this.loadingService.hideLoader();
        debugger;        
        if (data["error"] == false)
        {
          data["data"].unshift({id:null});
          if (data["data"].length > 0){
            this.empleados = data["data"];
          }          
        }
        else
        {
          this.showAlert("¡Error!", data["msj"]);
        }
      },
      (error) => { 
        this.loadingService.hideLoader();      
        this.showAlert("¡Error!", "Error WS Empleados"); }
    );
  }

  async showAlert(title, subtitle)
  {
    const promp = await this.alertCtrl.create(
    {
      message: title,
      subHeader: subtitle,
      buttons: ['OK']
    });
    await promp.present();
  }

  agregarEmpleado(){
    this.router.navigate(['/empleado-form']);
  }

  async opcion(empleado) {
    debugger;
    const popover = await this.popoverCtrl.create({
      component: EmpleadoOpcionComponent,
      cssClass: 'my-custom-class',
      event: empleado,
      translucent: true,
      componentProps: { data: empleado },

    });
    popover.onDidDismiss().then(par => {
      if (par) {    

        if (par.data == 1)
            this.ionViewWillEnter(); 
      }
    });
    return await popover.present();
  }

}
