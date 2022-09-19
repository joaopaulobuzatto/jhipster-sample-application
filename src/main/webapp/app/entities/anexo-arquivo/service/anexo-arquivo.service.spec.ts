import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IAnexoArquivo } from '../anexo-arquivo.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../anexo-arquivo.test-samples';

import { AnexoArquivoService, RestAnexoArquivo } from './anexo-arquivo.service';

const requireRestSample: RestAnexoArquivo = {
  ...sampleWithRequiredData,
  dataCriacao: sampleWithRequiredData.dataCriacao?.toJSON(),
};

describe('AnexoArquivo Service', () => {
  let service: AnexoArquivoService;
  let httpMock: HttpTestingController;
  let expectedResult: IAnexoArquivo | IAnexoArquivo[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(AnexoArquivoService);
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

    it('should create a AnexoArquivo', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const anexoArquivo = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(anexoArquivo).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a AnexoArquivo', () => {
      const anexoArquivo = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(anexoArquivo).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a AnexoArquivo', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of AnexoArquivo', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a AnexoArquivo', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addAnexoArquivoToCollectionIfMissing', () => {
      it('should add a AnexoArquivo to an empty array', () => {
        const anexoArquivo: IAnexoArquivo = sampleWithRequiredData;
        expectedResult = service.addAnexoArquivoToCollectionIfMissing([], anexoArquivo);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(anexoArquivo);
      });

      it('should not add a AnexoArquivo to an array that contains it', () => {
        const anexoArquivo: IAnexoArquivo = sampleWithRequiredData;
        const anexoArquivoCollection: IAnexoArquivo[] = [
          {
            ...anexoArquivo,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addAnexoArquivoToCollectionIfMissing(anexoArquivoCollection, anexoArquivo);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a AnexoArquivo to an array that doesn't contain it", () => {
        const anexoArquivo: IAnexoArquivo = sampleWithRequiredData;
        const anexoArquivoCollection: IAnexoArquivo[] = [sampleWithPartialData];
        expectedResult = service.addAnexoArquivoToCollectionIfMissing(anexoArquivoCollection, anexoArquivo);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(anexoArquivo);
      });

      it('should add only unique AnexoArquivo to an array', () => {
        const anexoArquivoArray: IAnexoArquivo[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const anexoArquivoCollection: IAnexoArquivo[] = [sampleWithRequiredData];
        expectedResult = service.addAnexoArquivoToCollectionIfMissing(anexoArquivoCollection, ...anexoArquivoArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const anexoArquivo: IAnexoArquivo = sampleWithRequiredData;
        const anexoArquivo2: IAnexoArquivo = sampleWithPartialData;
        expectedResult = service.addAnexoArquivoToCollectionIfMissing([], anexoArquivo, anexoArquivo2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(anexoArquivo);
        expect(expectedResult).toContain(anexoArquivo2);
      });

      it('should accept null and undefined values', () => {
        const anexoArquivo: IAnexoArquivo = sampleWithRequiredData;
        expectedResult = service.addAnexoArquivoToCollectionIfMissing([], null, anexoArquivo, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(anexoArquivo);
      });

      it('should return initial array if no AnexoArquivo is added', () => {
        const anexoArquivoCollection: IAnexoArquivo[] = [sampleWithRequiredData];
        expectedResult = service.addAnexoArquivoToCollectionIfMissing(anexoArquivoCollection, undefined, null);
        expect(expectedResult).toEqual(anexoArquivoCollection);
      });
    });

    describe('compareAnexoArquivo', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareAnexoArquivo(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareAnexoArquivo(entity1, entity2);
        const compareResult2 = service.compareAnexoArquivo(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareAnexoArquivo(entity1, entity2);
        const compareResult2 = service.compareAnexoArquivo(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareAnexoArquivo(entity1, entity2);
        const compareResult2 = service.compareAnexoArquivo(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
