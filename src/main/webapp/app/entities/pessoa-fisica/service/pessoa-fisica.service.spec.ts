import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IPessoaFisica } from '../pessoa-fisica.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../pessoa-fisica.test-samples';

import { PessoaFisicaService, RestPessoaFisica } from './pessoa-fisica.service';

const requireRestSample: RestPessoaFisica = {
  ...sampleWithRequiredData,
  dataNascimento: sampleWithRequiredData.dataNascimento?.toJSON(),
};

describe('PessoaFisica Service', () => {
  let service: PessoaFisicaService;
  let httpMock: HttpTestingController;
  let expectedResult: IPessoaFisica | IPessoaFisica[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(PessoaFisicaService);
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

    it('should create a PessoaFisica', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const pessoaFisica = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(pessoaFisica).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a PessoaFisica', () => {
      const pessoaFisica = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(pessoaFisica).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a PessoaFisica', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of PessoaFisica', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a PessoaFisica', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addPessoaFisicaToCollectionIfMissing', () => {
      it('should add a PessoaFisica to an empty array', () => {
        const pessoaFisica: IPessoaFisica = sampleWithRequiredData;
        expectedResult = service.addPessoaFisicaToCollectionIfMissing([], pessoaFisica);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(pessoaFisica);
      });

      it('should not add a PessoaFisica to an array that contains it', () => {
        const pessoaFisica: IPessoaFisica = sampleWithRequiredData;
        const pessoaFisicaCollection: IPessoaFisica[] = [
          {
            ...pessoaFisica,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addPessoaFisicaToCollectionIfMissing(pessoaFisicaCollection, pessoaFisica);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a PessoaFisica to an array that doesn't contain it", () => {
        const pessoaFisica: IPessoaFisica = sampleWithRequiredData;
        const pessoaFisicaCollection: IPessoaFisica[] = [sampleWithPartialData];
        expectedResult = service.addPessoaFisicaToCollectionIfMissing(pessoaFisicaCollection, pessoaFisica);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(pessoaFisica);
      });

      it('should add only unique PessoaFisica to an array', () => {
        const pessoaFisicaArray: IPessoaFisica[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const pessoaFisicaCollection: IPessoaFisica[] = [sampleWithRequiredData];
        expectedResult = service.addPessoaFisicaToCollectionIfMissing(pessoaFisicaCollection, ...pessoaFisicaArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const pessoaFisica: IPessoaFisica = sampleWithRequiredData;
        const pessoaFisica2: IPessoaFisica = sampleWithPartialData;
        expectedResult = service.addPessoaFisicaToCollectionIfMissing([], pessoaFisica, pessoaFisica2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(pessoaFisica);
        expect(expectedResult).toContain(pessoaFisica2);
      });

      it('should accept null and undefined values', () => {
        const pessoaFisica: IPessoaFisica = sampleWithRequiredData;
        expectedResult = service.addPessoaFisicaToCollectionIfMissing([], null, pessoaFisica, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(pessoaFisica);
      });

      it('should return initial array if no PessoaFisica is added', () => {
        const pessoaFisicaCollection: IPessoaFisica[] = [sampleWithRequiredData];
        expectedResult = service.addPessoaFisicaToCollectionIfMissing(pessoaFisicaCollection, undefined, null);
        expect(expectedResult).toEqual(pessoaFisicaCollection);
      });
    });

    describe('comparePessoaFisica', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.comparePessoaFisica(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.comparePessoaFisica(entity1, entity2);
        const compareResult2 = service.comparePessoaFisica(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.comparePessoaFisica(entity1, entity2);
        const compareResult2 = service.comparePessoaFisica(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.comparePessoaFisica(entity1, entity2);
        const compareResult2 = service.comparePessoaFisica(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
