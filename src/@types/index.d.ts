declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // NEXT AUTH
      NEXTAUTH_AUTH_SECRET: string;
      JWT_SECRET: string;

      GOOGLE_ID: string;
      GOOGLE_SECRET: string;
      GITHUB_ID: string;
      GITHUB_SECRET: string;
      DISCORD_ID: string;
      DISCORD_SECRET: string;

      // MONGO DB
      MONGODB_URI: string;

      // GITHUB REST
      GITHUB_REST_PAT: string;

      // GOOGLE ANALYTICS
      GOOGLE_ANALYTICS_ID: string;

      // Naver API Headers
      XNaverClientId: string;
      XNaverClientSecret: string;
    }
  }
  interface Window {
    // GOOGLE TAG
    gtag: (param1: string, param2: string, param3: object) => void;
  }
}

//지금부터 공부를 시작해나간다. 어려울지 모르겠지만 나는 포기하지않아 임준하니까 지고싶지않으니까 누구에게도 무조건 이 기술을 내 것으로 만들겠어

//어디서부터 먹어치워야할까

//pages부터 먹으면서 왔다갔다 존나 할거같다



declare module "next-auth" {
  interface Session {
    accessToken: any;
  }
}

declare module "notistack" {
  interface VariantOverrides {
    lifebar: true;
  }
}

/**
 * 얘네도 궁금하네요 ㅋㅋ declare module이란 문버은 처음봐서요
 *
 * declare는 아시나용
 *
 * 사실 delcare도 잘 모릅니다아하 타입스크립트에서만 있는 거군요 알아먹게 하는거군요 아하 무슨느낌인지 알거같아요 근데 index.ts 가 아니고 왜 index.d.ts를 쓰셨나용
 *아하 declareation이 모여있다고 그냥 말해주는거군요 ts로 써도 문제느 ㄴ없지요?? 아하 네넵 그러면 수고하셨습니다 이제  카톡으로 다시
 * declare는 실제로 존재하지 않는 값에 대해서 타입만 타입스크립트에게 강제로 선언(delcare)해줘서 얘가 이게 존재한다는걸 알아먹게 하기 위한거에요
 * declare module는 그 모듈에 이 타입이 있다는걸 알아먹기 하기 위한거
 * d(declare).ts 약자
 * 네 상관없어요 어차피 이런 타입들은 컴파일하면 하나도 빠짐없이 다 사라짐
 * 어우 고생하셨습니다 ㄱㄱ
 */

export type listAnimatonRefType = {
  list: Array<(delay: number) => void>;
};

export type projectDataType = {
  owner: string;
  projects: Array<{
    name: string;
    description: string;
    tags: tagType[];
    link?: string;
    icon?: string;
    noGithub?: boolean;
  }>;
};

export interface GithubAPIUserData {
  name: string;
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  public_repos: string;
  public_gists: string;
  followers: string;
  bio: string;
}

export interface GithubAPIRepoData {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: GithubAPIUserData;
  html_url: string;
  description: string | null;
  fork: boolean;
  url: string;
  forks_url: string;
  keys_url: string;
  collaborators_url: string;
  teams_url: string;
  hooks_url: string;
  issue_events_url: string;
  events_url: string;
  assignees_url: string;
  branches_url: string;
  tags_url: string;
  blobs_url: string;
  git_tags_url: string;
  git_refs_url: string;
  trees_url: string;
  statuses_url: string;
  languages_url: string;
  stargazers_url: string;
  contributors_url: string;
  subscribers_url: string;
  subscription_url: string;
  commits_url: string;
  git_commits_url: string;
  comments_url: string;
  issue_comment_url: string;
  contents_url: string;
  compare_url: string;
  merges_url: string;
  archive_url: string;
  downloads_url: string;
  issues_url: string;
  pulls_url: string;
  milestones_url: string;
  notifications_url: string;
  labels_url: string;
  releases_url: string;
  deployments_url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  git_url: string;
  ssh_url: string;
  clone_url: string;
  svn_url: string;
  homepage: string;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  has_issues: boolean;
  has_projects: boolean;
  has_downloads: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  has_discussions: boolean;
  forks_count: number;
  mirror_url: string | null;
  archived: boolean;
  disabled: boolean;
  open_issues_count: number;
  license: {
    key: string;
    name: string;
    spdx_id: string;
    url: string;
    node_id: string;
  };
  allow_forking: true;
  is_template: false;
  web_commit_signoff_required: false;
  topics: string[];
  visibility: string;
  forks: number;
  open_issues: number;
  watchers: number;
  default_branch: string;
  temp_clone_token: null;
  network_count: number;
  subscribers_count: number;
  source: GithubAPIRepoData;
  parent: GithubAPIRepoData;
}

export interface MUISafeTransitionProps
  extends Omit<TransitionProps, "appear" | "in"> {
  children: React.ReactElement<any, any>;
}

export {};
