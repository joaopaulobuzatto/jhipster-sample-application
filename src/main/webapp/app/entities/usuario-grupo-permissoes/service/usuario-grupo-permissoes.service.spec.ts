import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IUsuarioGrupoPermissoes } from '../usuario-grupo-permissoes.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../usuario-grupo-permissoes.test-samples';

import { UsuarioGrupoPermissoesService } from './usuario-grupo-permissoes.service';

const requireRestSample: IUsuarioGrupoPermissoes = {
  ...sampleWithRequiredData,
};

describe('UsuarioGrupoPermissoes Service', () => {
  let service: UsuarioGrupoPermissoesService;
  let httpMock: HttpTestingController;
  let expectedResult: IUsuarioGrupoPermissoes | IUsuarioGrupoPermissoes[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(UsuarioGrupoPermissoesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a UsuarioGrupoPermissoes', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const usuarioGrupoPermissoes = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(usuarioGrupoPermissoes).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a UsuarioGrupoPermissoes', () => {
      const usuarioGrupoPermissoes = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(usuarioGrupoPermissoes).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a UsuarioGrupoPermissoes', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of UsuarioGrupoPermissoes', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a UsuarioGrupoPermissoes', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addUsuarioGrupoPermissoesToCollectionIfMissing', () => {
      it('should add a UsuarioGrupoPermissoes to an empty array', () => {
        const usuarioGrupoPermissoes: IUsuarioGrupoPermissoes = sampleWithRequiredData;
        expectedResult = service.addUsuarioGrupoPermissoesToCollectionIfMissing([], usuarioGrupoPermissoes);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(usuarioGrupoPermissoes);
      });

      it('should not add a UsuarioGrupoPermissoes to an array that contains it', () => {
        const usuarioGrupoPermissoes: IUsuarioGrupoPermissoes = sampleWithRequiredData;
        const usuarioGrupoPermissoesCollection: IUsuarioGrupoPermissoes[] = [
          {
            ...usuarioGrupoPermissoes,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addUsuarioGrupoPermissoesToCollectionIfMissing(usuarioGrupoPermissoesCollection, usuarioGrupoPermissoes);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a UsuarioGrupoPermissoes to an array that doesn't contain it", () => {
        const usuarioGrupoPermissoes: IUsuarioGrupoPermissoes = sampleWithRequiredData;
        const usuarioGrupoPermissoesCollection: IUsuarioGrupoPermissoes[] = [sampleWithPartialData];
        expectedResult = service.addUsuarioGrupoPermissoesToCollectionIfMissing(usuarioGrupoPermissoesCollection, usuarioGrupoPermissoes);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(usuarioGrupoPermissoes);
      });

      it('should add only unique UsuarioGrupoPermissoes to an array', () => {
        const usuarioGrupoPermissoesArray: IUsuarioGrupoPermissoes[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const usuarioGrupoPermissoesCollection: IUsuarioGrupoPermissoes[] = [sampleWithRequiredData];
        expectedResult = service.addUsuarioGrupoPermissoesToCollectionIfMissing(
          usuarioGrupoPermissoesCollection,
          ...usuarioGrupoPermissoesArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const usuarioGrupoPermissoes: IUsuarioGrupoPermissoes = sampleWithRequiredData;
        const usuarioGrupoPermissoes2: IUsuarioGrupoPermissoes = sampleWithPartialData;
        expectedResult = service.addUsuarioGrupoPermissoesToCollectionIfMissing([], usuarioGrupoPermissoes, usuarioGrupoPermissoes2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(usuarioGrupoPermissoes);
        expect(expectedResult).toContain(usuarioGrupoPermissoes2);
      });

      it('should accept null and undefined values', () => {
        const usuarioGrupoPermissoes: IUsuarioGrupoPermissoes = sampleWithRequiredData;
        expectedResult = service.addUsuarioGrupoPermissoesToCollectionIfMissing([], null, usuarioGrupoPermissoes, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(usuarioGrupoPermissoes);
      });

      it('should return initial array if no UsuarioGrupoPermissoes is added', () => {
        const usuarioGrupoPermissoesCollection: IUsuarioGrupoPermissoes[] = [sampleWithRequiredData];
        expectedResult = service.addUsuarioGrupoPermissoesToCollectionIfMissing(usuarioGrupoPermissoesCollection, undefined, null);
        expect(expectedResult).toEqual(usuarioGrupoPermissoesCollection);
      });
    });

    describe('compareUsuarioGrupoPermissoes', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareUsuarioGrupoPermissoes(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareUsuarioGrupoPermissoes(entity1, entity2);
        const compareResult2 = service.compareUsuarioGrupoPermissoes(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareUsuarioGrupoPermissoes(entity1, entity2);
        const compareResult2 = service.compareUsuarioGrupoPermissoes(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareUsuarioGrupoPermissoes(entity1, entity2);
        const compareResult2 = service.compareUsuarioGrupoPermissoes(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
