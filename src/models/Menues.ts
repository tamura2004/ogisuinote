export interface Menu {
  label: string;
  icon: string;
  path: string;
  logout: boolean;
}

export const MENUES: Menu[] = [
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
    path: '/app/overworks',
    icon: 'library_books',
    label: '超過勤務',
    logout: false,
  },
  {
    path: '/app/shifts',
    icon: 'library_books',
    label: 'シフト勤務',
    logout: false,
  },
  {
    label: 'プロファイル変更',
    icon: 'person',
    path: '/app/user/update',
    logout: false,
  },
  {
    label: 'ログアウト',
    icon: 'exit_to_app',
    path: '/',
    logout: true,
  },
];
