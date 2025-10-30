package com.shapefiledemo;

import org.geotools.api.data.SimpleFeatureSource;
import org.geotools.api.feature.simple.SimpleFeature;
import org.geotools.api.feature.simple.SimpleFeatureType;
import org.geotools.data.shapefile.ShapefileDataStore;
import org.geotools.feature.FeatureCollection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.zeroturnaround.zip.ZipUtil;

import java.io.File;
import java.io.StringWriter;
import java.nio.file.Files;
import java.util.Arrays;
import java.util.Objects;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ShapefileController {

    @Autowired
    private ShapefileService shapefileService;

    @PostMapping(value = "/uploadShapefile", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> uploadShapeFile(@RequestParam("file")MultipartFile file){
        try{
            String geoJson = shapefileService.processShapeFile(file);
            return ResponseEntity.ok(geoJson);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadShapefile(@RequestParam("file") MultipartFile file) {
        try {
            File tempDir = Files.createTempDirectory("shapefile").toFile();
            ZipUtil.unpack(file.getInputStream(), tempDir);

            File shpFile = Arrays.stream(Objects.requireNonNull(tempDir.listFiles()))
                    .filter(f -> f.getName().endsWith(".shp"))
                    .findFirst()
                    .orElseThrow(() -> new RuntimeException("No .shp file found"));

            ShapefileDataStore store = new ShapefileDataStore(shpFile.toURI().toURL());
            SimpleFeatureSource source = store.getFeatureSource();
            FeatureCollection<SimpleFeatureType, SimpleFeature> collection = source.getFeatures();

            StringWriter writer = new StringWriter();
            new org.geotools.geojson.feature.FeatureJSON().writeFeatureCollection(collection, writer);

            return ResponseEntity.ok(writer.toString());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Error: " + e.getMessage());
        }
    }
}
