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
    return this.picturesRepository
      .createQueryBuilder()
      .delete()
      .from(Picture)
      .where("id = :id", { id: id })
      .execute();
  }

  findBarPictures(id: number): Promise<Picture[]> {
    return this.picturesRepository
      .createQueryBuilder('picture')
      .leftJoin('picture.bar', 'bar')
      .where(`bar.id = ${id}`)
      .getMany()
  }
}
