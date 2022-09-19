import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ServicoComponent } from './list/servico.component';
import { ServicoDetailComponent } from './detail/servico-detail.component';
import { ServicoUpdateComponent } from './update/servico-update.component';
import { ServicoDeleteDialogComponent } from './delete/servico-delete-dialog.component';
import { ServicoRoutingModule } from './route/servico-routing.module';

@NgModule({
  imports: [SharedModule, ServicoRoutingModule],
  declarations: [ServicoComponent, ServicoDetailComponent, ServicoUpdateComponent, ServicoDeleteDialogComponent],
})
export class ServicoModule {}
