export class UserModel {
  private id: number;
  private pseudo: string;
  private password: string;
  private mail: string;
  private profile_picture: string;
  private question: string;
  private response: string;
  private isactive: boolean;

  constructor(
    id = undefined,
    pseudo = '',
    password = '',
    mail = '',
    profile_picture = '',
    isactive = true,
    question = '',
    response = ''
  ) {
    this.id = id;
    this.pseudo = pseudo;
    this.password = password;
    this.mail = mail;
    this.profile_picture = profile_picture;
    this.question = question;
    this.response = response;
    this.isactive = isactive;
  }
}
