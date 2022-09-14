import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IPessoaJuridica, NewPessoaJuridica } from '../pessoa-juridica.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IPessoaJuridica for edit and NewPessoaJuridicaFormGroupInput for create.
 */
type PessoaJuridicaFormGroupInput = IPessoaJuridica | PartialWithRequiredKeyOf<NewPessoaJuridica>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IPessoaJuridica | NewPessoaJuridica> = Omit<T, 'dataAbertura'> & {
  dataAbertura?: string | null;
};

type PessoaJuridicaFormRawValue = FormValueOf<IPessoaJuridica>;

type NewPessoaJuridicaFormRawValue = FormValueOf<NewPessoaJuridica>;

type PessoaJuridicaFormDefaults = Pick<NewPessoaJuridica, 'id' | 'dataAbertura'>;

type PessoaJuridicaFormGroupContent = {
  id: FormControl<PessoaJuridicaFormRawValue['id'] | NewPessoaJuridica['id']>;
  cnpj: FormControl<PessoaJuridicaFormRawValue['cnpj']>;
  razaoSocial: FormControl<PessoaJuridicaFormRawValue['razaoSocial']>;
  nomeFantasia: FormControl<PessoaJuridicaFormRawValue['nomeFantasia']>;
  codigoCnae: FormControl<PessoaJuridicaFormRawValue['codigoCnae']>;
  dataAbertura: FormControl<PessoaJuridicaFormRawValue['dataAbertura']>;
  codigoCnaePrincipal: FormControl<PessoaJuridicaFormRawValue['codigoCnaePrincipal']>;
  codigoNaturezaJuridica: FormControl<PessoaJuridicaFormRawValue['codigoNaturezaJuridica']>;
  quantidadeFuncionarios: FormControl<PessoaJuridicaFormRawValue['quantidadeFuncionarios']>;
  pessoaJuridicaLicenca: FormControl<PessoaJuridicaFormRawValue['pessoaJuridicaLicenca']>;
};

export type PessoaJuridicaFormGroup = FormGroup<PessoaJuridicaFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class PessoaJuridicaFormService {
  createPessoaJuridicaFormGroup(pessoaJuridica: PessoaJuridicaFormGroupInput = { id: null }): PessoaJuridicaFormGroup {
    const pessoaJuridicaRawValue = this.convertPessoaJuridicaToPessoaJuridicaRawValue({
      ...this.getFormDefaults(),
      ...pessoaJuridica,
    });
    return new FormGroup<PessoaJuridicaFormGroupContent>({
      id: new FormControl(
        { value: pessoaJuridicaRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      cnpj: new FormControl(pessoaJuridicaRawValue.cnpj, {
        validators: [Validators.maxLength(14)],
      }),
      razaoSocial: new FormControl(pessoaJuridicaRawValue.razaoSocial, {
        validators: [Validators.maxLength(200)],
      }),
      nomeFantasia: new FormControl(pessoaJuridicaRawValue.nomeFantasia, {
        validators: [Validators.required, Validators.maxLength(200)],
      }),
      codigoCnae: new FormControl(pessoaJuridicaRawValue.codigoCnae, {
        validators: [Validators.maxLength(50)],
      }),
      dataAbertura: new FormControl(pessoaJuridicaRawValue.dataAbertura),
      codigoCnaePrincipal: new FormControl(pessoaJuridicaRawValue.codigoCnaePrincipal, {
        validators: [Validators.maxLength(50)],
      }),
      codigoNaturezaJuridica: new FormControl(pessoaJuridicaRawValue.codigoNaturezaJuridica, {
        validators: [Validators.maxLength(50)],
      }),
      quantidadeFuncionarios: new FormControl(pessoaJuridicaRawValue.quantidadeFuncionarios),
      pessoaJuridicaLicenca: new FormControl(pessoaJuridicaRawValue.pessoaJuridicaLicenca),
    });
  }

  getPessoaJuridica(form: PessoaJuridicaFormGroup): IPessoaJuridica | NewPessoaJuridica {
    return this.convertPessoaJuridicaRawValueToPessoaJuridica(
      form.getRawValue() as PessoaJuridicaFormRawValue | NewPessoaJuridicaFormRawValue
    );
  }

  resetForm(form: PessoaJuridicaFormGroup, pessoaJuridica: PessoaJuridicaFormGroupInput): void {
    const pessoaJuridicaRawValue = this.convertPessoaJuridicaToPessoaJuridicaRawValue({ ...this.getFormDefaults(), ...pessoaJuridica });
    form.reset(
      {
        ...pessoaJuridicaRawValue,
        id: { value: pessoaJuridicaRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): PessoaJuridicaFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      dataAbertura: currentTime,
    };
  }

  private convertPessoaJuridicaRawValueToPessoaJuridica(
    rawPessoaJuridica: PessoaJuridicaFormRawValue | NewPessoaJuridicaFormRawValue
  ): IPessoaJuridica | NewPessoaJuridica {
    return {
      ...rawPessoaJuridica,
      dataAbertura: dayjs(rawPessoaJuridica.dataAbertura, DATE_TIME_FORMAT),
    };
  }

  private convertPessoaJuridicaToPessoaJuridicaRawValue(
    pessoaJuridica: IPessoaJuridica | (Partial<NewPessoaJuridica> & PessoaJuridicaFormDefaults)
  ): PessoaJuridicaFormRawValue | PartialWithRequiredKeyOf<NewPessoaJuridicaFormRawValue> {
    return {
      ...pessoaJuridica,
      dataAbertura: pessoaJuridica.dataAbertura ? pessoaJuridica.dataAbertura.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
