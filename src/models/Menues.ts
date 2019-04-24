export interface Menu {
  label: string;
  icon: string;
  path: string;
  logout: boolean;
}

export const MENUES: Menu[] = [
  {
    label: 'ログアウト',
    icon: 'exit_to_app',
    path: '/',
    logout: true,
  },
  {
    label: 'プロファイル変更',
    icon: 'person',
    path: '/app/user/update',
    logout: false,
  },
  {
    path: '/app/tasks',
    icon: 'list',
    label: '個人タスク一覧',
    logout: false,
  },
  {
    path: '/app/users/tasks',
    icon: 'people',
    label: '全ユーザー一覧',
    logout: false,
  },
  {
    path: '/app/users/index',
    icon: 'library_books',
    label: '全ユーザーサマリ',
    logout: false,
  },
];
