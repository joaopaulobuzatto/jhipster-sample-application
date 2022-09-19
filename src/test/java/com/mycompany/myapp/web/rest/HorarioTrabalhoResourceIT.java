package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.HorarioTrabalho;
import com.mycompany.myapp.repository.HorarioTrabalhoRepository;
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
 * Integration tests for the {@link HorarioTrabalhoResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class HorarioTrabalhoResourceIT {

    private static final Long DEFAULT_CODIGO = 1L;
    private static final Long UPDATED_CODIGO = 2L;

    private static final Instant DEFAULT_DATA_CRIACAO = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATA_CRIACAO = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_DESCRICAO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRICAO = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/horario-trabalhos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private HorarioTrabalhoRepository horarioTrabalhoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restHorarioTrabalhoMockMvc;

    private HorarioTrabalho horarioTrabalho;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static HorarioTrabalho createEntity(EntityManager em) {
        HorarioTrabalho horarioTrabalho = new HorarioTrabalho()
            .codigo(DEFAULT_CODIGO)
            .dataCriacao(DEFAULT_DATA_CRIACAO)
            .descricao(DEFAULT_DESCRICAO);
        return horarioTrabalho;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static HorarioTrabalho createUpdatedEntity(EntityManager em) {
        HorarioTrabalho horarioTrabalho = new HorarioTrabalho()
            .codigo(UPDATED_CODIGO)
            .dataCriacao(UPDATED_DATA_CRIACAO)
            .descricao(UPDATED_DESCRICAO);
        return horarioTrabalho;
    }

    @BeforeEach
    public void initTest() {
        horarioTrabalho = createEntity(em);
    }

    @Test
    @Transactional
    void createHorarioTrabalho() throws Exception {
        int databaseSizeBeforeCreate = horarioTrabalhoRepository.findAll().size();
        // Create the HorarioTrabalho
        restHorarioTrabalhoMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(horarioTrabalho))
            )
            .andExpect(status().isCreated());

        // Validate the HorarioTrabalho in the database
        List<HorarioTrabalho> horarioTrabalhoList = horarioTrabalhoRepository.findAll();
        assertThat(horarioTrabalhoList).hasSize(databaseSizeBeforeCreate + 1);
        HorarioTrabalho testHorarioTrabalho = horarioTrabalhoList.get(horarioTrabalhoList.size() - 1);
        assertThat(testHorarioTrabalho.getCodigo()).isEqualTo(DEFAULT_CODIGO);
        assertThat(testHorarioTrabalho.getDataCriacao()).isEqualTo(DEFAULT_DATA_CRIACAO);
        assertThat(testHorarioTrabalho.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);
    }

    @Test
    @Transactional
    void createHorarioTrabalhoWithExistingId() throws Exception {
        // Create the HorarioTrabalho with an existing ID
        horarioTrabalho.setId(1L);

        int databaseSizeBeforeCreate = horarioTrabalhoRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restHorarioTrabalhoMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(horarioTrabalho))
            )
            .andExpect(status().isBadRequest());

        // Validate the HorarioTrabalho in the database
        List<HorarioTrabalho> horarioTrabalhoList = horarioTrabalhoRepository.findAll();
        assertThat(horarioTrabalhoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkDataCriacaoIsRequired() throws Exception {
        int databaseSizeBeforeTest = horarioTrabalhoRepository.findAll().size();
        // set the field null
        horarioTrabalho.setDataCriacao(null);

        // Create the HorarioTrabalho, which fails.

        restHorarioTrabalhoMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(horarioTrabalho))
            )
            .andExpect(status().isBadRequest());

        List<HorarioTrabalho> horarioTrabalhoList = horarioTrabalhoRepository.findAll();
        assertThat(horarioTrabalhoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkDescricaoIsRequired() throws Exception {
        int databaseSizeBeforeTest = horarioTrabalhoRepository.findAll().size();
        // set the field null
        horarioTrabalho.setDescricao(null);

        // Create the HorarioTrabalho, which fails.

        restHorarioTrabalhoMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(horarioTrabalho))
            )
            .andExpect(status().isBadRequest());

        List<HorarioTrabalho> horarioTrabalhoList = horarioTrabalhoRepository.findAll();
        assertThat(horarioTrabalhoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllHorarioTrabalhos() throws Exception {
        // Initialize the database
        horarioTrabalhoRepository.saveAndFlush(horarioTrabalho);

        // Get all the horarioTrabalhoList
        restHorarioTrabalhoMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(horarioTrabalho.getId().intValue())))
            .andExpect(jsonPath("$.[*].codigo").value(hasItem(DEFAULT_CODIGO.intValue())))
            .andExpect(jsonPath("$.[*].dataCriacao").value(hasItem(DEFAULT_DATA_CRIACAO.toString())))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO)));
    }

    @Test
    @Transactional
    void getHorarioTrabalho() throws Exception {
        // Initialize the database
        horarioTrabalhoRepository.saveAndFlush(horarioTrabalho);

        // Get the horarioTrabalho
        restHorarioTrabalhoMockMvc
            .perform(get(ENTITY_API_URL_ID, horarioTrabalho.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(horarioTrabalho.getId().intValue()))
            .andExpect(jsonPath("$.codigo").value(DEFAULT_CODIGO.intValue()))
            .andExpect(jsonPath("$.dataCriacao").value(DEFAULT_DATA_CRIACAO.toString()))
            .andExpect(jsonPath("$.descricao").value(DEFAULT_DESCRICAO));
    }

    @Test
    @Transactional
    void getNonExistingHorarioTrabalho() throws Exception {
        // Get the horarioTrabalho
        restHorarioTrabalhoMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingHorarioTrabalho() throws Exception {
        // Initialize the database
        horarioTrabalhoRepository.saveAndFlush(horarioTrabalho);

        int databaseSizeBeforeUpdate = horarioTrabalhoRepository.findAll().size();

        // Update the horarioTrabalho
        HorarioTrabalho updatedHorarioTrabalho = horarioTrabalhoRepository.findById(horarioTrabalho.getId()).get();
        // Disconnect from session so that the updates on updatedHorarioTrabalho are not directly saved in db
        em.detach(updatedHorarioTrabalho);
        updatedHorarioTrabalho.codigo(UPDATED_CODIGO).dataCriacao(UPDATED_DATA_CRIACAO).descricao(UPDATED_DESCRICAO);

        restHorarioTrabalhoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedHorarioTrabalho.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedHorarioTrabalho))
            )
            .andExpect(status().isOk());

        // Validate the HorarioTrabalho in the database
        List<HorarioTrabalho> horarioTrabalhoList = horarioTrabalhoRepository.findAll();
        assertThat(horarioTrabalhoList).hasSize(databaseSizeBeforeUpdate);
        HorarioTrabalho testHorarioTrabalho = horarioTrabalhoList.get(horarioTrabalhoList.size() - 1);
        assertThat(testHorarioTrabalho.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testHorarioTrabalho.getDataCriacao()).isEqualTo(UPDATED_DATA_CRIACAO);
        assertThat(testHorarioTrabalho.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
    }

    @Test
    @Transactional
    void putNonExistingHorarioTrabalho() throws Exception {
        int databaseSizeBeforeUpdate = horarioTrabalhoRepository.findAll().size();
        horarioTrabalho.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restHorarioTrabalhoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, horarioTrabalho.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(horarioTrabalho))
            )
            .andExpect(status().isBadRequest());

        // Validate the HorarioTrabalho in the database
        List<HorarioTrabalho> horarioTrabalhoList = horarioTrabalhoRepository.findAll();
        assertThat(horarioTrabalhoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchHorarioTrabalho() throws Exception {
        int databaseSizeBeforeUpdate = horarioTrabalhoRepository.findAll().size();
        horarioTrabalho.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restHorarioTrabalhoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(horarioTrabalho))
            )
            .andExpect(status().isBadRequest());

        // Validate the HorarioTrabalho in the database
        List<HorarioTrabalho> horarioTrabalhoList = horarioTrabalhoRepository.findAll();
        assertThat(horarioTrabalhoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamHorarioTrabalho() throws Exception {
        int databaseSizeBeforeUpdate = horarioTrabalhoRepository.findAll().size();
        horarioTrabalho.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restHorarioTrabalhoMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(horarioTrabalho))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the HorarioTrabalho in the database
        List<HorarioTrabalho> horarioTrabalhoList = horarioTrabalhoRepository.findAll();
        assertThat(horarioTrabalhoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateHorarioTrabalhoWithPatch() throws Exception {
        // Initialize the database
        horarioTrabalhoRepository.saveAndFlush(horarioTrabalho);

        int databaseSizeBeforeUpdate = horarioTrabalhoRepository.findAll().size();

        // Update the horarioTrabalho using partial update
        HorarioTrabalho partialUpdatedHorarioTrabalho = new HorarioTrabalho();
        partialUpdatedHorarioTrabalho.setId(horarioTrabalho.getId());

        partialUpdatedHorarioTrabalho.dataCriacao(UPDATED_DATA_CRIACAO);

        restHorarioTrabalhoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedHorarioTrabalho.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedHorarioTrabalho))
            )
            .andExpect(status().isOk());

        // Validate the HorarioTrabalho in the database
        List<HorarioTrabalho> horarioTrabalhoList = horarioTrabalhoRepository.findAll();
        assertThat(horarioTrabalhoList).hasSize(databaseSizeBeforeUpdate);
        HorarioTrabalho testHorarioTrabalho = horarioTrabalhoList.get(horarioTrabalhoList.size() - 1);
        assertThat(testHorarioTrabalho.getCodigo()).isEqualTo(DEFAULT_CODIGO);
        assertThat(testHorarioTrabalho.getDataCriacao()).isEqualTo(UPDATED_DATA_CRIACAO);
        assertThat(testHorarioTrabalho.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);
    }

    @Test
    @Transactional
    void fullUpdateHorarioTrabalhoWithPatch() throws Exception {
        // Initialize the database
        horarioTrabalhoRepository.saveAndFlush(horarioTrabalho);

        int databaseSizeBeforeUpdate = horarioTrabalhoRepository.findAll().size();

        // Update the horarioTrabalho using partial update
        HorarioTrabalho partialUpdatedHorarioTrabalho = new HorarioTrabalho();
        partialUpdatedHorarioTrabalho.setId(horarioTrabalho.getId());

        partialUpdatedHorarioTrabalho.codigo(UPDATED_CODIGO).dataCriacao(UPDATED_DATA_CRIACAO).descricao(UPDATED_DESCRICAO);

        restHorarioTrabalhoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedHorarioTrabalho.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedHorarioTrabalho))
            )
            .andExpect(status().isOk());

        // Validate the HorarioTrabalho in the database
        List<HorarioTrabalho> horarioTrabalhoList = horarioTrabalhoRepository.findAll();
        assertThat(horarioTrabalhoList).hasSize(databaseSizeBeforeUpdate);
        HorarioTrabalho testHorarioTrabalho = horarioTrabalhoList.get(horarioTrabalhoList.size() - 1);
        assertThat(testHorarioTrabalho.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testHorarioTrabalho.getDataCriacao()).isEqualTo(UPDATED_DATA_CRIACAO);
        assertThat(testHorarioTrabalho.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
    }

    @Test
    @Transactional
    void patchNonExistingHorarioTrabalho() throws Exception {
        int databaseSizeBeforeUpdate = horarioTrabalhoRepository.findAll().size();
        horarioTrabalho.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restHorarioTrabalhoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, horarioTrabalho.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(horarioTrabalho))
            )
            .andExpect(status().isBadRequest());

        // Validate the HorarioTrabalho in the database
        List<HorarioTrabalho> horarioTrabalhoList = horarioTrabalhoRepository.findAll();
        assertThat(horarioTrabalhoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchHorarioTrabalho() throws Exception {
        int databaseSizeBeforeUpdate = horarioTrabalhoRepository.findAll().size();
        horarioTrabalho.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restHorarioTrabalhoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(horarioTrabalho))
            )
            .andExpect(status().isBadRequest());

        // Validate the HorarioTrabalho in the database
        List<HorarioTrabalho> horarioTrabalhoList = horarioTrabalhoRepository.findAll();
        assertThat(horarioTrabalhoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamHorarioTrabalho() throws Exception {
        int databaseSizeBeforeUpdate = horarioTrabalhoRepository.findAll().size();
        horarioTrabalho.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restHorarioTrabalhoMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(horarioTrabalho))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the HorarioTrabalho in the database
        List<HorarioTrabalho> horarioTrabalhoList = horarioTrabalhoRepository.findAll();
        assertThat(horarioTrabalhoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteHorarioTrabalho() throws Exception {
        // Initialize the database
        horarioTrabalhoRepository.saveAndFlush(horarioTrabalho);

        int databaseSizeBeforeDelete = horarioTrabalhoRepository.findAll().size();

        // Delete the horarioTrabalho
        restHorarioTrabalhoMockMvc
            .perform(delete(ENTITY_API_URL_ID, horarioTrabalho.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<HorarioTrabalho> horarioTrabalhoList = horarioTrabalhoRepository.findAll();
        assertThat(horarioTrabalhoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
