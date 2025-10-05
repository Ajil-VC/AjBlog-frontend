export const genresData = [
    'Personal & Lifestyle',
    'Technology & Science',
    'Business & Finance',
    'Arts & Entertainment',
    'Society & Culture',
    'Education & Learning',
    'Miscellaneous / Fun',
    'other'
]
export const genre = [
    'Personal & Lifestyle',
    'Technology & Science',
    'Business & Finance',
    'Arts & Entertainment',
    'Society & Culture',
    'Education & Learning',
    'Miscellaneous / Fun',
    'other'
] as const;

export type Genres = typeof genre[number];
