import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/model/project';
import { ProjectService } from 'src/app/services/project.service';
import { UploadService } from 'src/app/services/upload.service';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService, UploadService]
})
export class CreateComponent implements OnInit {

  public title: string;
  public project: Project;
  public status: string;
  public filesToUpload: Array<File>;
  public save_project: Project;
  public url:string;

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService
  ) { 
    this.status="";
    this.filesToUpload=[];
    this.title="Crear Proyecto";
    this.project= new Project(
      "","","","",2022,"",""
    );
    this.save_project=this.project;
    this.url=Global.url;

  }

  ngOnInit(): void {
  }

  onSubmit(form:any){
    // console.log(this.project);

    // Guardar los datos
    this._projectService.saveProject(this.project).subscribe(
      response=>{
        if(response.project){
          this.save_project=response.project;

          // Subir Imagen
          this._uploadService.makeFileRequest(Global.url+"uploadImage/"+response.project._id, [], this.filesToUpload, "image")
          .then((result:any)=>{
            this.status="success";
            console.log("Resultado del _uploadService: ",result)
            form.reset();

          });

        }else{
          this.status="failed";
        }
        console.log("Objeto guardado (resultado del _projectService): ",response);
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




};
