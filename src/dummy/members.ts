export type RecentTodo = {
  id: string;
  title: string;
  completedAgo: string;
};

export type Member = {
  id: string;
  name: string;
  isLeader: boolean;
  email: string;
  recentTodos: RecentTodo[];
};

export const dummyMembers: Member[] = [
  {
    id: "1",
    name: "山田太ああああああ郎",
    isLeader: false,
    email: "yamada@example.com",
    recentTodos: [
      { id: "1", title: "車の洗車", completedAgo: "今日" },
      { id: "2", title: "本を返却", completedAgo: "2日前" },
    ],
  },
  {
    id: "2",
    name: "前田 花子前田梨花佐藤",
    isLeader: true,
    email: "maeda@example.com",
    recentTodos: [
      { id: "1", title: "洗濯物を干す", completedAgo: "1日前" },
      { id: "2", title: "パスポート更新", completedAgo: "3日前" },
      { id: "3", title: "銀行に行く", completedAgo: "5日前" },
    ],
  },
  {
    id: "3",
    name: "山田次郎ああああああ",
    isLeader: false,
    email: "yamada2@example.com",
    recentTodos: [],
  },
  {
    id: "4",
    name: "山田三郎あああああああ",
    isLeader: false,
    email: "yamada3@example.com",
    recentTodos: [{ id: "1", title: "部屋の掃除", completedAgo: "4日前" }],
  },
  {
    id: "5",
    name: "山田四郎",
    isLeader: false,
    email: "yamada4@example.com",
    recentTodos: [],
  },
  {
    id: "6",
    name: "山田五郎",
    isLeader: false,
    email: "yamada5@example.com",
    recentTodos: [
      { id: "1", title: "買い物リスト作成", completedAgo: "2日前" },
    ],
  },
  {
    id: "7",
    name: "山田六郎",
    isLeader: false,
    email: "yamada6@example.com",
    recentTodos: [],
  },
  {
    id: "8",
    name: "山田七郎",
    isLeader: false,
    email: "yamada7@example.com",
    recentTodos: [],
  },
  {
    id: "9",
    name: "山田八郎",
    isLeader: false,
    email: "yamada8@example.com",
    recentTodos: [],
  },
];
