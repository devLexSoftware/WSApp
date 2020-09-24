import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    // redirectTo: 'inicio',
    // redirectTo: 'user-cliente',
    pathMatch: 'full',


    // redirectTo: 'home/tabs/home',    
    // loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)

  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
    
  },
  {
    path: 'inicio',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  }, 
  // {
  //   path: 'home',
  //   loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  // },  
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  // {
  //   path: 'tabs/avances',
  //   loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  // },
  // {
  //   path: 'home',
  //   loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  // },
  {
    path: 'clientes',
    loadChildren: () => import('./clientes/clientes.module').then( m => m.ClientesPageModule)
  },
  {
    path: 'proveedores',
    loadChildren: () => import('./proveedores/proveedores.module').then( m => m.ProveedoresPageModule)
  },
  {
    path: 'empleados',
    loadChildren: () => import('./empleados/empleados.module').then( m => m.EmpleadosPageModule)
  },
  {
    path: 'obras',
    loadChildren: () => import('./obras/obras.module').then( m => m.ObrasPageModule)
  },
  {
    path: 'compras',
    loadChildren: () => import('./compras/compras.module').then( m => m.ComprasPageModule)
  },
  {
    path: 'pedidos',
    loadChildren: () => import('./pedidos/pedidos.module').then( m => m.PedidosPageModule)
  },
  {
    path: 'equipos',
    loadChildren: () => import('./equipos/equipos.module').then( m => m.EquiposPageModule)
  },
  {
    path: 'cliente-info',
    loadChildren: () => import('./cliente-info/cliente-info.module').then( m => m.ClienteInfoPageModule)
  },
  {
    path: 'cliente-form',
    loadChildren: () => import('./cliente-form/cliente-form.module').then( m => m.ClienteFormPageModule)
  },
  {
    path: 'obra-form',
    loadChildren: () => import('./obra-form/obra-form.module').then( m => m.ObraFormPageModule)
  },
  {
    path: 'obra-info',
    loadChildren: () => import('./obra-info/obra-info.module').then( m => m.ObraInfoPageModule)
  },
  {
    path: 'proveedor-info',
    loadChildren: () => import('./proveedor-info/proveedor-info.module').then( m => m.ProveedorInfoPageModule)
  },
  {
    path: 'proveedor-form',
    loadChildren: () => import('./proveedor-form/proveedor-form.module').then( m => m.ProveedorFormPageModule)
  },
  {
    path: 'empleado-info',
    loadChildren: () => import('./empleado-info/empleado-info.module').then( m => m.EmpleadoInfoPageModule)
  },
  {
    path: 'empleado-form',
    loadChildren: () => import('./empleado-form/empleado-form.module').then( m => m.EmpleadoFormPageModule)
  },
  {
    path: 'equipo-info',
    loadChildren: () => import('./equipo-info/equipo-info.module').then( m => m.EquipoInfoPageModule)
  },
  {
    path: 'equipo-form',
    loadChildren: () => import('./equipo-form/equipo-form.module').then( m => m.EquipoFormPageModule)
  },
  {
    path: 'pedido-info',
    loadChildren: () => import('./pedido-info/pedido-info.module').then( m => m.PedidoInfoPageModule)
  },
  {
    path: 'pedido-form',
    loadChildren: () => import('./pedido-form/pedido-form.module').then( m => m.PedidoFormPageModule)
  },
  {
    path: 'pedidos-obra',
    loadChildren: () => import('./pedidos-obra/pedidos-obra.module').then( m => m.PedidosObraPageModule)
  },
  {
    path: 'compra-info',
    loadChildren: () => import('./compra-info/compra-info.module').then( m => m.CompraInfoPageModule)
  },
  {
    path: 'compra-form',
    loadChildren: () => import('./compra-form/compra-form.module').then( m => m.CompraFormPageModule)
  },
  {
    path: 'compras-obra',
    loadChildren: () => import('./compras-obra/compras-obra.module').then( m => m.ComprasObraPageModule)
  },
  {
    path: 'avances',
    loadChildren: () => import('./avances/avances.module').then( m => m.AvancesPageModule)
  },
  {
    path: 'avance-form',
    loadChildren: () => import('./avance-form/avance-form.module').then( m => m.AvanceFormPageModule)
  },
  {
    path: 'avance-info',
    loadChildren: () => import('./avance-info/avance-info.module').then( m => m.AvanceInfoPageModule)
  },
  {
    path: 'avances-obra',
    loadChildren: () => import('./avances-obra/avances-obra.module').then( m => m.AvancesObraPageModule)
  },
  {
    path: 'user-cliente',
    loadChildren: () => import('./user-cliente/user-cliente.module').then( m => m.UserClientePageModule)
  },
  {
    path: 'user-cliente-avance',
    loadChildren: () => import('./user-cliente-avance/user-cliente-avance.module').then( m => m.UserClienteAvancePageModule)
  },
  {
    path: 'image-modal',
    loadChildren: () => import('./image-modal/image-modal.module').then( m => m.ImageModalPageModule)
  },
  // {
  //   path: 'user-cliente-obras',
  //   loadChildren: () => import('./user-cliente-obras/user-cliente-obras.module').then( m => m.UserClienteObrasPageModule)
  // },
  {
    path: 'user-cliente-compras',
    loadChildren: () => import('./user-cliente-compras/user-cliente-compras.module').then( m => m.UserClienteComprasPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
