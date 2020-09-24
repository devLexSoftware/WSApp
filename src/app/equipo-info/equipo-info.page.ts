import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ObrasService } from '../services/obras/obras.service';
import { EquiposService } from '../services/equipos/equipos.service';
import { NavController, AlertController } from '@ionic/angular';
import { LoadingService } from '../services/loading/loading.service';

@Component({
  selector: 'app-equipo-info',
  templateUrl: './equipo-info.page.html',
  styleUrls: ['./equipo-info.page.scss'],
})
export class EquipoInfoPage implements OnInit {


  obras: any[] = [];
  empleados: any[] = [];
  contratistas: any[] = [];
  equipo: any = {};

  constructor(
    private activatedroute: ActivatedRoute,
    private obrasService: ObrasService,
    private equiposService: EquiposService,
    private alertCtrl: AlertController,
    private loadingService: LoadingService

    ) { 
    this.activatedroute.params.subscribe(data => {
      console.log(data);
      this.equipo = data;
    })    
  }

  // ngOnInit() {
  // }

  ngOnInit()
  {
    this.loadingService.showLoader();    
    // this.obrasService.getObraByCampoEspecifico("fk_grupo", this.equipo.id).subscribe(
    //   (data) =>
    //   {        
    //     this.loadingService.hideLoader();       
    //     if (data["error"] == false)
    //     {
    //       if (data["data"].length > 0)
    //       {
    //         // console.log(this.obras)
    //         this.obras = data["data"];
    //       }
    //       else
    //       { this.showAlert("¡Ups!", "El equipo no se encuentra asignada a ninguna obra"); }
    //       // console.log(this.compras);
    //     }
    //     else
    //     {
    //       this.showAlert("¡Error!", data["msj"]);
    //     }
    //   },
    //   (error) => {
    //     this.loadingService.hideLoader();      
    //      console.error(error); }
    // );    


    this.equiposService.getVwInfoGrupoEmpleadosCampoEspecifico("id_grupo", this.equipo.id).subscribe(
      (data) =>
      {
        this.loadingService.hideLoader();      
        if (data["error"] == false)
        {
          if (data["data"].length > 0)
          {
            this.empleados = data["data"];
          }
          else
          { this.showAlert("¡Ups!", "No hay empleados registrados en este Equipo"); }
          // console.log(this.compras);
        }
        else
        {
          this.showAlert("¡Error!", data["msj"]);
        }
      },
      (error) => { 
        this.loadingService.hideLoader();      
        console.error(error); }
    );

    this.equiposService.getVwInfoGrupoContratistasCampoEspecifico("id_grupo", this.equipo.id).subscribe(
      (data) =>
      {
        this.loadingService.hideLoader();      

        if (data["error"] == false)
        {
          if (data["data"].length > 0)
          {
            this.contratistas = data["data"];
          }
          else
          { this.showAlert("¡Ups!", "No hay empleados registrados en este Equipo"); }
          // console.log(this.compras);
        }
        else
        {
          this.showAlert("¡Error!", data["msj"]);
        }
      },
      (error) => { 
        this.loadingService.hideLoader();      
        console.error(error); }
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

}
