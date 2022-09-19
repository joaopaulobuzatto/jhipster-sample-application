import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { UsuarioFilialComponent } from '../list/usuario-filial.component';
import { UsuarioFilialDetailComponent } from '../detail/usuario-filial-detail.component';
import { UsuarioFilialUpdateComponent } from '../update/usuario-filial-update.component';
import { UsuarioFilialRoutingResolveService } from './usuario-filial-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const usuarioFilialRoute: Routes = [
  {
    path: '',
    component: UsuarioFilialComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: UsuarioFilialDetailComponent,
    resolve: {
      usuarioFilial: UsuarioFilialRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: UsuarioFilialUpdateComponent,
    resolve: {
      usuarioFilial: UsuarioFilialRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: UsuarioFilialUpdateComponent,
    resolve: {
      usuarioFilial: UsuarioFilialRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(usuarioFilialRoute)],
  exports: [RouterModule],
})
export class UsuarioFilialRoutingModule {}
