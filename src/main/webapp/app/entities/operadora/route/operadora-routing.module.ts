import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { OperadoraComponent } from '../list/operadora.component';
import { OperadoraDetailComponent } from '../detail/operadora-detail.component';
import { OperadoraUpdateComponent } from '../update/operadora-update.component';
import { OperadoraRoutingResolveService } from './operadora-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const operadoraRoute: Routes = [
  {
    path: '',
    component: OperadoraComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: OperadoraDetailComponent,
    resolve: {
      operadora: OperadoraRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: OperadoraUpdateComponent,
    resolve: {
      operadora: OperadoraRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: OperadoraUpdateComponent,
    resolve: {
      operadora: OperadoraRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(operadoraRoute)],
  exports: [RouterModule],
})
export class OperadoraRoutingModule {}
