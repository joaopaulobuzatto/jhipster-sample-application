package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.Operadora;
import com.mycompany.myapp.repository.OperadoraRepository;
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
 * Integration tests for the {@link OperadoraResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class OperadoraResourceIT {

    private static final Long DEFAULT_CODIGO = 1L;
    private static final Long UPDATED_CODIGO = 2L;

    private static final Instant DEFAULT_DATA_CRIACAO = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATA_CRIACAO = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_DESCRICAO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRICAO = "BBBBBBBBBB";

    private static final Boolean DEFAULT_ATIVO = false;
    private static final Boolean UPDATED_ATIVO = true;

    private static final String ENTITY_API_URL = "/api/operadoras";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private OperadoraRepository operadoraRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restOperadoraMockMvc;

    private Operadora operadora;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Operadora createEntity(EntityManager em) {
        Operadora operadora = new Operadora()
            .codigo(DEFAULT_CODIGO)
            .dataCriacao(DEFAULT_DATA_CRIACAO)
            .descricao(DEFAULT_DESCRICAO)
            .ativo(DEFAULT_ATIVO);
        return operadora;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Operadora createUpdatedEntity(EntityManager em) {
        Operadora operadora = new Operadora()
            .codigo(UPDATED_CODIGO)
            .dataCriacao(UPDATED_DATA_CRIACAO)
            .descricao(UPDATED_DESCRICAO)
            .ativo(UPDATED_ATIVO);
        return operadora;
    }

    @BeforeEach
    public void initTest() {
        operadora = createEntity(em);
    }

    @Test
    @Transactional
    void createOperadora() throws Exception {
        int databaseSizeBeforeCreate = operadoraRepository.findAll().size();
        // Create the Operadora
        restOperadoraMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(operadora)))
            .andExpect(status().isCreated());

        // Validate the Operadora in the database
        List<Operadora> operadoraList = operadoraRepository.findAll();
        assertThat(operadoraList).hasSize(databaseSizeBeforeCreate + 1);
        Operadora testOperadora = operadoraList.get(operadoraList.size() - 1);
        assertThat(testOperadora.getCodigo()).isEqualTo(DEFAULT_CODIGO);
        assertThat(testOperadora.getDataCriacao()).isEqualTo(DEFAULT_DATA_CRIACAO);
        assertThat(testOperadora.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);
        assertThat(testOperadora.getAtivo()).isEqualTo(DEFAULT_ATIVO);
    }

    @Test
    @Transactional
    void createOperadoraWithExistingId() throws Exception {
        // Create the Operadora with an existing ID
        operadora.setId(1L);

        int databaseSizeBeforeCreate = operadoraRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restOperadoraMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(operadora)))
            .andExpect(status().isBadRequest());

        // Validate the Operadora in the database
        List<Operadora> operadoraList = operadoraRepository.findAll();
        assertThat(operadoraList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkDataCriacaoIsRequired() throws Exception {
        int databaseSizeBeforeTest = operadoraRepository.findAll().size();
        // set the field null
        operadora.setDataCriacao(null);

        // Create the Operadora, which fails.

        restOperadoraMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(operadora)))
            .andExpect(status().isBadRequest());

        List<Operadora> operadoraList = operadoraRepository.findAll();
        assertThat(operadoraList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkDescricaoIsRequired() throws Exception {
        int databaseSizeBeforeTest = operadoraRepository.findAll().size();
        // set the field null
        operadora.setDescricao(null);

        // Create the Operadora, which fails.

        restOperadoraMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(operadora)))
            .andExpect(status().isBadRequest());

        List<Operadora> operadoraList = operadoraRepository.findAll();
        assertThat(operadoraList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkAtivoIsRequired() throws Exception {
        int databaseSizeBeforeTest = operadoraRepository.findAll().size();
        // set the field null
        operadora.setAtivo(null);

        // Create the Operadora, which fails.

        restOperadoraMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(operadora)))
            .andExpect(status().isBadRequest());

        List<Operadora> operadoraList = operadoraRepository.findAll();
        assertThat(operadoraList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllOperadoras() throws Exception {
        // Initialize the database
        operadoraRepository.saveAndFlush(operadora);

        // Get all the operadoraList
        restOperadoraMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(operadora.getId().intValue())))
            .andExpect(jsonPath("$.[*].codigo").value(hasItem(DEFAULT_CODIGO.intValue())))
            .andExpect(jsonPath("$.[*].dataCriacao").value(hasItem(DEFAULT_DATA_CRIACAO.toString())))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO)))
            .andExpect(jsonPath("$.[*].ativo").value(hasItem(DEFAULT_ATIVO.booleanValue())));
    }

    @Test
    @Transactional
    void getOperadora() throws Exception {
        // Initialize the database
        operadoraRepository.saveAndFlush(operadora);

        // Get the operadora
        restOperadoraMockMvc
            .perform(get(ENTITY_API_URL_ID, operadora.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(operadora.getId().intValue()))
            .andExpect(jsonPath("$.codigo").value(DEFAULT_CODIGO.intValue()))
            .andExpect(jsonPath("$.dataCriacao").value(DEFAULT_DATA_CRIACAO.toString()))
            .andExpect(jsonPath("$.descricao").value(DEFAULT_DESCRICAO))
            .andExpect(jsonPath("$.ativo").value(DEFAULT_ATIVO.booleanValue()));
    }

    @Test
    @Transactional
    void getNonExistingOperadora() throws Exception {
        // Get the operadora
        restOperadoraMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingOperadora() throws Exception {
        // Initialize the database
        operadoraRepository.saveAndFlush(operadora);

        int databaseSizeBeforeUpdate = operadoraRepository.findAll().size();

        // Update the operadora
        Operadora updatedOperadora = operadoraRepository.findById(operadora.getId()).get();
        // Disconnect from session so that the updates on updatedOperadora are not directly saved in db
        em.detach(updatedOperadora);
        updatedOperadora.codigo(UPDATED_CODIGO).dataCriacao(UPDATED_DATA_CRIACAO).descricao(UPDATED_DESCRICAO).ativo(UPDATED_ATIVO);

        restOperadoraMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedOperadora.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedOperadora))
            )
            .andExpect(status().isOk());

        // Validate the Operadora in the database
        List<Operadora> operadoraList = operadoraRepository.findAll();
        assertThat(operadoraList).hasSize(databaseSizeBeforeUpdate);
        Operadora testOperadora = operadoraList.get(operadoraList.size() - 1);
        assertThat(testOperadora.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testOperadora.getDataCriacao()).isEqualTo(UPDATED_DATA_CRIACAO);
        assertThat(testOperadora.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
        assertThat(testOperadora.getAtivo()).isEqualTo(UPDATED_ATIVO);
    }

    @Test
    @Transactional
    void putNonExistingOperadora() throws Exception {
        int databaseSizeBeforeUpdate = operadoraRepository.findAll().size();
        operadora.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOperadoraMockMvc
            .perform(
                put(ENTITY_API_URL_ID, operadora.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(operadora))
            )
            .andExpect(status().isBadRequest());

        // Validate the Operadora in the database
        List<Operadora> operadoraList = operadoraRepository.findAll();
        assertThat(operadoraList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchOperadora() throws Exception {
        int databaseSizeBeforeUpdate = operadoraRepository.findAll().size();
        operadora.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOperadoraMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(operadora))
            )
            .andExpect(status().isBadRequest());

        // Validate the Operadora in the database
        List<Operadora> operadoraList = operadoraRepository.findAll();
        assertThat(operadoraList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamOperadora() throws Exception {
        int databaseSizeBeforeUpdate = operadoraRepository.findAll().size();
        operadora.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOperadoraMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(operadora)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Operadora in the database
        List<Operadora> operadoraList = operadoraRepository.findAll();
        assertThat(operadoraList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateOperadoraWithPatch() throws Exception {
        // Initialize the database
        operadoraRepository.saveAndFlush(operadora);

        int databaseSizeBeforeUpdate = operadoraRepository.findAll().size();

        // Update the operadora using partial update
        Operadora partialUpdatedOperadora = new Operadora();
        partialUpdatedOperadora.setId(operadora.getId());

        partialUpdatedOperadora.codigo(UPDATED_CODIGO).dataCriacao(UPDATED_DATA_CRIACAO).descricao(UPDATED_DESCRICAO);

        restOperadoraMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedOperadora.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedOperadora))
            )
            .andExpect(status().isOk());

        // Validate the Operadora in the database
        List<Operadora> operadoraList = operadoraRepository.findAll();
        assertThat(operadoraList).hasSize(databaseSizeBeforeUpdate);
        Operadora testOperadora = operadoraList.get(operadoraList.size() - 1);
        assertThat(testOperadora.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testOperadora.getDataCriacao()).isEqualTo(UPDATED_DATA_CRIACAO);
        assertThat(testOperadora.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
        assertThat(testOperadora.getAtivo()).isEqualTo(DEFAULT_ATIVO);
    }

    @Test
    @Transactional
    void fullUpdateOperadoraWithPatch() throws Exception {
        // Initialize the database
        operadoraRepository.saveAndFlush(operadora);

        int databaseSizeBeforeUpdate = operadoraRepository.findAll().size();

        // Update the operadora using partial update
        Operadora partialUpdatedOperadora = new Operadora();
        partialUpdatedOperadora.setId(operadora.getId());

        partialUpdatedOperadora.codigo(UPDATED_CODIGO).dataCriacao(UPDATED_DATA_CRIACAO).descricao(UPDATED_DESCRICAO).ativo(UPDATED_ATIVO);

        restOperadoraMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedOperadora.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedOperadora))
            )
            .andExpect(status().isOk());

        // Validate the Operadora in the database
        List<Operadora> operadoraList = operadoraRepository.findAll();
        assertThat(operadoraList).hasSize(databaseSizeBeforeUpdate);
        Operadora testOperadora = operadoraList.get(operadoraList.size() - 1);
        assertThat(testOperadora.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testOperadora.getDataCriacao()).isEqualTo(UPDATED_DATA_CRIACAO);
        assertThat(testOperadora.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
        assertThat(testOperadora.getAtivo()).isEqualTo(UPDATED_ATIVO);
    }

    @Test
    @Transactional
    void patchNonExistingOperadora() throws Exception {
        int databaseSizeBeforeUpdate = operadoraRepository.findAll().size();
        operadora.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOperadoraMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, operadora.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(operadora))
            )
            .andExpect(status().isBadRequest());

        // Validate the Operadora in the database
        List<Operadora> operadoraList = operadoraRepository.findAll();
        assertThat(operadoraList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchOperadora() throws Exception {
        int databaseSizeBeforeUpdate = operadoraRepository.findAll().size();
        operadora.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOperadoraMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(operadora))
            )
            .andExpect(status().isBadRequest());

        // Validate the Operadora in the database
        List<Operadora> operadoraList = operadoraRepository.findAll();
        assertThat(operadoraList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamOperadora() throws Exception {
        int databaseSizeBeforeUpdate = operadoraRepository.findAll().size();
        operadora.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOperadoraMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(operadora))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Operadora in the database
        List<Operadora> operadoraList = operadoraRepository.findAll();
        assertThat(operadoraList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteOperadora() throws Exception {
        // Initialize the database
        operadoraRepository.saveAndFlush(operadora);

        int databaseSizeBeforeDelete = operadoraRepository.findAll().size();

        // Delete the operadora
        restOperadoraMockMvc
            .perform(delete(ENTITY_API_URL_ID, operadora.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Operadora> operadoraList = operadoraRepository.findAll();
        assertThat(operadoraList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
