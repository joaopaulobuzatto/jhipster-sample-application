import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { LicencaFormService, LicencaFormGroup } from './licenca-form.service';
import { ILicenca } from '../licenca.model';
import { LicencaService } from '../service/licenca.service';
import { IPessoa } from 'app/entities/pessoa/pessoa.model';
import { PessoaService } from 'app/entities/pessoa/service/pessoa.service';
import { IPessoaFisica } from 'app/entities/pessoa-fisica/pessoa-fisica.model';
import { PessoaFisicaService } from 'app/entities/pessoa-fisica/service/pessoa-fisica.service';
import { IUsuario } from 'app/entities/usuario/usuario.model';
import { UsuarioService } from 'app/entities/usuario/service/usuario.service';
import { IFilial } from 'app/entities/filial/filial.model';
import { FilialService } from 'app/entities/filial/service/filial.service';

@Component({
  selector: 'jhi-licenca-update',
  templateUrl: './licenca-update.component.html',
})
export class LicencaUpdateComponent implements OnInit {
  isSaving = false;
  licenca: ILicenca | null = null;

  pessoasSharedCollection: IPessoa[] = [];
  pessoaFisicasSharedCollection: IPessoaFisica[] = [];
  usuariosSharedCollection: IUsuario[] = [];
  filialsSharedCollection: IFilial[] = [];

  editForm: LicencaFormGroup = this.licencaFormService.createLicencaFormGroup();

  constructor(
    protected licencaService: LicencaService,
    protected licencaFormService: LicencaFormService,
    protected pessoaService: PessoaService,
    protected pessoaFisicaService: PessoaFisicaService,
    protected usuarioService: UsuarioService,
    protected filialService: FilialService,
    protected activatedRoute: ActivatedRoute
  ) {}

  comparePessoa = (o1: IPessoa | null, o2: IPessoa | null): boolean => this.pessoaService.comparePessoa(o1, o2);

  comparePessoaFisica = (o1: IPessoaFisica | null, o2: IPessoaFisica | null): boolean =>
    this.pessoaFisicaService.comparePessoaFisica(o1, o2);

  compareUsuario = (o1: IUsuario | null, o2: IUsuario | null): boolean => this.usuarioService.compareUsuario(o1, o2);

  compareFilial = (o1: IFilial | null, o2: IFilial | null): boolean => this.filialService.compareFilial(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ licenca }) => {
      this.licenca = licenca;
      if (licenca) {
        this.updateForm(licenca);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const licenca = this.licencaFormService.getLicenca(this.editForm);
    if (licenca.id !== null) {
      this.subscribeToSaveResponse(this.licencaService.update(licenca));
    } else {
      this.subscribeToSaveResponse(this.licencaService.create(licenca));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILicenca>>): void {
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

  protected updateForm(licenca: ILicenca): void {
    this.licenca = licenca;
    this.licencaFormService.resetForm(this.editForm, licenca);

    this.pessoasSharedCollection = this.pessoaService.addPessoaToCollectionIfMissing<IPessoa>(this.pessoasSharedCollection, licenca.pessoa);
    this.pessoaFisicasSharedCollection = this.pessoaFisicaService.addPessoaFisicaToCollectionIfMissing<IPessoaFisica>(
      this.pessoaFisicasSharedCollection,
      licenca.pessoaResponsavel,
      licenca.pessoaFinanceiro
    );
    this.usuariosSharedCollection = this.usuarioService.addUsuarioToCollectionIfMissing<IUsuario>(
      this.usuariosSharedCollection,
      licenca.usuarioSuporte,
      licenca.usuarioRobo
    );
    this.filialsSharedCollection = this.filialService.addFilialToCollectionIfMissing<IFilial>(
      this.filialsSharedCollection,
      licenca.filialPadrao
    );
  }

  protected loadRelationshipsOptions(): void {
    this.pessoaService
      .query()
      .pipe(map((res: HttpResponse<IPessoa[]>) => res.body ?? []))
      .pipe(map((pessoas: IPessoa[]) => this.pessoaService.addPessoaToCollectionIfMissing<IPessoa>(pessoas, this.licenca?.pessoa)))
      .subscribe((pessoas: IPessoa[]) => (this.pessoasSharedCollection = pessoas));

    this.pessoaFisicaService
      .query()
      .pipe(map((res: HttpResponse<IPessoaFisica[]>) => res.body ?? []))
      .pipe(
        map((pessoaFisicas: IPessoaFisica[]) =>
          this.pessoaFisicaService.addPessoaFisicaToCollectionIfMissing<IPessoaFisica>(
            pessoaFisicas,
            this.licenca?.pessoaResponsavel,
            this.licenca?.pessoaFinanceiro
          )
        )
      )
      .subscribe((pessoaFisicas: IPessoaFisica[]) => (this.pessoaFisicasSharedCollection = pessoaFisicas));

    this.usuarioService
      .query()
      .pipe(map((res: HttpResponse<IUsuario[]>) => res.body ?? []))
      .pipe(
        map((usuarios: IUsuario[]) =>
          this.usuarioService.addUsuarioToCollectionIfMissing<IUsuario>(usuarios, this.licenca?.usuarioSuporte, this.licenca?.usuarioRobo)
        )
      )
      .subscribe((usuarios: IUsuario[]) => (this.usuariosSharedCollection = usuarios));

    this.filialService
      .query()
      .pipe(map((res: HttpResponse<IFilial[]>) => res.body ?? []))
      .pipe(map((filials: IFilial[]) => this.filialService.addFilialToCollectionIfMissing<IFilial>(filials, this.licenca?.filialPadrao)))
      .subscribe((filials: IFilial[]) => (this.filialsSharedCollection = filials));
  }
}
