package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class IpLiberadoTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(IpLiberado.class);
        IpLiberado ipLiberado1 = new IpLiberado();
        ipLiberado1.setId(1L);
        IpLiberado ipLiberado2 = new IpLiberado();
        ipLiberado2.setId(ipLiberado1.getId());
        assertThat(ipLiberado1).isEqualTo(ipLiberado2);
        ipLiberado2.setId(2L);
        assertThat(ipLiberado1).isNotEqualTo(ipLiberado2);
        ipLiberado1.setId(null);
        assertThat(ipLiberado1).isNotEqualTo(ipLiberado2);
    }
}
