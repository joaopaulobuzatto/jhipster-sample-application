import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IEndereco, NewEndereco } from '../endereco.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IEndereco for edit and NewEnderecoFormGroupInput for create.
 */
type EnderecoFormGroupInput = IEndereco | PartialWithRequiredKeyOf<NewEndereco>;

type EnderecoFormDefaults = Pick<NewEndereco, 'id'>;

type EnderecoFormGroupContent = {
  id: FormControl<IEndereco['id'] | NewEndereco['id']>;
  cep: FormControl<IEndereco['cep']>;
  logradouro: FormControl<IEndereco['logradouro']>;
  numero: FormControl<IEndereco['numero']>;
  bairro: FormControl<IEndereco['bairro']>;
  complemento: FormControl<IEndereco['complemento']>;
  pontoReferencia: FormControl<IEndereco['pontoReferencia']>;
  cidade: FormControl<IEndereco['cidade']>;
  uf: FormControl<IEndereco['uf']>;
  licenca: FormControl<IEndereco['licenca']>;
};

export type EnderecoFormGroup = FormGroup<EnderecoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class EnderecoFormService {
  createEnderecoFormGroup(endereco: EnderecoFormGroupInput = { id: null }): EnderecoFormGroup {
    const enderecoRawValue = {
      ...this.getFormDefaults(),
      ...endereco,
    };
    return new FormGroup<EnderecoFormGroupContent>({
      id: new FormControl(
        { value: enderecoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      cep: new FormControl(enderecoRawValue.cep, {
        validators: [Validators.maxLength(20)],
      }),
      logradouro: new FormControl(enderecoRawValue.logradouro, {
        validators: [Validators.maxLength(100)],
      }),
      numero: new FormControl(enderecoRawValue.numero, {
        validators: [Validators.maxLength(20)],
      }),
      bairro: new FormControl(enderecoRawValue.bairro, {
        validators: [Validators.maxLength(100)],
      }),
      complemento: new FormControl(enderecoRawValue.complemento, {
        validators: [Validators.maxLength(100)],
      }),
      pontoReferencia: new FormControl(enderecoRawValue.pontoReferencia, {
        validators: [Validators.maxLength(100)],
      }),
      cidade: new FormControl(enderecoRawValue.cidade, {
        validators: [Validators.maxLength(100)],
      }),
      uf: new FormControl(enderecoRawValue.uf, {
        validators: [Validators.maxLength(2)],
      }),
      licenca: new FormControl(enderecoRawValue.licenca),
    });
  }

  getEndereco(form: EnderecoFormGroup): IEndereco | NewEndereco {
    return form.getRawValue() as IEndereco | NewEndereco;
  }

  resetForm(form: EnderecoFormGroup, endereco: EnderecoFormGroupInput): void {
    const enderecoRawValue = { ...this.getFormDefaults(), ...endereco };
    form.reset(
      {
        ...enderecoRawValue,
        id: { value: enderecoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): EnderecoFormDefaults {
    return {
      id: null,
    };
  }
}
