import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, AlertController, Platform, ToastController, ActionSheetController } from '@ionic/angular';
import { LoadingService } from '../services/loading/loading.service';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';


import { ClientesService } from '../services/clientes/clientes.service';
import { ObrasService } from '../services/obras/obras.service';
import { ProveedoresService } from '../services/proveedores/proveedores.service';
import { ContratistasService } from '../services/contratistas/contratistas.service';
import { ComprasService } from '../services/compras/compras.service';
import { FrentesService } from '../services/frentes/frentes.service';

import { Ionic4DatepickerModalComponent } from '@logisticinfotech/ionic4-datepicker';
import { ModalController } from '@ionic/angular';

import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';


import { ImageModalPage } from '../image-modal/image-modal.page';


@Component({
  selector: 'app-compra-form',
  templateUrl: './compra-form.page.html',
  styleUrls: ['./compra-form.page.scss'],
})
export class CompraFormPage implements OnInit {

  fotoComprobante = "No se ha adjuntado fotografía";
  image: string = ""; //Variable para almacenar el string base64 de la imagen tomada
  _usuCreacion: number = -1;
  _fechaCompra: any;

  datePickerObjFecha: any = {};
  datePickerObjPeriodo: any = {};
  selectedDate;
  defaultDate: any;

  urlOrigen = "";
  idObra = "";
  datas: any = {};


  //Variables para almacenar datos de los WS
  clientes: any[] = [];
  obras: any[] = [];
  proveedores: any[] = [];
  contratistas: any[] = [];
  frentes: any[] = [];

  //Variables de comportamiento de interfaz
  showLabels: boolean = false;
  titlePage = "Nueva Compra";
  accion: string = "insert";
  textoBtn = "Guardar Compra";

  //Arreglos estaticos
  arrUnidad: string[] = ["Camión", "Kilo", "Litros", "Metros", "Pieza", "Pipa", "Tonelada"];
  unidades: string[] = ["Caja", "Camión", "Días", "Hora", "Kilo", "Litros", "Lote", "Metros", "Metros cuadrados", "Metros cubicos", "Pieza", "Pipa", "Tonelada", "Viaje"];
 

  //Variable para el formulario
  frmData: FormGroup;
  //#region 
  _id_compra: number = null;
  _fk_obra: number = null;
  _fk_cliente: number = null;
  _fk_proveedor: number = null;
  _fk_contratista: number = null;
  _semana: any = "";
  _factura: any = "";
  _fecha_compra: any = "";
  _fecha_inicial: any = "";
  _fecha_final: any = "";
  _perio_inicial: any = "";
  _perio_final: any = "";
  _cantidad: any = "";
  _descripcion: any = "";
  _unidad: any = "";
  _frente: any = "";
  _proceso: any = "";
  _subtotal: any = "";
  _importe: any = "";
  _costo: any = "";
  _iva: any = "";
  _notas: any = "";
  _foto: any = null;
  //#endregion
  
  constructor(    
    public navCtrl: NavController,        
    private comprasService: ComprasService,
    public alertCtrl: AlertController,
    private frmBuilder: FormBuilder,
    private obraService: ObrasService,
    private clienteService: ClientesService,
    private proveedoresService: ProveedoresService,  
    private activatedroute: ActivatedRoute,
    private contratistaService: ContratistasService,
    private frentesService: FrentesService,
    private camera: Camera,
    private modalCtrl: ModalController,
    public datepipe: DatePipe,
    private router: Router,
    private loadingService: LoadingService,
    private plt: Platform,
    private toastController: ToastController,
    private actionSheetController: ActionSheetController

  ) { 
    this.activatedroute.params.subscribe(defaultData => {
            

      this.urlOrigen = "/tabs/compras";

      if(defaultData.id != null){      

        //--Convertir fecha bd a type        
        let newFecha = this.convertToDate(defaultData.fecha).toDateString();        
        let newFechaIni = this.convertToDate(defaultData.fechInicial).toDateString();        
        let newFechaFin = this.convertToDate(defaultData.fechFinal).toDateString();
                

        this._id_compra = defaultData.id;
        this._fk_obra = defaultData.fk_obra;
        this._fk_cliente = defaultData.fk_clientes;
        this._fk_proveedor = defaultData.fk_proveedor;
        this._fk_contratista = defaultData.fk_contratista;
        this._semana = defaultData.semana;
        this._factura = defaultData.factura;
        this._fecha_compra = newFecha;//defaultData.fecha;
        this._fecha_inicial = newFechaIni;//defaultData.fechInicial;
        this._fecha_final = newFechaFin;//defaultData.fechFinal;
        this._descripcion = defaultData.descripcion;        
        this._cantidad = defaultData.cantidad;        
        this._proceso = defaultData.proceso;
        this._frente = defaultData.frente;
        this._unidad = defaultData.unidad;
        this._importe = defaultData.importe;
        this._costo = defaultData.costo
        this._subtotal = defaultData.subtotal;
        this._iva = defaultData.iva;
        this._notas = defaultData.comentario;
        this._foto = defaultData.foto;

        this.titlePage = "Editar Compra";
        this.accion = "update";
        this.textoBtn = "Guardar";

        this.idObra = defaultData.fk_obra;
        this.urlOrigen = defaultData.url;
        this.image = defaultData.foto;
        
        this.onClienteChange(this._fk_cliente)
        
      }
      this.frmData = this.frmBuilder.group({
        id_compra: [this._id_compra],        
        descripcion: [this._descripcion, Validators.required],
        semana: [this._semana, Validators.required],
        factura: [this._factura, Validators.required],
        fecha: [this._fecha_compra, Validators.required],
        cantidad: [this._cantidad, Validators.required],
        proceso: [this._proceso, Validators.required],
        frente: [this._frente],
        unidad: [this._unidad],
        importe: [this._importe, Validators.required],
        costo: [this._costo, Validators.required],
        subtotal: [this._subtotal],
        iva: [this._iva],
        comentario: [this._notas],        
        fk_cliente: [this._fk_cliente, Validators.required],
        fk_obra: [this._fk_obra, Validators.required],
        fk_proveedor: [this._fk_proveedor],
        fk_contratista: [this._fk_proveedor],
        foto: [this._foto],
        fechInicial: [this._fecha_inicial, Validators.required],
        fechFinal: [this._fecha_final, Validators.required],
      });

      this.defaultDate = this._fechaCompra;
      this.onCreateDate(this.defaultDate);
      
    });
  }

  ngOnInit() {
    this.loadingService.showLoader();

    this.clienteService.getClientes().subscribe( 
      (data) =>
      {
        this.loadingService.hideLoader();

        if (data["error"] == false) //Si no hay error
        {
          if (data["data"].length > 0)
            { this.clientes = data["data"]; }
          else
            { this.clientes.push({ "nombre": "No hay Clientes Registrados" }); }
        }
        else
          { this.clientes.push({ "nombre": "Error al Cargar Clientes" }); }
      },
      (error) => { 
        this.loadingService.hideLoader();
        this.clientes.push({ "nombre": "(WS) Error al Cargar Clientes" }); }
    );

    this.proveedoresService.getProveedores().subscribe(
      (data) =>
      {
        this.loadingService.hideLoader();
        if (data["error"] == false)
        {
          if (data["data"].length > 0)
            { this.proveedores = data["data"]; }
          else
            { this.proveedores.push({ "nombre": "No hay Proveedores Registrados" }); }
        }
        else
        { this.proveedores.push({ "nombre": "Error al Cargar Proveedores" }); }
      },
      (error) => { 
        this.loadingService.hideLoader();
        this.proveedores.push({ "nombre": "(WS) Error al Cargar Proveedores" }); }
    );

    this.contratistaService.getContratistas().subscribe(
      (data) =>
      {
        this.loadingService.hideLoader();

        if (data["error"] == false)
        {
          if (data["data"].length > 0)
            { this.contratistas = data["data"]; }
          else
            { this.contratistas.push({ "nombre": "No hay Contratistas Registrados" }); }
        }
        else
        { this.proveedores.push({ "nombre": "Error al Cargar Contratistas" }); }
      },
      (error) => {
        this.loadingService.hideLoader();
         this.proveedores.push({ "nombre": "(WS) Error al Cargar Contratistas" }); }
    );

    this.frentesService.getFrentes().subscribe(
      (data) =>
      {
        this.loadingService.hideLoader();

        if (data["error"] == false)
        {
          if (data["data"].length > 0)
            { this.frentes = data["data"]; }
          else
            { this.frentes.push({ "nombre": "No hay Frentes Registrados" }); }
        }
        else
        { this.proveedores.push({ "nombre": "Error al Cargar Frentes" }); }
      },
      (error) => { 
        this.loadingService.hideLoader();
        this.proveedores.push({ "nombre": "(WS) Error al Cargar Frentes" }); }
    );
  
  }

  onClienteChange(clienteId)
  {    
    this.obras = [];
    this.loadingService.showLoader();  
    
    this.obraService.getObraByCampoEspecifico("fk_clientes", clienteId).subscribe(
      (data) =>
      {
        this.loadingService.hideLoader();

        if (data["error"] == false)
        {
          if (data["data"].length > 0)
          {
            this.obras = data["data"];
            // this.frmData.controls.fk_obra.setValue("");
          }
          else
          { this.showAlert("¡Ups!", "No hay Obras Registradas para ese Cliente", false); }
        }
        else
        { this.showAlert("¡Error!", "No fue posible cargar las Obras", false); }
      },
      (error) => { 
        this.loadingService.hideLoader();
        this.showAlert("¡Error!","Ocurrio un error inesperado en la aplicación, favor de contactar a soporte", true); }
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

  guardarForm(){  
    if(this.frmData.valid)    
    {    
      this.frmData.controls['foto'].setValue(this.image);      
      this.loadingService.showLoader();

      this.comprasService.registrarModificarCompra(this.frmData.value).subscribe((data) =>
      {        
        this.loadingService.hideLoader();

        if (data["error"] == false)
        { this.showAlert( data["msj"], "¡Correcto!", true); }
        else
        { this.showAlert( data["msj"], "¡Ups!", true); }
      },
      (error) => { console.log(error); });
    }    
    else
    { 
      this.showAlert("¡Ups!", "Complete los campos requeridos", false); 
    }
  }

  //#region Pagos
  calcularFactura(){
    
    let cantidad = parseFloat(this.frmData.controls['cantidad'].value);        
    
    let subtotal = parseFloat(this.frmData.controls['subtotal'].value);
    
    let importe = parseFloat(this.frmData.controls['importe'].value);

    let iva = 0;

    //--Calcular iva
    if(subtotal != NaN) {
      iva = subtotal * 0.16;
    if(iva > 0)
      this.frmData.controls['iva'].setValue(iva);
    else
      this.frmData.controls['iva'].setValue("");
    }
    
    if(importe == NaN || iva > 0){
      importe = subtotal + iva;
    if(importe > 0)
      this.frmData.controls['importe'].setValue(importe);
    else
      this.frmData.controls['importe'].setValue("");
    }
    

    let costo = importe / cantidad;
    if(costo > 0)
      this.frmData.controls['costo'].setValue(costo);
    else
      this.frmData.controls['costo'].setValue("");


  }  
  //#endregion

  //#region Calendario  
  onCreateDate(fecha) {    
    if(fecha == undefined || fecha == null){
      fecha = new Date();      
      fecha.setDate(fecha.getDate() +1);   
      this.defaultDate = this.getNextMonday(fecha);  
    }
      
    this.datePickerObjFecha = {     
      inputDate: this.defaultDate,      
      dateFormat: "DD-MM-yyyy",      
      // disableWeekDays: [0,2,3,4,5,6,7], // default []
      mondayFirst: false, // default false      
      titleLabel: "Seleccione", // default null
      monthsList: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],      
      momentLocale: "es-MX",
      yearInAscending: true,
      clearButton: false,
      setLabel: "Seleccionar",
      closeLabel: "Cerrar",
      showTodayButton: false, // default true:      
      tipo:"1"
      // closeOnSelect: true
    };

    this.datePickerObjPeriodo = {     
      inputDate: this.defaultDate,      
      dateFormat: "DD-MM-yyyy",      
      disableWeekDays: [0,2,3,4,5,6,7], // default []
      mondayFirst: false, // default false      
      titleLabel: "Seleccione", // default null
      monthsList: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
      weeksList: ["D","L", "M", "M", "J", "V", "S"],
      momentLocale: "es-MX",
      yearInAscending: true,
      clearButton: false,
      setLabel: "Seleccionar",
      closeLabel: "Cerrar",
      showTodayButton: false, // default true:      
      // closeOnSelect: true
      tipo:"2"
    };
  }

  async openDatePicker(tipo) { 
    
    let obj = null;
    if(tipo == 1)
      obj = this.datePickerObjFecha;
    else if(tipo == 2)    
      obj = this.datePickerObjPeriodo;
    
    const datePickerModal = await this.modalCtrl.create({
      component: Ionic4DatepickerModalComponent,
      cssClass: 'li-ionic4-datePicker',      
      componentProps: { 
         'objConfig': obj, 
         'selectedDate': this.selectedDate 
      }
    });
    
    await datePickerModal.present();
 
    datePickerModal.onDidDismiss()
      .then((data) => {        
        let date = ""
        if(data.data.date != undefined && data.data.date != null && data.data.date != "Fecha invalida"){      
          // date = this.selectedDate;
          date = data.data.date;   
          if(obj.tipo == "1"  )
            this.frmData.controls['fecha'].setValue(date);
          else if(obj.tipo == "2" ){            
            let dateFinal = this.convertToDate(date);

            let nextdate = new Date(dateFinal.getFullYear(),dateFinal.getMonth(),dateFinal.getDate()+6);
            let x = this.datepipe.transform(nextdate, 'dd-MM-yyyy');

            this.frmData.controls['fechInicial'].setValue(date);
            this.frmData.controls['fechFinal'].setValue(x);
          }
            
        }                        
      });
  }
  //#endregion

  //#region Fechas
  convertToDate(fecha){    
    let args = fecha.split('-');
    let day = args[0];
    let month = args[1];
    let year = args[2];
    let date = new Date(year+'/'+month+'/'+day);    
    return date;
  }

  getNextMonday(anyDate){
    var dayOfWeek= anyDate.getDay();
    var aux=dayOfWeek?1:-6; 
    var nextMonday= new Date();
    nextMonday.setDate(anyDate.getDate() - dayOfWeek + aux +7)
    return nextMonday;
  }
  //#endregion

  //#region Camara
  openImage(image){    
    this.modalCtrl.create({
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
    this.showConfirm();    
  }
  //#endregion

  //#region Alerts
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

  async showAlert(title, subtitle, regresar)
  {
    const promp = await this.alertCtrl.create(
    {
      message: title,
      subHeader: subtitle,
      buttons: [
        {
          text: 'Ok',
          role: 'ok',
          handler: data => {
            if (regresar)
            { 
              this.regresar();
            }
          }
        }]
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
  //#endregion
}
