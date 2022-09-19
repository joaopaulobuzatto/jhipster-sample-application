package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.EventoAgenda;
import com.mycompany.myapp.repository.EventoAgendaRepository;
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
 * Integration tests for the {@link EventoAgendaResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class EventoAgendaResourceIT {

    private static final Instant DEFAULT_DATA_CRIACAO = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATA_CRIACAO = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_DATA = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATA = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_DESCRICAO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRICAO = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/evento-agenda";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private EventoAgendaRepository eventoAgendaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restEventoAgendaMockMvc;

    private EventoAgenda eventoAgenda;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EventoAgenda createEntity(EntityManager em) {
        EventoAgenda eventoAgenda = new EventoAgenda().dataCriacao(DEFAULT_DATA_CRIACAO).data(DEFAULT_DATA).descricao(DEFAULT_DESCRICAO);
        return eventoAgenda;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EventoAgenda createUpdatedEntity(EntityManager em) {
        EventoAgenda eventoAgenda = new EventoAgenda().dataCriacao(UPDATED_DATA_CRIACAO).data(UPDATED_DATA).descricao(UPDATED_DESCRICAO);
        return eventoAgenda;
    }

    @BeforeEach
    public void initTest() {
        eventoAgenda = createEntity(em);
    }

    @Test
    @Transactional
    void createEventoAgenda() throws Exception {
        int databaseSizeBeforeCreate = eventoAgendaRepository.findAll().size();
        // Create the EventoAgenda
        restEventoAgendaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(eventoAgenda)))
            .andExpect(status().isCreated());

        // Validate the EventoAgenda in the database
        List<EventoAgenda> eventoAgendaList = eventoAgendaRepository.findAll();
        assertThat(eventoAgendaList).hasSize(databaseSizeBeforeCreate + 1);
        EventoAgenda testEventoAgenda = eventoAgendaList.get(eventoAgendaList.size() - 1);
        assertThat(testEventoAgenda.getDataCriacao()).isEqualTo(DEFAULT_DATA_CRIACAO);
        assertThat(testEventoAgenda.getData()).isEqualTo(DEFAULT_DATA);
        assertThat(testEventoAgenda.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);
    }

    @Test
    @Transactional
    void createEventoAgendaWithExistingId() throws Exception {
        // Create the EventoAgenda with an existing ID
        eventoAgenda.setId(1L);

        int databaseSizeBeforeCreate = eventoAgendaRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restEventoAgendaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(eventoAgenda)))
            .andExpect(status().isBadRequest());

        // Validate the EventoAgenda in the database
        List<EventoAgenda> eventoAgendaList = eventoAgendaRepository.findAll();
        assertThat(eventoAgendaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkDataCriacaoIsRequired() throws Exception {
        int databaseSizeBeforeTest = eventoAgendaRepository.findAll().size();
        // set the field null
        eventoAgenda.setDataCriacao(null);

        // Create the EventoAgenda, which fails.

        restEventoAgendaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(eventoAgenda)))
            .andExpect(status().isBadRequest());

        List<EventoAgenda> eventoAgendaList = eventoAgendaRepository.findAll();
        assertThat(eventoAgendaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkDataIsRequired() throws Exception {
        int databaseSizeBeforeTest = eventoAgendaRepository.findAll().size();
        // set the field null
        eventoAgenda.setData(null);

        // Create the EventoAgenda, which fails.

        restEventoAgendaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(eventoAgenda)))
            .andExpect(status().isBadRequest());

        List<EventoAgenda> eventoAgendaList = eventoAgendaRepository.findAll();
        assertThat(eventoAgendaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkDescricaoIsRequired() throws Exception {
        int databaseSizeBeforeTest = eventoAgendaRepository.findAll().size();
        // set the field null
        eventoAgenda.setDescricao(null);

        // Create the EventoAgenda, which fails.

        restEventoAgendaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(eventoAgenda)))
            .andExpect(status().isBadRequest());

        List<EventoAgenda> eventoAgendaList = eventoAgendaRepository.findAll();
        assertThat(eventoAgendaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllEventoAgenda() throws Exception {
        // Initialize the database
        eventoAgendaRepository.saveAndFlush(eventoAgenda);

        // Get all the eventoAgendaList
        restEventoAgendaMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(eventoAgenda.getId().intValue())))
            .andExpect(jsonPath("$.[*].dataCriacao").value(hasItem(DEFAULT_DATA_CRIACAO.toString())))
            .andExpect(jsonPath("$.[*].data").value(hasItem(DEFAULT_DATA.toString())))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO)));
    }

    @Test
    @Transactional
    void getEventoAgenda() throws Exception {
        // Initialize the database
        eventoAgendaRepository.saveAndFlush(eventoAgenda);

        // Get the eventoAgenda
        restEventoAgendaMockMvc
            .perform(get(ENTITY_API_URL_ID, eventoAgenda.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(eventoAgenda.getId().intValue()))
            .andExpect(jsonPath("$.dataCriacao").value(DEFAULT_DATA_CRIACAO.toString()))
            .andExpect(jsonPath("$.data").value(DEFAULT_DATA.toString()))
            .andExpect(jsonPath("$.descricao").value(DEFAULT_DESCRICAO));
    }

    @Test
    @Transactional
    void getNonExistingEventoAgenda() throws Exception {
        // Get the eventoAgenda
        restEventoAgendaMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingEventoAgenda() throws Exception {
        // Initialize the database
        eventoAgendaRepository.saveAndFlush(eventoAgenda);

        int databaseSizeBeforeUpdate = eventoAgendaRepository.findAll().size();

        // Update the eventoAgenda
        EventoAgenda updatedEventoAgenda = eventoAgendaRepository.findById(eventoAgenda.getId()).get();
        // Disconnect from session so that the updates on updatedEventoAgenda are not directly saved in db
        em.detach(updatedEventoAgenda);
        updatedEventoAgenda.dataCriacao(UPDATED_DATA_CRIACAO).data(UPDATED_DATA).descricao(UPDATED_DESCRICAO);

        restEventoAgendaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedEventoAgenda.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedEventoAgenda))
            )
            .andExpect(status().isOk());

        // Validate the EventoAgenda in the database
        List<EventoAgenda> eventoAgendaList = eventoAgendaRepository.findAll();
        assertThat(eventoAgendaList).hasSize(databaseSizeBeforeUpdate);
        EventoAgenda testEventoAgenda = eventoAgendaList.get(eventoAgendaList.size() - 1);
        assertThat(testEventoAgenda.getDataCriacao()).isEqualTo(UPDATED_DATA_CRIACAO);
        assertThat(testEventoAgenda.getData()).isEqualTo(UPDATED_DATA);
        assertThat(testEventoAgenda.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
    }

    @Test
    @Transactional
    void putNonExistingEventoAgenda() throws Exception {
        int databaseSizeBeforeUpdate = eventoAgendaRepository.findAll().size();
        eventoAgenda.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEventoAgendaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, eventoAgenda.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(eventoAgenda))
            )
            .andExpect(status().isBadRequest());

        // Validate the EventoAgenda in the database
        List<EventoAgenda> eventoAgendaList = eventoAgendaRepository.findAll();
        assertThat(eventoAgendaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchEventoAgenda() throws Exception {
        int databaseSizeBeforeUpdate = eventoAgendaRepository.findAll().size();
        eventoAgenda.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEventoAgendaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(eventoAgenda))
            )
            .andExpect(status().isBadRequest());

        // Validate the EventoAgenda in the database
        List<EventoAgenda> eventoAgendaList = eventoAgendaRepository.findAll();
        assertThat(eventoAgendaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamEventoAgenda() throws Exception {
        int databaseSizeBeforeUpdate = eventoAgendaRepository.findAll().size();
        eventoAgenda.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEventoAgendaMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(eventoAgenda)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the EventoAgenda in the database
        List<EventoAgenda> eventoAgendaList = eventoAgendaRepository.findAll();
        assertThat(eventoAgendaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateEventoAgendaWithPatch() throws Exception {
        // Initialize the database
        eventoAgendaRepository.saveAndFlush(eventoAgenda);

        int databaseSizeBeforeUpdate = eventoAgendaRepository.findAll().size();

        // Update the eventoAgenda using partial update
        EventoAgenda partialUpdatedEventoAgenda = new EventoAgenda();
        partialUpdatedEventoAgenda.setId(eventoAgenda.getId());

        partialUpdatedEventoAgenda.dataCriacao(UPDATED_DATA_CRIACAO);

        restEventoAgendaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedEventoAgenda.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedEventoAgenda))
            )
            .andExpect(status().isOk());

        // Validate the EventoAgenda in the database
        List<EventoAgenda> eventoAgendaList = eventoAgendaRepository.findAll();
        assertThat(eventoAgendaList).hasSize(databaseSizeBeforeUpdate);
        EventoAgenda testEventoAgenda = eventoAgendaList.get(eventoAgendaList.size() - 1);
        assertThat(testEventoAgenda.getDataCriacao()).isEqualTo(UPDATED_DATA_CRIACAO);
        assertThat(testEventoAgenda.getData()).isEqualTo(DEFAULT_DATA);
        assertThat(testEventoAgenda.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);
    }

    @Test
    @Transactional
    void fullUpdateEventoAgendaWithPatch() throws Exception {
        // Initialize the database
        eventoAgendaRepository.saveAndFlush(eventoAgenda);

        int databaseSizeBeforeUpdate = eventoAgendaRepository.findAll().size();

        // Update the eventoAgenda using partial update
        EventoAgenda partialUpdatedEventoAgenda = new EventoAgenda();
        partialUpdatedEventoAgenda.setId(eventoAgenda.getId());

        partialUpdatedEventoAgenda.dataCriacao(UPDATED_DATA_CRIACAO).data(UPDATED_DATA).descricao(UPDATED_DESCRICAO);

        restEventoAgendaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedEventoAgenda.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedEventoAgenda))
            )
            .andExpect(status().isOk());

        // Validate the EventoAgenda in the database
        List<EventoAgenda> eventoAgendaList = eventoAgendaRepository.findAll();
        assertThat(eventoAgendaList).hasSize(databaseSizeBeforeUpdate);
        EventoAgenda testEventoAgenda = eventoAgendaList.get(eventoAgendaList.size() - 1);
        assertThat(testEventoAgenda.getDataCriacao()).isEqualTo(UPDATED_DATA_CRIACAO);
        assertThat(testEventoAgenda.getData()).isEqualTo(UPDATED_DATA);
        assertThat(testEventoAgenda.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
    }

    @Test
    @Transactional
    void patchNonExistingEventoAgenda() throws Exception {
        int databaseSizeBeforeUpdate = eventoAgendaRepository.findAll().size();
        eventoAgenda.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEventoAgendaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, eventoAgenda.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(eventoAgenda))
            )
            .andExpect(status().isBadRequest());

        // Validate the EventoAgenda in the database
        List<EventoAgenda> eventoAgendaList = eventoAgendaRepository.findAll();
        assertThat(eventoAgendaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchEventoAgenda() throws Exception {
        int databaseSizeBeforeUpdate = eventoAgendaRepository.findAll().size();
        eventoAgenda.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEventoAgendaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(eventoAgenda))
            )
            .andExpect(status().isBadRequest());

        // Validate the EventoAgenda in the database
        List<EventoAgenda> eventoAgendaList = eventoAgendaRepository.findAll();
        assertThat(eventoAgendaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamEventoAgenda() throws Exception {
        int databaseSizeBeforeUpdate = eventoAgendaRepository.findAll().size();
        eventoAgenda.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEventoAgendaMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(eventoAgenda))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the EventoAgenda in the database
        List<EventoAgenda> eventoAgendaList = eventoAgendaRepository.findAll();
        assertThat(eventoAgendaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteEventoAgenda() throws Exception {
        // Initialize the database
        eventoAgendaRepository.saveAndFlush(eventoAgenda);

        int databaseSizeBeforeDelete = eventoAgendaRepository.findAll().size();

        // Delete the eventoAgenda
        restEventoAgendaMockMvc
            .perform(delete(ENTITY_API_URL_ID, eventoAgenda.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<EventoAgenda> eventoAgendaList = eventoAgendaRepository.findAll();
        assertThat(eventoAgendaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
