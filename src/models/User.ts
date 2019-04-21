export default class User {
  public static collectionName = 'users';

  public static form(): Form<User> {
    return {
      name: null,
      email: null,
    };
  }

  public static valid(init: any): init is User {
    return typeof init.name === 'string' &&
      init.name.length > 0 &&
      typeof init.email === 'string' &&
      init.email.length > 0;
  }

  public name!: string;
  public email!: string;

  constructor(init: Partial<User>) {
    if (User.valid(init)) {
      Object.assign(this, init);
    } else {
      alert(`bad user init: ${JSON.stringify(init)}`);
    }
  }
}
