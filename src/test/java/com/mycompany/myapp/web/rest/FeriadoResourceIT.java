package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.Feriado;
import com.mycompany.myapp.repository.FeriadoRepository;
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
 * Integration tests for the {@link FeriadoResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class FeriadoResourceIT {

    private static final Long DEFAULT_CODIGO = 1L;
    private static final Long UPDATED_CODIGO = 2L;

    private static final Instant DEFAULT_DATA_CRIACAO = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATA_CRIACAO = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_DATA = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATA = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/feriados";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private FeriadoRepository feriadoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restFeriadoMockMvc;

    private Feriado feriado;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Feriado createEntity(EntityManager em) {
        Feriado feriado = new Feriado().codigo(DEFAULT_CODIGO).dataCriacao(DEFAULT_DATA_CRIACAO).data(DEFAULT_DATA).nome(DEFAULT_NOME);
        return feriado;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Feriado createUpdatedEntity(EntityManager em) {
        Feriado feriado = new Feriado().codigo(UPDATED_CODIGO).dataCriacao(UPDATED_DATA_CRIACAO).data(UPDATED_DATA).nome(UPDATED_NOME);
        return feriado;
    }

    @BeforeEach
    public void initTest() {
        feriado = createEntity(em);
    }

    @Test
    @Transactional
    void createFeriado() throws Exception {
        int databaseSizeBeforeCreate = feriadoRepository.findAll().size();
        // Create the Feriado
        restFeriadoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(feriado)))
            .andExpect(status().isCreated());

        // Validate the Feriado in the database
        List<Feriado> feriadoList = feriadoRepository.findAll();
        assertThat(feriadoList).hasSize(databaseSizeBeforeCreate + 1);
        Feriado testFeriado = feriadoList.get(feriadoList.size() - 1);
        assertThat(testFeriado.getCodigo()).isEqualTo(DEFAULT_CODIGO);
        assertThat(testFeriado.getDataCriacao()).isEqualTo(DEFAULT_DATA_CRIACAO);
        assertThat(testFeriado.getData()).isEqualTo(DEFAULT_DATA);
        assertThat(testFeriado.getNome()).isEqualTo(DEFAULT_NOME);
    }

    @Test
    @Transactional
    void createFeriadoWithExistingId() throws Exception {
        // Create the Feriado with an existing ID
        feriado.setId(1L);

        int databaseSizeBeforeCreate = feriadoRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restFeriadoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(feriado)))
            .andExpect(status().isBadRequest());

        // Validate the Feriado in the database
        List<Feriado> feriadoList = feriadoRepository.findAll();
        assertThat(feriadoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkDataCriacaoIsRequired() throws Exception {
        int databaseSizeBeforeTest = feriadoRepository.findAll().size();
        // set the field null
        feriado.setDataCriacao(null);

        // Create the Feriado, which fails.

        restFeriadoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(feriado)))
            .andExpect(status().isBadRequest());

        List<Feriado> feriadoList = feriadoRepository.findAll();
        assertThat(feriadoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkDataIsRequired() throws Exception {
        int databaseSizeBeforeTest = feriadoRepository.findAll().size();
        // set the field null
        feriado.setData(null);

        // Create the Feriado, which fails.

        restFeriadoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(feriado)))
            .andExpect(status().isBadRequest());

        List<Feriado> feriadoList = feriadoRepository.findAll();
        assertThat(feriadoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkNomeIsRequired() throws Exception {
        int databaseSizeBeforeTest = feriadoRepository.findAll().size();
        // set the field null
        feriado.setNome(null);

        // Create the Feriado, which fails.

        restFeriadoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(feriado)))
            .andExpect(status().isBadRequest());

        List<Feriado> feriadoList = feriadoRepository.findAll();
        assertThat(feriadoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllFeriados() throws Exception {
        // Initialize the database
        feriadoRepository.saveAndFlush(feriado);

        // Get all the feriadoList
        restFeriadoMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(feriado.getId().intValue())))
            .andExpect(jsonPath("$.[*].codigo").value(hasItem(DEFAULT_CODIGO.intValue())))
            .andExpect(jsonPath("$.[*].dataCriacao").value(hasItem(DEFAULT_DATA_CRIACAO.toString())))
            .andExpect(jsonPath("$.[*].data").value(hasItem(DEFAULT_DATA.toString())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME)));
    }

    @Test
    @Transactional
    void getFeriado() throws Exception {
        // Initialize the database
        feriadoRepository.saveAndFlush(feriado);

        // Get the feriado
        restFeriadoMockMvc
            .perform(get(ENTITY_API_URL_ID, feriado.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(feriado.getId().intValue()))
            .andExpect(jsonPath("$.codigo").value(DEFAULT_CODIGO.intValue()))
            .andExpect(jsonPath("$.dataCriacao").value(DEFAULT_DATA_CRIACAO.toString()))
            .andExpect(jsonPath("$.data").value(DEFAULT_DATA.toString()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME));
    }

    @Test
    @Transactional
    void getNonExistingFeriado() throws Exception {
        // Get the feriado
        restFeriadoMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingFeriado() throws Exception {
        // Initialize the database
        feriadoRepository.saveAndFlush(feriado);

        int databaseSizeBeforeUpdate = feriadoRepository.findAll().size();

        // Update the feriado
        Feriado updatedFeriado = feriadoRepository.findById(feriado.getId()).get();
        // Disconnect from session so that the updates on updatedFeriado are not directly saved in db
        em.detach(updatedFeriado);
        updatedFeriado.codigo(UPDATED_CODIGO).dataCriacao(UPDATED_DATA_CRIACAO).data(UPDATED_DATA).nome(UPDATED_NOME);

        restFeriadoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedFeriado.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedFeriado))
            )
            .andExpect(status().isOk());

        // Validate the Feriado in the database
        List<Feriado> feriadoList = feriadoRepository.findAll();
        assertThat(feriadoList).hasSize(databaseSizeBeforeUpdate);
        Feriado testFeriado = feriadoList.get(feriadoList.size() - 1);
        assertThat(testFeriado.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testFeriado.getDataCriacao()).isEqualTo(UPDATED_DATA_CRIACAO);
        assertThat(testFeriado.getData()).isEqualTo(UPDATED_DATA);
        assertThat(testFeriado.getNome()).isEqualTo(UPDATED_NOME);
    }

    @Test
    @Transactional
    void putNonExistingFeriado() throws Exception {
        int databaseSizeBeforeUpdate = feriadoRepository.findAll().size();
        feriado.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFeriadoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, feriado.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(feriado))
            )
            .andExpect(status().isBadRequest());

        // Validate the Feriado in the database
        List<Feriado> feriadoList = feriadoRepository.findAll();
        assertThat(feriadoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchFeriado() throws Exception {
        int databaseSizeBeforeUpdate = feriadoRepository.findAll().size();
        feriado.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restFeriadoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(feriado))
            )
            .andExpect(status().isBadRequest());

        // Validate the Feriado in the database
        List<Feriado> feriadoList = feriadoRepository.findAll();
        assertThat(feriadoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamFeriado() throws Exception {
        int databaseSizeBeforeUpdate = feriadoRepository.findAll().size();
        feriado.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restFeriadoMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(feriado)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Feriado in the database
        List<Feriado> feriadoList = feriadoRepository.findAll();
        assertThat(feriadoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateFeriadoWithPatch() throws Exception {
        // Initialize the database
        feriadoRepository.saveAndFlush(feriado);

        int databaseSizeBeforeUpdate = feriadoRepository.findAll().size();

        // Update the feriado using partial update
        Feriado partialUpdatedFeriado = new Feriado();
        partialUpdatedFeriado.setId(feriado.getId());

        partialUpdatedFeriado.codigo(UPDATED_CODIGO).nome(UPDATED_NOME);

        restFeriadoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedFeriado.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedFeriado))
            )
            .andExpect(status().isOk());

        // Validate the Feriado in the database
        List<Feriado> feriadoList = feriadoRepository.findAll();
        assertThat(feriadoList).hasSize(databaseSizeBeforeUpdate);
        Feriado testFeriado = feriadoList.get(feriadoList.size() - 1);
        assertThat(testFeriado.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testFeriado.getDataCriacao()).isEqualTo(DEFAULT_DATA_CRIACAO);
        assertThat(testFeriado.getData()).isEqualTo(DEFAULT_DATA);
        assertThat(testFeriado.getNome()).isEqualTo(UPDATED_NOME);
    }

    @Test
    @Transactional
    void fullUpdateFeriadoWithPatch() throws Exception {
        // Initialize the database
        feriadoRepository.saveAndFlush(feriado);

        int databaseSizeBeforeUpdate = feriadoRepository.findAll().size();

        // Update the feriado using partial update
        Feriado partialUpdatedFeriado = new Feriado();
        partialUpdatedFeriado.setId(feriado.getId());

        partialUpdatedFeriado.codigo(UPDATED_CODIGO).dataCriacao(UPDATED_DATA_CRIACAO).data(UPDATED_DATA).nome(UPDATED_NOME);

        restFeriadoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedFeriado.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedFeriado))
            )
            .andExpect(status().isOk());

        // Validate the Feriado in the database
        List<Feriado> feriadoList = feriadoRepository.findAll();
        assertThat(feriadoList).hasSize(databaseSizeBeforeUpdate);
        Feriado testFeriado = feriadoList.get(feriadoList.size() - 1);
        assertThat(testFeriado.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testFeriado.getDataCriacao()).isEqualTo(UPDATED_DATA_CRIACAO);
        assertThat(testFeriado.getData()).isEqualTo(UPDATED_DATA);
        assertThat(testFeriado.getNome()).isEqualTo(UPDATED_NOME);
    }

    @Test
    @Transactional
    void patchNonExistingFeriado() throws Exception {
        int databaseSizeBeforeUpdate = feriadoRepository.findAll().size();
        feriado.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFeriadoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, feriado.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(feriado))
            )
            .andExpect(status().isBadRequest());

        // Validate the Feriado in the database
        List<Feriado> feriadoList = feriadoRepository.findAll();
        assertThat(feriadoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchFeriado() throws Exception {
        int databaseSizeBeforeUpdate = feriadoRepository.findAll().size();
        feriado.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restFeriadoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(feriado))
            )
            .andExpect(status().isBadRequest());

        // Validate the Feriado in the database
        List<Feriado> feriadoList = feriadoRepository.findAll();
        assertThat(feriadoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamFeriado() throws Exception {
        int databaseSizeBeforeUpdate = feriadoRepository.findAll().size();
        feriado.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restFeriadoMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(feriado)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Feriado in the database
        List<Feriado> feriadoList = feriadoRepository.findAll();
        assertThat(feriadoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteFeriado() throws Exception {
        // Initialize the database
        feriadoRepository.saveAndFlush(feriado);

        int databaseSizeBeforeDelete = feriadoRepository.findAll().size();

        // Delete the feriado
        restFeriadoMockMvc
            .perform(delete(ENTITY_API_URL_ID, feriado.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Feriado> feriadoList = feriadoRepository.findAll();
        assertThat(feriadoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
