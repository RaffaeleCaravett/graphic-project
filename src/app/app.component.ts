import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'graphic';
  @ViewChild('threejsContainer', { static: true }) threejsContainer: any;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private gltfModel: any
clown:any
  constructor() { }

  ngOnInit(): void {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ canvas: this.threejsContainer.nativeElement ,antialias:true,alpha:true});
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.camera.position.x=0
    this.camera.position.y=0.5
    this.camera.position.z=-1
      const loader = new GLTFLoader();
    loader.load('assets//clown/scene.gltf', (gltf:any) => {
      this.gltfModel = gltf.scene;
      this.gltfModel.scale.set(0.1, 0.1, 0.1);
      const ambientLight1 = new THREE.AmbientLight(0xffffff, 1);
      const directionalLight1 = new THREE.DirectionalLight(0xffffff, 15);
      this.scene.add(this.gltfModel,ambientLight1,directionalLight1);
      this.gltfModel.rotation.y+=1
      this.clown=this.gltfModel
   this.animate()
    });
  }






  animate(): void {
    requestAnimationFrame(() => this.animate());

    if (this.gltfModel) {
      // this.gltfModel.rotation.x += 0.01;
      // this.gltfModel.rotation.y += 0.01;
    }

    this.renderer.render(this.scene, this.camera);
  }
  @HostListener('document:wheel', ['$event'])
  public onWheel(targetElement:any) {
      if(targetElement.deltaY>0){
        this.camera.position.z+=0.1
        this.camera.position.y-=0.025
        this.gltfModel.rotation.y-=0.5
      }else{
        this.camera.position.z-=0.1
        this.camera.position.y+=0.025
        this.gltfModel.rotation.y+=0.5
      }
  }


}
