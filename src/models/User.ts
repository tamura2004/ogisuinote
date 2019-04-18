export default class User {
  public static collectionName = 'users';

  public static form(): Form<User> {
    return {
      familyName: null,
      givenName: null,
      email: null,
    };
  }

  public static valid(init: any): init is User {
    return typeof init.familyName === 'string' &&
      init.familyName.length > 0 &&
      typeof init.givenName === 'string' &&
      init.givenName.length > 0 &&
      typeof init.email === 'string';
  }

  public familyName!: string;
  public givenName!: string;
  public email!: string;

  constructor(init: Partial<User>) {
    if (User.valid(init)) {
      Object.assign(this, init);
    } else {
      alert(`bad user init: ${JSON.stringify(init)}`);
    }
  }
}
