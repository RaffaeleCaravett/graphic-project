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
  @ViewChild('div') div: any;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private gltfModel: any
  animationMixer:any
  animationAction :any
clown:any
  constructor() { }

  ngOnInit(): void {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ canvas: this.threejsContainer.nativeElement ,antialias:true,alpha:true});
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.camera.position.x=0
    this.camera.position.y=0.45
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
      if (gltf.animations && gltf.animations.length > 0) {
        this.animationMixer = new THREE.AnimationMixer(this.gltfModel);
        this.animationAction = this.animationMixer.clipAction(gltf.animations[0]);
        this.animationAction.play();
      }
   this.animate()
    });
  }






  animate(): void {
    requestAnimationFrame(() => this.animate());

    if (this.gltfModel) {
      this.gltfModel.traverse((object:any) => {
        if (object instanceof THREE.Mesh) {
          object.updateMatrix();
        }
      });
      this.animationMixer.update(0.0167);

    }

    this.renderer.render(this.scene, this.camera);
  }
  marginLeft=0;
  scale=3
  rotateY=0
  @HostListener('document:wheel', ['$event'])
  public onWheel(targetElement:any) {
console.log(  this.div.nativeElement.style)

      if(targetElement.deltaY>0){
        if(this.camera.position.z<0.99){
          this.marginLeft+=100
this.scale-=0.1
this.rotateY+=0.1
        this.camera.position.z+=0.1
        this.div.nativeElement.style.marginLeft=`${this.marginLeft}px`
        this.div.nativeElement.style.scale=this.scale
        this.div.nativeElement.style.transform=`rotateY(${this.rotateY})`

        }
        if(this.camera.position.y>0.14999999999999983){
        this.camera.position.y-=0.025
      }
        this.gltfModel.rotation.y-=0.5
      }else{
        this.camera.position.z-=0.1
        this.marginLeft-=100
        this.div.nativeElement.style.marginLeft=`${this.marginLeft}px`
        if(this.camera.position.z<0.89){
        this.camera.position.y+=0.025
        }
        this.gltfModel.rotation.y+=0.5
      }
  }


}
