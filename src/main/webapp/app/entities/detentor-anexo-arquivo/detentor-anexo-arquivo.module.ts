import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { DetentorAnexoArquivoComponent } from './list/detentor-anexo-arquivo.component';
import { DetentorAnexoArquivoDetailComponent } from './detail/detentor-anexo-arquivo-detail.component';
import { DetentorAnexoArquivoUpdateComponent } from './update/detentor-anexo-arquivo-update.component';
import { DetentorAnexoArquivoDeleteDialogComponent } from './delete/detentor-anexo-arquivo-delete-dialog.component';
import { DetentorAnexoArquivoRoutingModule } from './route/detentor-anexo-arquivo-routing.module';

@NgModule({
  imports: [SharedModule, DetentorAnexoArquivoRoutingModule],
  declarations: [
    DetentorAnexoArquivoComponent,
    DetentorAnexoArquivoDetailComponent,
    DetentorAnexoArquivoUpdateComponent,
    DetentorAnexoArquivoDeleteDialogComponent,
  ],
})
export class DetentorAnexoArquivoModule {}
