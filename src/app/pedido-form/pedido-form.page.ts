import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PedidosService } from '../services/pedidos/pedidos.service';
import { NavController, AlertController,  Platform, ToastController, ActionSheetController } from '@ionic/angular';
import { LoadingService } from '../services/loading/loading.service';
import { Router } from '@angular/router';

import { ObrasService } from '../services/obras/obras.service';
import { FrentesService } from '../services/frentes/frentes.service';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { ModalController } from '@ionic/angular';
import { ImageModalPage } from '../image-modal/image-modal.page';




@Component({
  selector: 'app-pedido-form',
  templateUrl: './pedido-form.page.html',
  styleUrls: ['./pedido-form.page.scss'],
})
export class PedidoFormPage implements OnInit {
  pedido: any = { };
  datas: any = {};
  frmData: FormGroup;
  fotoComprobante = "No se ha adjuntado fotografía";
  image: string = "";
  obras: any[] = [];
  frentes: any[] = [];
  arrEstado: string[] = ["Realizado", "Aprobado", "Rechazado", "Pedido", "Entregado/Recibido"];
  urlOrigen = "";
  idObra = "";
  estadoOriginal = "";
  historial: any[] = [];
  
  //Variables de comportamiento de interfaz
  showLabels: boolean = false;
  titlePage = "Nuevo Pedido";
  accion: string = "insert";
  textoBtn = "Guardar Pedido";

  //#region Formulario  
  defaultData: any = {};
  _id_pedido: any = null;
  _fk_obra: any = null;
  _identificador: any = "";
  _frente: any = "";
  _descripcion: any = "";
  _estado: any = "";
  _foto_pedido: any = "";
  _foto_entregado: any = "";

  constructor(
    private activatedroute: ActivatedRoute,
    private router: Router,
    public navCtrl: NavController,
    private frmBuilder: FormBuilder,
    private alertCtrl: AlertController,
    private obrasService: ObrasService,
    private pedidosService: PedidosService,  
    private frentesService: FrentesService,
    private camera: Camera,
    private loadingService: LoadingService,
    private modalCtr: ModalController,
    private plt: Platform,
    private toastController: ToastController,
    private actionSheetController: ActionSheetController

  ) { 
    this.activatedroute.params.subscribe(defaultData => {
      debugger;
      console.log(defaultData);

      this.urlOrigen = "/tabs/pedidos";

      if(defaultData.id != null){                
        this._id_pedido = defaultData.id;
        this._fk_obra = defaultData.fk_obra;
        this._identificador = defaultData.identificador;
        this._frente = defaultData.frente;
        this._descripcion = defaultData.descripcion;
        this._estado = defaultData.estado;   
        this._foto_entregado = defaultData.fotoEntregado;
        this._foto_pedido = defaultData.fotoPedido;

        this.showLabels = true;
        this.titlePage = "Editar Pedido";
        this.accion = "update";
        this.textoBtn = "Guardar";

        this.estadoOriginal = defaultData.estado;
        this.urlOrigen = defaultData.url;
        this.idObra = defaultData.fk_obra;
      }

      this.frmData = this.frmBuilder.group({
        id: [this._id_pedido],
        fk_obra: [this._fk_obra],
        identificador: [this._identificador],
        frente: [this._frente, Validators.required],
        descripcion: [this._descripcion, Validators.required],
        estado: [this._estado, Validators.required],        
        accion: [this.accion],
        foto_entregado : [this._foto_entregado],
        foto_pedido: [this._foto_pedido]
      });


    });
  }

  ngOnInit() {
  }  

  ionViewWillEnter(){
    this.loadingService.showLoader();

    if(this._id_pedido != ""){
      this.pedidosService.getHistorialPedido("fk_pedido", this._id_pedido).subscribe(
        (data) =>
        {
          this.loadingService.hideLoader();      
          
          if (data["error"] == false)
          {
            if (data["data"].length > 0)
            {
              this.historial = data["data"];
            }            
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
    }

    this.obrasService.getObras().subscribe(
      (data) =>
      {
        this.loadingService.hideLoader();      
        
        if (data["error"] == false)
        {
          if (data["data"].length > 0)
          {
            this.obras = data["data"];
          }
          else
          { this.showAlert("¡Ups!", "No hay clientes registrados", true); }          
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

    this.frentesService.getFrentes().subscribe(
      (data) =>
      {
        this.loadingService.hideLoader();      
        
        if (data["error"] == false)
        {
          if (data["data"].length > 0)
          {
            this.frentes = data["data"];
          }
          else
          { this.showAlert("¡Ups!", "No hay frentes registrados", true); }
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
  }

  async selectImage(){
    const actionSheet = await this.actionSheetController.create({
      header: "Cargar Imagen",
      buttons:[{
        text: "Cargar",
        icon: 'images',
        handler: () => {
          this.tomarArchivo(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: "Camara",
        icon: 'camera',
        handler: () => {
          this.tomarArchivo(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: "Cerrar",
        icon: 'close',

        role: "cancel"
      },
    ]
    });
    await actionSheet.present();
  }

  openImage(image){    
    this.modalCtr.create({
      component: ImageModalPage,
      componentProps:{
        img: image
      }
    }).then(modal => modal.present());
  }
  

  tomarArchivo(sourceType: PictureSourceType){      
    var options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      // targetWidth: 800,
      sourceType: sourceType,
      correctOrientation: true,
      quality: 70
    };

    this.camera.getPicture(options).then(imageData =>
    {
      // this.images.push(`data:image/jpeg;base64,${imageData}`);
      this.image = `data:image/jpeg;base64,${imageData}`;
      this.fotoComprobante = "Fotografía adjunta";
      // this.source = imageData;
    }).catch(error => { console.error( error ); });
  }

  borrarImg(){
    console.log("Borrar");
    this.showConfirm();    
  }

  guardarForm(){
    console.log(this.frmData.value);

    if(this.frmData.valid && this.estadoOriginal != this.frmData.value.estado)    
    {
      this.loadingService.showLoader();
      
      if(this.frmData.value.estado == "Pedido"){
        this.frmData.value.foto_pedido = this.image;
      }
      else if(this.frmData.value.estado == "Entregado/Recibido"){
        this.frmData.value.foto_entregado = this.image;
      }
      this.pedidosService.registrarModificarPedido(this.frmData.value).subscribe((data) =>
      {        
        this.loadingService.hideLoader();      
        if (data["error"] == false)
        { this.showAlert("¡Correcto!", data["msj"], true); }
        else
        { this.showAlert("¡Ups!", data["msj"], true); }
      },
      (error) => { 
        this.loadingService.hideLoader();      
        console.log(error); });
    }
    else if(this.estadoOriginal == this.frmData.value.estado){
      this.showAlert("¡Correcto!", "No hay cambios que realizar", true);
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
              debugger;
              this.regresar();
              
            }
          }
        }]
    });
    await promp.present();
  }

  async showConfirm()
  {
    const promp = await this.alertCtrl.create(
    {
      message: "Desea borrar la imagen?",
      subHeader: "Borrar",
      buttons: [
        {
          text: 'Si',          
          handler: () => {            
            this.image = "";
          }
        },
        {
          text: 'No',                    
        },
      ]
    });
    await promp.present();
  }

  

  regresar(){
    if(this.idObra != ""){
      this.datas.id = this.idObra
      this.router.navigate([this.urlOrigen, this.datas]);                
    }
    else
      this.router.navigate([this.urlOrigen]);
  }

  

}
