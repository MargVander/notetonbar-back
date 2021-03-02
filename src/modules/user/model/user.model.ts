export class UserModel {
  private id: number;
  private pseudo: string;
  private password: string;
  private mail: string;
  private profile_picture: string;
  private isactive: boolean;

  constructor(
    id = undefined,
    pseudo = '',
    password = '',
    mail = '',
    profile_picture = '',
    isactive = true,
  ) {
    this.id = id;
    this.pseudo = pseudo;
    this.password = password;
    this.mail = mail;
    this.profile_picture = profile_picture;
    this.isactive = isactive;
  }
}
