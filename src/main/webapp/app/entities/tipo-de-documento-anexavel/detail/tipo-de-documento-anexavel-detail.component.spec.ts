import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TipoDeDocumentoAnexavelDetailComponent } from './tipo-de-documento-anexavel-detail.component';

describe('TipoDeDocumentoAnexavel Management Detail Component', () => {
  let comp: TipoDeDocumentoAnexavelDetailComponent;
  let fixture: ComponentFixture<TipoDeDocumentoAnexavelDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TipoDeDocumentoAnexavelDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ tipoDeDocumentoAnexavel: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(TipoDeDocumentoAnexavelDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(TipoDeDocumentoAnexavelDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load tipoDeDocumentoAnexavel on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.tipoDeDocumentoAnexavel).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
