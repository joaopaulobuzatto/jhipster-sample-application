import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IGrupoPermissoes } from '../grupo-permissoes.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../grupo-permissoes.test-samples';

import { GrupoPermissoesService, RestGrupoPermissoes } from './grupo-permissoes.service';

const requireRestSample: RestGrupoPermissoes = {
  ...sampleWithRequiredData,
  dataCriacao: sampleWithRequiredData.dataCriacao?.toJSON(),
};

describe('GrupoPermissoes Service', () => {
  let service: GrupoPermissoesService;
  let httpMock: HttpTestingController;
  let expectedResult: IGrupoPermissoes | IGrupoPermissoes[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(GrupoPermissoesService);
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

    it('should create a GrupoPermissoes', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const grupoPermissoes = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(grupoPermissoes).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a GrupoPermissoes', () => {
      const grupoPermissoes = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(grupoPermissoes).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a GrupoPermissoes', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of GrupoPermissoes', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a GrupoPermissoes', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addGrupoPermissoesToCollectionIfMissing', () => {
      it('should add a GrupoPermissoes to an empty array', () => {
        const grupoPermissoes: IGrupoPermissoes = sampleWithRequiredData;
        expectedResult = service.addGrupoPermissoesToCollectionIfMissing([], grupoPermissoes);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(grupoPermissoes);
      });

      it('should not add a GrupoPermissoes to an array that contains it', () => {
        const grupoPermissoes: IGrupoPermissoes = sampleWithRequiredData;
        const grupoPermissoesCollection: IGrupoPermissoes[] = [
          {
            ...grupoPermissoes,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addGrupoPermissoesToCollectionIfMissing(grupoPermissoesCollection, grupoPermissoes);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a GrupoPermissoes to an array that doesn't contain it", () => {
        const grupoPermissoes: IGrupoPermissoes = sampleWithRequiredData;
        const grupoPermissoesCollection: IGrupoPermissoes[] = [sampleWithPartialData];
        expectedResult = service.addGrupoPermissoesToCollectionIfMissing(grupoPermissoesCollection, grupoPermissoes);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(grupoPermissoes);
      });

      it('should add only unique GrupoPermissoes to an array', () => {
        const grupoPermissoesArray: IGrupoPermissoes[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const grupoPermissoesCollection: IGrupoPermissoes[] = [sampleWithRequiredData];
        expectedResult = service.addGrupoPermissoesToCollectionIfMissing(grupoPermissoesCollection, ...grupoPermissoesArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const grupoPermissoes: IGrupoPermissoes = sampleWithRequiredData;
        const grupoPermissoes2: IGrupoPermissoes = sampleWithPartialData;
        expectedResult = service.addGrupoPermissoesToCollectionIfMissing([], grupoPermissoes, grupoPermissoes2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(grupoPermissoes);
        expect(expectedResult).toContain(grupoPermissoes2);
      });

      it('should accept null and undefined values', () => {
        const grupoPermissoes: IGrupoPermissoes = sampleWithRequiredData;
        expectedResult = service.addGrupoPermissoesToCollectionIfMissing([], null, grupoPermissoes, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(grupoPermissoes);
      });

      it('should return initial array if no GrupoPermissoes is added', () => {
        const grupoPermissoesCollection: IGrupoPermissoes[] = [sampleWithRequiredData];
        expectedResult = service.addGrupoPermissoesToCollectionIfMissing(grupoPermissoesCollection, undefined, null);
        expect(expectedResult).toEqual(grupoPermissoesCollection);
      });
    });

    describe('compareGrupoPermissoes', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareGrupoPermissoes(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareGrupoPermissoes(entity1, entity2);
        const compareResult2 = service.compareGrupoPermissoes(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareGrupoPermissoes(entity1, entity2);
        const compareResult2 = service.compareGrupoPermissoes(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareGrupoPermissoes(entity1, entity2);
        const compareResult2 = service.compareGrupoPermissoes(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
