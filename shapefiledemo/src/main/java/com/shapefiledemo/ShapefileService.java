package com.shapefiledemo;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;

@Service
public class ShapefileService {

    public String processShapeFile(MultipartFile file)throws Exception{
        // 1. Save zip to temp folder
        File tempDir = new File(System.getProperty("java.io.tmpdir"), "shapefile_"+ System.currentTimeMillis());
        if (!tempDir.exists()) tempDir.mkdirs();

        // 2. Extract uploaded zip
        File extractedDir = ShapefileUtils.unzipFile(file, tempDir);

        // 3. Convert shapefile to GeoJSON
        String geoJson = ShapefileUtils.convertShapefileToGeoJson(extractedDir);

        // 4. Cleanup temp files (optional)
        ShapefileUtils.deleteDirectory(tempDir);

        return geoJson;
    }
}
