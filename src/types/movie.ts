export interface MovieArticle {
  id: string;
  slug: string;
  title: string;
  originalTitle?: string;
  subtitle: string;
  year: number;
  director: string;
  duration: string;
  genres: string[];
  rating: number; // 1 to 5 (e.g. 4.9)
  date: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  coverImage: string;
  backdropImage: string;
  excerpt: string;
  quote: {
    text: string;
    character: string;
  };
  content: {
    introduction: string;
    sections: {
      heading: string;
      body: string;
      highlight?: string;
    }[];
    verdict: string;
    scoreExplanation: string;
  };
}

export type GenreOption = 
  | "Todos"
  | "Bélico / Acción"
  | "Drama"
  | "Ciencia Ficción"
  | "Suspenso / Thriller"
  | "Crimen"
  | "Animación / Arte";
