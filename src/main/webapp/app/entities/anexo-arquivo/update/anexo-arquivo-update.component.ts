import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { AnexoArquivoFormService, AnexoArquivoFormGroup } from './anexo-arquivo-form.service';
import { IAnexoArquivo } from '../anexo-arquivo.model';
import { AnexoArquivoService } from '../service/anexo-arquivo.service';
import { ILicenca } from 'app/entities/licenca/licenca.model';
import { LicencaService } from 'app/entities/licenca/service/licenca.service';
import { IUsuario } from 'app/entities/usuario/usuario.model';
import { UsuarioService } from 'app/entities/usuario/service/usuario.service';
import { IDetentorAnexoArquivo } from 'app/entities/detentor-anexo-arquivo/detentor-anexo-arquivo.model';
import { DetentorAnexoArquivoService } from 'app/entities/detentor-anexo-arquivo/service/detentor-anexo-arquivo.service';
import { ITipoDeDocumentoAnexavel } from 'app/entities/tipo-de-documento-anexavel/tipo-de-documento-anexavel.model';
import { TipoDeDocumentoAnexavelService } from 'app/entities/tipo-de-documento-anexavel/service/tipo-de-documento-anexavel.service';
import { TipoOrigemAnexoArquivo } from 'app/entities/enumerations/tipo-origem-anexo-arquivo.model';

@Component({
  selector: 'jhi-anexo-arquivo-update',
  templateUrl: './anexo-arquivo-update.component.html',
})
export class AnexoArquivoUpdateComponent implements OnInit {
  isSaving = false;
  anexoArquivo: IAnexoArquivo | null = null;
  tipoOrigemAnexoArquivoValues = Object.keys(TipoOrigemAnexoArquivo);

  licencasSharedCollection: ILicenca[] = [];
  usuariosSharedCollection: IUsuario[] = [];
  detentorAnexoArquivosSharedCollection: IDetentorAnexoArquivo[] = [];
  tipoDeDocumentoAnexavelsSharedCollection: ITipoDeDocumentoAnexavel[] = [];

  editForm: AnexoArquivoFormGroup = this.anexoArquivoFormService.createAnexoArquivoFormGroup();

  constructor(
    protected anexoArquivoService: AnexoArquivoService,
    protected anexoArquivoFormService: AnexoArquivoFormService,
    protected licencaService: LicencaService,
    protected usuarioService: UsuarioService,
    protected detentorAnexoArquivoService: DetentorAnexoArquivoService,
    protected tipoDeDocumentoAnexavelService: TipoDeDocumentoAnexavelService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareLicenca = (o1: ILicenca | null, o2: ILicenca | null): boolean => this.licencaService.compareLicenca(o1, o2);

  compareUsuario = (o1: IUsuario | null, o2: IUsuario | null): boolean => this.usuarioService.compareUsuario(o1, o2);

  compareDetentorAnexoArquivo = (o1: IDetentorAnexoArquivo | null, o2: IDetentorAnexoArquivo | null): boolean =>
    this.detentorAnexoArquivoService.compareDetentorAnexoArquivo(o1, o2);

  compareTipoDeDocumentoAnexavel = (o1: ITipoDeDocumentoAnexavel | null, o2: ITipoDeDocumentoAnexavel | null): boolean =>
    this.tipoDeDocumentoAnexavelService.compareTipoDeDocumentoAnexavel(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ anexoArquivo }) => {
      this.anexoArquivo = anexoArquivo;
      if (anexoArquivo) {
        this.updateForm(anexoArquivo);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const anexoArquivo = this.anexoArquivoFormService.getAnexoArquivo(this.editForm);
    if (anexoArquivo.id !== null) {
      this.subscribeToSaveResponse(this.anexoArquivoService.update(anexoArquivo));
    } else {
      this.subscribeToSaveResponse(this.anexoArquivoService.create(anexoArquivo));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAnexoArquivo>>): void {
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

  protected updateForm(anexoArquivo: IAnexoArquivo): void {
    this.anexoArquivo = anexoArquivo;
    this.anexoArquivoFormService.resetForm(this.editForm, anexoArquivo);

    this.licencasSharedCollection = this.licencaService.addLicencaToCollectionIfMissing<ILicenca>(
      this.licencasSharedCollection,
      anexoArquivo.licenca
    );
    this.usuariosSharedCollection = this.usuarioService.addUsuarioToCollectionIfMissing<IUsuario>(
      this.usuariosSharedCollection,
      anexoArquivo.usuarioCriador
    );
    this.detentorAnexoArquivosSharedCollection =
      this.detentorAnexoArquivoService.addDetentorAnexoArquivoToCollectionIfMissing<IDetentorAnexoArquivo>(
        this.detentorAnexoArquivosSharedCollection,
        anexoArquivo.detentorAnexoArquivo
      );
    this.tipoDeDocumentoAnexavelsSharedCollection =
      this.tipoDeDocumentoAnexavelService.addTipoDeDocumentoAnexavelToCollectionIfMissing<ITipoDeDocumentoAnexavel>(
        this.tipoDeDocumentoAnexavelsSharedCollection,
        anexoArquivo.tipoDeDocumentoAnexavel
      );
  }

  protected loadRelationshipsOptions(): void {
    this.licencaService
      .query()
      .pipe(map((res: HttpResponse<ILicenca[]>) => res.body ?? []))
      .pipe(
        map((licencas: ILicenca[]) => this.licencaService.addLicencaToCollectionIfMissing<ILicenca>(licencas, this.anexoArquivo?.licenca))
      )
      .subscribe((licencas: ILicenca[]) => (this.licencasSharedCollection = licencas));

    this.usuarioService
      .query()
      .pipe(map((res: HttpResponse<IUsuario[]>) => res.body ?? []))
      .pipe(
        map((usuarios: IUsuario[]) =>
          this.usuarioService.addUsuarioToCollectionIfMissing<IUsuario>(usuarios, this.anexoArquivo?.usuarioCriador)
        )
      )
      .subscribe((usuarios: IUsuario[]) => (this.usuariosSharedCollection = usuarios));

    this.detentorAnexoArquivoService
      .query()
      .pipe(map((res: HttpResponse<IDetentorAnexoArquivo[]>) => res.body ?? []))
      .pipe(
        map((detentorAnexoArquivos: IDetentorAnexoArquivo[]) =>
          this.detentorAnexoArquivoService.addDetentorAnexoArquivoToCollectionIfMissing<IDetentorAnexoArquivo>(
            detentorAnexoArquivos,
            this.anexoArquivo?.detentorAnexoArquivo
          )
        )
      )
      .subscribe((detentorAnexoArquivos: IDetentorAnexoArquivo[]) => (this.detentorAnexoArquivosSharedCollection = detentorAnexoArquivos));

    this.tipoDeDocumentoAnexavelService
      .query()
      .pipe(map((res: HttpResponse<ITipoDeDocumentoAnexavel[]>) => res.body ?? []))
      .pipe(
        map((tipoDeDocumentoAnexavels: ITipoDeDocumentoAnexavel[]) =>
          this.tipoDeDocumentoAnexavelService.addTipoDeDocumentoAnexavelToCollectionIfMissing<ITipoDeDocumentoAnexavel>(
            tipoDeDocumentoAnexavels,
            this.anexoArquivo?.tipoDeDocumentoAnexavel
          )
        )
      )
      .subscribe(
        (tipoDeDocumentoAnexavels: ITipoDeDocumentoAnexavel[]) => (this.tipoDeDocumentoAnexavelsSharedCollection = tipoDeDocumentoAnexavels)
      );
  }
}
