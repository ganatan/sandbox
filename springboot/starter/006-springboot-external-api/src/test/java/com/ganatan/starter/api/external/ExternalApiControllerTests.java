package com.ganatan.starter.api.external;

import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.client.RestClientTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.client.MockRestServiceServer;

import static org.springframework.test.web.client.match.MockRestRequestMatchers.requestTo;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withSuccess;

import static org.assertj.core.api.Assertions.assertThat;

@RestClientTest(ExternalApiController.class)
class ExternalApiControllerTests {

    @Autowired
    private ExternalApiController controller;

    @Autowired
    private MockRestServiceServer server;

    @Test
    void getAlbums_ok() {
        server.expect(requestTo("https://jsonplaceholder.typicode.com/albums"))
            .andRespond(withSuccess("""
                [{"id":1,"title":"Album 1"},{"id":2,"title":"Album 2"}]
                """, MediaType.APPLICATION_JSON));

        var result = controller.getAlbums();

        assertThat(result.get("source")).isEqualTo("jsonplaceholder");
        assertThat(result.get("count")).isEqualTo(2);

        server.verify();
    }

    @Test
    void getAlbums_nullBody_returns_empty() {
        server.expect(requestTo("https://jsonplaceholder.typicode.com/albums"))
            .andRespond(withSuccess("", MediaType.APPLICATION_JSON));

        var result = controller.getAlbums();

        assertThat(result.get("source")).isEqualTo("jsonplaceholder");
        assertThat(result.get("count")).isEqualTo(0);
        assertThat(result.get("items")).isEqualTo(java.util.List.of());

        server.verify();
    }
}



//package com.ganatan.starter.api.external;
//
//import org.junit.jupiter.api.Test;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.client.RestClientTest;
//import org.springframework.http.MediaType;
//import org.springframework.test.web.client.MockRestServiceServer;
//
//import static org.springframework.test.web.client.match.MockRestRequestMatchers.requestTo;
//import static org.springframework.test.web.client.response.MockRestResponseCreators.withSuccess;
//
//import static org.assertj.core.api.Assertions.assertThat;
//
//@RestClientTest(ExternalApiController.class)
//class ExternalApiControllerTests {
//
//    @Autowired
//    private ExternalApiController controller;
//
//    @Autowired
//    private MockRestServiceServer server;
//
//    @Test
//    void getAlbums_ok() {
//        server.expect(requestTo("https://jsonplaceholder.typicode.com/albums"))
//            .andRespond(withSuccess("""
//                [{"id":1,"title":"Album 1"},{"id":2,"title":"Album 2"}]
//                """, MediaType.APPLICATION_JSON));
//
//        var result = controller.getAlbums();
//
//        assertThat(result.get("source")).isEqualTo("jsonplaceholder");
//        assertThat(result.get("count")).isEqualTo(2);
//
//        server.verify();
//    }
//}
