package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class UsuarioIpLiberadoTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UsuarioIpLiberado.class);
        UsuarioIpLiberado usuarioIpLiberado1 = new UsuarioIpLiberado();
        usuarioIpLiberado1.setId(1L);
        UsuarioIpLiberado usuarioIpLiberado2 = new UsuarioIpLiberado();
        usuarioIpLiberado2.setId(usuarioIpLiberado1.getId());
        assertThat(usuarioIpLiberado1).isEqualTo(usuarioIpLiberado2);
        usuarioIpLiberado2.setId(2L);
        assertThat(usuarioIpLiberado1).isNotEqualTo(usuarioIpLiberado2);
        usuarioIpLiberado1.setId(null);
        assertThat(usuarioIpLiberado1).isNotEqualTo(usuarioIpLiberado2);
    }
}
