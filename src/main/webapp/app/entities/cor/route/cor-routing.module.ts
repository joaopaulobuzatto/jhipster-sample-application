import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CorComponent } from '../list/cor.component';
import { CorDetailComponent } from '../detail/cor-detail.component';
import { CorUpdateComponent } from '../update/cor-update.component';
import { CorRoutingResolveService } from './cor-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const corRoute: Routes = [
  {
    path: '',
    component: CorComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CorDetailComponent,
    resolve: {
      cor: CorRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CorUpdateComponent,
    resolve: {
      cor: CorRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CorUpdateComponent,
    resolve: {
      cor: CorRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(corRoute)],
  exports: [RouterModule],
})
export class CorRoutingModule {}
