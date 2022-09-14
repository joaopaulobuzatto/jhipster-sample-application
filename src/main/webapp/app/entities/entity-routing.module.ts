import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'usuario',
        data: { pageTitle: 'Usuarios' },
        loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioModule),
      },
      {
        path: 'licenca',
        data: { pageTitle: 'Licencas' },
        loadChildren: () => import('./licenca/licenca.module').then(m => m.LicencaModule),
      },
      {
        path: 'endereco',
        data: { pageTitle: 'Enderecos' },
        loadChildren: () => import('./endereco/endereco.module').then(m => m.EnderecoModule),
      },
      {
        path: 'pessoa',
        data: { pageTitle: 'Pessoas' },
        loadChildren: () => import('./pessoa/pessoa.module').then(m => m.PessoaModule),
      },
      {
        path: 'pessoa-fisica',
        data: { pageTitle: 'PessoaFisicas' },
        loadChildren: () => import('./pessoa-fisica/pessoa-fisica.module').then(m => m.PessoaFisicaModule),
      },
      {
        path: 'pessoa-juridica',
        data: { pageTitle: 'PessoaJuridicas' },
        loadChildren: () => import('./pessoa-juridica/pessoa-juridica.module').then(m => m.PessoaJuridicaModule),
      },
      {
        path: 'horario-trabalho',
        data: { pageTitle: 'HorarioTrabalhos' },
        loadChildren: () => import('./horario-trabalho/horario-trabalho.module').then(m => m.HorarioTrabalhoModule),
      },
      {
        path: 'origem',
        data: { pageTitle: 'Origems' },
        loadChildren: () => import('./origem/origem.module').then(m => m.OrigemModule),
      },
      {
        path: 'filial',
        data: { pageTitle: 'Filials' },
        loadChildren: () => import('./filial/filial.module').then(m => m.FilialModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
