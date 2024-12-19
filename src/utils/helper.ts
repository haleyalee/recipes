const getSlugFromName = (recipeName: string): string => {
  return recipeName.toLowerCase().replace(/ /g, "-");
};

const getNameFromSlug = (slug: string): string => {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

const capitalizeFirstLetter = (s: string): string => {
  return s[0].toUpperCase() + s.slice(1);
}

export { 
  getSlugFromName, 
  getNameFromSlug,
  capitalizeFirstLetter 
};

