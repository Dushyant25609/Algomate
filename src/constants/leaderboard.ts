export const enum SortBy {
  QUESTIONS = 'questions',
  RATING = 'rating',
  RANKING = 'ranking',
}

export const Sort = [
  { label: 'Question', value: SortBy.QUESTIONS },
  { label: 'Rating', value: SortBy.RATING },
  { label: 'Ranking', value: SortBy.RANKING },
];
