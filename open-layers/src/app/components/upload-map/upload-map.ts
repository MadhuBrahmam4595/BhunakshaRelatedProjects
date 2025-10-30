import { Component, ViewChild } from '@angular/core';
import { Shapefile } from '../../services/shapefile';
import { OpenlayersMap } from '../openlayers-map/openlayers-map';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';

@Component({
  selector: 'app-upload-map',
  imports: [CommonModule, MaterialModule, OpenlayersMap],
  templateUrl: './upload-map.html',
  styleUrl: './upload-map.scss',
})
export class UploadMap {

   selectedFile: File | null = null;
  meta: any = null;
  metaKeys: string[] = [];

  @ViewChild('mapComp') mapComp!: OpenlayersMap;

  constructor(private shpService: Shapefile) {}

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedFile = input.files[0];
    }
  }

  upload() {
    if (!this.selectedFile) return;
    this.shpService.uploadZip(this.selectedFile).subscribe({
      next: (res: any) => {
        // res should be GeoJSON object (or JSON string)
        const geojson = (typeof res === 'string') ? JSON.parse(res) : res;
        this.mapComp.loadGeoJSON(geojson);

        // Show some basic metadata
        this.meta = {
          type: geojson.type,
          featureCount: geojson.features ? geojson.features.length : 0,
          crs: geojson.crs?.properties?.name || 'unknown'
        };
        this.metaKeys = Object.keys(this.meta);
      },
      error: (err) => {
        console.error('Upload failed', err);
        alert('Upload failed: ' + (err?.message || err.statusText || 'unknown'));
      }
    });
  }

}
