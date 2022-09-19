import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITipoDeDocumentoAnexavel } from '../tipo-de-documento-anexavel.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../tipo-de-documento-anexavel.test-samples';

import { TipoDeDocumentoAnexavelService, RestTipoDeDocumentoAnexavel } from './tipo-de-documento-anexavel.service';

const requireRestSample: RestTipoDeDocumentoAnexavel = {
  ...sampleWithRequiredData,
  dataCriacao: sampleWithRequiredData.dataCriacao?.toJSON(),
};

describe('TipoDeDocumentoAnexavel Service', () => {
  let service: TipoDeDocumentoAnexavelService;
  let httpMock: HttpTestingController;
  let expectedResult: ITipoDeDocumentoAnexavel | ITipoDeDocumentoAnexavel[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(TipoDeDocumentoAnexavelService);
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

    it('should create a TipoDeDocumentoAnexavel', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const tipoDeDocumentoAnexavel = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(tipoDeDocumentoAnexavel).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a TipoDeDocumentoAnexavel', () => {
      const tipoDeDocumentoAnexavel = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(tipoDeDocumentoAnexavel).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a TipoDeDocumentoAnexavel', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of TipoDeDocumentoAnexavel', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a TipoDeDocumentoAnexavel', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addTipoDeDocumentoAnexavelToCollectionIfMissing', () => {
      it('should add a TipoDeDocumentoAnexavel to an empty array', () => {
        const tipoDeDocumentoAnexavel: ITipoDeDocumentoAnexavel = sampleWithRequiredData;
        expectedResult = service.addTipoDeDocumentoAnexavelToCollectionIfMissing([], tipoDeDocumentoAnexavel);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(tipoDeDocumentoAnexavel);
      });

      it('should not add a TipoDeDocumentoAnexavel to an array that contains it', () => {
        const tipoDeDocumentoAnexavel: ITipoDeDocumentoAnexavel = sampleWithRequiredData;
        const tipoDeDocumentoAnexavelCollection: ITipoDeDocumentoAnexavel[] = [
          {
            ...tipoDeDocumentoAnexavel,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addTipoDeDocumentoAnexavelToCollectionIfMissing(
          tipoDeDocumentoAnexavelCollection,
          tipoDeDocumentoAnexavel
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a TipoDeDocumentoAnexavel to an array that doesn't contain it", () => {
        const tipoDeDocumentoAnexavel: ITipoDeDocumentoAnexavel = sampleWithRequiredData;
        const tipoDeDocumentoAnexavelCollection: ITipoDeDocumentoAnexavel[] = [sampleWithPartialData];
        expectedResult = service.addTipoDeDocumentoAnexavelToCollectionIfMissing(
          tipoDeDocumentoAnexavelCollection,
          tipoDeDocumentoAnexavel
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(tipoDeDocumentoAnexavel);
      });

      it('should add only unique TipoDeDocumentoAnexavel to an array', () => {
        const tipoDeDocumentoAnexavelArray: ITipoDeDocumentoAnexavel[] = [
          sampleWithRequiredData,
          sampleWithPartialData,
          sampleWithFullData,
        ];
        const tipoDeDocumentoAnexavelCollection: ITipoDeDocumentoAnexavel[] = [sampleWithRequiredData];
        expectedResult = service.addTipoDeDocumentoAnexavelToCollectionIfMissing(
          tipoDeDocumentoAnexavelCollection,
          ...tipoDeDocumentoAnexavelArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const tipoDeDocumentoAnexavel: ITipoDeDocumentoAnexavel = sampleWithRequiredData;
        const tipoDeDocumentoAnexavel2: ITipoDeDocumentoAnexavel = sampleWithPartialData;
        expectedResult = service.addTipoDeDocumentoAnexavelToCollectionIfMissing([], tipoDeDocumentoAnexavel, tipoDeDocumentoAnexavel2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(tipoDeDocumentoAnexavel);
        expect(expectedResult).toContain(tipoDeDocumentoAnexavel2);
      });

      it('should accept null and undefined values', () => {
        const tipoDeDocumentoAnexavel: ITipoDeDocumentoAnexavel = sampleWithRequiredData;
        expectedResult = service.addTipoDeDocumentoAnexavelToCollectionIfMissing([], null, tipoDeDocumentoAnexavel, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(tipoDeDocumentoAnexavel);
      });

      it('should return initial array if no TipoDeDocumentoAnexavel is added', () => {
        const tipoDeDocumentoAnexavelCollection: ITipoDeDocumentoAnexavel[] = [sampleWithRequiredData];
        expectedResult = service.addTipoDeDocumentoAnexavelToCollectionIfMissing(tipoDeDocumentoAnexavelCollection, undefined, null);
        expect(expectedResult).toEqual(tipoDeDocumentoAnexavelCollection);
      });
    });

    describe('compareTipoDeDocumentoAnexavel', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareTipoDeDocumentoAnexavel(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareTipoDeDocumentoAnexavel(entity1, entity2);
        const compareResult2 = service.compareTipoDeDocumentoAnexavel(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareTipoDeDocumentoAnexavel(entity1, entity2);
        const compareResult2 = service.compareTipoDeDocumentoAnexavel(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareTipoDeDocumentoAnexavel(entity1, entity2);
        const compareResult2 = service.compareTipoDeDocumentoAnexavel(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
