import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ServicoFormService, ServicoFormGroup } from './servico-form.service';
import { IServico } from '../servico.model';
import { ServicoService } from '../service/servico.service';
import { IUsuario } from 'app/entities/usuario/usuario.model';
import { UsuarioService } from 'app/entities/usuario/service/usuario.service';

@Component({
  selector: 'jhi-servico-update',
  templateUrl: './servico-update.component.html',
})
export class ServicoUpdateComponent implements OnInit {
  isSaving = false;
  servico: IServico | null = null;

  usuariosSharedCollection: IUsuario[] = [];

  editForm: ServicoFormGroup = this.servicoFormService.createServicoFormGroup();

  constructor(
    protected servicoService: ServicoService,
    protected servicoFormService: ServicoFormService,
    protected usuarioService: UsuarioService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareUsuario = (o1: IUsuario | null, o2: IUsuario | null): boolean => this.usuarioService.compareUsuario(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ servico }) => {
      this.servico = servico;
      if (servico) {
        this.updateForm(servico);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const servico = this.servicoFormService.getServico(this.editForm);
    if (servico.id !== null) {
      this.subscribeToSaveResponse(this.servicoService.update(servico));
    } else {
      this.subscribeToSaveResponse(this.servicoService.create(servico));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IServico>>): void {
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

  protected updateForm(servico: IServico): void {
    this.servico = servico;
    this.servicoFormService.resetForm(this.editForm, servico);

    this.usuariosSharedCollection = this.usuarioService.addUsuarioToCollectionIfMissing<IUsuario>(
      this.usuariosSharedCollection,
      servico.usuarioCriador
    );
  }

  protected loadRelationshipsOptions(): void {
    this.usuarioService
      .query()
      .pipe(map((res: HttpResponse<IUsuario[]>) => res.body ?? []))
      .pipe(
        map((usuarios: IUsuario[]) => this.usuarioService.addUsuarioToCollectionIfMissing<IUsuario>(usuarios, this.servico?.usuarioCriador))
      )
      .subscribe((usuarios: IUsuario[]) => (this.usuariosSharedCollection = usuarios));
  }
}
