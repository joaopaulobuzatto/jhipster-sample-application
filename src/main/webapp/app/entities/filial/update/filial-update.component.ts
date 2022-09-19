import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { FilialFormService, FilialFormGroup } from './filial-form.service';
import { IFilial } from '../filial.model';
import { FilialService } from '../service/filial.service';
import { ILicenca } from 'app/entities/licenca/licenca.model';
import { LicencaService } from 'app/entities/licenca/service/licenca.service';
import { IPessoaJuridica } from 'app/entities/pessoa-juridica/pessoa-juridica.model';
import { PessoaJuridicaService } from 'app/entities/pessoa-juridica/service/pessoa-juridica.service';
import { IUsuario } from 'app/entities/usuario/usuario.model';
import { UsuarioService } from 'app/entities/usuario/service/usuario.service';

@Component({
  selector: 'jhi-filial-update',
  templateUrl: './filial-update.component.html',
})
export class FilialUpdateComponent implements OnInit {
  isSaving = false;
  filial: IFilial | null = null;

  licencasSharedCollection: ILicenca[] = [];
  pessoaJuridicasSharedCollection: IPessoaJuridica[] = [];
  usuariosSharedCollection: IUsuario[] = [];

  editForm: FilialFormGroup = this.filialFormService.createFilialFormGroup();

  constructor(
    protected filialService: FilialService,
    protected filialFormService: FilialFormService,
    protected licencaService: LicencaService,
    protected pessoaJuridicaService: PessoaJuridicaService,
    protected usuarioService: UsuarioService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareLicenca = (o1: ILicenca | null, o2: ILicenca | null): boolean => this.licencaService.compareLicenca(o1, o2);

  comparePessoaJuridica = (o1: IPessoaJuridica | null, o2: IPessoaJuridica | null): boolean =>
    this.pessoaJuridicaService.comparePessoaJuridica(o1, o2);

  compareUsuario = (o1: IUsuario | null, o2: IUsuario | null): boolean => this.usuarioService.compareUsuario(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ filial }) => {
      this.filial = filial;
      if (filial) {
        this.updateForm(filial);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const filial = this.filialFormService.getFilial(this.editForm);
    if (filial.id !== null) {
      this.subscribeToSaveResponse(this.filialService.update(filial));
    } else {
      this.subscribeToSaveResponse(this.filialService.create(filial));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFilial>>): void {
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

  protected updateForm(filial: IFilial): void {
    this.filial = filial;
    this.filialFormService.resetForm(this.editForm, filial);

    this.licencasSharedCollection = this.licencaService.addLicencaToCollectionIfMissing<ILicenca>(
      this.licencasSharedCollection,
      filial.licenca
    );
    this.pessoaJuridicasSharedCollection = this.pessoaJuridicaService.addPessoaJuridicaToCollectionIfMissing<IPessoaJuridica>(
      this.pessoaJuridicasSharedCollection,
      filial.pessoa
    );
    this.usuariosSharedCollection = this.usuarioService.addUsuarioToCollectionIfMissing<IUsuario>(
      this.usuariosSharedCollection,
      filial.usuarioCriador
    );
  }

  protected loadRelationshipsOptions(): void {
    this.licencaService
      .query()
      .pipe(map((res: HttpResponse<ILicenca[]>) => res.body ?? []))
      .pipe(map((licencas: ILicenca[]) => this.licencaService.addLicencaToCollectionIfMissing<ILicenca>(licencas, this.filial?.licenca)))
      .subscribe((licencas: ILicenca[]) => (this.licencasSharedCollection = licencas));

    this.pessoaJuridicaService
      .query()
      .pipe(map((res: HttpResponse<IPessoaJuridica[]>) => res.body ?? []))
      .pipe(
        map((pessoaJuridicas: IPessoaJuridica[]) =>
          this.pessoaJuridicaService.addPessoaJuridicaToCollectionIfMissing<IPessoaJuridica>(pessoaJuridicas, this.filial?.pessoa)
        )
      )
      .subscribe((pessoaJuridicas: IPessoaJuridica[]) => (this.pessoaJuridicasSharedCollection = pessoaJuridicas));

    this.usuarioService
      .query()
      .pipe(map((res: HttpResponse<IUsuario[]>) => res.body ?? []))
      .pipe(
        map((usuarios: IUsuario[]) => this.usuarioService.addUsuarioToCollectionIfMissing<IUsuario>(usuarios, this.filial?.usuarioCriador))
      )
      .subscribe((usuarios: IUsuario[]) => (this.usuariosSharedCollection = usuarios));
  }
}
