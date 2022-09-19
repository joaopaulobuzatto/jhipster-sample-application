import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { HorarioTrabalhoPeriodoComponent } from './list/horario-trabalho-periodo.component';
import { HorarioTrabalhoPeriodoDetailComponent } from './detail/horario-trabalho-periodo-detail.component';
import { HorarioTrabalhoPeriodoUpdateComponent } from './update/horario-trabalho-periodo-update.component';
import { HorarioTrabalhoPeriodoDeleteDialogComponent } from './delete/horario-trabalho-periodo-delete-dialog.component';
import { HorarioTrabalhoPeriodoRoutingModule } from './route/horario-trabalho-periodo-routing.module';

@NgModule({
  imports: [SharedModule, HorarioTrabalhoPeriodoRoutingModule],
  declarations: [
    HorarioTrabalhoPeriodoComponent,
    HorarioTrabalhoPeriodoDetailComponent,
    HorarioTrabalhoPeriodoUpdateComponent,
    HorarioTrabalhoPeriodoDeleteDialogComponent,
  ],
})
export class HorarioTrabalhoPeriodoModule {}
