export class User {
  private pseudo;
  private password;
  private mail;
  private profile_picture;
  private isactive;

  constructor(pseudo, password, mail, profile_picture, isactive) {
    this.pseudo = pseudo;
    this.password = password;
    this.mail = mail;
    this.profile_picture = profile_picture;
    this.isactive = isactive;
  }
}
