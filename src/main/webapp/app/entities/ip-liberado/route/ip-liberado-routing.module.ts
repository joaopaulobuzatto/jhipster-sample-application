import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { IpLiberadoComponent } from '../list/ip-liberado.component';
import { IpLiberadoDetailComponent } from '../detail/ip-liberado-detail.component';
import { IpLiberadoUpdateComponent } from '../update/ip-liberado-update.component';
import { IpLiberadoRoutingResolveService } from './ip-liberado-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const ipLiberadoRoute: Routes = [
  {
    path: '',
    component: IpLiberadoComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: IpLiberadoDetailComponent,
    resolve: {
      ipLiberado: IpLiberadoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: IpLiberadoUpdateComponent,
    resolve: {
      ipLiberado: IpLiberadoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: IpLiberadoUpdateComponent,
    resolve: {
      ipLiberado: IpLiberadoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(ipLiberadoRoute)],
  exports: [RouterModule],
})
export class IpLiberadoRoutingModule {}
