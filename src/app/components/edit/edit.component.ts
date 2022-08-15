import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/model/project';
import { ProjectService } from 'src/app/services/project.service';
import { UploadService } from 'src/app/services/upload.service';
import { Global } from 'src/app/services/global';
import {Router, ActivatedRoute, Params} from '@angular/router'


@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService, UploadService]
})
export class EditComponent implements OnInit {

  public title: string;
  public project: Project;
  public status: string;
  public filesToUpload: Array<File>;
  public save_project: Project;
  public url: string;

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService,
    private _router: Router,
    private _route: ActivatedRoute

  ) { 
    this.status="";
    this.filesToUpload=[];
    this.title="Editar Proyecto";
    this.project= new Project(
      "","","","",2022,"",""
    );
    this.save_project=this.project;
    this.url=Global.url;

  }

  ngOnInit(): void {
    this._route.params.subscribe(params =>{
      let id=params["id"];

      this.getProject(id);

    
    });
  }

  getProject(id:any){
    this._projectService.getProject(id).subscribe(
      response=>{
        this.project=response.project;
        console.log(response.project);
      },
      error=>{
        console.log(<any>error);
      }
    )

  }


  onSubmit(form:any){
    this._projectService.updateProject(this.project).subscribe(
      response=>{
        if(response.project){
          
          // Subir Imagen
          console.log("filesToUpload: ",this.filesToUpload)
          console.log("filesToUpload: ",this.filesToUpload[0])

          if(this.filesToUpload[0]!=undefined){
            this._uploadService.makeFileRequest(Global.url+"uploadImage/"+response.project._id, [], this.filesToUpload, "image")
            .then((result:any)=>{
              this.save_project=result.project;
              this.status="success";
            });
          }else{
            this.save_project=response.project;
            this.status="success";

          }

        }else{
          this.status="failed";
        }
      },
      error=>{
        console.log(<any>error);
      }

    )
  }


fileChangeEvent(fileInput: any){
  console.log("Parametro del fileChangeEvent: ", fileInput);
  this.filesToUpload=<Array<File>>fileInput.target.files;
  console.log("Estos son los files: ",this.filesToUpload)

}



}
