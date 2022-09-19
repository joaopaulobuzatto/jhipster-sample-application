import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { FeriadoComponent } from './list/feriado.component';
import { FeriadoDetailComponent } from './detail/feriado-detail.component';
import { FeriadoUpdateComponent } from './update/feriado-update.component';
import { FeriadoDeleteDialogComponent } from './delete/feriado-delete-dialog.component';
import { FeriadoRoutingModule } from './route/feriado-routing.module';

@NgModule({
  imports: [SharedModule, FeriadoRoutingModule],
  declarations: [FeriadoComponent, FeriadoDetailComponent, FeriadoUpdateComponent, FeriadoDeleteDialogComponent],
})
export class FeriadoModule {}
