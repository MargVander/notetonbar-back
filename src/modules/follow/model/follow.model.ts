export class FollowModel {
  private followers: number;
  private following: number;

  constructor(followers = undefined, following = undefined) {
    this.followers = followers;
    this.following = following;
  }
}
