import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from './components/material.module';
import { UploadMap } from "./components/upload-map/upload-map";
import { OpenlayersMap } from "./components/openlayers-map/openlayers-map";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MaterialModule, UploadMap, OpenlayersMap],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('open-layers');
}
