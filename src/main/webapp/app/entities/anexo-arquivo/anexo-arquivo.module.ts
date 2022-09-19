import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { AnexoArquivoComponent } from './list/anexo-arquivo.component';
import { AnexoArquivoDetailComponent } from './detail/anexo-arquivo-detail.component';
import { AnexoArquivoUpdateComponent } from './update/anexo-arquivo-update.component';
import { AnexoArquivoDeleteDialogComponent } from './delete/anexo-arquivo-delete-dialog.component';
import { AnexoArquivoRoutingModule } from './route/anexo-arquivo-routing.module';

@NgModule({
  imports: [SharedModule, AnexoArquivoRoutingModule],
  declarations: [AnexoArquivoComponent, AnexoArquivoDetailComponent, AnexoArquivoUpdateComponent, AnexoArquivoDeleteDialogComponent],
})
export class AnexoArquivoModule {}
