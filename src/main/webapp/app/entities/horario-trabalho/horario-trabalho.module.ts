import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { HorarioTrabalhoComponent } from './list/horario-trabalho.component';
import { HorarioTrabalhoDetailComponent } from './detail/horario-trabalho-detail.component';
import { HorarioTrabalhoUpdateComponent } from './update/horario-trabalho-update.component';
import { HorarioTrabalhoDeleteDialogComponent } from './delete/horario-trabalho-delete-dialog.component';
import { HorarioTrabalhoRoutingModule } from './route/horario-trabalho-routing.module';

@NgModule({
  imports: [SharedModule, HorarioTrabalhoRoutingModule],
  declarations: [
    HorarioTrabalhoComponent,
    HorarioTrabalhoDetailComponent,
    HorarioTrabalhoUpdateComponent,
    HorarioTrabalhoDeleteDialogComponent,
  ],
})
export class HorarioTrabalhoModule {}
