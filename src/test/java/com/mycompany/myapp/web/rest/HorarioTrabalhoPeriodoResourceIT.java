package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.HorarioTrabalhoPeriodo;
import com.mycompany.myapp.repository.HorarioTrabalhoPeriodoRepository;
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
 * Integration tests for the {@link HorarioTrabalhoPeriodoResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class HorarioTrabalhoPeriodoResourceIT {

    private static final Instant DEFAULT_DATA_CRIACAO = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATA_CRIACAO = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_DIA_DA_SEMANA = "AAAAAAAAAA";
    private static final String UPDATED_DIA_DA_SEMANA = "BBBBBBBBBB";

    private static final Instant DEFAULT_PERIODO_1_INICIO = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_PERIODO_1_INICIO = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_PERIODO_1_FIM = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_PERIODO_1_FIM = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_PERIODO_2_INICIO = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_PERIODO_2_INICIO = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_PERIODO_2_FIM = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_PERIODO_2_FIM = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_PERIODO_3_INICIO = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_PERIODO_3_INICIO = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_PERIODO_3_FIM = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_PERIODO_3_FIM = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_PERIODO_4_INICIO = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_PERIODO_4_INICIO = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_PERIODO_4_FIM = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_PERIODO_4_FIM = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String ENTITY_API_URL = "/api/horario-trabalho-periodos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private HorarioTrabalhoPeriodoRepository horarioTrabalhoPeriodoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restHorarioTrabalhoPeriodoMockMvc;

    private HorarioTrabalhoPeriodo horarioTrabalhoPeriodo;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static HorarioTrabalhoPeriodo createEntity(EntityManager em) {
        HorarioTrabalhoPeriodo horarioTrabalhoPeriodo = new HorarioTrabalhoPeriodo()
            .dataCriacao(DEFAULT_DATA_CRIACAO)
            .diaDaSemana(DEFAULT_DIA_DA_SEMANA)
            .periodo1Inicio(DEFAULT_PERIODO_1_INICIO)
            .periodo1Fim(DEFAULT_PERIODO_1_FIM)
            .periodo2Inicio(DEFAULT_PERIODO_2_INICIO)
            .periodo2Fim(DEFAULT_PERIODO_2_FIM)
            .periodo3Inicio(DEFAULT_PERIODO_3_INICIO)
            .periodo3Fim(DEFAULT_PERIODO_3_FIM)
            .periodo4Inicio(DEFAULT_PERIODO_4_INICIO)
            .periodo4Fim(DEFAULT_PERIODO_4_FIM);
        return horarioTrabalhoPeriodo;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static HorarioTrabalhoPeriodo createUpdatedEntity(EntityManager em) {
        HorarioTrabalhoPeriodo horarioTrabalhoPeriodo = new HorarioTrabalhoPeriodo()
            .dataCriacao(UPDATED_DATA_CRIACAO)
            .diaDaSemana(UPDATED_DIA_DA_SEMANA)
            .periodo1Inicio(UPDATED_PERIODO_1_INICIO)
            .periodo1Fim(UPDATED_PERIODO_1_FIM)
            .periodo2Inicio(UPDATED_PERIODO_2_INICIO)
            .periodo2Fim(UPDATED_PERIODO_2_FIM)
            .periodo3Inicio(UPDATED_PERIODO_3_INICIO)
            .periodo3Fim(UPDATED_PERIODO_3_FIM)
            .periodo4Inicio(UPDATED_PERIODO_4_INICIO)
            .periodo4Fim(UPDATED_PERIODO_4_FIM);
        return horarioTrabalhoPeriodo;
    }

    @BeforeEach
    public void initTest() {
        horarioTrabalhoPeriodo = createEntity(em);
    }

    @Test
    @Transactional
    void createHorarioTrabalhoPeriodo() throws Exception {
        int databaseSizeBeforeCreate = horarioTrabalhoPeriodoRepository.findAll().size();
        // Create the HorarioTrabalhoPeriodo
        restHorarioTrabalhoPeriodoMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(horarioTrabalhoPeriodo))
            )
            .andExpect(status().isCreated());

        // Validate the HorarioTrabalhoPeriodo in the database
        List<HorarioTrabalhoPeriodo> horarioTrabalhoPeriodoList = horarioTrabalhoPeriodoRepository.findAll();
        assertThat(horarioTrabalhoPeriodoList).hasSize(databaseSizeBeforeCreate + 1);
        HorarioTrabalhoPeriodo testHorarioTrabalhoPeriodo = horarioTrabalhoPeriodoList.get(horarioTrabalhoPeriodoList.size() - 1);
        assertThat(testHorarioTrabalhoPeriodo.getDataCriacao()).isEqualTo(DEFAULT_DATA_CRIACAO);
        assertThat(testHorarioTrabalhoPeriodo.getDiaDaSemana()).isEqualTo(DEFAULT_DIA_DA_SEMANA);
        assertThat(testHorarioTrabalhoPeriodo.getPeriodo1Inicio()).isEqualTo(DEFAULT_PERIODO_1_INICIO);
        assertThat(testHorarioTrabalhoPeriodo.getPeriodo1Fim()).isEqualTo(DEFAULT_PERIODO_1_FIM);
        assertThat(testHorarioTrabalhoPeriodo.getPeriodo2Inicio()).isEqualTo(DEFAULT_PERIODO_2_INICIO);
        assertThat(testHorarioTrabalhoPeriodo.getPeriodo2Fim()).isEqualTo(DEFAULT_PERIODO_2_FIM);
        assertThat(testHorarioTrabalhoPeriodo.getPeriodo3Inicio()).isEqualTo(DEFAULT_PERIODO_3_INICIO);
        assertThat(testHorarioTrabalhoPeriodo.getPeriodo3Fim()).isEqualTo(DEFAULT_PERIODO_3_FIM);
        assertThat(testHorarioTrabalhoPeriodo.getPeriodo4Inicio()).isEqualTo(DEFAULT_PERIODO_4_INICIO);
        assertThat(testHorarioTrabalhoPeriodo.getPeriodo4Fim()).isEqualTo(DEFAULT_PERIODO_4_FIM);
    }

    @Test
    @Transactional
    void createHorarioTrabalhoPeriodoWithExistingId() throws Exception {
        // Create the HorarioTrabalhoPeriodo with an existing ID
        horarioTrabalhoPeriodo.setId(1L);

        int databaseSizeBeforeCreate = horarioTrabalhoPeriodoRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restHorarioTrabalhoPeriodoMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(horarioTrabalhoPeriodo))
            )
            .andExpect(status().isBadRequest());

        // Validate the HorarioTrabalhoPeriodo in the database
        List<HorarioTrabalhoPeriodo> horarioTrabalhoPeriodoList = horarioTrabalhoPeriodoRepository.findAll();
        assertThat(horarioTrabalhoPeriodoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkDataCriacaoIsRequired() throws Exception {
        int databaseSizeBeforeTest = horarioTrabalhoPeriodoRepository.findAll().size();
        // set the field null
        horarioTrabalhoPeriodo.setDataCriacao(null);

        // Create the HorarioTrabalhoPeriodo, which fails.

        restHorarioTrabalhoPeriodoMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(horarioTrabalhoPeriodo))
            )
            .andExpect(status().isBadRequest());

        List<HorarioTrabalhoPeriodo> horarioTrabalhoPeriodoList = horarioTrabalhoPeriodoRepository.findAll();
        assertThat(horarioTrabalhoPeriodoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllHorarioTrabalhoPeriodos() throws Exception {
        // Initialize the database
        horarioTrabalhoPeriodoRepository.saveAndFlush(horarioTrabalhoPeriodo);

        // Get all the horarioTrabalhoPeriodoList
        restHorarioTrabalhoPeriodoMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(horarioTrabalhoPeriodo.getId().intValue())))
            .andExpect(jsonPath("$.[*].dataCriacao").value(hasItem(DEFAULT_DATA_CRIACAO.toString())))
            .andExpect(jsonPath("$.[*].diaDaSemana").value(hasItem(DEFAULT_DIA_DA_SEMANA)))
            .andExpect(jsonPath("$.[*].periodo1Inicio").value(hasItem(DEFAULT_PERIODO_1_INICIO.toString())))
            .andExpect(jsonPath("$.[*].periodo1Fim").value(hasItem(DEFAULT_PERIODO_1_FIM.toString())))
            .andExpect(jsonPath("$.[*].periodo2Inicio").value(hasItem(DEFAULT_PERIODO_2_INICIO.toString())))
            .andExpect(jsonPath("$.[*].periodo2Fim").value(hasItem(DEFAULT_PERIODO_2_FIM.toString())))
            .andExpect(jsonPath("$.[*].periodo3Inicio").value(hasItem(DEFAULT_PERIODO_3_INICIO.toString())))
            .andExpect(jsonPath("$.[*].periodo3Fim").value(hasItem(DEFAULT_PERIODO_3_FIM.toString())))
            .andExpect(jsonPath("$.[*].periodo4Inicio").value(hasItem(DEFAULT_PERIODO_4_INICIO.toString())))
            .andExpect(jsonPath("$.[*].periodo4Fim").value(hasItem(DEFAULT_PERIODO_4_FIM.toString())));
    }

    @Test
    @Transactional
    void getHorarioTrabalhoPeriodo() throws Exception {
        // Initialize the database
        horarioTrabalhoPeriodoRepository.saveAndFlush(horarioTrabalhoPeriodo);

        // Get the horarioTrabalhoPeriodo
        restHorarioTrabalhoPeriodoMockMvc
            .perform(get(ENTITY_API_URL_ID, horarioTrabalhoPeriodo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(horarioTrabalhoPeriodo.getId().intValue()))
            .andExpect(jsonPath("$.dataCriacao").value(DEFAULT_DATA_CRIACAO.toString()))
            .andExpect(jsonPath("$.diaDaSemana").value(DEFAULT_DIA_DA_SEMANA))
            .andExpect(jsonPath("$.periodo1Inicio").value(DEFAULT_PERIODO_1_INICIO.toString()))
            .andExpect(jsonPath("$.periodo1Fim").value(DEFAULT_PERIODO_1_FIM.toString()))
            .andExpect(jsonPath("$.periodo2Inicio").value(DEFAULT_PERIODO_2_INICIO.toString()))
            .andExpect(jsonPath("$.periodo2Fim").value(DEFAULT_PERIODO_2_FIM.toString()))
            .andExpect(jsonPath("$.periodo3Inicio").value(DEFAULT_PERIODO_3_INICIO.toString()))
            .andExpect(jsonPath("$.periodo3Fim").value(DEFAULT_PERIODO_3_FIM.toString()))
            .andExpect(jsonPath("$.periodo4Inicio").value(DEFAULT_PERIODO_4_INICIO.toString()))
            .andExpect(jsonPath("$.periodo4Fim").value(DEFAULT_PERIODO_4_FIM.toString()));
    }

    @Test
    @Transactional
    void getNonExistingHorarioTrabalhoPeriodo() throws Exception {
        // Get the horarioTrabalhoPeriodo
        restHorarioTrabalhoPeriodoMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingHorarioTrabalhoPeriodo() throws Exception {
        // Initialize the database
        horarioTrabalhoPeriodoRepository.saveAndFlush(horarioTrabalhoPeriodo);

        int databaseSizeBeforeUpdate = horarioTrabalhoPeriodoRepository.findAll().size();

        // Update the horarioTrabalhoPeriodo
        HorarioTrabalhoPeriodo updatedHorarioTrabalhoPeriodo = horarioTrabalhoPeriodoRepository
            .findById(horarioTrabalhoPeriodo.getId())
            .get();
        // Disconnect from session so that the updates on updatedHorarioTrabalhoPeriodo are not directly saved in db
        em.detach(updatedHorarioTrabalhoPeriodo);
        updatedHorarioTrabalhoPeriodo
            .dataCriacao(UPDATED_DATA_CRIACAO)
            .diaDaSemana(UPDATED_DIA_DA_SEMANA)
            .periodo1Inicio(UPDATED_PERIODO_1_INICIO)
            .periodo1Fim(UPDATED_PERIODO_1_FIM)
            .periodo2Inicio(UPDATED_PERIODO_2_INICIO)
            .periodo2Fim(UPDATED_PERIODO_2_FIM)
            .periodo3Inicio(UPDATED_PERIODO_3_INICIO)
            .periodo3Fim(UPDATED_PERIODO_3_FIM)
            .periodo4Inicio(UPDATED_PERIODO_4_INICIO)
            .periodo4Fim(UPDATED_PERIODO_4_FIM);

        restHorarioTrabalhoPeriodoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedHorarioTrabalhoPeriodo.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedHorarioTrabalhoPeriodo))
            )
            .andExpect(status().isOk());

        // Validate the HorarioTrabalhoPeriodo in the database
        List<HorarioTrabalhoPeriodo> horarioTrabalhoPeriodoList = horarioTrabalhoPeriodoRepository.findAll();
        assertThat(horarioTrabalhoPeriodoList).hasSize(databaseSizeBeforeUpdate);
        HorarioTrabalhoPeriodo testHorarioTrabalhoPeriodo = horarioTrabalhoPeriodoList.get(horarioTrabalhoPeriodoList.size() - 1);
        assertThat(testHorarioTrabalhoPeriodo.getDataCriacao()).isEqualTo(UPDATED_DATA_CRIACAO);
        assertThat(testHorarioTrabalhoPeriodo.getDiaDaSemana()).isEqualTo(UPDATED_DIA_DA_SEMANA);
        assertThat(testHorarioTrabalhoPeriodo.getPeriodo1Inicio()).isEqualTo(UPDATED_PERIODO_1_INICIO);
        assertThat(testHorarioTrabalhoPeriodo.getPeriodo1Fim()).isEqualTo(UPDATED_PERIODO_1_FIM);
        assertThat(testHorarioTrabalhoPeriodo.getPeriodo2Inicio()).isEqualTo(UPDATED_PERIODO_2_INICIO);
        assertThat(testHorarioTrabalhoPeriodo.getPeriodo2Fim()).isEqualTo(UPDATED_PERIODO_2_FIM);
        assertThat(testHorarioTrabalhoPeriodo.getPeriodo3Inicio()).isEqualTo(UPDATED_PERIODO_3_INICIO);
        assertThat(testHorarioTrabalhoPeriodo.getPeriodo3Fim()).isEqualTo(UPDATED_PERIODO_3_FIM);
        assertThat(testHorarioTrabalhoPeriodo.getPeriodo4Inicio()).isEqualTo(UPDATED_PERIODO_4_INICIO);
        assertThat(testHorarioTrabalhoPeriodo.getPeriodo4Fim()).isEqualTo(UPDATED_PERIODO_4_FIM);
    }

    @Test
    @Transactional
    void putNonExistingHorarioTrabalhoPeriodo() throws Exception {
        int databaseSizeBeforeUpdate = horarioTrabalhoPeriodoRepository.findAll().size();
        horarioTrabalhoPeriodo.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restHorarioTrabalhoPeriodoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, horarioTrabalhoPeriodo.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(horarioTrabalhoPeriodo))
            )
            .andExpect(status().isBadRequest());

        // Validate the HorarioTrabalhoPeriodo in the database
        List<HorarioTrabalhoPeriodo> horarioTrabalhoPeriodoList = horarioTrabalhoPeriodoRepository.findAll();
        assertThat(horarioTrabalhoPeriodoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchHorarioTrabalhoPeriodo() throws Exception {
        int databaseSizeBeforeUpdate = horarioTrabalhoPeriodoRepository.findAll().size();
        horarioTrabalhoPeriodo.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restHorarioTrabalhoPeriodoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(horarioTrabalhoPeriodo))
            )
            .andExpect(status().isBadRequest());

        // Validate the HorarioTrabalhoPeriodo in the database
        List<HorarioTrabalhoPeriodo> horarioTrabalhoPeriodoList = horarioTrabalhoPeriodoRepository.findAll();
        assertThat(horarioTrabalhoPeriodoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamHorarioTrabalhoPeriodo() throws Exception {
        int databaseSizeBeforeUpdate = horarioTrabalhoPeriodoRepository.findAll().size();
        horarioTrabalhoPeriodo.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restHorarioTrabalhoPeriodoMockMvc
            .perform(
                put(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(horarioTrabalhoPeriodo))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the HorarioTrabalhoPeriodo in the database
        List<HorarioTrabalhoPeriodo> horarioTrabalhoPeriodoList = horarioTrabalhoPeriodoRepository.findAll();
        assertThat(horarioTrabalhoPeriodoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateHorarioTrabalhoPeriodoWithPatch() throws Exception {
        // Initialize the database
        horarioTrabalhoPeriodoRepository.saveAndFlush(horarioTrabalhoPeriodo);

        int databaseSizeBeforeUpdate = horarioTrabalhoPeriodoRepository.findAll().size();

        // Update the horarioTrabalhoPeriodo using partial update
        HorarioTrabalhoPeriodo partialUpdatedHorarioTrabalhoPeriodo = new HorarioTrabalhoPeriodo();
        partialUpdatedHorarioTrabalhoPeriodo.setId(horarioTrabalhoPeriodo.getId());

        partialUpdatedHorarioTrabalhoPeriodo
            .dataCriacao(UPDATED_DATA_CRIACAO)
            .diaDaSemana(UPDATED_DIA_DA_SEMANA)
            .periodo1Inicio(UPDATED_PERIODO_1_INICIO)
            .periodo1Fim(UPDATED_PERIODO_1_FIM)
            .periodo2Fim(UPDATED_PERIODO_2_FIM)
            .periodo3Fim(UPDATED_PERIODO_3_FIM)
            .periodo4Fim(UPDATED_PERIODO_4_FIM);

        restHorarioTrabalhoPeriodoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedHorarioTrabalhoPeriodo.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedHorarioTrabalhoPeriodo))
            )
            .andExpect(status().isOk());

        // Validate the HorarioTrabalhoPeriodo in the database
        List<HorarioTrabalhoPeriodo> horarioTrabalhoPeriodoList = horarioTrabalhoPeriodoRepository.findAll();
        assertThat(horarioTrabalhoPeriodoList).hasSize(databaseSizeBeforeUpdate);
        HorarioTrabalhoPeriodo testHorarioTrabalhoPeriodo = horarioTrabalhoPeriodoList.get(horarioTrabalhoPeriodoList.size() - 1);
        assertThat(testHorarioTrabalhoPeriodo.getDataCriacao()).isEqualTo(UPDATED_DATA_CRIACAO);
        assertThat(testHorarioTrabalhoPeriodo.getDiaDaSemana()).isEqualTo(UPDATED_DIA_DA_SEMANA);
        assertThat(testHorarioTrabalhoPeriodo.getPeriodo1Inicio()).isEqualTo(UPDATED_PERIODO_1_INICIO);
        assertThat(testHorarioTrabalhoPeriodo.getPeriodo1Fim()).isEqualTo(UPDATED_PERIODO_1_FIM);
        assertThat(testHorarioTrabalhoPeriodo.getPeriodo2Inicio()).isEqualTo(DEFAULT_PERIODO_2_INICIO);
        assertThat(testHorarioTrabalhoPeriodo.getPeriodo2Fim()).isEqualTo(UPDATED_PERIODO_2_FIM);
        assertThat(testHorarioTrabalhoPeriodo.getPeriodo3Inicio()).isEqualTo(DEFAULT_PERIODO_3_INICIO);
        assertThat(testHorarioTrabalhoPeriodo.getPeriodo3Fim()).isEqualTo(UPDATED_PERIODO_3_FIM);
        assertThat(testHorarioTrabalhoPeriodo.getPeriodo4Inicio()).isEqualTo(DEFAULT_PERIODO_4_INICIO);
        assertThat(testHorarioTrabalhoPeriodo.getPeriodo4Fim()).isEqualTo(UPDATED_PERIODO_4_FIM);
    }

    @Test
    @Transactional
    void fullUpdateHorarioTrabalhoPeriodoWithPatch() throws Exception {
        // Initialize the database
        horarioTrabalhoPeriodoRepository.saveAndFlush(horarioTrabalhoPeriodo);

        int databaseSizeBeforeUpdate = horarioTrabalhoPeriodoRepository.findAll().size();

        // Update the horarioTrabalhoPeriodo using partial update
        HorarioTrabalhoPeriodo partialUpdatedHorarioTrabalhoPeriodo = new HorarioTrabalhoPeriodo();
        partialUpdatedHorarioTrabalhoPeriodo.setId(horarioTrabalhoPeriodo.getId());

        partialUpdatedHorarioTrabalhoPeriodo
            .dataCriacao(UPDATED_DATA_CRIACAO)
            .diaDaSemana(UPDATED_DIA_DA_SEMANA)
            .periodo1Inicio(UPDATED_PERIODO_1_INICIO)
            .periodo1Fim(UPDATED_PERIODO_1_FIM)
            .periodo2Inicio(UPDATED_PERIODO_2_INICIO)
            .periodo2Fim(UPDATED_PERIODO_2_FIM)
            .periodo3Inicio(UPDATED_PERIODO_3_INICIO)
            .periodo3Fim(UPDATED_PERIODO_3_FIM)
            .periodo4Inicio(UPDATED_PERIODO_4_INICIO)
            .periodo4Fim(UPDATED_PERIODO_4_FIM);

        restHorarioTrabalhoPeriodoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedHorarioTrabalhoPeriodo.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedHorarioTrabalhoPeriodo))
            )
            .andExpect(status().isOk());

        // Validate the HorarioTrabalhoPeriodo in the database
        List<HorarioTrabalhoPeriodo> horarioTrabalhoPeriodoList = horarioTrabalhoPeriodoRepository.findAll();
        assertThat(horarioTrabalhoPeriodoList).hasSize(databaseSizeBeforeUpdate);
        HorarioTrabalhoPeriodo testHorarioTrabalhoPeriodo = horarioTrabalhoPeriodoList.get(horarioTrabalhoPeriodoList.size() - 1);
        assertThat(testHorarioTrabalhoPeriodo.getDataCriacao()).isEqualTo(UPDATED_DATA_CRIACAO);
        assertThat(testHorarioTrabalhoPeriodo.getDiaDaSemana()).isEqualTo(UPDATED_DIA_DA_SEMANA);
        assertThat(testHorarioTrabalhoPeriodo.getPeriodo1Inicio()).isEqualTo(UPDATED_PERIODO_1_INICIO);
        assertThat(testHorarioTrabalhoPeriodo.getPeriodo1Fim()).isEqualTo(UPDATED_PERIODO_1_FIM);
        assertThat(testHorarioTrabalhoPeriodo.getPeriodo2Inicio()).isEqualTo(UPDATED_PERIODO_2_INICIO);
        assertThat(testHorarioTrabalhoPeriodo.getPeriodo2Fim()).isEqualTo(UPDATED_PERIODO_2_FIM);
        assertThat(testHorarioTrabalhoPeriodo.getPeriodo3Inicio()).isEqualTo(UPDATED_PERIODO_3_INICIO);
        assertThat(testHorarioTrabalhoPeriodo.getPeriodo3Fim()).isEqualTo(UPDATED_PERIODO_3_FIM);
        assertThat(testHorarioTrabalhoPeriodo.getPeriodo4Inicio()).isEqualTo(UPDATED_PERIODO_4_INICIO);
        assertThat(testHorarioTrabalhoPeriodo.getPeriodo4Fim()).isEqualTo(UPDATED_PERIODO_4_FIM);
    }

    @Test
    @Transactional
    void patchNonExistingHorarioTrabalhoPeriodo() throws Exception {
        int databaseSizeBeforeUpdate = horarioTrabalhoPeriodoRepository.findAll().size();
        horarioTrabalhoPeriodo.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restHorarioTrabalhoPeriodoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, horarioTrabalhoPeriodo.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(horarioTrabalhoPeriodo))
            )
            .andExpect(status().isBadRequest());

        // Validate the HorarioTrabalhoPeriodo in the database
        List<HorarioTrabalhoPeriodo> horarioTrabalhoPeriodoList = horarioTrabalhoPeriodoRepository.findAll();
        assertThat(horarioTrabalhoPeriodoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchHorarioTrabalhoPeriodo() throws Exception {
        int databaseSizeBeforeUpdate = horarioTrabalhoPeriodoRepository.findAll().size();
        horarioTrabalhoPeriodo.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restHorarioTrabalhoPeriodoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(horarioTrabalhoPeriodo))
            )
            .andExpect(status().isBadRequest());

        // Validate the HorarioTrabalhoPeriodo in the database
        List<HorarioTrabalhoPeriodo> horarioTrabalhoPeriodoList = horarioTrabalhoPeriodoRepository.findAll();
        assertThat(horarioTrabalhoPeriodoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamHorarioTrabalhoPeriodo() throws Exception {
        int databaseSizeBeforeUpdate = horarioTrabalhoPeriodoRepository.findAll().size();
        horarioTrabalhoPeriodo.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restHorarioTrabalhoPeriodoMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(horarioTrabalhoPeriodo))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the HorarioTrabalhoPeriodo in the database
        List<HorarioTrabalhoPeriodo> horarioTrabalhoPeriodoList = horarioTrabalhoPeriodoRepository.findAll();
        assertThat(horarioTrabalhoPeriodoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteHorarioTrabalhoPeriodo() throws Exception {
        // Initialize the database
        horarioTrabalhoPeriodoRepository.saveAndFlush(horarioTrabalhoPeriodo);

        int databaseSizeBeforeDelete = horarioTrabalhoPeriodoRepository.findAll().size();

        // Delete the horarioTrabalhoPeriodo
        restHorarioTrabalhoPeriodoMockMvc
            .perform(delete(ENTITY_API_URL_ID, horarioTrabalhoPeriodo.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<HorarioTrabalhoPeriodo> horarioTrabalhoPeriodoList = horarioTrabalhoPeriodoRepository.findAll();
        assertThat(horarioTrabalhoPeriodoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
