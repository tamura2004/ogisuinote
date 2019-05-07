export default class User {
  public static collectionName = 'users';

  public static form(): Form<User> {
    return {
      name: null,
      email: null,
      manager: false,
    };
  }

  public static valid(init: any): init is User {
    return typeof init.name === 'string' &&
      init.name.length > 0 &&
      typeof init.email === 'string' &&
      init.email.length > 0 &&
      typeof init.manager === 'boolean';
  }

  public name!: string;
  public email!: string;
  public manager!: boolean;

  constructor(init: any) {
    if (User.valid(init)) {
      Object.assign(this, init);
    } else {
      alert(`bad user init: ${JSON.stringify(init)}`);
    }
  }
}
