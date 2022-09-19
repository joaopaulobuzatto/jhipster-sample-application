package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.PessoaFisica;
import com.mycompany.myapp.repository.PessoaFisicaRepository;
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
 * Integration tests for the {@link PessoaFisicaResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class PessoaFisicaResourceIT {

    private static final String DEFAULT_NOME_COMPLETO = "AAAAAAAAAA";
    private static final String UPDATED_NOME_COMPLETO = "BBBBBBBBBB";

    private static final String DEFAULT_CPF = "AAAAAAAAAA";
    private static final String UPDATED_CPF = "BBBBBBBBBB";

    private static final String DEFAULT_RG = "AAAAAAAAAA";
    private static final String UPDATED_RG = "BBBBBBBBBB";

    private static final Instant DEFAULT_DATA_NASCIMENTO = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATA_NASCIMENTO = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String ENTITY_API_URL = "/api/pessoa-fisicas";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private PessoaFisicaRepository pessoaFisicaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPessoaFisicaMockMvc;

    private PessoaFisica pessoaFisica;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PessoaFisica createEntity(EntityManager em) {
        PessoaFisica pessoaFisica = new PessoaFisica()
            .nomeCompleto(DEFAULT_NOME_COMPLETO)
            .cpf(DEFAULT_CPF)
            .rg(DEFAULT_RG)
            .dataNascimento(DEFAULT_DATA_NASCIMENTO);
        return pessoaFisica;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PessoaFisica createUpdatedEntity(EntityManager em) {
        PessoaFisica pessoaFisica = new PessoaFisica()
            .nomeCompleto(UPDATED_NOME_COMPLETO)
            .cpf(UPDATED_CPF)
            .rg(UPDATED_RG)
            .dataNascimento(UPDATED_DATA_NASCIMENTO);
        return pessoaFisica;
    }

    @BeforeEach
    public void initTest() {
        pessoaFisica = createEntity(em);
    }

    @Test
    @Transactional
    void createPessoaFisica() throws Exception {
        int databaseSizeBeforeCreate = pessoaFisicaRepository.findAll().size();
        // Create the PessoaFisica
        restPessoaFisicaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pessoaFisica)))
            .andExpect(status().isCreated());

        // Validate the PessoaFisica in the database
        List<PessoaFisica> pessoaFisicaList = pessoaFisicaRepository.findAll();
        assertThat(pessoaFisicaList).hasSize(databaseSizeBeforeCreate + 1);
        PessoaFisica testPessoaFisica = pessoaFisicaList.get(pessoaFisicaList.size() - 1);
        assertThat(testPessoaFisica.getNomeCompleto()).isEqualTo(DEFAULT_NOME_COMPLETO);
        assertThat(testPessoaFisica.getCpf()).isEqualTo(DEFAULT_CPF);
        assertThat(testPessoaFisica.getRg()).isEqualTo(DEFAULT_RG);
        assertThat(testPessoaFisica.getDataNascimento()).isEqualTo(DEFAULT_DATA_NASCIMENTO);
    }

    @Test
    @Transactional
    void createPessoaFisicaWithExistingId() throws Exception {
        // Create the PessoaFisica with an existing ID
        pessoaFisica.setId(1L);

        int databaseSizeBeforeCreate = pessoaFisicaRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restPessoaFisicaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pessoaFisica)))
            .andExpect(status().isBadRequest());

        // Validate the PessoaFisica in the database
        List<PessoaFisica> pessoaFisicaList = pessoaFisicaRepository.findAll();
        assertThat(pessoaFisicaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNomeCompletoIsRequired() throws Exception {
        int databaseSizeBeforeTest = pessoaFisicaRepository.findAll().size();
        // set the field null
        pessoaFisica.setNomeCompleto(null);

        // Create the PessoaFisica, which fails.

        restPessoaFisicaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pessoaFisica)))
            .andExpect(status().isBadRequest());

        List<PessoaFisica> pessoaFisicaList = pessoaFisicaRepository.findAll();
        assertThat(pessoaFisicaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllPessoaFisicas() throws Exception {
        // Initialize the database
        pessoaFisicaRepository.saveAndFlush(pessoaFisica);

        // Get all the pessoaFisicaList
        restPessoaFisicaMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pessoaFisica.getId().intValue())))
            .andExpect(jsonPath("$.[*].nomeCompleto").value(hasItem(DEFAULT_NOME_COMPLETO)))
            .andExpect(jsonPath("$.[*].cpf").value(hasItem(DEFAULT_CPF)))
            .andExpect(jsonPath("$.[*].rg").value(hasItem(DEFAULT_RG)))
            .andExpect(jsonPath("$.[*].dataNascimento").value(hasItem(DEFAULT_DATA_NASCIMENTO.toString())));
    }

    @Test
    @Transactional
    void getPessoaFisica() throws Exception {
        // Initialize the database
        pessoaFisicaRepository.saveAndFlush(pessoaFisica);

        // Get the pessoaFisica
        restPessoaFisicaMockMvc
            .perform(get(ENTITY_API_URL_ID, pessoaFisica.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(pessoaFisica.getId().intValue()))
            .andExpect(jsonPath("$.nomeCompleto").value(DEFAULT_NOME_COMPLETO))
            .andExpect(jsonPath("$.cpf").value(DEFAULT_CPF))
            .andExpect(jsonPath("$.rg").value(DEFAULT_RG))
            .andExpect(jsonPath("$.dataNascimento").value(DEFAULT_DATA_NASCIMENTO.toString()));
    }

    @Test
    @Transactional
    void getNonExistingPessoaFisica() throws Exception {
        // Get the pessoaFisica
        restPessoaFisicaMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingPessoaFisica() throws Exception {
        // Initialize the database
        pessoaFisicaRepository.saveAndFlush(pessoaFisica);

        int databaseSizeBeforeUpdate = pessoaFisicaRepository.findAll().size();

        // Update the pessoaFisica
        PessoaFisica updatedPessoaFisica = pessoaFisicaRepository.findById(pessoaFisica.getId()).get();
        // Disconnect from session so that the updates on updatedPessoaFisica are not directly saved in db
        em.detach(updatedPessoaFisica);
        updatedPessoaFisica.nomeCompleto(UPDATED_NOME_COMPLETO).cpf(UPDATED_CPF).rg(UPDATED_RG).dataNascimento(UPDATED_DATA_NASCIMENTO);

        restPessoaFisicaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedPessoaFisica.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedPessoaFisica))
            )
            .andExpect(status().isOk());

        // Validate the PessoaFisica in the database
        List<PessoaFisica> pessoaFisicaList = pessoaFisicaRepository.findAll();
        assertThat(pessoaFisicaList).hasSize(databaseSizeBeforeUpdate);
        PessoaFisica testPessoaFisica = pessoaFisicaList.get(pessoaFisicaList.size() - 1);
        assertThat(testPessoaFisica.getNomeCompleto()).isEqualTo(UPDATED_NOME_COMPLETO);
        assertThat(testPessoaFisica.getCpf()).isEqualTo(UPDATED_CPF);
        assertThat(testPessoaFisica.getRg()).isEqualTo(UPDATED_RG);
        assertThat(testPessoaFisica.getDataNascimento()).isEqualTo(UPDATED_DATA_NASCIMENTO);
    }

    @Test
    @Transactional
    void putNonExistingPessoaFisica() throws Exception {
        int databaseSizeBeforeUpdate = pessoaFisicaRepository.findAll().size();
        pessoaFisica.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPessoaFisicaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, pessoaFisica.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(pessoaFisica))
            )
            .andExpect(status().isBadRequest());

        // Validate the PessoaFisica in the database
        List<PessoaFisica> pessoaFisicaList = pessoaFisicaRepository.findAll();
        assertThat(pessoaFisicaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchPessoaFisica() throws Exception {
        int databaseSizeBeforeUpdate = pessoaFisicaRepository.findAll().size();
        pessoaFisica.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPessoaFisicaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(pessoaFisica))
            )
            .andExpect(status().isBadRequest());

        // Validate the PessoaFisica in the database
        List<PessoaFisica> pessoaFisicaList = pessoaFisicaRepository.findAll();
        assertThat(pessoaFisicaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamPessoaFisica() throws Exception {
        int databaseSizeBeforeUpdate = pessoaFisicaRepository.findAll().size();
        pessoaFisica.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPessoaFisicaMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pessoaFisica)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the PessoaFisica in the database
        List<PessoaFisica> pessoaFisicaList = pessoaFisicaRepository.findAll();
        assertThat(pessoaFisicaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdatePessoaFisicaWithPatch() throws Exception {
        // Initialize the database
        pessoaFisicaRepository.saveAndFlush(pessoaFisica);

        int databaseSizeBeforeUpdate = pessoaFisicaRepository.findAll().size();

        // Update the pessoaFisica using partial update
        PessoaFisica partialUpdatedPessoaFisica = new PessoaFisica();
        partialUpdatedPessoaFisica.setId(pessoaFisica.getId());

        partialUpdatedPessoaFisica.nomeCompleto(UPDATED_NOME_COMPLETO).dataNascimento(UPDATED_DATA_NASCIMENTO);

        restPessoaFisicaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPessoaFisica.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPessoaFisica))
            )
            .andExpect(status().isOk());

        // Validate the PessoaFisica in the database
        List<PessoaFisica> pessoaFisicaList = pessoaFisicaRepository.findAll();
        assertThat(pessoaFisicaList).hasSize(databaseSizeBeforeUpdate);
        PessoaFisica testPessoaFisica = pessoaFisicaList.get(pessoaFisicaList.size() - 1);
        assertThat(testPessoaFisica.getNomeCompleto()).isEqualTo(UPDATED_NOME_COMPLETO);
        assertThat(testPessoaFisica.getCpf()).isEqualTo(DEFAULT_CPF);
        assertThat(testPessoaFisica.getRg()).isEqualTo(DEFAULT_RG);
        assertThat(testPessoaFisica.getDataNascimento()).isEqualTo(UPDATED_DATA_NASCIMENTO);
    }

    @Test
    @Transactional
    void fullUpdatePessoaFisicaWithPatch() throws Exception {
        // Initialize the database
        pessoaFisicaRepository.saveAndFlush(pessoaFisica);

        int databaseSizeBeforeUpdate = pessoaFisicaRepository.findAll().size();

        // Update the pessoaFisica using partial update
        PessoaFisica partialUpdatedPessoaFisica = new PessoaFisica();
        partialUpdatedPessoaFisica.setId(pessoaFisica.getId());

        partialUpdatedPessoaFisica
            .nomeCompleto(UPDATED_NOME_COMPLETO)
            .cpf(UPDATED_CPF)
            .rg(UPDATED_RG)
            .dataNascimento(UPDATED_DATA_NASCIMENTO);

        restPessoaFisicaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPessoaFisica.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPessoaFisica))
            )
            .andExpect(status().isOk());

        // Validate the PessoaFisica in the database
        List<PessoaFisica> pessoaFisicaList = pessoaFisicaRepository.findAll();
        assertThat(pessoaFisicaList).hasSize(databaseSizeBeforeUpdate);
        PessoaFisica testPessoaFisica = pessoaFisicaList.get(pessoaFisicaList.size() - 1);
        assertThat(testPessoaFisica.getNomeCompleto()).isEqualTo(UPDATED_NOME_COMPLETO);
        assertThat(testPessoaFisica.getCpf()).isEqualTo(UPDATED_CPF);
        assertThat(testPessoaFisica.getRg()).isEqualTo(UPDATED_RG);
        assertThat(testPessoaFisica.getDataNascimento()).isEqualTo(UPDATED_DATA_NASCIMENTO);
    }

    @Test
    @Transactional
    void patchNonExistingPessoaFisica() throws Exception {
        int databaseSizeBeforeUpdate = pessoaFisicaRepository.findAll().size();
        pessoaFisica.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPessoaFisicaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, pessoaFisica.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(pessoaFisica))
            )
            .andExpect(status().isBadRequest());

        // Validate the PessoaFisica in the database
        List<PessoaFisica> pessoaFisicaList = pessoaFisicaRepository.findAll();
        assertThat(pessoaFisicaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchPessoaFisica() throws Exception {
        int databaseSizeBeforeUpdate = pessoaFisicaRepository.findAll().size();
        pessoaFisica.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPessoaFisicaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(pessoaFisica))
            )
            .andExpect(status().isBadRequest());

        // Validate the PessoaFisica in the database
        List<PessoaFisica> pessoaFisicaList = pessoaFisicaRepository.findAll();
        assertThat(pessoaFisicaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamPessoaFisica() throws Exception {
        int databaseSizeBeforeUpdate = pessoaFisicaRepository.findAll().size();
        pessoaFisica.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPessoaFisicaMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(pessoaFisica))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the PessoaFisica in the database
        List<PessoaFisica> pessoaFisicaList = pessoaFisicaRepository.findAll();
        assertThat(pessoaFisicaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deletePessoaFisica() throws Exception {
        // Initialize the database
        pessoaFisicaRepository.saveAndFlush(pessoaFisica);

        int databaseSizeBeforeDelete = pessoaFisicaRepository.findAll().size();

        // Delete the pessoaFisica
        restPessoaFisicaMockMvc
            .perform(delete(ENTITY_API_URL_ID, pessoaFisica.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PessoaFisica> pessoaFisicaList = pessoaFisicaRepository.findAll();
        assertThat(pessoaFisicaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
