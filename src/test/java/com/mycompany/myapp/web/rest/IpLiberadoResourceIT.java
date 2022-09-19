package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.IpLiberado;
import com.mycompany.myapp.repository.IpLiberadoRepository;
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
 * Integration tests for the {@link IpLiberadoResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class IpLiberadoResourceIT {

    private static final Long DEFAULT_CODIGO = 1L;
    private static final Long UPDATED_CODIGO = 2L;

    private static final Instant DEFAULT_DATA_CRIACAO = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATA_CRIACAO = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_DESCRICAO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRICAO = "BBBBBBBBBB";

    private static final String DEFAULT_IP_LIBERADO = "AAAAAAAAAA";
    private static final String UPDATED_IP_LIBERADO = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/ip-liberados";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private IpLiberadoRepository ipLiberadoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restIpLiberadoMockMvc;

    private IpLiberado ipLiberado;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static IpLiberado createEntity(EntityManager em) {
        IpLiberado ipLiberado = new IpLiberado()
            .codigo(DEFAULT_CODIGO)
            .dataCriacao(DEFAULT_DATA_CRIACAO)
            .descricao(DEFAULT_DESCRICAO)
            .ipLiberado(DEFAULT_IP_LIBERADO);
        return ipLiberado;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static IpLiberado createUpdatedEntity(EntityManager em) {
        IpLiberado ipLiberado = new IpLiberado()
            .codigo(UPDATED_CODIGO)
            .dataCriacao(UPDATED_DATA_CRIACAO)
            .descricao(UPDATED_DESCRICAO)
            .ipLiberado(UPDATED_IP_LIBERADO);
        return ipLiberado;
    }

    @BeforeEach
    public void initTest() {
        ipLiberado = createEntity(em);
    }

    @Test
    @Transactional
    void createIpLiberado() throws Exception {
        int databaseSizeBeforeCreate = ipLiberadoRepository.findAll().size();
        // Create the IpLiberado
        restIpLiberadoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(ipLiberado)))
            .andExpect(status().isCreated());

        // Validate the IpLiberado in the database
        List<IpLiberado> ipLiberadoList = ipLiberadoRepository.findAll();
        assertThat(ipLiberadoList).hasSize(databaseSizeBeforeCreate + 1);
        IpLiberado testIpLiberado = ipLiberadoList.get(ipLiberadoList.size() - 1);
        assertThat(testIpLiberado.getCodigo()).isEqualTo(DEFAULT_CODIGO);
        assertThat(testIpLiberado.getDataCriacao()).isEqualTo(DEFAULT_DATA_CRIACAO);
        assertThat(testIpLiberado.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);
        assertThat(testIpLiberado.getIpLiberado()).isEqualTo(DEFAULT_IP_LIBERADO);
    }

    @Test
    @Transactional
    void createIpLiberadoWithExistingId() throws Exception {
        // Create the IpLiberado with an existing ID
        ipLiberado.setId(1L);

        int databaseSizeBeforeCreate = ipLiberadoRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restIpLiberadoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(ipLiberado)))
            .andExpect(status().isBadRequest());

        // Validate the IpLiberado in the database
        List<IpLiberado> ipLiberadoList = ipLiberadoRepository.findAll();
        assertThat(ipLiberadoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkDataCriacaoIsRequired() throws Exception {
        int databaseSizeBeforeTest = ipLiberadoRepository.findAll().size();
        // set the field null
        ipLiberado.setDataCriacao(null);

        // Create the IpLiberado, which fails.

        restIpLiberadoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(ipLiberado)))
            .andExpect(status().isBadRequest());

        List<IpLiberado> ipLiberadoList = ipLiberadoRepository.findAll();
        assertThat(ipLiberadoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkDescricaoIsRequired() throws Exception {
        int databaseSizeBeforeTest = ipLiberadoRepository.findAll().size();
        // set the field null
        ipLiberado.setDescricao(null);

        // Create the IpLiberado, which fails.

        restIpLiberadoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(ipLiberado)))
            .andExpect(status().isBadRequest());

        List<IpLiberado> ipLiberadoList = ipLiberadoRepository.findAll();
        assertThat(ipLiberadoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkIpLiberadoIsRequired() throws Exception {
        int databaseSizeBeforeTest = ipLiberadoRepository.findAll().size();
        // set the field null
        ipLiberado.setIpLiberado(null);

        // Create the IpLiberado, which fails.

        restIpLiberadoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(ipLiberado)))
            .andExpect(status().isBadRequest());

        List<IpLiberado> ipLiberadoList = ipLiberadoRepository.findAll();
        assertThat(ipLiberadoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllIpLiberados() throws Exception {
        // Initialize the database
        ipLiberadoRepository.saveAndFlush(ipLiberado);

        // Get all the ipLiberadoList
        restIpLiberadoMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ipLiberado.getId().intValue())))
            .andExpect(jsonPath("$.[*].codigo").value(hasItem(DEFAULT_CODIGO.intValue())))
            .andExpect(jsonPath("$.[*].dataCriacao").value(hasItem(DEFAULT_DATA_CRIACAO.toString())))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO)))
            .andExpect(jsonPath("$.[*].ipLiberado").value(hasItem(DEFAULT_IP_LIBERADO)));
    }

    @Test
    @Transactional
    void getIpLiberado() throws Exception {
        // Initialize the database
        ipLiberadoRepository.saveAndFlush(ipLiberado);

        // Get the ipLiberado
        restIpLiberadoMockMvc
            .perform(get(ENTITY_API_URL_ID, ipLiberado.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(ipLiberado.getId().intValue()))
            .andExpect(jsonPath("$.codigo").value(DEFAULT_CODIGO.intValue()))
            .andExpect(jsonPath("$.dataCriacao").value(DEFAULT_DATA_CRIACAO.toString()))
            .andExpect(jsonPath("$.descricao").value(DEFAULT_DESCRICAO))
            .andExpect(jsonPath("$.ipLiberado").value(DEFAULT_IP_LIBERADO));
    }

    @Test
    @Transactional
    void getNonExistingIpLiberado() throws Exception {
        // Get the ipLiberado
        restIpLiberadoMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingIpLiberado() throws Exception {
        // Initialize the database
        ipLiberadoRepository.saveAndFlush(ipLiberado);

        int databaseSizeBeforeUpdate = ipLiberadoRepository.findAll().size();

        // Update the ipLiberado
        IpLiberado updatedIpLiberado = ipLiberadoRepository.findById(ipLiberado.getId()).get();
        // Disconnect from session so that the updates on updatedIpLiberado are not directly saved in db
        em.detach(updatedIpLiberado);
        updatedIpLiberado
            .codigo(UPDATED_CODIGO)
            .dataCriacao(UPDATED_DATA_CRIACAO)
            .descricao(UPDATED_DESCRICAO)
            .ipLiberado(UPDATED_IP_LIBERADO);

        restIpLiberadoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedIpLiberado.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedIpLiberado))
            )
            .andExpect(status().isOk());

        // Validate the IpLiberado in the database
        List<IpLiberado> ipLiberadoList = ipLiberadoRepository.findAll();
        assertThat(ipLiberadoList).hasSize(databaseSizeBeforeUpdate);
        IpLiberado testIpLiberado = ipLiberadoList.get(ipLiberadoList.size() - 1);
        assertThat(testIpLiberado.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testIpLiberado.getDataCriacao()).isEqualTo(UPDATED_DATA_CRIACAO);
        assertThat(testIpLiberado.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
        assertThat(testIpLiberado.getIpLiberado()).isEqualTo(UPDATED_IP_LIBERADO);
    }

    @Test
    @Transactional
    void putNonExistingIpLiberado() throws Exception {
        int databaseSizeBeforeUpdate = ipLiberadoRepository.findAll().size();
        ipLiberado.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restIpLiberadoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, ipLiberado.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(ipLiberado))
            )
            .andExpect(status().isBadRequest());

        // Validate the IpLiberado in the database
        List<IpLiberado> ipLiberadoList = ipLiberadoRepository.findAll();
        assertThat(ipLiberadoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchIpLiberado() throws Exception {
        int databaseSizeBeforeUpdate = ipLiberadoRepository.findAll().size();
        ipLiberado.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restIpLiberadoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(ipLiberado))
            )
            .andExpect(status().isBadRequest());

        // Validate the IpLiberado in the database
        List<IpLiberado> ipLiberadoList = ipLiberadoRepository.findAll();
        assertThat(ipLiberadoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamIpLiberado() throws Exception {
        int databaseSizeBeforeUpdate = ipLiberadoRepository.findAll().size();
        ipLiberado.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restIpLiberadoMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(ipLiberado)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the IpLiberado in the database
        List<IpLiberado> ipLiberadoList = ipLiberadoRepository.findAll();
        assertThat(ipLiberadoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateIpLiberadoWithPatch() throws Exception {
        // Initialize the database
        ipLiberadoRepository.saveAndFlush(ipLiberado);

        int databaseSizeBeforeUpdate = ipLiberadoRepository.findAll().size();

        // Update the ipLiberado using partial update
        IpLiberado partialUpdatedIpLiberado = new IpLiberado();
        partialUpdatedIpLiberado.setId(ipLiberado.getId());

        partialUpdatedIpLiberado.codigo(UPDATED_CODIGO).dataCriacao(UPDATED_DATA_CRIACAO).descricao(UPDATED_DESCRICAO);

        restIpLiberadoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedIpLiberado.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedIpLiberado))
            )
            .andExpect(status().isOk());

        // Validate the IpLiberado in the database
        List<IpLiberado> ipLiberadoList = ipLiberadoRepository.findAll();
        assertThat(ipLiberadoList).hasSize(databaseSizeBeforeUpdate);
        IpLiberado testIpLiberado = ipLiberadoList.get(ipLiberadoList.size() - 1);
        assertThat(testIpLiberado.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testIpLiberado.getDataCriacao()).isEqualTo(UPDATED_DATA_CRIACAO);
        assertThat(testIpLiberado.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
        assertThat(testIpLiberado.getIpLiberado()).isEqualTo(DEFAULT_IP_LIBERADO);
    }

    @Test
    @Transactional
    void fullUpdateIpLiberadoWithPatch() throws Exception {
        // Initialize the database
        ipLiberadoRepository.saveAndFlush(ipLiberado);

        int databaseSizeBeforeUpdate = ipLiberadoRepository.findAll().size();

        // Update the ipLiberado using partial update
        IpLiberado partialUpdatedIpLiberado = new IpLiberado();
        partialUpdatedIpLiberado.setId(ipLiberado.getId());

        partialUpdatedIpLiberado
            .codigo(UPDATED_CODIGO)
            .dataCriacao(UPDATED_DATA_CRIACAO)
            .descricao(UPDATED_DESCRICAO)
            .ipLiberado(UPDATED_IP_LIBERADO);

        restIpLiberadoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedIpLiberado.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedIpLiberado))
            )
            .andExpect(status().isOk());

        // Validate the IpLiberado in the database
        List<IpLiberado> ipLiberadoList = ipLiberadoRepository.findAll();
        assertThat(ipLiberadoList).hasSize(databaseSizeBeforeUpdate);
        IpLiberado testIpLiberado = ipLiberadoList.get(ipLiberadoList.size() - 1);
        assertThat(testIpLiberado.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testIpLiberado.getDataCriacao()).isEqualTo(UPDATED_DATA_CRIACAO);
        assertThat(testIpLiberado.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
        assertThat(testIpLiberado.getIpLiberado()).isEqualTo(UPDATED_IP_LIBERADO);
    }

    @Test
    @Transactional
    void patchNonExistingIpLiberado() throws Exception {
        int databaseSizeBeforeUpdate = ipLiberadoRepository.findAll().size();
        ipLiberado.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restIpLiberadoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, ipLiberado.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(ipLiberado))
            )
            .andExpect(status().isBadRequest());

        // Validate the IpLiberado in the database
        List<IpLiberado> ipLiberadoList = ipLiberadoRepository.findAll();
        assertThat(ipLiberadoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchIpLiberado() throws Exception {
        int databaseSizeBeforeUpdate = ipLiberadoRepository.findAll().size();
        ipLiberado.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restIpLiberadoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(ipLiberado))
            )
            .andExpect(status().isBadRequest());

        // Validate the IpLiberado in the database
        List<IpLiberado> ipLiberadoList = ipLiberadoRepository.findAll();
        assertThat(ipLiberadoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamIpLiberado() throws Exception {
        int databaseSizeBeforeUpdate = ipLiberadoRepository.findAll().size();
        ipLiberado.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restIpLiberadoMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(ipLiberado))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the IpLiberado in the database
        List<IpLiberado> ipLiberadoList = ipLiberadoRepository.findAll();
        assertThat(ipLiberadoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteIpLiberado() throws Exception {
        // Initialize the database
        ipLiberadoRepository.saveAndFlush(ipLiberado);

        int databaseSizeBeforeDelete = ipLiberadoRepository.findAll().size();

        // Delete the ipLiberado
        restIpLiberadoMockMvc
            .perform(delete(ENTITY_API_URL_ID, ipLiberado.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<IpLiberado> ipLiberadoList = ipLiberadoRepository.findAll();
        assertThat(ipLiberadoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
