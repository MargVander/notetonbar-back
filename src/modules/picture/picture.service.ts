import { Injectable, UploadedFile, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Picture } from './models/picture.entity';
// import { CreateBarDto } from './models/create-bar.dto'

@Injectable()
export class PictureService {
  constructor(
    @InjectRepository(Picture)
    private picturesRepository: Repository<Picture>,
  ) { }

  addPicture(@UploadedFile() file, id: number) {
    return this.picturesRepository.save({
        barId: id,
        path: file.filename
    })
  }

  deletePicture(id: number) {
    return this.picturesRepository.delete({id: id})
  }
}
