import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IOfertaServico, NewOfertaServico } from '../oferta-servico.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IOfertaServico for edit and NewOfertaServicoFormGroupInput for create.
 */
type OfertaServicoFormGroupInput = IOfertaServico | PartialWithRequiredKeyOf<NewOfertaServico>;

type OfertaServicoFormDefaults = Pick<NewOfertaServico, 'id'>;

type OfertaServicoFormGroupContent = {
  id: FormControl<IOfertaServico['id'] | NewOfertaServico['id']>;
  oferta: FormControl<IOfertaServico['oferta']>;
  servico: FormControl<IOfertaServico['servico']>;
};

export type OfertaServicoFormGroup = FormGroup<OfertaServicoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class OfertaServicoFormService {
  createOfertaServicoFormGroup(ofertaServico: OfertaServicoFormGroupInput = { id: null }): OfertaServicoFormGroup {
    const ofertaServicoRawValue = {
      ...this.getFormDefaults(),
      ...ofertaServico,
    };
    return new FormGroup<OfertaServicoFormGroupContent>({
      id: new FormControl(
        { value: ofertaServicoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      oferta: new FormControl(ofertaServicoRawValue.oferta),
      servico: new FormControl(ofertaServicoRawValue.servico),
    });
  }

  getOfertaServico(form: OfertaServicoFormGroup): IOfertaServico | NewOfertaServico {
    return form.getRawValue() as IOfertaServico | NewOfertaServico;
  }

  resetForm(form: OfertaServicoFormGroup, ofertaServico: OfertaServicoFormGroupInput): void {
    const ofertaServicoRawValue = { ...this.getFormDefaults(), ...ofertaServico };
    form.reset(
      {
        ...ofertaServicoRawValue,
        id: { value: ofertaServicoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): OfertaServicoFormDefaults {
    return {
      id: null,
    };
  }
}
