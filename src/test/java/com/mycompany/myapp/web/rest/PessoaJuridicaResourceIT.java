package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.PessoaJuridica;
import com.mycompany.myapp.repository.PessoaJuridicaRepository;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link PessoaJuridicaResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class PessoaJuridicaResourceIT {

    private static final String DEFAULT_CNPJ = "AAAAAAAAAA";
    private static final String UPDATED_CNPJ = "BBBBBBBBBB";

    private static final String DEFAULT_RAZAO_SOCIAL = "AAAAAAAAAA";
    private static final String UPDATED_RAZAO_SOCIAL = "BBBBBBBBBB";

    private static final String DEFAULT_NOME_FANTASIA = "AAAAAAAAAA";
    private static final String UPDATED_NOME_FANTASIA = "BBBBBBBBBB";

    private static final String DEFAULT_CODIGO_CNAE = "AAAAAAAAAA";
    private static final String UPDATED_CODIGO_CNAE = "BBBBBBBBBB";

    private static final Instant DEFAULT_DATA_ABERTURA = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATA_ABERTURA = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_CODIGO_CNAE_PRINCIPAL = "AAAAAAAAAA";
    private static final String UPDATED_CODIGO_CNAE_PRINCIPAL = "BBBBBBBBBB";

    private static final String DEFAULT_CODIGO_NATUREZA_JURIDICA = "AAAAAAAAAA";
    private static final String UPDATED_CODIGO_NATUREZA_JURIDICA = "BBBBBBBBBB";

    private static final Integer DEFAULT_QUANTIDADE_FUNCIONARIOS = 1;
    private static final Integer UPDATED_QUANTIDADE_FUNCIONARIOS = 2;

    private static final String ENTITY_API_URL = "/api/pessoa-juridicas";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private PessoaJuridicaRepository pessoaJuridicaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPessoaJuridicaMockMvc;

    private PessoaJuridica pessoaJuridica;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PessoaJuridica createEntity(EntityManager em) {
        PessoaJuridica pessoaJuridica = new PessoaJuridica()
            .cnpj(DEFAULT_CNPJ)
            .razaoSocial(DEFAULT_RAZAO_SOCIAL)
            .nomeFantasia(DEFAULT_NOME_FANTASIA)
            .codigoCnae(DEFAULT_CODIGO_CNAE)
            .dataAbertura(DEFAULT_DATA_ABERTURA)
            .codigoCnaePrincipal(DEFAULT_CODIGO_CNAE_PRINCIPAL)
            .codigoNaturezaJuridica(DEFAULT_CODIGO_NATUREZA_JURIDICA)
            .quantidadeFuncionarios(DEFAULT_QUANTIDADE_FUNCIONARIOS);
        return pessoaJuridica;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PessoaJuridica createUpdatedEntity(EntityManager em) {
        PessoaJuridica pessoaJuridica = new PessoaJuridica()
            .cnpj(UPDATED_CNPJ)
            .razaoSocial(UPDATED_RAZAO_SOCIAL)
            .nomeFantasia(UPDATED_NOME_FANTASIA)
            .codigoCnae(UPDATED_CODIGO_CNAE)
            .dataAbertura(UPDATED_DATA_ABERTURA)
            .codigoCnaePrincipal(UPDATED_CODIGO_CNAE_PRINCIPAL)
            .codigoNaturezaJuridica(UPDATED_CODIGO_NATUREZA_JURIDICA)
            .quantidadeFuncionarios(UPDATED_QUANTIDADE_FUNCIONARIOS);
        return pessoaJuridica;
    }

    @BeforeEach
    public void initTest() {
        pessoaJuridica = createEntity(em);
    }

    @Test
    @Transactional
    void createPessoaJuridica() throws Exception {
        int databaseSizeBeforeCreate = pessoaJuridicaRepository.findAll().size();
        // Create the PessoaJuridica
        restPessoaJuridicaMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pessoaJuridica))
            )
            .andExpect(status().isCreated());

        // Validate the PessoaJuridica in the database
        List<PessoaJuridica> pessoaJuridicaList = pessoaJuridicaRepository.findAll();
        assertThat(pessoaJuridicaList).hasSize(databaseSizeBeforeCreate + 1);
        PessoaJuridica testPessoaJuridica = pessoaJuridicaList.get(pessoaJuridicaList.size() - 1);
        assertThat(testPessoaJuridica.getCnpj()).isEqualTo(DEFAULT_CNPJ);
        assertThat(testPessoaJuridica.getRazaoSocial()).isEqualTo(DEFAULT_RAZAO_SOCIAL);
        assertThat(testPessoaJuridica.getNomeFantasia()).isEqualTo(DEFAULT_NOME_FANTASIA);
        assertThat(testPessoaJuridica.getCodigoCnae()).isEqualTo(DEFAULT_CODIGO_CNAE);
        assertThat(testPessoaJuridica.getDataAbertura()).isEqualTo(DEFAULT_DATA_ABERTURA);
        assertThat(testPessoaJuridica.getCodigoCnaePrincipal()).isEqualTo(DEFAULT_CODIGO_CNAE_PRINCIPAL);
        assertThat(testPessoaJuridica.getCodigoNaturezaJuridica()).isEqualTo(DEFAULT_CODIGO_NATUREZA_JURIDICA);
        assertThat(testPessoaJuridica.getQuantidadeFuncionarios()).isEqualTo(DEFAULT_QUANTIDADE_FUNCIONARIOS);
    }

    @Test
    @Transactional
    void createPessoaJuridicaWithExistingId() throws Exception {
        // Create the PessoaJuridica with an existing ID
        pessoaJuridica.setId(1L);

        int databaseSizeBeforeCreate = pessoaJuridicaRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restPessoaJuridicaMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pessoaJuridica))
            )
            .andExpect(status().isBadRequest());

        // Validate the PessoaJuridica in the database
        List<PessoaJuridica> pessoaJuridicaList = pessoaJuridicaRepository.findAll();
        assertThat(pessoaJuridicaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNomeFantasiaIsRequired() throws Exception {
        int databaseSizeBeforeTest = pessoaJuridicaRepository.findAll().size();
        // set the field null
        pessoaJuridica.setNomeFantasia(null);

        // Create the PessoaJuridica, which fails.

        restPessoaJuridicaMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pessoaJuridica))
            )
            .andExpect(status().isBadRequest());

        List<PessoaJuridica> pessoaJuridicaList = pessoaJuridicaRepository.findAll();
        assertThat(pessoaJuridicaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllPessoaJuridicas() throws Exception {
        // Initialize the database
        pessoaJuridicaRepository.saveAndFlush(pessoaJuridica);

        // Get all the pessoaJuridicaList
        restPessoaJuridicaMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pessoaJuridica.getId().intValue())))
            .andExpect(jsonPath("$.[*].cnpj").value(hasItem(DEFAULT_CNPJ)))
            .andExpect(jsonPath("$.[*].razaoSocial").value(hasItem(DEFAULT_RAZAO_SOCIAL)))
            .andExpect(jsonPath("$.[*].nomeFantasia").value(hasItem(DEFAULT_NOME_FANTASIA)))
            .andExpect(jsonPath("$.[*].codigoCnae").value(hasItem(DEFAULT_CODIGO_CNAE)))
            .andExpect(jsonPath("$.[*].dataAbertura").value(hasItem(DEFAULT_DATA_ABERTURA.toString())))
            .andExpect(jsonPath("$.[*].codigoCnaePrincipal").value(hasItem(DEFAULT_CODIGO_CNAE_PRINCIPAL)))
            .andExpect(jsonPath("$.[*].codigoNaturezaJuridica").value(hasItem(DEFAULT_CODIGO_NATUREZA_JURIDICA)))
            .andExpect(jsonPath("$.[*].quantidadeFuncionarios").value(hasItem(DEFAULT_QUANTIDADE_FUNCIONARIOS)));
    }

    @Test
    @Transactional
    void getPessoaJuridica() throws Exception {
        // Initialize the database
        pessoaJuridicaRepository.saveAndFlush(pessoaJuridica);

        // Get the pessoaJuridica
        restPessoaJuridicaMockMvc
            .perform(get(ENTITY_API_URL_ID, pessoaJuridica.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(pessoaJuridica.getId().intValue()))
            .andExpect(jsonPath("$.cnpj").value(DEFAULT_CNPJ))
            .andExpect(jsonPath("$.razaoSocial").value(DEFAULT_RAZAO_SOCIAL))
            .andExpect(jsonPath("$.nomeFantasia").value(DEFAULT_NOME_FANTASIA))
            .andExpect(jsonPath("$.codigoCnae").value(DEFAULT_CODIGO_CNAE))
            .andExpect(jsonPath("$.dataAbertura").value(DEFAULT_DATA_ABERTURA.toString()))
            .andExpect(jsonPath("$.codigoCnaePrincipal").value(DEFAULT_CODIGO_CNAE_PRINCIPAL))
            .andExpect(jsonPath("$.codigoNaturezaJuridica").value(DEFAULT_CODIGO_NATUREZA_JURIDICA))
            .andExpect(jsonPath("$.quantidadeFuncionarios").value(DEFAULT_QUANTIDADE_FUNCIONARIOS));
    }

    @Test
    @Transactional
    void getNonExistingPessoaJuridica() throws Exception {
        // Get the pessoaJuridica
        restPessoaJuridicaMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingPessoaJuridica() throws Exception {
        // Initialize the database
        pessoaJuridicaRepository.saveAndFlush(pessoaJuridica);

        int databaseSizeBeforeUpdate = pessoaJuridicaRepository.findAll().size();

        // Update the pessoaJuridica
        PessoaJuridica updatedPessoaJuridica = pessoaJuridicaRepository.findById(pessoaJuridica.getId()).get();
        // Disconnect from session so that the updates on updatedPessoaJuridica are not directly saved in db
        em.detach(updatedPessoaJuridica);
        updatedPessoaJuridica
            .cnpj(UPDATED_CNPJ)
            .razaoSocial(UPDATED_RAZAO_SOCIAL)
            .nomeFantasia(UPDATED_NOME_FANTASIA)
            .codigoCnae(UPDATED_CODIGO_CNAE)
            .dataAbertura(UPDATED_DATA_ABERTURA)
            .codigoCnaePrincipal(UPDATED_CODIGO_CNAE_PRINCIPAL)
            .codigoNaturezaJuridica(UPDATED_CODIGO_NATUREZA_JURIDICA)
            .quantidadeFuncionarios(UPDATED_QUANTIDADE_FUNCIONARIOS);

        restPessoaJuridicaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedPessoaJuridica.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedPessoaJuridica))
            )
            .andExpect(status().isOk());

        // Validate the PessoaJuridica in the database
        List<PessoaJuridica> pessoaJuridicaList = pessoaJuridicaRepository.findAll();
        assertThat(pessoaJuridicaList).hasSize(databaseSizeBeforeUpdate);
        PessoaJuridica testPessoaJuridica = pessoaJuridicaList.get(pessoaJuridicaList.size() - 1);
        assertThat(testPessoaJuridica.getCnpj()).isEqualTo(UPDATED_CNPJ);
        assertThat(testPessoaJuridica.getRazaoSocial()).isEqualTo(UPDATED_RAZAO_SOCIAL);
        assertThat(testPessoaJuridica.getNomeFantasia()).isEqualTo(UPDATED_NOME_FANTASIA);
        assertThat(testPessoaJuridica.getCodigoCnae()).isEqualTo(UPDATED_CODIGO_CNAE);
        assertThat(testPessoaJuridica.getDataAbertura()).isEqualTo(UPDATED_DATA_ABERTURA);
        assertThat(testPessoaJuridica.getCodigoCnaePrincipal()).isEqualTo(UPDATED_CODIGO_CNAE_PRINCIPAL);
        assertThat(testPessoaJuridica.getCodigoNaturezaJuridica()).isEqualTo(UPDATED_CODIGO_NATUREZA_JURIDICA);
        assertThat(testPessoaJuridica.getQuantidadeFuncionarios()).isEqualTo(UPDATED_QUANTIDADE_FUNCIONARIOS);
    }

    @Test
    @Transactional
    void putNonExistingPessoaJuridica() throws Exception {
        int databaseSizeBeforeUpdate = pessoaJuridicaRepository.findAll().size();
        pessoaJuridica.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPessoaJuridicaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, pessoaJuridica.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(pessoaJuridica))
            )
            .andExpect(status().isBadRequest());

        // Validate the PessoaJuridica in the database
        List<PessoaJuridica> pessoaJuridicaList = pessoaJuridicaRepository.findAll();
        assertThat(pessoaJuridicaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchPessoaJuridica() throws Exception {
        int databaseSizeBeforeUpdate = pessoaJuridicaRepository.findAll().size();
        pessoaJuridica.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPessoaJuridicaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(pessoaJuridica))
            )
            .andExpect(status().isBadRequest());

        // Validate the PessoaJuridica in the database
        List<PessoaJuridica> pessoaJuridicaList = pessoaJuridicaRepository.findAll();
        assertThat(pessoaJuridicaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamPessoaJuridica() throws Exception {
        int databaseSizeBeforeUpdate = pessoaJuridicaRepository.findAll().size();
        pessoaJuridica.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPessoaJuridicaMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pessoaJuridica)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the PessoaJuridica in the database
        List<PessoaJuridica> pessoaJuridicaList = pessoaJuridicaRepository.findAll();
        assertThat(pessoaJuridicaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdatePessoaJuridicaWithPatch() throws Exception {
        // Initialize the database
        pessoaJuridicaRepository.saveAndFlush(pessoaJuridica);

        int databaseSizeBeforeUpdate = pessoaJuridicaRepository.findAll().size();

        // Update the pessoaJuridica using partial update
        PessoaJuridica partialUpdatedPessoaJuridica = new PessoaJuridica();
        partialUpdatedPessoaJuridica.setId(pessoaJuridica.getId());

        partialUpdatedPessoaJuridica
            .razaoSocial(UPDATED_RAZAO_SOCIAL)
            .nomeFantasia(UPDATED_NOME_FANTASIA)
            .dataAbertura(UPDATED_DATA_ABERTURA);

        restPessoaJuridicaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPessoaJuridica.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPessoaJuridica))
            )
            .andExpect(status().isOk());

        // Validate the PessoaJuridica in the database
        List<PessoaJuridica> pessoaJuridicaList = pessoaJuridicaRepository.findAll();
        assertThat(pessoaJuridicaList).hasSize(databaseSizeBeforeUpdate);
        PessoaJuridica testPessoaJuridica = pessoaJuridicaList.get(pessoaJuridicaList.size() - 1);
        assertThat(testPessoaJuridica.getCnpj()).isEqualTo(DEFAULT_CNPJ);
        assertThat(testPessoaJuridica.getRazaoSocial()).isEqualTo(UPDATED_RAZAO_SOCIAL);
        assertThat(testPessoaJuridica.getNomeFantasia()).isEqualTo(UPDATED_NOME_FANTASIA);
        assertThat(testPessoaJuridica.getCodigoCnae()).isEqualTo(DEFAULT_CODIGO_CNAE);
        assertThat(testPessoaJuridica.getDataAbertura()).isEqualTo(UPDATED_DATA_ABERTURA);
        assertThat(testPessoaJuridica.getCodigoCnaePrincipal()).isEqualTo(DEFAULT_CODIGO_CNAE_PRINCIPAL);
        assertThat(testPessoaJuridica.getCodigoNaturezaJuridica()).isEqualTo(DEFAULT_CODIGO_NATUREZA_JURIDICA);
        assertThat(testPessoaJuridica.getQuantidadeFuncionarios()).isEqualTo(DEFAULT_QUANTIDADE_FUNCIONARIOS);
    }

    @Test
    @Transactional
    void fullUpdatePessoaJuridicaWithPatch() throws Exception {
        // Initialize the database
        pessoaJuridicaRepository.saveAndFlush(pessoaJuridica);

        int databaseSizeBeforeUpdate = pessoaJuridicaRepository.findAll().size();

        // Update the pessoaJuridica using partial update
        PessoaJuridica partialUpdatedPessoaJuridica = new PessoaJuridica();
        partialUpdatedPessoaJuridica.setId(pessoaJuridica.getId());

        partialUpdatedPessoaJuridica
            .cnpj(UPDATED_CNPJ)
            .razaoSocial(UPDATED_RAZAO_SOCIAL)
            .nomeFantasia(UPDATED_NOME_FANTASIA)
            .codigoCnae(UPDATED_CODIGO_CNAE)
            .dataAbertura(UPDATED_DATA_ABERTURA)
            .codigoCnaePrincipal(UPDATED_CODIGO_CNAE_PRINCIPAL)
            .codigoNaturezaJuridica(UPDATED_CODIGO_NATUREZA_JURIDICA)
            .quantidadeFuncionarios(UPDATED_QUANTIDADE_FUNCIONARIOS);

        restPessoaJuridicaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPessoaJuridica.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPessoaJuridica))
            )
            .andExpect(status().isOk());

        // Validate the PessoaJuridica in the database
        List<PessoaJuridica> pessoaJuridicaList = pessoaJuridicaRepository.findAll();
        assertThat(pessoaJuridicaList).hasSize(databaseSizeBeforeUpdate);
        PessoaJuridica testPessoaJuridica = pessoaJuridicaList.get(pessoaJuridicaList.size() - 1);
        assertThat(testPessoaJuridica.getCnpj()).isEqualTo(UPDATED_CNPJ);
        assertThat(testPessoaJuridica.getRazaoSocial()).isEqualTo(UPDATED_RAZAO_SOCIAL);
        assertThat(testPessoaJuridica.getNomeFantasia()).isEqualTo(UPDATED_NOME_FANTASIA);
        assertThat(testPessoaJuridica.getCodigoCnae()).isEqualTo(UPDATED_CODIGO_CNAE);
        assertThat(testPessoaJuridica.getDataAbertura()).isEqualTo(UPDATED_DATA_ABERTURA);
        assertThat(testPessoaJuridica.getCodigoCnaePrincipal()).isEqualTo(UPDATED_CODIGO_CNAE_PRINCIPAL);
        assertThat(testPessoaJuridica.getCodigoNaturezaJuridica()).isEqualTo(UPDATED_CODIGO_NATUREZA_JURIDICA);
        assertThat(testPessoaJuridica.getQuantidadeFuncionarios()).isEqualTo(UPDATED_QUANTIDADE_FUNCIONARIOS);
    }

    @Test
    @Transactional
    void patchNonExistingPessoaJuridica() throws Exception {
        int databaseSizeBeforeUpdate = pessoaJuridicaRepository.findAll().size();
        pessoaJuridica.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPessoaJuridicaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, pessoaJuridica.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(pessoaJuridica))
            )
            .andExpect(status().isBadRequest());

        // Validate the PessoaJuridica in the database
        List<PessoaJuridica> pessoaJuridicaList = pessoaJuridicaRepository.findAll();
        assertThat(pessoaJuridicaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchPessoaJuridica() throws Exception {
        int databaseSizeBeforeUpdate = pessoaJuridicaRepository.findAll().size();
        pessoaJuridica.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPessoaJuridicaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(pessoaJuridica))
            )
            .andExpect(status().isBadRequest());

        // Validate the PessoaJuridica in the database
        List<PessoaJuridica> pessoaJuridicaList = pessoaJuridicaRepository.findAll();
        assertThat(pessoaJuridicaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamPessoaJuridica() throws Exception {
        int databaseSizeBeforeUpdate = pessoaJuridicaRepository.findAll().size();
        pessoaJuridica.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPessoaJuridicaMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(pessoaJuridica))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the PessoaJuridica in the database
        List<PessoaJuridica> pessoaJuridicaList = pessoaJuridicaRepository.findAll();
        assertThat(pessoaJuridicaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deletePessoaJuridica() throws Exception {
        // Initialize the database
        pessoaJuridicaRepository.saveAndFlush(pessoaJuridica);

        int databaseSizeBeforeDelete = pessoaJuridicaRepository.findAll().size();

        // Delete the pessoaJuridica
        restPessoaJuridicaMockMvc
            .perform(delete(ENTITY_API_URL_ID, pessoaJuridica.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PessoaJuridica> pessoaJuridicaList = pessoaJuridicaRepository.findAll();
        assertThat(pessoaJuridicaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
