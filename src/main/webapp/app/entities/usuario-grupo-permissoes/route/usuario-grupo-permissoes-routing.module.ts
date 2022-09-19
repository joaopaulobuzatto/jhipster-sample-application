import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { UsuarioGrupoPermissoesComponent } from '../list/usuario-grupo-permissoes.component';
import { UsuarioGrupoPermissoesDetailComponent } from '../detail/usuario-grupo-permissoes-detail.component';
import { UsuarioGrupoPermissoesUpdateComponent } from '../update/usuario-grupo-permissoes-update.component';
import { UsuarioGrupoPermissoesRoutingResolveService } from './usuario-grupo-permissoes-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const usuarioGrupoPermissoesRoute: Routes = [
  {
    path: '',
    component: UsuarioGrupoPermissoesComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: UsuarioGrupoPermissoesDetailComponent,
    resolve: {
      usuarioGrupoPermissoes: UsuarioGrupoPermissoesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: UsuarioGrupoPermissoesUpdateComponent,
    resolve: {
      usuarioGrupoPermissoes: UsuarioGrupoPermissoesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: UsuarioGrupoPermissoesUpdateComponent,
    resolve: {
      usuarioGrupoPermissoes: UsuarioGrupoPermissoesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(usuarioGrupoPermissoesRoute)],
  exports: [RouterModule],
})
export class UsuarioGrupoPermissoesRoutingModule {}
