import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ILicenca } from '../licenca.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../licenca.test-samples';

import { LicencaService, RestLicenca } from './licenca.service';

const requireRestSample: RestLicenca = {
  ...sampleWithRequiredData,
  dataCriacao: sampleWithRequiredData.dataCriacao?.toJSON(),
  dataInicioUtilizacao: sampleWithRequiredData.dataInicioUtilizacao?.toJSON(),
  dataInicioFaturamento: sampleWithRequiredData.dataInicioFaturamento?.toJSON(),
  dataPrimeiroVencimentoBoleto: sampleWithRequiredData.dataPrimeiroVencimentoBoleto?.toJSON(),
  dataBloqueioAcesso: sampleWithRequiredData.dataBloqueioAcesso?.toJSON(),
};

describe('Licenca Service', () => {
  let service: LicencaService;
  let httpMock: HttpTestingController;
  let expectedResult: ILicenca | ILicenca[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(LicencaService);
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

    it('should create a Licenca', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const licenca = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(licenca).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Licenca', () => {
      const licenca = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(licenca).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Licenca', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Licenca', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Licenca', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addLicencaToCollectionIfMissing', () => {
      it('should add a Licenca to an empty array', () => {
        const licenca: ILicenca = sampleWithRequiredData;
        expectedResult = service.addLicencaToCollectionIfMissing([], licenca);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(licenca);
      });

      it('should not add a Licenca to an array that contains it', () => {
        const licenca: ILicenca = sampleWithRequiredData;
        const licencaCollection: ILicenca[] = [
          {
            ...licenca,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addLicencaToCollectionIfMissing(licencaCollection, licenca);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Licenca to an array that doesn't contain it", () => {
        const licenca: ILicenca = sampleWithRequiredData;
        const licencaCollection: ILicenca[] = [sampleWithPartialData];
        expectedResult = service.addLicencaToCollectionIfMissing(licencaCollection, licenca);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(licenca);
      });

      it('should add only unique Licenca to an array', () => {
        const licencaArray: ILicenca[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const licencaCollection: ILicenca[] = [sampleWithRequiredData];
        expectedResult = service.addLicencaToCollectionIfMissing(licencaCollection, ...licencaArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const licenca: ILicenca = sampleWithRequiredData;
        const licenca2: ILicenca = sampleWithPartialData;
        expectedResult = service.addLicencaToCollectionIfMissing([], licenca, licenca2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(licenca);
        expect(expectedResult).toContain(licenca2);
      });

      it('should accept null and undefined values', () => {
        const licenca: ILicenca = sampleWithRequiredData;
        expectedResult = service.addLicencaToCollectionIfMissing([], null, licenca, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(licenca);
      });

      it('should return initial array if no Licenca is added', () => {
        const licencaCollection: ILicenca[] = [sampleWithRequiredData];
        expectedResult = service.addLicencaToCollectionIfMissing(licencaCollection, undefined, null);
        expect(expectedResult).toEqual(licencaCollection);
      });
    });

    describe('compareLicenca', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareLicenca(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareLicenca(entity1, entity2);
        const compareResult2 = service.compareLicenca(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareLicenca(entity1, entity2);
        const compareResult2 = service.compareLicenca(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareLicenca(entity1, entity2);
        const compareResult2 = service.compareLicenca(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
