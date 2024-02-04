import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit,AfterViewInit{
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
trialForm!:FormGroup
rotateX:number=0
scale=0.0
left='40%'
i:number=40
  constructor() { }
  ngAfterViewInit(): void {
  //  this.div.nativeElement.classList.add('position-absolute','top-50','start-50','translate-middle')
    this.div.nativeElement.style.zIndex=`4`
    this.div.nativeElement.style.position='absolute'
    this.div.nativeElement.style.left=this.left
    this.div.nativeElement.style.scale=this.scale
    // this.div.nativeElement.style.marginLeft=`45%`
    // this.div.nativeElement.style.scale=`4`


  }

  ngOnInit(): void {
    this.trialForm=new FormGroup({})
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ canvas: this.threejsContainer.nativeElement ,antialias:true,alpha:true});
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.camera.position.x=0
    this.camera.position.y=0
    this.camera.position.z=0
      const loader = new GLTFLoader();
    loader.load('assets//clown/scene.gltf', (gltf:any) => {
      this.gltfModel = gltf.scene;
      this.gltfModel.scale.set(0.1, 0.1, 0.1);
      const ambientLight1 = new THREE.AmbientLight(0xffffff, 1);
      const directionalLight1 = new THREE.DirectionalLight(0xffffff, 15);
      this.scene.add(this.gltfModel,ambientLight1,directionalLight1);
      this.gltfModel.position.set(0,-0.2,0)
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

  @HostListener('document:wheel', ['$event'])
  public onWheel(targetElement:any) {

      if(targetElement.deltaY>0){
        if(this.rotateX<=320){
           this.rotateX+=40
        }

        if(this.i<=60){
this.i+=2
this.left=`${this.i}%`
this.div.nativeElement.style.left=this.left

        }

        if(this.scale<1.1){
          this.scale+=0.2
        this.div.nativeElement.style.scale=this.scale
        }

        this.div.nativeElement.style.transform = `rotateY(${this.rotateX}deg)`;
        if(this.camera.position.z<0.69){
        this.camera.position.z+=0.1
        }
        this.gltfModel.rotation.y-=0.5
      }else{

        this.camera.position.z-=0.1
        this.gltfModel.rotation.y+=0.5
      }
  }
  @HostListener('window:resize', ['$event'])
  public onWindowResize(){

      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize( window.innerWidth, window.innerHeight );

  }

}
