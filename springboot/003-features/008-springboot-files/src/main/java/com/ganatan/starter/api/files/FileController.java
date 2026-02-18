package com.ganatan.starter.api.files;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FileController {

    private final Path baseDir = Paths.get("./data/files").toAbsolutePath().normalize();

    @GetMapping("/api/files/{name}.pdf")
    public ResponseEntity<Resource> openPdf(@PathVariable String name) throws Exception {
    	System.out.println("00000000000");
        if (!name.matches("^[A-Za-z0-9._-]{1,120}$")) {
            return ResponseEntity.badRequest().build();
        }

        Path pdf = baseDir.resolve(name + ".pdf").normalize();
        if (!pdf.startsWith(baseDir) || !Files.exists(pdf)) {
            return ResponseEntity.notFound().build();
        }

        Resource resource = new UrlResource(pdf.toUri());
        if (!resource.exists() || !resource.isReadable()) {
            return ResponseEntity.notFound().build();
        }

        String filename = name + ".pdf";
        String encoded = URLEncoder.encode(filename, StandardCharsets.UTF_8).replace("+", "%20");

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + filename + "\"; filename*=UTF-8''" + encoded)
                .contentLength(Files.size(pdf))
                .body(resource);
    }
}