import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, AlertController } from '@ionic/angular';
import { LoadingService } from '../services/loading/loading.service';

import { EquiposService } from '../services/equipos/equipos.service';
import { EmpleadosService } from '../services/empleados/empleados.service';
import { ContratistasService } from '../services/contratistas/contratistas.service';


@Component({
  selector: 'app-equipo-form',
  templateUrl: './equipo-form.page.html',
  styleUrls: ['./equipo-form.page.scss'],
})
export class EquipoFormPage implements OnInit {

  equipo: any = { };  
  empleados: any[] = [];
  contratistas: any[] = [];

  frmData: FormGroup;
  //Variables de comportamiento de interfaz
  showLabels: boolean = false;
  titlePage = "Nuevo Equipo";
  accion: string = "insert";
  textoBtn = "Guardar Equipo";

  // Default Data
  defaultData: any = {};
  _idEquipo: number = null;
  _nombreGrupo: string = null
  _notaGrupo: string = null;
  _empleadosId: number[] = [];
  _contratistasId: number[] = [];



  constructor(
    private activatedroute: ActivatedRoute,
    private frmBuilder: FormBuilder,    
    private alertCtrl: AlertController,  
    public navCtrl: NavController,
    private loadingService: LoadingService,    
    private equiposService: EquiposService,   
    private empleadosService: EmpleadosService,
    private contratistasService: ContratistasService 
  ) {
    this.activatedroute.params.subscribe(defaultData => {      
        // console.log(defaultData);

        if(defaultData.id != null){                
          this._idEquipo = defaultData.id;
          this._nombreGrupo = defaultData.nombre;
          this._notaGrupo = defaultData.nota;

          this.showLabels = true;
          this.titlePage = "Editar Equipo";
          this.accion = "update";
          this.textoBtn = "Guardar";
        }

            //Formulario
        this.frmData = this.frmBuilder.group({
          id_equipo: [this._idEquipo],
          nombreGrupo: [this._nombreGrupo],
          notaGrupo: [this._notaGrupo],
          empleadosId: [''],
          contratistasId: [''],
          accion: [this.accion]
        });
    });
   }

  ngOnInit() {
  }

  ionViewWillEnter(): void
  {
    this.loadingService.showLoader();
    
    this.equiposService.getVwInfoGrupoEmpleadosCampoEspecifico("fk_grupo", this._idEquipo).subscribe(
      (data) =>
      {
        this.loadingService.hideLoader();              
        if (data["error"] == false)
        {
          if (data["data"].length > 0)
          {
            for (let i = 0; i < data["data"].length; i++)
            {
              // console.log(data["data"][i].id_empleado);
              this._empleadosId.push(data["data"][i].id);
            }
          }
          // console.log(this.compras);
        }
        else
        {
          this.showAlert("¡Error!", data["msj"], true);
        }
      },
      (error) => { 
        this.loadingService.hideLoader();      
        console.error(error); }
    );

    //Obtener a los empleados registrados
    this.empleadosService.getEmpleados().subscribe(
      (data) =>
      {
        this.loadingService.hideLoader();      
        
        if (data["error"] == false)
        {
          if (data["data"].length > 0)
          {
            debugger;
            this.empleados = data["data"];
            
          }
          else
          { this.showAlert("¡Ups!", "No hay empleados registrados", false); }
          // console.log(this.compras);
        }
        else
        {
          this.showAlert("¡Error!", data["msj"], true);
        }
      },
      (error) => { 
        this.loadingService.hideLoader();      
        console.error(error); }
    );


    // Obtener los contratistas pertenecientes al grupo
    this.equiposService.getVwInfoGrupoContratistasCampoEspecifico("fk_grupo", this._idEquipo).subscribe(
      (data) =>
      {
        this.loadingService.hideLoader();      
        
        if (data["error"] == false)
        {
          if (data["data"].length > 0)
          {
            for (let i = 0; i < data["data"].length; i++)
            {
              // console.log(data["data"][i].id_empleado);
              this._contratistasId.push(data["data"][i].id);
            }
          }
          // console.log(this.compras);
        }
        else
        {
          this.showAlert("¡Error!", data["msj"], true);
        }
      },
      (error) => { 
        this.loadingService.hideLoader();      
        console.error(error); }
    );

    //Obtener a los contratistas registrados
    this.contratistasService.getContratistas().subscribe(
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
          { this.showAlert("¡Ups!", "No hay contratistas registrados", false); }
          // console.log(this.compras);
        }
        else
        {
          this.showAlert("¡Error!", data["msj"], true);
        }
      },
      (error) => { 
        this.loadingService.hideLoader();      
        console.error(error); }
    );

    console.log(this.empleados);
    // console.log(this.contratistas);
  }

  guardarForm()
  {
    console.log(this.frmData.value);

    if (this.frmData.controls.nombreGrupo.value != "" && this.frmData.controls.empleadosId.value != "")
    {
      this.loadingService.showLoader();

      this.equiposService.registrarModificarEquipo(this.frmData.value).subscribe((data) =>
      {
        
        this.loadingService.hideLoader();             
        if (data["error"] == false)
        { this.showAlert("¡Correcto!", data["msj"], true); }
        else
        { this.showAlert("¡Ups!", data["msj"], true); }
      },
      (error) => { console.log(error); });
    }
    else
    { this.showAlert("¡Ups!", "Campos mínimos requeridos: Nombre del grupo y al menos un empleado", false); }
  }

  async showAlert(title, subtitle, regresar)
  {
    const promp = await this.alertCtrl.create(
    {
      message: subtitle,
      subHeader: title,
      buttons: [
        {
          text: 'Ok',
          role: 'ok',
          handler: data => {
            if (regresar)
            { 
              // this.navCtrl.pop(); 
              this.navCtrl.navigateBack('/equipos'); 
            }
          }
        }]
    });
    await promp.present();
  }

}
