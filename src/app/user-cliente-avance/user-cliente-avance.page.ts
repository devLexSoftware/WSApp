import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../services/loading/loading.service';
import { PopoverController } from '@ionic/angular';
import { AvanceOpcionComponent } from '../avance-opcion/avance-opcion.component';
import { Router } from '@angular/router';
import { AvancesService } from '../services/avances/avances.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-user-cliente-avance',
  templateUrl: './user-cliente-avance.page.html',
  styleUrls: ['./user-cliente-avance.page.scss'],
})
export class UserClienteAvancePage implements OnInit {
  obra: any = {};
  avances: any[] = [];
  
  constructor(
    private activatedroute: ActivatedRoute,
    private avancesService: AvancesService,
    private alertCtrl: AlertController,
    private loadingService: LoadingService,
    private popoverCtrl: PopoverController,        
    private router: Router,
  ) { 
    this.activatedroute.params.subscribe(data => {
      this.obra = data;
    })   
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadingService.showLoader();
    this.avancesService.getAvancesByCampoEspecifico("fk_obra", this.obra.id).subscribe(
      (data) =>
      {
        this.loadingService.hideLoader();            
        if (data["error"] == false)
        {
          
          if (data["data"].length > 0){
            this.avances = data["data"];
          }     
          else{this.showAlert("Aviso!", "No hay registros");}
          

        }
        else
        {
          this.showAlert("¡Error!", data["msj"]);
        }
      },
      (error) => { 
        this.loadingService.hideLoader();            
        this.showAlert("¡Error!", "Error WS Obras"); }
    );
  }

  async showAlert(title, subtitle)
  {
    const promp = await this.alertCtrl.create(
    {
      message: subtitle,
      subHeader: title,
      buttons: ['OK']
    });
    await promp.present();
  }

  regresar(){
    this.router.navigate(['/tabs/avances-cliente']);                
  }

  verDetalle(avance){        
    this.router.navigate(['/avance-info', avance]);
  }

}
