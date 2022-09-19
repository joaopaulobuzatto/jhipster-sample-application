import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ArrCepComponent } from '../list/arr-cep.component';
import { ArrCepDetailComponent } from '../detail/arr-cep-detail.component';
import { ArrCepUpdateComponent } from '../update/arr-cep-update.component';
import { ArrCepRoutingResolveService } from './arr-cep-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const arrCepRoute: Routes = [
  {
    path: '',
    component: ArrCepComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ArrCepDetailComponent,
    resolve: {
      arrCep: ArrCepRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ArrCepUpdateComponent,
    resolve: {
      arrCep: ArrCepRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ArrCepUpdateComponent,
    resolve: {
      arrCep: ArrCepRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(arrCepRoute)],
  exports: [RouterModule],
})
export class ArrCepRoutingModule {}
