import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { IpLiberadoComponent } from './list/ip-liberado.component';
import { IpLiberadoDetailComponent } from './detail/ip-liberado-detail.component';
import { IpLiberadoUpdateComponent } from './update/ip-liberado-update.component';
import { IpLiberadoDeleteDialogComponent } from './delete/ip-liberado-delete-dialog.component';
import { IpLiberadoRoutingModule } from './route/ip-liberado-routing.module';

@NgModule({
  imports: [SharedModule, IpLiberadoRoutingModule],
  declarations: [IpLiberadoComponent, IpLiberadoDetailComponent, IpLiberadoUpdateComponent, IpLiberadoDeleteDialogComponent],
})
export class IpLiberadoModule {}
