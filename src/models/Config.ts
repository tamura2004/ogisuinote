export default class Config {
  public static collectionName = 'config';

  public static valid(init: Partial<Config>): init is Config {
    return typeof init.mailDomain === 'string' &&
    typeof init.serverUrl === 'string';
  }

  public mailDomain!: string;
  public serverUrl!: string;

  constructor(init: Partial<Config>) {
    if (Config.valid(init)) {
      Object.assign(this, init);
    } else {
      alert(`bad config data: ${JSON.stringify(init)}`);
    }
  }
}
