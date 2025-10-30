import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { GeoJSON } from 'ol/format';
import { Style, Stroke, Fill, Circle as CircleStyle } from 'ol/style';
import { fromLonLat } from 'ol/proj';

@Component({
  selector: 'app-openlayers-map',
  template: `<div #mapElement class="map"></div>`,
  styles: [`.map { width: 100%; height: 100%; min-height: 400px; }`]
})
export class OpenlayersMap implements OnInit{

  @ViewChild('mapElement', {static: true}) mapElement!:ElementRef<HTMLDivElement>;

  private map!: Map;
  private vectorLayer!: VectorLayer<VectorSource>;

    ngOnInit(): void {
    this.initMap();
  }

  private initMap() {
    this.map = new Map({
      target: this.mapElement.nativeElement,
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: fromLonLat([78.9629, 20.5937]), 
    zoom: 5
      })
    });
  }

  // Loads GeoJSON (object or string) and displays it
  public loadGeoJSON(geojson: any) {
    if (this.vectorLayer) {
      this.map.removeLayer(this.vectorLayer);
    }

    const format = new GeoJSON();
    // Read features; ensure projection conversion: assume incoming GeoJSON is EPSG:4326
    const features = format.readFeatures(geojson, { featureProjection: 'EPSG:3857', dataProjection: 'EPSG:4326' });

    const source = new VectorSource({ features });
    this.vectorLayer = new VectorLayer({
      source,
      style: (feature) => new Style({
        fill: new Fill({ color: 'rgba(0, 123, 255, 0.2)' }),
        stroke: new Stroke({ color: '#007bff', width: 2 }),
        image: new CircleStyle({ radius: 6, fill: new Fill({ color: '#007bff' }) })
      })
    });

    this.map.addLayer(this.vectorLayer);
    const extent = source.getExtent();
    if (extent && !isNaN(extent[0])) {
      this.map.getView().fit(extent, { padding: [20, 20, 20, 20], maxZoom: 16 });
    }
  }

}
