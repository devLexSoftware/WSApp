import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ObrasService } from '../services/obras/obras.service';
import { NavController, AlertController } from '@ionic/angular';
import { LoadingService } from '../services/loading/loading.service';

import { ClientesService } from '../services/clientes/clientes.service';
import { EquiposService } from '../services/equipos/equipos.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-obra-form',
  templateUrl: './obra-form.page.html',
  styleUrls: ['./obra-form.page.scss'],
})
export class ObraFormPage implements OnInit {
  obra: any = { };
  info: any = {};
  clientes: any[] = [];
  equipos: any[] = [];

  frmData: FormGroup;

  //Variables de comportamiento de interfaz
  showLabels: boolean = false;
  titlePage = "Nueva Obra";
  accion: string = "insert";
  textoBtn = "Guardar Obra";


  //#region Formulario  
  defaultData: any = {};
  _id_obra: any = null;
  _identificador: any = "";
  _nombre: any = "";
  _calle: any = "";
  _numExt: any = "";
  _numInt: any = "";
  _colonia: any = "";
  _cp: any = "";
  _ciudad: any = "";
  _municipio: any = "";
  _fechInicio: any = "";
  _fechFin: any = "";
  _avance: any = "";
  _comentario: any = "";
  _fk_clientes: number = 0;
  _fk_grupo: number = 0;
  _costo_aprox: any = "";
  _porcentaje_ganan: any = "";
  _superficie_total: any = "";
  _superficie_cons: any = "";
  //#endregion

  constructor(
    private activatedroute: ActivatedRoute,
    private frmBuilder: FormBuilder,
    private obraService: ObrasService,
    private alertCtrl: AlertController,  
    public navCtrl: NavController,
    private loadingService: LoadingService,
    private clientesService: ClientesService,
    private equiposService: EquiposService,
    private obrasService: ObrasService,
    private router: Router,    
  ) { 
      this.activatedroute.params.subscribe(defaultData => {        

        if(defaultData.id != null){                

          this._id_obra = defaultData.id;
          this._identificador = defaultData.identificador;
          this._nombre = defaultData.nombre;
          this._calle = defaultData.calle;
          this._numExt = defaultData.numExt;
          this._numInt = defaultData.numInt;
          this._colonia = defaultData.colonia;
          this._cp = defaultData.cp;
          this._ciudad = defaultData.ciudad;
          this._municipio = defaultData.municipio;
          this._fechInicio = defaultData.fechInicio;
          this._fechFin = defaultData.fechFin;
          this._avance = defaultData.avance;
          this._comentario = defaultData.comentario;
          this._fk_clientes = defaultData.fk_clientes;
          this._fk_grupo = defaultData.fk_grupo

          this._costo_aprox = defaultData.costoTotal;
          this._porcentaje_ganan = defaultData.porcentajeGanancia;
          this._superficie_total = defaultData.superficie;
          this._superficie_cons = defaultData.superficieConstruir;

          this.showLabels = true;
          this.titlePage = "Editar Obra";
          this.accion = "update";
          this.textoBtn = "Guardar";
        }

        this.frmData = this.frmBuilder.group({
          id_obra: [this._id_obra],
          identificador: [this._identificador],
          nombre: [this._nombre, Validators.required],
          calle: [this._calle, Validators.required],
          numExt: [this._numExt, Validators.required],
          numInt: [this._numInt],
          colonia: [this._colonia, Validators.required],
          cp: [this._cp],
          ciudad: [this._ciudad],
          municipio: [this._municipio, Validators.required],
          fechInicio: [this._fechInicio],
          fechFin: [this._fechFin],
          avance: [this._avance],
          comentario: [this._comentario],
          fk_clientes: [this._fk_clientes],
          fk_grupo: [this._fk_grupo],
          costo: [this._costo_aprox, Validators.required],
          porcentaje: [this._porcentaje_ganan, Validators.required],
          superficieTotal: [this._superficie_total, Validators.required],
          superficieConstruir: [this._superficie_cons, Validators.required],
          accion: [this.accion]
        });


      });
  }

  ngOnInit() {       
 
  }

  ionViewWillEnter(): void
  {
    this.loadingService.showLoader();
    this.equiposService.getEquipos().subscribe(
      (data) =>
      {
           
        if (data["error"] == false)
        {
          if (data["data"].length > 0)
          {
            this.equipos = data["data"];
          }
          else
          { this.showAlert("¡Ups!", "No hay equipos registrados", true); }
          // console.log(this.compras);
        }
        else
        {
          this.showAlert("¡Error!", data["msj"], true);
        }
      },
      (error) => { this.loadingService.hideLoader(); console.error(error); }
    );

    this.clientesService.getClientes().subscribe(
      (data) =>
      {
        this.loadingService.hideLoader();    
        if (data["error"] == false)
        {
          if (data["data"].length > 0)
          {
            this.clientes = data["data"];
          }
          else
          { this.showAlert("¡Ups!", "No hay clientes registrados", true); }
          // console.log(this.compras);
        }
        else
        {
          this.showAlert("¡Error!", data["msj"], true);
        }
      },
      (error) => { this.loadingService.hideLoader(); console.error(error); }
    );
  }

  guardarForm()
  {
    if(this.frmData.valid)
    {
      this.loadingService.showLoader();

      this.obrasService.registrarModificarObra(this.frmData.value).subscribe((data) =>
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
    {      
      let msj = (this.accion == "insert") ? "Campos incompletos para el registro de la obra":"Campos incompletos para la modificación de la obra";
      this.showAlert("¡Ups!", msj , false); }
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
              this.navCtrl.navigateBack('/obras');               

              // this.navCtrl.navigateRoot('/home/tabs/obras');              
    // this.router.navigate(['/obras']);
    




    

            }
          }
        }]
    });
    await promp.present();
  }

}
