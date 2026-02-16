export enum CombatSport {
  MMA = 'MMA',
  BOXING = 'Boxing',
  GRAPPLING = 'Grappling',
  TMA = 'TMA'
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  category: CombatSport;
  imageUrl: string;
  date: string;
  author: string;
  isHot?: boolean;
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface AnalysisResponse {
  text: string;
  sources: GroundingSource[];
}

export interface FighterRanking {
  name: string;
  score: number;
  weight: string;
}

export interface CombatEvent {
  event: string;
  main: string;
  date: string;
}

export interface DashboardData {
  featured: NewsItem;
  news: NewsItem[];
  rankings: FighterRanking[];
  events: CombatEvent[];
  ticker: string[];
}
