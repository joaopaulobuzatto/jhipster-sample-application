import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { DetentorAnexoArquivoFormService, DetentorAnexoArquivoFormGroup } from './detentor-anexo-arquivo-form.service';
import { IDetentorAnexoArquivo } from '../detentor-anexo-arquivo.model';
import { DetentorAnexoArquivoService } from '../service/detentor-anexo-arquivo.service';
import { ILicenca } from 'app/entities/licenca/licenca.model';
import { LicencaService } from 'app/entities/licenca/service/licenca.service';
import { IUsuario } from 'app/entities/usuario/usuario.model';
import { UsuarioService } from 'app/entities/usuario/service/usuario.service';

@Component({
  selector: 'jhi-detentor-anexo-arquivo-update',
  templateUrl: './detentor-anexo-arquivo-update.component.html',
})
export class DetentorAnexoArquivoUpdateComponent implements OnInit {
  isSaving = false;
  detentorAnexoArquivo: IDetentorAnexoArquivo | null = null;

  licencasSharedCollection: ILicenca[] = [];
  usuariosSharedCollection: IUsuario[] = [];

  editForm: DetentorAnexoArquivoFormGroup = this.detentorAnexoArquivoFormService.createDetentorAnexoArquivoFormGroup();

  constructor(
    protected detentorAnexoArquivoService: DetentorAnexoArquivoService,
    protected detentorAnexoArquivoFormService: DetentorAnexoArquivoFormService,
    protected licencaService: LicencaService,
    protected usuarioService: UsuarioService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareLicenca = (o1: ILicenca | null, o2: ILicenca | null): boolean => this.licencaService.compareLicenca(o1, o2);

  compareUsuario = (o1: IUsuario | null, o2: IUsuario | null): boolean => this.usuarioService.compareUsuario(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ detentorAnexoArquivo }) => {
      this.detentorAnexoArquivo = detentorAnexoArquivo;
      if (detentorAnexoArquivo) {
        this.updateForm(detentorAnexoArquivo);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const detentorAnexoArquivo = this.detentorAnexoArquivoFormService.getDetentorAnexoArquivo(this.editForm);
    if (detentorAnexoArquivo.id !== null) {
      this.subscribeToSaveResponse(this.detentorAnexoArquivoService.update(detentorAnexoArquivo));
    } else {
      this.subscribeToSaveResponse(this.detentorAnexoArquivoService.create(detentorAnexoArquivo));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDetentorAnexoArquivo>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(detentorAnexoArquivo: IDetentorAnexoArquivo): void {
    this.detentorAnexoArquivo = detentorAnexoArquivo;
    this.detentorAnexoArquivoFormService.resetForm(this.editForm, detentorAnexoArquivo);

    this.licencasSharedCollection = this.licencaService.addLicencaToCollectionIfMissing<ILicenca>(
      this.licencasSharedCollection,
      detentorAnexoArquivo.licenca
    );
    this.usuariosSharedCollection = this.usuarioService.addUsuarioToCollectionIfMissing<IUsuario>(
      this.usuariosSharedCollection,
      detentorAnexoArquivo.usuarioCriador
    );
  }

  protected loadRelationshipsOptions(): void {
    this.licencaService
      .query()
      .pipe(map((res: HttpResponse<ILicenca[]>) => res.body ?? []))
      .pipe(
        map((licencas: ILicenca[]) =>
          this.licencaService.addLicencaToCollectionIfMissing<ILicenca>(licencas, this.detentorAnexoArquivo?.licenca)
        )
      )
      .subscribe((licencas: ILicenca[]) => (this.licencasSharedCollection = licencas));

    this.usuarioService
      .query()
      .pipe(map((res: HttpResponse<IUsuario[]>) => res.body ?? []))
      .pipe(
        map((usuarios: IUsuario[]) =>
          this.usuarioService.addUsuarioToCollectionIfMissing<IUsuario>(usuarios, this.detentorAnexoArquivo?.usuarioCriador)
        )
      )
      .subscribe((usuarios: IUsuario[]) => (this.usuariosSharedCollection = usuarios));
  }
}
