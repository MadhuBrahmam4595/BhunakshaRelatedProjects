package com.shapefiledemo;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.geotools.api.data.FileDataStore;
import org.geotools.api.data.FileDataStoreFinder;
import org.geotools.data.simple.SimpleFeatureCollection;
import org.geotools.data.simple.SimpleFeatureIterator;
import org.geotools.geojson.feature.FeatureJSON;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.*;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

public class ShapefileUtils {

    public static File unzipFile(MultipartFile zipFile, File destDir) throws IOException {
        try (ZipInputStream zis = new ZipInputStream(zipFile.getInputStream())) {
            ZipEntry entry;
            while ((entry = zis.getNextEntry()) != null) {
                File newFile = new File(destDir, entry.getName());
                if (entry.isDirectory()) newFile.mkdirs();
                else {
                    new File(newFile.getParent()).mkdirs();
                    try (FileOutputStream fos = new FileOutputStream(newFile)) {
                        IOUtils.copy(zis, fos);
                    }
                }
            }
        }
        return destDir;
    }

    public static String convertShapefileToGeoJson(File extractedDir) throws IOException {
        File shpFile = null;
        for (File file : extractedDir.listFiles()) {
            if (file.getName().toLowerCase().endsWith(".shp")) {
                shpFile = file;
                break;
            }
        }
        if (shpFile == null) {
            throw new FileNotFoundException("No .shp file found in uploaded zip.");
        }

        FileDataStore store = FileDataStoreFinder.getDataStore(shpFile);
        SimpleFeatureCollection collection = store.getFeatureSource().getFeatures();

        FeatureJSON featureJSON = new FeatureJSON();
        StringWriter writer = new StringWriter();
        featureJSON.writeFeatureCollection(collection, writer);
        store.dispose();

        return writer.toString();
    }

    public static void deleteDirectory(File directory) throws IOException {
        if (directory.exists()) {
            FileUtils.deleteDirectory(directory);
        }
    }
}

