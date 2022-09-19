package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class OfertaServicoTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OfertaServico.class);
        OfertaServico ofertaServico1 = new OfertaServico();
        ofertaServico1.setId(1L);
        OfertaServico ofertaServico2 = new OfertaServico();
        ofertaServico2.setId(ofertaServico1.getId());
        assertThat(ofertaServico1).isEqualTo(ofertaServico2);
        ofertaServico2.setId(2L);
        assertThat(ofertaServico1).isNotEqualTo(ofertaServico2);
        ofertaServico1.setId(null);
        assertThat(ofertaServico1).isNotEqualTo(ofertaServico2);
    }
}
