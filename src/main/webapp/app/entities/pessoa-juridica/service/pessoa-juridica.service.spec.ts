import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IPessoaJuridica } from '../pessoa-juridica.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../pessoa-juridica.test-samples';

import { PessoaJuridicaService, RestPessoaJuridica } from './pessoa-juridica.service';

const requireRestSample: RestPessoaJuridica = {
  ...sampleWithRequiredData,
  dataAbertura: sampleWithRequiredData.dataAbertura?.toJSON(),
};

describe('PessoaJuridica Service', () => {
  let service: PessoaJuridicaService;
  let httpMock: HttpTestingController;
  let expectedResult: IPessoaJuridica | IPessoaJuridica[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(PessoaJuridicaService);
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

    it('should create a PessoaJuridica', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const pessoaJuridica = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(pessoaJuridica).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a PessoaJuridica', () => {
      const pessoaJuridica = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(pessoaJuridica).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a PessoaJuridica', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of PessoaJuridica', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a PessoaJuridica', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addPessoaJuridicaToCollectionIfMissing', () => {
      it('should add a PessoaJuridica to an empty array', () => {
        const pessoaJuridica: IPessoaJuridica = sampleWithRequiredData;
        expectedResult = service.addPessoaJuridicaToCollectionIfMissing([], pessoaJuridica);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(pessoaJuridica);
      });

      it('should not add a PessoaJuridica to an array that contains it', () => {
        const pessoaJuridica: IPessoaJuridica = sampleWithRequiredData;
        const pessoaJuridicaCollection: IPessoaJuridica[] = [
          {
            ...pessoaJuridica,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addPessoaJuridicaToCollectionIfMissing(pessoaJuridicaCollection, pessoaJuridica);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a PessoaJuridica to an array that doesn't contain it", () => {
        const pessoaJuridica: IPessoaJuridica = sampleWithRequiredData;
        const pessoaJuridicaCollection: IPessoaJuridica[] = [sampleWithPartialData];
        expectedResult = service.addPessoaJuridicaToCollectionIfMissing(pessoaJuridicaCollection, pessoaJuridica);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(pessoaJuridica);
      });

      it('should add only unique PessoaJuridica to an array', () => {
        const pessoaJuridicaArray: IPessoaJuridica[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const pessoaJuridicaCollection: IPessoaJuridica[] = [sampleWithRequiredData];
        expectedResult = service.addPessoaJuridicaToCollectionIfMissing(pessoaJuridicaCollection, ...pessoaJuridicaArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const pessoaJuridica: IPessoaJuridica = sampleWithRequiredData;
        const pessoaJuridica2: IPessoaJuridica = sampleWithPartialData;
        expectedResult = service.addPessoaJuridicaToCollectionIfMissing([], pessoaJuridica, pessoaJuridica2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(pessoaJuridica);
        expect(expectedResult).toContain(pessoaJuridica2);
      });

      it('should accept null and undefined values', () => {
        const pessoaJuridica: IPessoaJuridica = sampleWithRequiredData;
        expectedResult = service.addPessoaJuridicaToCollectionIfMissing([], null, pessoaJuridica, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(pessoaJuridica);
      });

      it('should return initial array if no PessoaJuridica is added', () => {
        const pessoaJuridicaCollection: IPessoaJuridica[] = [sampleWithRequiredData];
        expectedResult = service.addPessoaJuridicaToCollectionIfMissing(pessoaJuridicaCollection, undefined, null);
        expect(expectedResult).toEqual(pessoaJuridicaCollection);
      });
    });

    describe('comparePessoaJuridica', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.comparePessoaJuridica(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.comparePessoaJuridica(entity1, entity2);
        const compareResult2 = service.comparePessoaJuridica(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.comparePessoaJuridica(entity1, entity2);
        const compareResult2 = service.comparePessoaJuridica(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.comparePessoaJuridica(entity1, entity2);
        const compareResult2 = service.comparePessoaJuridica(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
